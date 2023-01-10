
import Image from "next/image";
import { Layout } from "../components/Layout";
import styles from '../styles/About.module.css'

const AboutPage = () => {
  return (
    <Layout title="About" description="Sobre nosotros, GuitarLA, tienda de musica">
        <main className="container">
          <h1 className="heading">About Us</h1>

          <div className={styles.contenido}>
              <Image src="/img/about.jpg" alt="about image" width={1000} height={800} />

              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repellendus cumque exercitationem dolores cupiditate. Quisquam, sit ex dolorum quae aut aperiam quis eligendi soluta commodi placeat rem illo quasi quod!
                  Quis vel molestias quibusdam dolorem placeat. Rem amet sequi excepturi saepe, iste atque.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repellendus cumque exercitationem dolores cupiditate. Quisquam, sit ex dolorum quae aut aperiam quis eligendi soluta commodi placeat rem illo quasi quod!
                  Quis vel molestias quibusdam dolorem placeat. Rem amet sequi excepturi saepe, iste atque. 
                </p>
              </div>
          </div>
        </main>
    </Layout>

  )
}

export default AboutPage