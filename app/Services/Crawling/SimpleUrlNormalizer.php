<?php

namespace App\Services\Crawling;

use App\Contracts\Crawling\UrlNormalizerInterface;

class SimpleUrlNormalizer implements UrlNormalizerInterface
{
    public function normalize(string $url, ?string $baseUrl = null): string
    {
        // Handle relative URLs
        if ($baseUrl && !str_starts_with($url, 'http')) {
            $base = parse_url($baseUrl);
            
            if (str_starts_with($url, '//')) {
                $url = ($base['scheme'] ?? 'http') . ':' . $url;
            } elseif (str_starts_with($url, '/')) {
                $url = ($base['scheme'] ?? 'http') . '://' . ($base['host'] ?? '') . $url;
            } else {
                $path = preg_replace('#/[^/]*$#', '', $base['path'] ?? '');
                $url = ($base['scheme'] ?? 'http') . '://' . ($base['host'] ?? '') . $path . '/' . $url;
            }
        }

        // Parse and rebuild to remove fragments and normalize components
        $parsed = parse_url($url);
        if (!$parsed) return $url;

        $scheme = isset($parsed['scheme']) ? strtolower($parsed['scheme']) . '://' : '';
        $host = isset($parsed['host']) ? strtolower($parsed['host']) : '';
        $port = isset($parsed['port']) ? ':' . $parsed['port'] : '';
        $path = isset($parsed['path']) ? $parsed['path'] : '';
        $query = isset($parsed['query']) ? '?' . $parsed['query'] : '';

        // Basic path normalization (remove double slashes)
        $path = preg_replace('#/+#', '/', $path);

        return $scheme . $host . $port . $path . $query;
    }
}
