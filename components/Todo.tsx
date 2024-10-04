import React from 'react'

interface TodoProps {
  todo: {
    $id: string;
    body: string;
  };
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div><li key={todo.$id} className="my-4" style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
    <span style={{ flex: 1 }} className="text-black">{todo.body}</span>
    <button style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Edit
    </button>
    <button style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Delete
    </button>
  </li></div>
  )
}

export default Todo