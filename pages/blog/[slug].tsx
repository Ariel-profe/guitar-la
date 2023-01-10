
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import { DatumPosts } from '../../interfaces/Posts';
import styles from '../../styles/Blog.module.css'
import { formatDate } from '../../utils/helpers';

interface Props{
    post?: DatumPosts[];
}

const PostPage:NextPage<Props> = ({post = []}) => {

  const {title, description, image, publishedAt} = post[0].attributes;
  
  return (
    <Layout title={`Post ${title}`} >
    <article className={`${styles.post} ${styles['mt-3']}`}>
      <Image src={image.data.attributes.url} alt={`post image ${title}`} width={1000} height={400} />

      <div className={styles.container}>
        <h3>{title}</h3>
        <p className={styles.date}>{formatDate(publishedAt)}</p>
        <p className={styles.text}>{description}</p>
      </div>
    </article>
    </Layout>
  )
}

export default PostPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const resp = await fetch(`${process.env.API_URL}/posts`);

    const { data } = await resp.json(); // your fetch function here 

    const paths = data.map( (post:DatumPosts) => ({
        params: {
            slug: post.attributes.slug
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
    
    const resp = await fetch(`${process.env.API_URL}/posts?filters[slug]=${slug}&populate=image`) // your fetch function here 
    
    const { data: post }:any = await resp.json();

    return {
        props: {
            post
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