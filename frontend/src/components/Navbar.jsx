import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        // setStatusLogin(false);
    };

    return (
        <>
            {/* <nav className="navbar navbar-light bg-info px-5">
                <div className="container">
                    <div className="d-flex align-items-center gap-2 ">
                        <Link to="/">Mangaku</Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link
                            to="/my-clubs"
                            style={{
                                color: "rgb(0 0 0)",
                            }}
                        >
                            MyFavorite
                        </Link>

                        <button
                            id="logout-button"
                            className="btn btn-outline-danger mx-3"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav> */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand mb-0 h1" href="/">
                        Mangaku
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item"></li>
                            <li className="nav-item">
                                <button
                                    className="nav-link active"
                                    aria-current="page"
                                    onClick={() => {
                                        if (!localStorage.token) {
                                            console.log("token dulu boss");
                                            navigate("/login");
                                        } else {
                                            console.log("uda ada token ni");
                                            navigate("/favorite");
                                        }
                                    }}
                                >
                                    My Favorite
                                </button>
                            </li>
                            <li className="nav-item"></li>
                        </ul>
                    </div>
                    <div>
                        <button
                            id="logout-button"
                            className="btn btn-outline-dark mx-3 btn-sm"
                            // onClick={handleLogout}
                            onClick={() => {
                                if (!localStorage.token) {
                                    navigate("/login");
                                } else {
                                    handleLogout();
                                }
                            }}
                        >
                            {localStorage.token ? "Logout" : "Sign in"}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
