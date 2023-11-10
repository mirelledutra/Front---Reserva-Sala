
import styles from "./styles.module.css"
export default function Header({ children }) {

    return (
        <>
            <div className={styles.h1}>
                <h1>{children}</h1>
            </div>
        </>
    )
}

