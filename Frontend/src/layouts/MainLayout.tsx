import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "./mainlayouts.module.css";

export default function MainLayout() {
    return (
        <>
            <Navbar />  

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
}
