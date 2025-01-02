<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Product::create([
            'name' => 'Monthly Premium',
            'price' => 5000,
            'duration' => '1 month',
            'features' => [
                "Unlimited Watchlist",
                "Ad-free Experience",
                "HD Quality",
                "Download Movies",
                "Multiple Language Subtitles",
                "Behind the Scenes"
            ],
            'popular' => false
        ]);
        Product::create([
            'name' => 'Yearly Premium',
            'price' => 49800,
            'duration' => '1 year',
            'features' => [
                "All Monthly Features",
                "FHD Quality",
                "Early Access",
                "Behind the Scenes",
                "Save 17%"
            ],
            'popular' => true
        ]);
    }
}
