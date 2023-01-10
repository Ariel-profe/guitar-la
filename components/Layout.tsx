import { FC, ReactElement } from "react";
import Head from 'next/head';
import { Navbar } from './Navbar';
import { Footer } from "./Footer";


interface Props {
    children: ReactElement | ReactElement[];
    title?: string;
    description?: string;
};

export const Layout:FC<Props> = ({children, title = '', description = ''}) => {
  return (
    <>
    <Head>
        <title>{`GuitarLA - ${title}`}</title>
        <meta name="description" content={description} />
    </Head>
    
    <Navbar />
    {children}
    <Footer />
    </>
    
  )
}