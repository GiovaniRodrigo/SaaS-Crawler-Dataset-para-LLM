<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = Session::get('locale', config('app.locale'));

        if ($request->has('lang')) {
            $newLocale = $request->get('lang');
            if (in_array($newLocale, ['en', 'pt_BR'])) {
                $locale = $newLocale;
                Session::put('locale', $locale);
            }
        }

        App::setLocale($locale);

        return $next($request);
    }
}
