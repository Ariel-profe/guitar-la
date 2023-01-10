import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { DatumAttributes, DatumProducts } from '../interfaces/Products';

export default function App({ Component, pageProps }: AppProps) {

  const cartLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') ?? [] : [];

  const [cart, setCart] = useState<DatumAttributes[]>(cartLS);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    setPageReady(true);
  }, [])
  

  useEffect(() => {
    
    localStorage.setItem('cart', JSON.stringify(cart));
  
  }, [cart])
  

  
  const addToCart = (product:DatumAttributes) => {
    // Check if the guitar is already in the cart
    if(cart.some( (productState:DatumAttributes) =>  productState.slug === product.slug )) {
        // Iterar para actualizar la cantidad
        const cartUpdated = cart.map( (productState:DatumAttributes) => {
            if( productState.slug === product.slug ) {
              productState.quantity = product.quantity;
            } 
            return productState;
        });
        // Se asigna al array
        setCart([...cartUpdated]);
        localStorage.setItem('cart', JSON.stringify( cart ));
    } else {
        // En caso de que el articulo no exista, es nuevo y se agrega
        setCart([...cart, product]);
        localStorage.setItem('cart', JSON.stringify( cart ));
    }
  }
  
  const updateQuantity = (product:DatumAttributes) => {
    const updatedCart = cart.map( (productState:DatumAttributes) => {
      if(productState.slug === product.slug ) {
        productState.quantity =  product.quantity 
      } 
      return productState
    })
    setCart(updatedCart)
    window.localStorage.setItem('cart', JSON.stringify( cart ));
  }

  const deleteProduct = (slug:string) => {
      const updatedCart = cart.filter( (product:DatumAttributes) => product.slug != slug)
      setCart(updatedCart)
      window.localStorage.setItem('cart', JSON.stringify( cart ));
  }

  return pageReady ? <Component 
            {...pageProps}
            cart={cart} 
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            deleteProduct={deleteProduct}
          /> : null
}
