"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";

interface Task {
  title: string;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task>({ title: "", description: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.from('tasks').insert(tasks);
    if (error) {
      console.log("Error inserting tasks:", error);
    } else {
      setTasks({ title: "", description: "" });
    }
  }
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Task Manager</h1>

        {/* Form */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Task Title 
              </label>
              <input
                type="text"
                placeholder="Enter task title..."
                onChange={(e) => setTasks((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descriptiona
              </label>
              <textarea
                placeholder="Enter task description..."
                onChange={(e) => setTasks((prev) => ({ ...prev, description: e.target.value }))}

                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            > Create Task
            </button>
          </form>
        </div>

        {/* Tasks Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Tasks
          </h2>

          <p className="text-slate-600">No tasks yet. Create one to get started!</p>

          <div className="grid gap-4">

            <div

              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-slate-800">

                </h3>
                <button

                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              <p className="text-slate-600 mb-3"> </p>
              <p className="text-slate-400 text-xs"> Created at:
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
