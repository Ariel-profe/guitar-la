import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import { DatumAttributes } from '../interfaces/Products';

import styles from '../styles/ProductCard.module.css'

interface Props{
    product: DatumAttributes
}

export const GuitarCard:FC<Props> = ({product}) => {

  const {description, image, name, price, slug} = product;
  
  return (
    <div className={styles.product}>
      <Image src={image.data.attributes.formats.medium.url} alt={`guitar image ${name}`} width={600} height={400} />

      <div className={styles.container}>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>${price}</p>
        <Link href={`/products/${slug}`} className={styles.link}>
          see more
        </Link>
      </div>
    </div>
  )
}
