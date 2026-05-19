<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chunk>
 */
class ChunkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'document_id' => Document::factory(),
            'chunk_index' => 0,
            'text' => fake()->paragraph(),
            'tokens_estimated' => fake()->numberBetween(100, 500),
            'content_hash' => fake()->sha256()
        ];
    }
}
