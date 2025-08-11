import '../styles/globals.css'
import Layout from '../components/Layout' 
import { ShopProvider } from '../context/ShopContext' 

function MyApp({ Component, pageProps }) {
  return (
    <ShopProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider> 
  )
}

export default MyApp