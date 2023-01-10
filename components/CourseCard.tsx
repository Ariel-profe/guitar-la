import { FC } from 'react';
import { CourseResponseData } from '../interfaces/Course';
import styles from '../styles/Course.module.css';

interface Props {
    course: CourseResponseData
}

export const CourseCard:FC<Props> = ({course}) => {

    const {title, description, image } = course.attributes;

  return (
    <section className={`${styles.course} course`}>
        <style jsx>{`
            .course {
                background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${image?.data?.attributes?.url})
            }
        `}</style>
        <div className={`container ${styles.grid}`}>
            <div className={styles.content}>
                <h2 className='heading'>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    </section>
  )
}
