
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/Layout";
import { DatumAttributes } from "../interfaces/Products";
import styles from '../styles/Cart.module.css';

interface Props{
    cart: DatumAttributes[];
    updateQuantity: (product: DatumAttributes) => void;
    deleteProduct: (slug: string) => void;
}

const cartPage:NextPage<Props> = ({cart, updateQuantity, deleteProduct}) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
      const totalCalc = cart.reduce( (total, product) => total + (product.quantity * product.price), 0 );

      setTotal(totalCalc); 
    }, [cart])
    


  return (
   <Layout title="Shopping cart">
        <main className="container">
            <h1 className="heading">Cart</h1>
       

            <div className={styles.content}>
                <div className={styles.cart}>
                    <h2>Products</h2>
                    {
                        cart.length === 0 ? 'Empty Cart' : (
                            cart.map( (product:DatumAttributes) => (
                                <div key={product.slug} className={styles.product}>
                                    <div>
                                        <Image src={product.image.toString()} alt={product.name} width={250} height={480} />
                                    </div>

                                    <div>
                                        <p className={styles.name}> {product.name} </p>

                                        <div className={styles.quantity}>
                                            <p>Quantity:</p>
                                            <select 
                                                className={styles.select}
                                                onChange={(e) => updateQuantity({
                                                    ...product,
                                                    slug: product.slug,
                                                    quantity: Number(e.target.value)
                                                })}
                                                value={product.quantity}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>

                                        </div>
                                        <p className={styles.price}> $ <span>{product.price} </span></p>
                                        <p className={styles.subtotal}>Subtotal: $ <span>{product.quantity * product.price} </span></p>
                                    </div>

                                    <button 
                                        type="button"
                                        className={styles.delete}
                                        onClick={() => deleteProduct(product.slug)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        )
                    }
                </div>

                <aside className={styles.summary}>
                    <h3>Order Summary</h3>
                    <p>Total: ${total}</p>
                </aside>
            </div>
        </main>
   </Layout>
  )
}

export default cartPage