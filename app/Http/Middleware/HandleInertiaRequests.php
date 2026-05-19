<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => $request->session()->get('message'),
                'semanticSearchResults' => $request->session()->get('semanticSearchResults'),
            ],
            'locale' => app()->getLocale(),
            'translations' => $this->getTranslations(),
        ];
    }

    protected function getTranslations()
    {
        $locale = app()->getLocale();
        $files = ['messages', 'auth', 'pagination', 'validation'];
        $translations = [];

        foreach ($files as $file) {
            $path = lang_path("$locale/$file.php");
            if (file_exists($path)) {
                $translations[$file] = include $path;
            }
        }

        return $translations;
    }
}
