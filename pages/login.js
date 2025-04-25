import { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../utils/firebase';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    const auth = getAuth(app);
    setLoading(true);
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', { size: 'invisible' }, auth);
    try {
      const result = await signInWithPhoneNumber(auth, '+91' + phone, window.recaptchaVerifier);
      setConfirm(result);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await confirm.confirm(otp);
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
        
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="text-black p-3 rounded w-full mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />

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
