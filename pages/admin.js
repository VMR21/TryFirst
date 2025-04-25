import { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from '../utils/firebase';

export default function Admin() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      if (!user || user.email !== "admin@tryfirst.in") {
        alert("Access Denied");
        window.location.href = "/";
      }
    });
  }, []);

  const addSample = async () => {
    await addDoc(collection(db, "samples"), { name, description: desc });
    alert("Sample added!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Add Sample</h2>
      <input
        className="text-black p-2 mb-2 w-64"
        placeholder="Sample Name"
        onChange={e => setName(e.target.value)}
      />
      <input
        className="text-black p-2 mb-4 w-64"
        placeholder="Description"
        onChange={e => setDesc(e.target.value)}
      />
      <button onClick={addSample} className="bg-white text-black px-4 py-2">Add Sample</button>
    </div>
  );
}
