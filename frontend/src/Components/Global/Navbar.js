import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import useEffect and useState
import styles from './Navbar.module.css';
import Logout from '../Global/LogoutButton';

export default function Navbar(props) {
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-100px"; // Adjust based on your navbar height
            }
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    let linksArray = props.links;

    return (
        <nav id="navbar" className={styles.navbar}>
            <ul className={styles.navContainer}>
                <Link className={styles.navElement} to={props.homePageLink}>
                    <Link className={styles.navLink} to={props.homePageLink}>
                        <p className={styles.navText} href="/">{props.homePageTitle}</p>
                    </Link>
                </Link>
                {linksArray.map((navElement, index) => (
                    <Link key={index} className={styles.navElement} to={navElement.pageLink}>
                        <Link className={styles.navLink} to={navElement.pageLink}>
                            <p className={styles.navText}>{navElement.pageName}</p>
                        </Link>
                    </Link>
                ))}
                <li className={styles.navElement}>
                    <Logout />
                </li>
            </ul>
        </nav>
    );
}
