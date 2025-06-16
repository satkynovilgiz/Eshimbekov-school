import MainLayout from '@/components/MainLayout/MainLayout';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FloatingContactButton from '@/components/FloatingContactButton/FloatingContactButton.jsx';


export default function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
<FloatingContactButton/>
    </MainLayout>
  );
}
