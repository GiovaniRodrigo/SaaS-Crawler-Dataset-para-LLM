<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default AI Embedding Provider
    |--------------------------------------------------------------------------
    |
    | Supported: "fake", "openai", "gemini"
    |
    */
    'embedding_provider' => env('EMBEDDING_PROVIDER', 'fake'),

    /*
    |--------------------------------------------------------------------------
    | Default AI Quality Provider
    |--------------------------------------------------------------------------
    |
    | Supported: "local" (heuristic), "openai", "gemini"
    |
    */
    'quality_provider' => env('AI_QUALITY_PROVIDER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default AI Embedding Model
    |--------------------------------------------------------------------------
    */
    'embedding_model' => env('EMBEDDING_MODEL', 'fake-embedding-1536'),

    /*
    |--------------------------------------------------------------------------
    | Default AI Embedding Dimensions
    |--------------------------------------------------------------------------
    |
    | The dimension for vectors stored in the chunk_embeddings table.
    | Default is 1536.
    |
    */
    'embedding_dimensions' => (int) env('EMBEDDING_DIMENSIONS', 1536),

    /*
    |--------------------------------------------------------------------------
    | API Keys and Provider Options
    |--------------------------------------------------------------------------
    */
    'providers' => [
        'openai' => [
            'key' => env('OPENAI_API_KEY'),
            'model' => env('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small'),
            'dimensions' => (int) env('OPENAI_EMBEDDING_DIMENSIONS', 1536),
            'chat_model' => env('OPENAI_CHAT_MODEL', 'gpt-4o-mini'),
        ],
        'gemini' => [
            'key' => env('GEMINI_API_KEY'),
            'model' => env('GEMINI_EMBEDDING_MODEL', 'text-embedding-004'),
            'dimensions' => (int) env('GEMINI_EMBEDDING_DIMENSIONS', 1536),
            'chat_model' => env('GEMINI_CHAT_MODEL', 'gemini-1.5-flash'),
        ],
    ],
];
