"use client";
import Link from "next/link";
import styles from "./Navbar.module.css"
import { usePathname } from "next/navigation";

function Navbar() {

const pathname = usePathname();

    return (<nav className={styles.navbar}>
        <Link href="/" className={`${styles.navlink} ${pathname === '/' ? styles.link_active : ''}`}>To Do App</Link>
        <Link href="/running-tracker" className={`${styles.navlink} ${pathname === '/running-tracker' ? styles.link_active : ''}`}>Running Tracker</Link>
    </nav>)
}

export default Navbar;