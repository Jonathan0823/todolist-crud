import { useState } from "react";
import React from "react";
import db from "@/appwrite/databases";

interface TodoProps {
  todo: {
    $id: string;
    body: string;
    isDone: boolean;
  };
    setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

const Todo: React.FC<TodoProps> = ({ setTodos, todo }) => {
    const [list, setList] = useState(todo);

    const handleUpdate = async () => {
        const isdone = !list.isDone;
        db.todo.update(list.$id, { isDone: isdone }, []);
        setList({ ...list, isDone: isdone });
    }

    const handleDelete = async () => {
        db.todo.delete(list.$id);
        setTodos((prev: any[]) => prev.filter((item) => item.$id !== list.$id));
    }

  return (
    <div>
      <li
        key={list.$id}
        className="my-4"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span style={{ flex: 1 }} className="text-black">
          {list.isDone ? <s>{list.body}</s> : list.body}
        </span>
        <button
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleUpdate}
        >
          {list.isDone ? "Uncheck" : "Check"}
        </button>
        <button
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
            onClick={handleDelete}
        >
          Delete
        </button>
      </li>
    </div>
  );
};

export default Todo;
