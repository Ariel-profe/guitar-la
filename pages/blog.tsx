
import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/Layout";
import { PostsList } from "../components/PostsList";
import { DatumPosts } from '../interfaces/Posts';

interface Props {
  posts: DatumPosts[]
}

const BlogPage:NextPage<Props> = ({posts}) => {



  return (
    <Layout title="Blog" description="Music blog, guitar info, tips">
        <main className="container">
          <h1 className="heading">Blog</h1>
         <PostsList
          posts={posts}
         />
        </main>
    </Layout>

  )
}

export default BlogPage


export const getStaticProps:GetStaticProps = async(params:any) => {
  const resp = await fetch(`${process.env.API_URL}/posts?populate=image`)
  const {data: posts} = await resp.json();

  return {
    props: {
      posts
    }
  }
}