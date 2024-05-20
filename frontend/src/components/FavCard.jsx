import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../utils/toast";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FavCard({ e, fetchData }) {
    const params = useParams();
    const navigate = useNavigate();
    const handleDeleteFav = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "DELETE",
                // url: import.meta.env.VITE_API_URL + `/mangas/favorite/${e.id}`,
                url: `http://localhost:3000/mangas/favorite/${e.id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // console.log(data, "add club succes");
            fetchData();
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
                        src={e.pictUrl}
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
                                    handleDeleteFav(event);
                                }}
                                className="btn btn-outline-dark btn-sm mt-2 ms-4"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
