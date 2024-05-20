import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavCard from "../components/FavCard";
import style from "../pages/favorite.module.css";
import { useSelector, useDispatch } from "react-redux";
import { dataFavorite } from "../store/appSlice";

export default function FavoritePage() {
    // const [favManga, setFavManga] = useState([]);
    const [imageProfile, setImageProfile] = useState(
        "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
    );
    const [user, setUser] = useState({});

    const favManga = useSelector((state) => state.appSlice.dataFavorite);
    const dispatch = useDispatch();

    const fetchDataUser = async () => {
        try {
            const { data } = await axios({
                method: "get",
                // url: `http://localhost:3000/users`,
                url: import.meta.env.VITE_API_URL + "/users",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // console.log(data, "user");
            setUser(data);
            setImageProfile(data.imageUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImageUser = async (e) => {
        const dataImage = new FormData();
        dataImage.append("imageUrl", e.target.files[0]);
        try {
            console.log(e.target.files);
            const { data } = await axios({
                method: "patch",
                url:
                    import.meta.env.VITE_API_URL + `/users/${user.id}/imageUrl`,
                // url: `http://localhost:3000/users/${user.id}/imageUrl`,
                data: dataImage,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(data, "respone upload");
            fetchDataUser();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await axios({
                method: "get",
                // url: import.meta.env.VITE_API_URL + "/mangas/favorite",
                url: `http://localhost:3000/mangas/favorite`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            dispatch(dataFavorite(data));
            // console.log(data, "favManga");
            // setFavManga(data);
        } catch (error) {
            console.log(error);
        }
    };

    // fetch get (useEffect create)
    useEffect(() => {
        fetchData();
        fetchDataUser();
    }, []);

    return (
        <>
            <div className="container my-5">
                <h4 className="text-center my-5">My Favorite Mangas</h4>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 mb-5">
                    <div className="" style={{ position: "relative" }}>
                        <img
                            src={
                                imageProfile
                                    ? imageProfile
                                    : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
                            }
                            alt="Photo"
                            style={{ borderRadius: "50%" }}
                            width={150}
                            height={150}
                        />
                        <div className={`${style["inner"]}`}>
                            <input
                                onChange={uploadImageUser}
                                className={`${style["inputfile"]}`}
                                type="file"
                                name="pic"
                                accept="image/*"
                            />
                            <label>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-upload"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                </svg>
                            </label>
                        </div>
                    </div>
                    <div>{user.email}</div>
                </div>
                <div className="row row-cols-4 g-3">
                    {favManga &&
                        favManga.map((e) => {
                            return (
                                <FavCard
                                    e={e}
                                    key={e.id}
                                    fetchData={fetchData}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
}

// export default HomePage;
