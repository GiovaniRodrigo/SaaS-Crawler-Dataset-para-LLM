<?php

namespace App\Services\Crawling;

use App\Contracts\Crawling\UrlScopeValidatorInterface;
use App\Models\Project;
use App\Models\CrawlJob;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SimpleUrlScopeValidator implements UrlScopeValidatorInterface
{
    protected array $robotsCache = [];

    public function isAllowed(string $url, Project $project, ?CrawlJob $job = null, int $depth = 0): bool
    {
        $parsedUrl = parse_url($url);
        if (!isset($parsedUrl['host'])) {
            return false;
        }

        $host = $parsedUrl['host'];
        $scheme = $parsedUrl['scheme'] ?? 'http';
        $path = $parsedUrl['path'] ?? '/';

        // Check Robots.txt
        $robotsRules = $this->getRobotsRules($scheme, $host);
        foreach ($robotsRules['disallowed'] as $denied) {
            if ($denied !== '' && Str::startsWith($path, $denied)) {
                return false;
            }
        }

        // Check Domains
        $isDomainAllowed = false;
        foreach ($project->domains as $domain) {
            if ($domain->allow_subdomains) {
                if ($host === $domain->domain || Str::endsWith($host, '.' . $domain->domain)) {
                    $isDomainAllowed = true;
                    break;
                }
            } else {
                if ($host === $domain->domain) {
                    $isDomainAllowed = true;
                    break;
                }
            }
        }

        if (!$isDomainAllowed) {
            return false;
        }

        // Check depth and max pages
        if ($job) {
            if ($depth > $job->max_depth) {
                return false;
            }

            // Path restrictions
            if ($job->allow_paths) {
                $pathAllowed = false;
                foreach ($job->allow_paths as $allowedPath) {
                    if (Str::startsWith($path, $allowedPath)) {
                        $pathAllowed = true;
                        break;
                    }
                }
                if (!$pathAllowed) {
                    return false;
                }
            }

            if ($job->deny_paths) {
                foreach ($job->deny_paths as $deniedPath) {
                    if (Str::startsWith($path, $deniedPath)) {
                        return false;
                    }
                }
            }
        }

        // Default block list (from section 18.2)
        $blockList = [
            '/login', '/logout', '/admin', '/dashboard', '/checkout', '/cart',
            '/carrinho', '/minha-conta', '/account', '/search', '/wp-admin', '/api'
        ];

        foreach ($blockList as $blocked) {
            if (Str::startsWith($path, $blocked)) {
                return false;
            }
        }

        // Extension block list (from section 18.3)
        $blockedExtensions = [
            '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.mp3',
            '.zip', '.rar', '.7z', '.exe', '.css', '.js', '.woff', '.woff2',
            '.ttf', '.ico'
        ];

        foreach ($blockedExtensions as $ext) {
            if (Str::endsWith(strtolower($path), $ext)) {
                return false;
            }
        }

        return true;
    }

    public function getRobotsRules(string $scheme, string $host): array
    {
        $cacheKey = "{$scheme}://{$host}";
        if (isset($this->robotsCache[$cacheKey])) {
            return $this->robotsCache[$cacheKey];
        }

        $rules = [
            'disallowed' => [],
            'delay' => 1.0,
        ];

        // Bypass robots.txt check for local URLs during testing
        if ($host === 'localhost' || $host === '127.0.0.1') {
            $this->robotsCache[$cacheKey] = $rules;
            return $rules;
        }

        try {
            $robotsUrl = "{$scheme}://{$host}/robots.txt";
            $response = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; CrawlMindBot/1.0; +https://crawlmind.com/bot)'
                ])
                ->get($robotsUrl);

            if ($response->successful()) {
                $content = $response->body();
                $lines = explode("\n", $content);
                $isTargetUserAgent = false;

                foreach ($lines as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) {
                        continue;
                    }

                    $parts = explode(':', $line, 2);
                    if (count($parts) < 2) {
                        continue;
                    }

                    $directive = strtolower(trim($parts[0]));
                    $value = trim($parts[1]);

                    if ($directive === 'user-agent') {
                        $ua = strtolower($value);
                        if ($ua === '*' || str_contains($ua, 'crawlmindbot')) {
                            $isTargetUserAgent = true;
                        } else {
                            $isTargetUserAgent = false;
                        }
                    }

                    if ($isTargetUserAgent) {
                        if ($directive === 'disallow') {
                            if ($value !== '') {
                                $rules['disallowed'][] = $value;
                            }
                        } elseif ($directive === 'crawl-delay') {
                            $rules['delay'] = floatval($value);
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            Log::warning("Failed to fetch robots.txt for {$host}: " . $e->getMessage());
        }

        $this->robotsCache[$cacheKey] = $rules;
        return $rules;
    }

    public function getCrawlDelay(string $url): float
    {
        $parsedUrl = parse_url($url);
        if (!isset($parsedUrl['host'])) {
            return 1.0;
        }
        $host = $parsedUrl['host'];
        $scheme = $parsedUrl['scheme'] ?? 'http';

        $rules = $this->getRobotsRules($scheme, $host);
        return $rules['delay'];
    }
}
