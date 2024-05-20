import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../utils/toast";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Card({ e }) {
    const params = useParams();
    const navigate = useNavigate();

    const handleAddFav = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: `http://localhost:3000/mangas/favourites/${e.myanimelist_id}`,
                // url:
                //     import.meta.env.VITE_API_URL +
                //     `/mangas/favorite/${e.myanimelist_id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(data, "response favdta");
            if (data.message === "Item has added") {
                showToast("Manga has added");
                return;
            }

            navigate("/favorite");
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    };

    return (
        <>
            <div className="col">
                <div
                    className="card"
                    // onClick={<Link to={`/lodgings/${e.id}`}>Detail</Link>}
                >
                    <img
                        src={e.picture_url}
                        style={{
                            height: "12rem",
                            objectFit: "cover",
                        }}
                        alt=""
                    />

                    <div className="card-body ">
                        <h5 className="card-title ">{e.title}</h5>
                        <span className="fs-6"> Score : {e.score}</span>
                        <div className="d-flex align-items-center">
                            <Link
                                to={`/detail/${e.myanimelist_id}`}
                                state={{ myanimelist_url: e.myanimelist_url }}
                                // onClick={() => {
                                //     handleAddMyClub(event);
                                // }}
                                className="btn btn-outline-dark btn-sm mt-2 me-5"
                            >
                                Detail
                            </Link>
                            <button
                                onClick={() => {
                                    if (!localStorage.token) {
                                        navigate("/login");
                                    } else {
                                        handleAddFav(event);
                                    }
                                }}
                                className="btn btn-outline-dark btn-sm mt-2 ms-4"
                            >
                                Favorite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
