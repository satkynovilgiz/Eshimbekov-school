import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from '@/styles/banner.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetch(`${API_URL}/banners/`)
      .then(res => res.json())
      .then(setBanners)
      .catch(console.error);

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings} className={`${styles.carousel} ${theme === 'dark' ? styles.dark : ''}`}>
      {banners.map((banner) => (
        <div key={banner.id} className={styles.slide}>
          <img
            src={banner.image.startsWith('http') ? banner.image : `${API_URL.replace('/api', '')}${banner.image}`}
            alt={banner.title || 'banner image'}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>{banner.title}</h2>
            {banner.subtitle && <p className={styles.subtitle}>{banner.subtitle}</p>}
            {banner.button_url && banner.button_text && (
              <a href={banner.button_url} className={styles.button}>
                {banner.button_text}
              </a>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
}
