import React from 'react';
import Header from './Header';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Trendyol Clone</title>
        <meta name="description" content="Responsive product list page clone with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {children}
      </main>

      {/* İsterseniz buraya bir Footer bileşeni de ekleyebilirsiniz */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;