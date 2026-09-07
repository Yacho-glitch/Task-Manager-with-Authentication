<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Task::create([
            'title' => 'First Demo Task',
            'description' => 'This is a seeder task.',
            'status' => false,
            'user_id' => 1
        ]);

        \App\Models\Task::create([
            'title' => 'Second Demo Task',
            'description' => 'Another seeded task.',
            'status' => true,
            'user_id' => 1
        ]);
    }
}
