<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller {
    // List tasks for the authenticated user
    public function index() {
        return Task::where('user_id', Auth::id())->get();
    }

    // Create a new task
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'boolean'
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'] ?? false,
            'user_id' => Auth::id()
        ]);

        return response()->json($task, 201);
    }

    // Update an exiting task
    public function update(Request $request, $id) {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->update($request->only(['title', 'description', 'status']));
        return response()->json($task);
    }

    // Delete a task
    public function destroy($id) {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->delete();

        return response()->json(['message', 'Task deleted successfully']);
    }
}
