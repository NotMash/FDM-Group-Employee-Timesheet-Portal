//Header Component

import styles from './Header.module.css'

function Header(props)
{
    return(
        <header className={styles.Header}>
            <h1>{props.formTitle}</h1>
        </header>
    )
}

export default Header;