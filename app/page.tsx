"use client";
import { useState, useEffect } from "react";
import { databases } from "@/appwrite/config";

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
    const res = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_TODO!
    );

    setTodos(res.documents.map(doc => ({
      $id: doc.$id,
      body: doc.body
    })));

  }
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.$id}>
            {todo.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
