import { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../utils/firebase';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);

  const sendOtp = async () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', { size: 'invisible' }, auth);
    const result = await signInWithPhoneNumber(auth, '+91' + phone, window.recaptchaVerifier);
    setConfirm(result);
  };

  const verifyOtp = async () => {
    await confirm.confirm(otp);
    window.location.href = "/samples";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Login with OTP</h2>
      <input
        className="text-black p-2 mb-2 w-64"
        placeholder="Phone Number"
        onChange={e => setPhone(e.target.value)}
      />
      <button onClick={sendOtp} className="bg-white text-black px-4 py-2 mb-2">Send OTP</button>
      <input
        className="text-black p-2 mb-2 w-64"
        placeholder="Enter OTP"
        onChange={e => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp} className="bg-white text-black px-4 py-2">Verify</button>
      <div id="recaptcha"></div>
    </div>
  );
}
