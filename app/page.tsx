"use client";
import { useState, useEffect } from "react";
import { databases } from "@/appwrite/config";
import db from "@/appwrite/databases";
import TodoForm from "@/components/TodoForm";

interface Todo {
  $id: string;
  body: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await db.todo.list();

    setTodos(res.documents.map((doc: { $id: string; body: string }) => ({
      $id: doc.$id,
      body: doc.body
    })));

  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="w-2/3">
        <h1 style={{ textAlign: 'center', color: '#333' }}>Todo List</h1>
        <TodoForm setNotes={setTodos} />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.$id} className="my-4" style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
              <span style={{ flex: 1 }} className="text-black">{todo.body}</span>
              <button style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Edit
              </button>
              <button style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
