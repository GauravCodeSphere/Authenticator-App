import { useState } from 'react';
import Router from 'next/router';
import { getSession } from '@/lib/session';
import { generateOTP, generateSecret, verifyOTP } from '@/lib/totpService';
// import { effect, signal, useSignal } from '@preact/signals-react';


// const username = signal("");
export default function Login() {
    const [username, setUsername] = useState('');
    // const username = useSignal(0)
    const [password, setPassword] = useState('');
    // effect(() => console.log(username.value));
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            Router.push('/');
        } else {
            alert('Invalid User');
        }
    };

    // const secret = "MYNH6XBMDJVXIQTX"; // secret key of user
    // const otp = generateOTP(secret); // Generate OTP using the secret key
    // const userEnteredOTP = "415972";
    // const isOTPValid = verifyOTP(userEnteredOTP, secret); // Verify user-entered OTP
    // console.log("Generated OTP:", otp);
    // console.log("Is the entered OTP valid?", isOTPValid);


    return (
        <form onSubmit={handleSubmit} className='flex justify-center mt-48 w-full'>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className='text-black'
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className='text-black'

            />

            <button type="submit">Login</button>
        </form>
    );
}


export async function getServerSideProps({ req, res }) {
    const session = getSession(req);

    // If there is no session, redirect to the login page
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false, // This is a temporary redirect
            },
        };
    }

    // If there is a session, return it as a prop
    return { props: { session } };
}


