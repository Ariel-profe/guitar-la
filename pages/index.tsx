
import { GetStaticProps, NextPage } from 'next';
import { Layout } from "../components/Layout";
import { DatumProducts, ProductResponse } from '../interfaces/Products';
import { DatumPosts, PostResponse } from '../interfaces/Posts';
import { GuitarList } from '../components/GuitarList';
import { PostsList } from '../components/PostsList';
import { CourseResponse } from '../interfaces/Course';
import { CourseCard } from '../components/CourseCard';

interface Props {
  products: any;
  posts: any;
  course: any;
}

const Home:NextPage<Props> = ({products, posts, course}) => {
  

  return (
    <Layout title={"Inicio"} description={"Blog de musica, venta de guitarras y mas"}>
      <main className="container">
        <h1 className='heading'>Our Collection</h1>
        <GuitarList products={products} />
      </main>

      <CourseCard course={course} />

      <section className='container'>
        <h2 className="heading">Blog</h2>
        <PostsList posts={posts}  />
      </section>
      
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export default Home

export const getStaticProps: GetStaticProps = async (ctx) => {

  const productsUrl = `${process.env.API_URL}/products?populate=image`;
  const postsUrl = `${process.env.API_URL}/posts?populate=image`;
  const courseUrl = `${process.env.API_URL}/course?populate=image`;

  const [resproducts, resPosts, respCourse] = await Promise.all([
    fetch(productsUrl),
    fetch(postsUrl),
    fetch(courseUrl)
  ])

  const [{data: products}, {data: posts}, {data: course}] = await  Promise.all<[Promise<ProductResponse>, Promise<PostResponse>, Promise<CourseResponse>]>([
    resproducts.json(),
    resPosts.json(),
    respCourse.json()
  ])// your fetch function here 
  

  return {
    props: {
      products,
      posts,
      course
    }
  }
}
