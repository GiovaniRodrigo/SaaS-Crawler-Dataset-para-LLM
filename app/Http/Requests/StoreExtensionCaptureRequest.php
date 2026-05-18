<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExtensionCaptureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'url' => 'required|url',
            'title' => 'nullable|string|max:500',
            'text' => 'required|string|min:100',
        ];
    }
}
