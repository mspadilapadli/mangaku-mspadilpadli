import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import detailMangas from "../data/mangaDetail.json";

export default function DetailPage() {
    const params = useParams();
    const [dataDetail, setDataDetail] = useState({});
    const location = useLocation();

    let infoUrl = location.state.myanimelist_url;

    async function fetchLodgingById() {
        try {
            // * hit API
            let { data } = await axios({
                method: "get",
                url: import.meta.env.VITE_API_URL + "/mangas/" + params.id,
                // url: "http://localhost:3000/mangas/" + params.id,

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(detailMangas, "<<<data");
            console.log(data, "<<<data");

            setDataDetail(detailMangas);
            // setDataDetail(data);
        } catch (error) {
            console.log(error);
            // showToast(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchLodgingById();
    }, []);

    return (
        <>
            <section id="detail">
                <div className="container my-5">
                    <div className="card p-4">
                        <h4>Detail Manga</h4>
                        <div className="d-flex gap-4">
                            <img
                                src={dataDetail.picture_url}
                                style={{ height: "22rem", objectFit: "cover" }}
                                alt=""
                            />
                            <div>
                                <h3>{dataDetail.title_ov}</h3>
                                <h5>
                                    {" "}
                                    Score : {dataDetail?.statistics?.score}
                                </h5>
                                <br />
                                <p>Chapter : {dataDetail.chapters}</p>
                                <p>Synopsis : {dataDetail.synopsis} </p>
                            </div>
                        </div>
                    </div>
                    <Link
                        className="btn btn-outline-warning mt-2 me-2"
                        to={"/"}
                    >
                        Back
                    </Link>
                    <Link
                        target="_blank"
                        className="btn btn-outline-warning  mt-2"
                        to={infoUrl}
                    >
                        More Info
                    </Link>
                </div>
            </section>
        </>
    );
}
