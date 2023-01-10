import CartImg from '../public/img/cart.png';
import { StaticImageData } from 'next/image';

export interface ILinkPage {
    id: number,
    title?: string,
    href: string;
    img?: StaticImageData;
}

export const linkPages:ILinkPage[] = [
    {
        id: 1,
        title: 'home',
        href: '/'
    },
    {
        id: 2,
        title: 'about',
        href: '/about'
    },
    {
        id: 3,
        title: 'shop',
        href: '/shop'
    },
    {
        id: 4,
        title: 'blog',
        href: '/blog'
    },
    {
        id: 5,
        img: CartImg,
        href: '/cart'
    }
]