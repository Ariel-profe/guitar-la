import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { linkPages, ILinkPage } from '../utils/linkPages';
import styles from '../styles/Navbar.module.css';

export const Navbar = () => {

    const {pathname} = useRouter()

  return (
    <header className={styles.header}>
        <div className={`container ${styles.bar}`}>
            <Link href={'/'}>
                <Image src='/img/logo.svg' alt='logo-guitarla' width={300} height={40} />
            </Link>

            <nav className={styles.nav}>
                {
                    linkPages.map( ({href, id, title, img}:ILinkPage) => (
                        <Link className={pathname === href ? styles.active : ''} key={id} href={href}>
                            { img ? (
                                <Image src={img} alt={"cart logo"} width={30} height={25} />
                            ) : (
                                title
                            ) 
                            } 
                        </Link>
                    ))
                }
            </nav>
        </div>
    </header>
  )
}
