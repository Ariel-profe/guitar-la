import Link from "next/link"
import { linkPages, ILinkPage } from "../utils/linkPages"

import styles from '../styles/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`contenedor ${styles.contenido}`}>
        <nav className={styles.nav}>
            {
                linkPages.map( ({href, id, title}:ILinkPage) => (
                    <Link key={id} href={href}> {title} </Link>
                ))
            }
        </nav>

        <p className={styles.copyright}>Todos los derechos reservados. {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
