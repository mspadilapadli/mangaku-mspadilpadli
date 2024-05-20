import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout(params) {
    return (
        <>
            <Navbar />;
            <Outlet />
        </>
    );
}
