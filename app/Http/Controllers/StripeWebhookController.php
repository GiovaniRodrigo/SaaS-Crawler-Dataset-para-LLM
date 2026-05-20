<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Webhook;
use Stripe\Event;
use App\Models\Organization;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('stripe-signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        try {
            if (!empty($webhookSecret) && !empty($sigHeader)) {
                $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
            } else {
                // For local development, fallback testing, or manual triggers
                $data = json_decode($payload, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new \Exception('Invalid JSON payload');
                }
                $event = Event::constructFrom($data);
            }
        } catch (\Exception $e) {
            Log::error('Stripe webhook verification failed: ' . $e->getMessage());
            return response()->json(['message' => 'Invalid signature or payload: ' . $e->getMessage()], 400);
        }

        Log::info('Stripe webhook received: ' . $event->type);

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $organizationId = $session->metadata->organization_id ?? null;

                if ($organizationId) {
                    $organization = Organization::find($organizationId);
                    if ($organization) {
                        $organization->update([
                            'stripe_customer_id' => $session->customer,
                            'stripe_subscription_id' => $session->subscription,
                            'subscription_plan' => 'pro',
                            'subscription_status' => 'active',
                            'subscription_ends_at' => null,
                        ]);
                        Log::info("Organization {$organizationId} subscribed to Pro plan.");
                    }
                }
                break;

            case 'customer.subscription.updated':
                $subscription = $event->data->object;
                $organization = Organization::where('stripe_subscription_id', $subscription->id)->first();

                if ($organization) {
                    $status = $subscription->status;
                    $endsAt = isset($subscription->current_period_end) 
                        ? date('Y-m-d H:i:s', $subscription->current_period_end) 
                        : null;

                    $organization->update([
                        'subscription_status' => $status,
                        'subscription_ends_at' => $endsAt,
                    ]);
                    Log::info("Organization {$organization->id} subscription updated. Status: {$status}");
                }
                break;

            case 'customer.subscription.deleted':
                $subscription = $event->data->object;
                $organization = Organization::where('stripe_subscription_id', $subscription->id)->first();

                if ($organization) {
                    $organization->update([
                        'subscription_plan' => 'starter',
                        'subscription_status' => 'active',
                        'stripe_subscription_id' => null,
                        'subscription_ends_at' => null,
                    ]);
                    Log::info("Organization {$organization->id} subscription deleted. Demoted to Starter plan.");
                }
                break;
        }

        return response()->json(['status' => 'success']);
    }
}
