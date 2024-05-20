import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            // console.log(`submin jalan ni bos`);
            // handleLogin({ email, password });
            let { data } = await axios({
                method: "post",
                url: import.meta.env.VITE_API_URL + "/users/login",
                // url: "http://localhost:3000/login",
                data: {
                    email: email,
                    password: password,
                },
            });
            console.log(data, "respons login");
            localStorage.setItem("token", data.access_token);
            navigate("/");
            // setAccessToken(data.access_token);
            // setIsLogin(true); ganti
            // setStatusLogin(true);
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    };

    // === OAuth 2.0 google===
    async function handleCredentialResponse(response) {
        try {
            const { data } = await axios({
                method: "POST",
                // url: `http://localhost:3000/users/google-login`,
                url: import.meta.env.VITE_API_URL + "/users/google-login",
                headers: {
                    google_token: response.credential,
                },
            });
            // console.log(data, "access token");
            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" } // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="container mt-5">
                    <div classs="row">
                        <div className="col-md-5 mx-auto">
                            <h5 className="text-center">Login</h5>
                            {/* email : {email}
                            password : {password} */}
                            <form onSubmit={submitLogin}>
                                <div className="mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: mymanga@gmail.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-4 rounded-2 w-100 "
                                    >
                                        Login
                                    </button>

                                    <Link
                                        to="/register"
                                        className="btn btn-outline-secondary mt-4  rounded-2 w-100"
                                    >
                                        Register
                                    </Link>
                                    <div
                                        className=" mt-4 w-100"
                                        id="buttonDiv"
                                    ></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
