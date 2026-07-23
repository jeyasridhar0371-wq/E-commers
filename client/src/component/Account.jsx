import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import auth from "./config";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Account() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // get current user details
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();

    }, []);

    async function handleLogout() {

        await signOut(auth);

        navigate("/login");

    }

    return (
        <div>

            <Navbar />

            <div className="py-20 flex justify-center">

                <div className="border rounded-xl shadow-lg p-8 w-112.5">

                    <h1 className="text-3xl font-bold text-center mb-6">
                        My Account
                    </h1>

                    {user && (
                        <>

                            <div className="space-y-4">

                                <div>

                                    <h3 className="font-semibold">
                                        Name
                                    </h3>

                                    <p>{user.displayName || "Not Available"}</p>

                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        Email
                                    </h3>

                                    <p>{user.email}</p>

                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        User ID
                                    </h3>

                                    <p className="break-all">
                                        {user.uid}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white w-full py-3 rounded-lg mt-8"
                            >
                                Logout
                            </button>

                        </>
                    )}

                </div>

            </div>

            <Footer />

        </div>
    );
}

export default Account;