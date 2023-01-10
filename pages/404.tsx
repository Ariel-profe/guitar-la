import Link from 'next/link';
import { Layout } from '../components/Layout';

const ErrorPage = () => {
  return (
    <Layout title='Page not found'>
    <p className='error'>Page not found</p>
    <Link href={'/'} className='error-link'>
        home
    </Link>
</Layout>
  )
}

export default ErrorPage