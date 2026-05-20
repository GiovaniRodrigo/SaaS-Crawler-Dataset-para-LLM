<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Checkout\Session as CheckoutSession;
use Stripe\BillingPortal\Session as PortalSession;
use Stripe\Invoice;

class StripeService
{
    public function __construct()
    {
        $secret = config('services.stripe.secret');
        if (!empty($secret)) {
            Stripe::setApiKey($secret);
        }
    }

    public function createCustomer(string $email, string $name, int $organizationId): Customer
    {
        return Customer::create([
            'email' => $email,
            'name' => $name,
            'metadata' => [
                'organization_id' => $organizationId,
            ],
        ]);
    }

    public function createCheckoutSession(string $customerId, int $organizationId): CheckoutSession
    {
        return CheckoutSession::create([
            'customer' => $customerId,
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => config('services.stripe.pro_price_id'),
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => route('settings.billing') . '?success=true',
            'cancel_url' => route('settings.billing') . '?canceled=true',
            'metadata' => [
                'organization_id' => $organizationId,
            ],
            'subscription_data' => [
                'metadata' => [
                    'organization_id' => $organizationId,
                ]
            ]
        ]);
    }

    public function createBillingPortalSession(string $customerId): PortalSession
    {
        return PortalSession::create([
            'customer' => $customerId,
            'return_url' => route('settings.billing'),
        ]);
    }

    public function getInvoices(string $customerId, int $limit = 10): array
    {
        try {
            $invoices = [];
            $stripeInvoices = Invoice::all([
                'customer' => $customerId,
                'limit' => $limit,
            ]);
            foreach ($stripeInvoices->data as $invoice) {
                $invoices[] = [
                    'id' => $invoice->id,
                    'number' => $invoice->number,
                    'amount' => number_format($invoice->amount_paid / 100, 2),
                    'currency' => strtoupper($invoice->currency),
                    'status' => $invoice->status,
                    'created' => date('Y-m-d', $invoice->created),
                    'pdf' => $invoice->invoice_pdf,
                ];
            }
            return $invoices;
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error fetching Stripe invoices in service: ' . $e->getMessage());
            return [];
        }
    }
}
