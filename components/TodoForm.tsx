import db from "@/appwrite/databases";
import React, { useState } from "react";

interface TodoFormProps {
  setNotes: React.Dispatch<React.SetStateAction<any[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ setNotes }) => {
  const [body, setBody] = useState("");

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!body) return

    try {
      const payload = { body };
      const res = await db.todo.create(payload, []);
      setNotes((prev: any[]) => [res, ...prev]);
      setBody(""); // Clear the input field after adding the todo
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={addTodo} className="w-full flex flex-col items-center">
        <input
          type="text"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-400 p-2 text-black w-full mb-4"
        />
        <button type="submit" className="py-3 bg-red-400 px-3 rounded-lg">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
