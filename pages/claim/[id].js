import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ClaimPage() {
  const router = useRouter();
  const { id } = router.query;
  const [paid, setPaid] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", full: "", pincode: "" });

  const payNow = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 2900,
      currency: "INR",
      name: "TryFirst",
      description: "Sample Fee",
      handler: function (response) {
        setPaid(true);
      },
      prefill: {
        name: "TryFirst User"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const submitAddress = async () => {
    await addDoc(collection(db, "orders"), {
      sampleId: id,
      ...address,
      timestamp: Date.now()
    });
    alert("Order placed");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 space-y-4">
      {!paid ? (
        <button onClick={payNow} className="bg-blue-600 px-6 py-3 rounded text-lg">Pay ₹29 to Claim</button>
      ) : (
        <>
          <input className="p-2 rounded text-black" placeholder="Full Name" onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} />
          <input className="p-2 rounded text-black" placeholder="Phone Number" onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} />
          <input className="p-2 rounded text-black" placeholder="Full Address" onChange={e => setAddress(a => ({ ...a, full: e.target.value }))} />
          <input className="p-2 rounded text-black" placeholder="Pincode" onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))} />
          <button onClick={submitAddress} className="bg-green-600 px-4 py-2 rounded">Submit Address</button>
        </>
      )}
    </div>
  );
}
