<?php

namespace App\Services\Crawling;

use App\Contracts\Crawling\UrlScopeValidatorInterface;
use App\Models\Project;
use App\Models\CrawlJob;
use Illuminate\Support\Str;

class SimpleUrlScopeValidator implements UrlScopeValidatorInterface
{
    public function isAllowed(string $url, Project $project, ?CrawlJob $job = null, int $depth = 0): bool
    {
        $parsedUrl = parse_url($url);
        if (!isset($parsedUrl['host'])) {
            return false;
        }

        $host = $parsedUrl['host'];
        $path = $parsedUrl['path'] ?? '/';

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
}
