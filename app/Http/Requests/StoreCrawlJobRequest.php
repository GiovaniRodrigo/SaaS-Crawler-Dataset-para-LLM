<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCrawlJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'seed_urls' => 'required|array|min:1',
            'seed_urls.*' => 'required|url',
            'allow_paths' => 'nullable|array',
            'deny_paths' => 'nullable|array',
            'max_depth' => 'required|integer|min:0|max:10',
            'max_pages' => 'required|integer|min:1|max:10000',
        ];
    }
}
