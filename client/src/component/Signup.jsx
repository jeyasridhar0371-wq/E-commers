import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth, { googleProvider } from './config';
import axios from "axios"


function Signup() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [roll, setRoll] = useState(false)

    // If user already login go home page
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/home")
            }
        })
    }, [])

    // Function for signup email with password
    function handlesignup(e) {

        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password).then(() => {
            console.log("Signup success.")
            auth.onAuthStateChanged((user) => {
                // console.log(user.uid)
                axios.post("https://e-commers-wpco.onrender.com/storeuser", { firebase_uid: user.uid, role: roll }).then(() => {
                    console.log("user stored in mongoDB.")
                    navigate("/login")
                }).catch(() => {
                    console.log("Can not store user in mongoDB.")
                })
            })
        }).catch(() => {
            console.log("Signup Failed...")
            setError("Error Signing in please try again")
        })
    }

    // Function for signup with google
    async function handleGoogleSignup() {

        try {

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            const user = result.user;

            const res = await axios.get(
                "https://e-commers-wpco.onrender.com/readuser",
                {
                    params: {
                        firebase_uid: user.uid
                    }
                }
            );

            if (!res.data) {

                await axios.post(
                    "https://e-commers-wpco.onrender.com/storeuser",
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
            <form className="p-10 bg-white rounded-lg shadow-lg" style={{ width: "70%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
                {/* Email input */}
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
                {/* Password input */}
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
                {/* Confirm password input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                {/* Input field for set user is admin or customer */}
                <div className="mb-4">
                    <label className="block text-gray-700">Why do you want to use it?</label>
                    <select value={roll} onChange={(e) => setRoll(e.target.value)} className="mt-1 p-2 w-full border rounded">
                        <option value={false}>-- Select --</option>
                        <option value={false}>To purchase product (customer)</option>
                        <option value={true}>To sell product (admin)</option>
                    </select>
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                <button onClick={handlesignup} className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out">
                    Register
                </button>
                {/* signup with google */}
                <button onClick={handleGoogleSignup} className="border w-full py-2 rounded-lg mt-3 flex justify-center items-center gap-2">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt='G' className="w-5" />
                    Continue with Google
                </button>
            </form>
        </div>
    );
}

export default Signup;
