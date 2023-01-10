
import { NextPage, GetServerSideProps } from "next";
import { GuitarList } from "../components/GuitarList"
import { Layout } from "../components/Layout"
import { DatumProducts } from '../interfaces/Products';

interface Props{
  products : DatumProducts[]
}

const ShopPage:NextPage<Props> = ({products}) => {
  
  return (
    <Layout title="Shop" description="Virtual shop, guitars, instruments for sale">
        
        <main className="container">
          <h1 className="heading">our collection</h1>
          <GuitarList 
            products={products}
          />
        </main>
    </Layout>

  )
}

export default ShopPage;

// export const getStaticProps:GetStaticProps = async(params:any) => {
//   const resp = await fetch(`${process.env.API_URL}/products?populate=image`)
//   const {data: products} = await resp.json();

//   return {
//     props: {
//       products
//     }
//   }
// }

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const resp = await fetch(`${process.env.API_URL}/products?populate=image`)
    const {data: products} = await resp.json();

  return {
    props: {
      products
    }
  }
}