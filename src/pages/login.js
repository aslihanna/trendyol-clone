import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'; 

// İkonlar
const GoogleIcon = () => ( <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.022,36.219,44,30.551,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>);
const FacebookIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#1877F2" d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.879V14.89h-2.54v-2.78h2.54v-2.074c0-2.508,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.243,0-1.63,0.771-1.63,1.562v1.875h2.773l-0.443,2.78h-2.33v7.008C18.343,21.128,22,16.99,22,12z"></path></svg>);

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => { e.preventDefault(); alert('Form gönderildi!'); };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image src="/trendyol-logo.svg" alt="Trendyol Logo" width={180} height={50} />
            </Link>
          </div>
          
          <div className="flex border-b mb-6">
            <button onClick={() => setIsLoginView(true)} className={`flex-1 py-2 text-center font-medium ${isLoginView ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Giriş Yap</button>
            <button onClick={() => setIsLoginView(false)} className={`flex-1 py-2 text-center font-medium ${!isLoginView ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Kayıt Ol</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" id="password" name="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500" />
            </div>

            {isLoginView && (
              <div className="text-right mb-4">
                <a href="#" className="text-sm text-orange-500 hover:underline">Şifremi Unuttum</a>
              </div>
            )}
            
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-md hover:bg-orange-600 transition-colors">
              {isLoginView ? 'GİRİŞ YAP' : 'KAYIT OL'}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-6 border-t">
          <p className="text-center text-sm text-gray-600 mb-4">veya sosyal medya ile {isLoginView ? 'giriş yap' : 'kayıt ol'}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100"><GoogleIcon /> Google</button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100"><FacebookIcon /> Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;