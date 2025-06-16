'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/banner.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Banner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${API_URL}/banners/`);
        const data = await res.json();
        setBanner(data[0]);
      } catch (error) {
        console.error('Ошибка при загрузке баннера:', error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.left}>
          <h1>{banner.title}</h1>
          <p>{banner.subtitle}</p>
          {banner.button_url && banner.button_text && (
            <Link href={banner.button_url} className={styles.button}>
              {banner.button_text}
            </Link>
          )}
        </div>

        <div className={styles.right}>
          <img src={banner.image} alt="Баннер" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
