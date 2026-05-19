<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CrawlJob>
 */
class CrawlJobFactory extends Factory
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
            'status' => fake()->randomElement(['created', 'running', 'completed', 'failed']),
            'seed_urls' => [fake()->url(), fake()->url()],
            'max_depth' => fake()->numberBetween(1, 5),
            'max_pages' => fake()->numberBetween(10, 100),
            'total_discovered' => fake()->numberBetween(100, 500),
            'total_crawled' => fake()->numberBetween(50, 100),
            'total_failed' => fake()->numberBetween(0, 10),
            'total_documents' => fake()->numberBetween(40, 90),
            'total_chunks' => fake()->numberBetween(100, 400),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
