import { useState } from "react";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AdminPage() {
  const [data, setData] = useState({ name: "", description: "", image: "" });

  const submit = async () => {
    await addDoc(collection(db, "samples"), {
      ...data,
      timestamp: Date.now()
    });
    alert("Sample uploaded");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-xl font-bold mb-4">Add New Sample</h1>
      <input className="block mb-2 p-2 text-black rounded" placeholder="Sample Name" onChange={e => setData(d => ({ ...d, name: e.target.value }))} />
      <input className="block mb-2 p-2 text-black rounded" placeholder="Description" onChange={e => setData(d => ({ ...d, description: e.target.value }))} />
      <input className="block mb-2 p-2 text-black rounded" placeholder="Image URL" onChange={e => setData(d => ({ ...d, image: e.target.value }))} />
      <button className="bg-blue-600 px-4 py-2 rounded" onClick={submit}>Upload</button>
    </div>
  );
}
