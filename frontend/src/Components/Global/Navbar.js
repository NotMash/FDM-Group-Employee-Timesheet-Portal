import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import Logout from '../Global/LogoutButton'

export default function Navbar(props) {
    let linksArray = props.links
    console.log(linksArray)

    return(<nav className={styles.navbar}>
        <ul className={styles.navContainer}>
            <li className={styles.navElement}>
                <Link className={styles.navLink} to={props.homePageLink}>
                    {/* <img className={styles.icon} src="./Home_Page_Icons/house-solid.svg"/> */}
                    <p className={styles.navText} href="/">{props.homePageTitle}</p>
                </Link>
            </li>
            {linksArray.map( (navElement, index) =>(
                <li key={index} className={styles.navElement}>
                    <Link className={styles.navLink} to={navElement.pageLink}>
                        {/* <img className={styles.icon} src={navElement.iconPath}/> */}
                        <p className={styles.navText}>{navElement.pageName}</p>
                    </Link>
                </li>
            ))}
            <li className={styles.navElement}>
                <Logout/>
            </li>

        </ul>
    </nav>)
}