import { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../utils/firebase';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved automatically
        }
      }, auth);
    }
  }, []);

  const sendOtp = async () => {
    if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
      alert("Please enter a valid 10-digit Indian number");
      return;
    }

    const attempts = localStorage.getItem('otpAttempts') || 0;
    if (attempts >= 3) {
      alert("Too many OTP attempts. Try again later.");
      return;
    }
    localStorage.setItem('otpAttempts', parseInt(attempts) + 1);

    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
      setConfirm(result);
      console.log("OTP sent!");
    } catch (err) {
      console.error("OTP ERROR:", err.message);
      alert("Failed to send OTP: " + err.message);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await confirm.confirm(otp);
      console.log("OTP verified!");
      window.location.href = '/samples';
    } catch (err) {
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f172a] text-white p-4">
      <div className="bg-[#1e293b] p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">TryFirst</h1>
        <h2 className="text-lg mb-4 text-center">Login to Claim Free Samples</h2>

        <div className="flex mb-4">
          <span className="bg-gray-700 text-white px-4 flex items-center rounded-l-md">+91</span>
          <input
            type="text"
            placeholder="Enter 10-digit Phone Number"
            className="text-black p-3 w-full rounded-r-md"
            value={phone}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPhone(cleaned);
            }}
            maxLength={10}
          />
        </div>

        {confirm && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="text-black p-3 rounded w-full mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
        )}

        <button
          onClick={confirm ? verifyOtp : sendOtp}
          className="bg-blue-600 hover:bg-blue-500 w-full p-3 rounded font-bold transition"
          disabled={loading}
        >
          {loading ? "Loading..." : confirm ? "Verify OTP" : "Send OTP"}
        </button>

        <div id="recaptcha"></div>
      </div>
    </div>
  );
}
