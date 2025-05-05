import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import Link from "next/link";

export default function Home() {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const fetchSamples = async () => {
      const querySnapshot = await getDocs(collection(db, "samples"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSamples(data);
    };
    fetchSamples();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Try It. Feel It. Own It.</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {samples.map(sample => (
          <div key={sample.id} className="bg-white text-black p-4 rounded">
            <img src={sample.image} alt={sample.name} className="h-40 w-full object-cover mb-2" />
            <h2 className="font-bold">{sample.name}</h2>
            <p className="text-sm">{sample.description}</p>
            <Link href={`/claim/${sample.id}`} className="block mt-2 bg-blue-600 text-white text-center py-2 rounded">
              Claim
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
