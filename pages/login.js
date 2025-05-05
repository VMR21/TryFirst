import { useState } from 'react';
import { auth } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible'
    });
  };

  const sendOTP = async () => {
    setupRecaptcha();
    const formattedPhone = "+91" + phone;
    const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
    setConfirmObj(confirmation);
    alert("OTP sent");
  };

  const verifyOTP = async () => {
    try {
      await confirmObj.confirm(otp);
      alert("Logged in");
      window.location.href = "/";
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center space-y-4">
      <input className="p-2 rounded text-black" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone (10 digit)" />
      <button className="bg-blue-600 px-4 py-2 rounded" onClick={sendOTP}>Send OTP</button>
      <input className="p-2 rounded text-black" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button className="bg-green-600 px-4 py-2 rounded" onClick={verifyOTP}>Verify</button>
      <div id="recaptcha"></div>
    </div>
  );
}
