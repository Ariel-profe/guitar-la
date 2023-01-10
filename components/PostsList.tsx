import { FC } from "react";
import { DatumPosts } from "../interfaces/Posts";
import { PostCard } from './PostCard';

import styles from '../styles/Grid.module.css';

interface Props{
  posts: DatumPosts[];
}

export const PostsList:FC<Props> = ({posts = []}) => {
  
  return (
    <div className={styles.grid}>
      {
        posts?.map( (post:DatumPosts) => (
          <PostCard
            key={post.id} 
            post={post.attributes}
          />
        ))
      }
    </div>
  )
}
