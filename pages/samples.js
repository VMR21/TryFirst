import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from '../utils/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function Samples() {
  const [user, setUser] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else window.location.href = '/login';
    });
  }, []);

  useEffect(() => {
    const fetchSamples = async () => {
      const querySnapshot = await getDocs(collection(db, 'samples'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSamples(list);
    };
    fetchSamples();
  }, []);

  const claimSample = async (id) => {
    if (!user) return;
    await addDoc(collection(db, 'claims'), {
      userId: user.uid,
      sampleId: id,
      claimedAt: new Date()
    });
    alert("Sample Claimed!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Available Samples</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {samples.map((s) => (
          <div key={s.id} className="bg-white text-black p-4 rounded shadow">
            <h3 className="font-bold text-lg">{s.name}</h3>
            <p>{s.description}</p>
            <button
              className="mt-2 bg-black text-white px-4 py-1 rounded"
              onClick={() => claimSample(s.id)}
            >Claim</button>
          </div>
        ))}
      </div>
    </div>
  );
}
