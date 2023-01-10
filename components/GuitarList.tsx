import { FC } from "react";
import { DatumProducts, ProductResponse } from "../interfaces/Products";
import { GuitarCard } from "./GuitarCard";

import styles from '../styles/Grid.module.css';

interface Props{
  products: DatumProducts[];
}

export const GuitarList:FC<Props> = ({products = []}) => {
  
  return (
    <div className={styles.grid}>
      {
        products?.map( (product:DatumProducts) => (
          <GuitarCard
            key={product.id} 
            product={product.attributes}
          />
        ))
      }
    </div>
  )
}
