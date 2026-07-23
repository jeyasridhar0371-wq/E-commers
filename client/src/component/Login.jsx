import React, { useState, useEffect } from 'react';
import auth, { googleProvider } from './config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import axios from "axios"

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState("")


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/home")
            }
        })
    }, [])

    // Login with email and password
    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log("Success to login...")
            navigate("/home")
        }).catch(() => {
            console.log("Failed to login...")
            setErr("Error Signing in please try again")
        })
    }

    // Login with google
    async function handleGoogleLogin() {

        try {

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            const user = result.user;

            // Check user exists in MongoDB

            const res = await axios.get(
                "http://localhost:5000/readuser",
                {
                    params: {
                        firebase_uid: user.uid
                    }
                }
            );

            // If user doesn't exist

            if (!res.data) {

                await axios.post(
                    "http://localhost:5000/storeuser",
                    {
                        firebase_uid: user.uid,
                        role: false
                    }
                );

            }

            navigate("/home");

        } catch (err) {

            console.log(err);

        }

    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="p-10 bg-white rounded-lg shadow-md" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-red-600 cursor-pointer my-2'>{err}</p>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")} >New user? Register here</p>
                <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>

                {/* Login with google button */}
                <button

                    onClick={handleGoogleLogin}
                    className="border w-full py-2 rounded-lg mt-3 flex justify-center items-center gap-2"
                >

                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-5"
                    />

                    Continue with Google

                </button>

            </form>

        </div>
    );
}

export default Login;
