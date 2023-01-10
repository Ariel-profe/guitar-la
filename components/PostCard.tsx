import { FC } from "react"
import Image from "next/image";
import Link from "next/link";
import { DatumAttributes } from '../interfaces/Posts';

import styles from '../styles/Blog.module.css'
import { formatDate } from '../utils/helpers';

interface Props{
    post: DatumAttributes
}

export const PostCard:FC<Props> = ({post}) => {

  const {description, image, title, slug, publishedAt} = post;

  return (
    <article className={styles.post}>
      <Image src={image.data.attributes.formats.medium.url} alt={`post image ${title}`} width={600} height={400} />

      <div className={styles.container}>
        <h3>{title}</h3>
        <p className={styles.date}>{formatDate(publishedAt)}</p>
        <p className={styles.resume}>{description}</p>
        <Link href={`/blog/${slug}`} className={styles.link}>
          see more
        </Link>
      </div>
    </article>
  )
}
