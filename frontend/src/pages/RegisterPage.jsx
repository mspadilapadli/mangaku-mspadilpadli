import { useState } from "react";
import showToast from "../utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegsiterPage() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleInputRegister = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handlePostRegister = async (event) => {
        event.preventDefault();
        try {
            await axios({
                method: "post",
                url: import.meta.env.VITE_API_URL + `/users/register`,
                // url: "http://localhost:3000/users/register",

                data: input,
            });
            console.log("new data created");
            // showToast("new user created");
            // console.log(input, "<<<input form");
            navigate("/login");
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    };

    return (
        <>
            {/* <div>fullName : {input.fullName}</div>
                <div>email : {input.email}</div>
                <div>password : {input.password}</div> */}
            <div className="container">
                <div className="container mt-5">
                    <div classs="row">
                        <div className="col-md-5 mx-auto">
                            <h5 className="text-center">
                                Resister your Account
                            </h5>
                            <form onSubmit={handlePostRegister}>
                                <div className="mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ex: mymanga@gmail.com"
                                        name="email"
                                        value={input.email}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={input.password}
                                        onChange={handleInputRegister}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4  rounded-4 w-100"
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
