<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
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
            'url' => fake()->url(),
            'title' => fake()->sentence(),
            'text' => fake()->paragraphs(3, true),
            'language' => 'pt_BR',
            'content_hash' => fake()->sha256(),
            'source' => 'web',
            'status' => fake()->randomElement(['pending_review', 'approved', 'rejected']),
            'quality_score' => fake()->randomFloat(2, 0, 100),
        ];
    }
}
