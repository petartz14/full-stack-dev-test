<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::query()->get()->toArray();

        return inertia('Todos/Index', [
            'todoTodos' => array_values(array_filter($todos, fn($todo) => $todo['status'] === 'todo')),
            'completeTodos' => array_values(array_filter($todos, fn($todo) => $todo['status'] === 'completed')),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoRequest $request)
    {
        Todo::create([
            'description' => $request->input('description'),
            'status' => 'todo'
        ]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        $todo->update($request->all());

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Todo $todo, string $status)
    {
        $todo->update(['status' => $status]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->back();
    }
}
