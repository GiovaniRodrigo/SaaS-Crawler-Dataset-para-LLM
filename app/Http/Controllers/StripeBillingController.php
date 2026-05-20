<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\StripeService;

class StripeBillingController extends Controller
{
    public function __construct(
        protected StripeService $stripeService
    ) {}

    public function subscribe(Request $request)
    {
        $organization = $request->get('current_organization');

        if (!$organization) {
            return redirect()->back()->withErrors(['error' => 'Organização não encontrada.']);
        }

        $stripeSecret = config('services.stripe.secret');
        $priceId = config('services.stripe.pro_price_id');

        if (empty($stripeSecret) || empty($priceId)) {
            return redirect()->back()->withErrors(['error' => 'Configuração do Stripe ausente no servidor.']);
        }

        try {
            // Create Stripe customer if organization doesn't have one
            if (empty($organization->stripe_customer_id)) {
                $customer = $this->stripeService->createCustomer(
                    $request->user()->email,
                    $organization->name,
                    $organization->id
                );
                $organization->update(['stripe_customer_id' => $customer->id]);
            }

            $session = $this->stripeService->createCheckoutSession(
                $organization->stripe_customer_id,
                $organization->id
            );

            return Inertia::location($session->url);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar sessão de pagamento: ' . $e->getMessage()]);
        }
    }

    public function portal(Request $request)
    {
        $organization = $request->get('current_organization');

        if (!$organization || empty($organization->stripe_customer_id)) {
            return redirect()->back()->withErrors(['error' => 'Nenhum histórico de faturamento ativo.']);
        }

        $stripeSecret = config('services.stripe.secret');
        if (empty($stripeSecret)) {
            return redirect()->back()->withErrors(['error' => 'Configuração do Stripe ausente no servidor.']);
        }

        try {
            $session = $this->stripeService->createBillingPortalSession(
                $organization->stripe_customer_id
            );

            return Inertia::location($session->url);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao redirecionar para o portal: ' . $e->getMessage()]);
        }
    }
}
