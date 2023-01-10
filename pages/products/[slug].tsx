
import { FormEvent, useState } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import { DatumProducts } from '../../interfaces/Products';
import styles from '../../styles/ProductCard.module.css'
import { useRouter } from 'next/router';

interface Props{
    product?: DatumProducts[];
    addToCart: (product: any) => void;
}

const ProductPage:NextPage<Props> = ({product = [], addToCart}) => {

  const [quantityState, setQuantityState] = useState<number>(0);
  const {name, description, image, price, quantity, slug} = product[0].attributes;
  const router = useRouter();

  const handleSubmit = (e:FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    if(quantityState < 1){
      alert('Invalid amount');
      return;
    };

    //Build an object with the selected guitar to pass it to localStorage
    const selectedProduct = {
      id: product[0].id,
      image: image.data.attributes.url,
      name,
      price,
      slug,
      quantity: quantityState
    }

    //Send the info to the context
    addToCart(selectedProduct);
    router.push('/cart');
  }
  

  
  return (
    <Layout title={`Guitar ${name}`} >
    <div className={styles.product}>
      <Image src={image.data.attributes.url} alt={`guitar image ${name}`} width={600} height={400} />

      <div className={styles.container}>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>${price}</p>

        <form 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label htmlFor="quantity">Quantity:</label>

          <select 
            id="quantity"
            onChange={ e => setQuantityState(+e.target.value)}
          >
            <option value="0">--Select --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="add to cart" />
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default ProductPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const resp = await fetch(`${process.env.API_URL}/products`);

    const { data } = await resp.json(); // your fetch function here 

    const paths = data.map( (product:DatumProducts) => ({
        params: {
            slug: product.attributes.slug
        }
    }))
    
    return {
        paths,
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {slug} = params as {slug: string};
    
    const resp = await fetch(`${process.env.API_URL}/products?filters[slug]=${slug}&populate=image`) // your fetch function here 
    
    const { data: product }:any = await resp.json();

    return {
        props: {
            product
        }
    }
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//     const {slug} = params as {slug: string};
    
//     const resp = await fetch(`${process.env.API_URL}/products?filters[slug]=${slug}&populate=image`) // your fetch function here 
    
//     const { data: product }:any = await resp.json();

//     return {
//         props: {
//             product
//         }
//     }
// }