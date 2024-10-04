"use client";
import { useState, useEffect } from "react";
import db from "@/appwrite/databases";
import TodoForm from "@/components/TodoForm";
import Todo from "@/components/Todo";

interface Todo {
  $id: string;
  body: string;
  isDone: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await db.todo.list();

    setTodos(res.documents.map((doc: { $id: string; body: string; isDone: boolean }) => ({
      $id: doc.$id,
      body: doc.body,
      isDone: doc.isDone
    })));
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="w-2/3">
        <h1 style={{ textAlign: 'center', color: '#333' }}>Todo List</h1>
        <TodoForm setNotes={setTodos} />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <Todo key={todo.$id} todo={todo}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
