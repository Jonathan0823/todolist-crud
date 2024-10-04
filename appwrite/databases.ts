import { databases } from "./config";
import { ID } from "appwrite";

interface Collection {
  create: (payload: any, permissions: any, id?: string) => Promise<any>;
  update: (id: string, payload: any, permissions: any) => Promise<any>;
}

const db: { [key: string]: Collection } = {};

const collections = [
  {
    dbId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_TODO!,
    name: "todo",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
  };
});

export default db;
