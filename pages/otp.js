import React, { useState, useEffect } from 'react';
import { authenticator } from 'otplib';
import dynamic from 'next/dynamic';
const LoadingAnimation = dynamic(
    () => import('@/component/loading'),
    { ssr: false }
);

const OTPPage = () => {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState("-");
    const [userInput, setUserInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);

    const secret = "MYNH6XBMDJVXIQTX"; // Your secret key

    // Function to generate a new OTP
    const generateOTP = () => {
        const newOtp = authenticator.generate(secret);
        setOtp(newOtp);
    };

    const logRemainingTime = () => {
        return authenticator.timeRemaining(otp)
    };

    useEffect(() => {
        authenticator.options = { step: 30 };

        generateOTP(); // Generate initial OTP

        // Single interval for countdown and OTP generation
        const interval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    generateOTP(); // Generate new OTP when countdown resets
                    return logRemainingTime();
                }
                return logRemainingTime();
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const verifyOTP = () => {
        const isValid = authenticator.verify({ token: userInput, secret });
        setVerificationResult(isValid);
    };



    return (
        <div className='flex flex-col gap-3 mt-40 items-center'>
            <h1 className='flex justify-center text-xl bg-[#2cc16f] p-2 rounded-lg font-bold text-black'>OTP: {otp}</h1>
            <p className='flex justify-center items-center text-xl '>Next OTP in: {countdown}s

                <LoadingAnimation countdown={countdown} />
            </p>
            {/* <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-3' >

                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter OTP"
                    className='text-black w-fit mx-auto'
                />
                <button type='submit' onClick={verifyOTP} className='w-fit mx-auto bg-white text-black px-2'>Verify OTP</button>
            </form>

            {verificationResult !== null && (
                <p className={verificationResult ? 'text-green-500' : 'text-red-500'}>{verificationResult ? 'OTP is valid' : 'OTP is invalid'}</p>
            )} */}
        </div>
    );
};

export default OTPPage;
