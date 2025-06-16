import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/gallery.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Gallery = () => {
  const router = useRouter();
  const isMainPage = router.pathname === "/";
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = isMainPage ? "/gallery/limited/" : "/gallery/";
    fetch(`${API_URL}${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery", err);
        setLoading(false);
      });
  }, [isMainPage]);

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        {!isMainPage && (
          <div className={styles.backLinkWrapper}>
            <Link href="/" className={styles.gallery__backLink}>
              ← На главную
            </Link>
          </div>
        )}

        <h2 className={styles.gallery__title}>Галерея</h2>

        {loading ? (
          <p className={styles.gallery__caption}>Загрузка...</p>
        ) : images.length === 0 ? (
          <p className={styles.gallery__caption}>Пока нет фотографий</p>
        ) : (
          <div className={styles.gallery__grid}>
            {images.map((img) => (
              <div className={styles.gallery__item} key={img.id}>
                <img
                  src={img.image}
                  alt={img.title}
                  className={styles.gallery__image}
                  loading="lazy"
                />
                <p className={styles.gallery__caption}>{img.title}</p>
              </div>
            ))}
          </div>
        )}

        {isMainPage && (
          <div className={styles.linkWrapper}>
            <Link href="/gallery" className={styles.gallery__moreLink}>
              Больше галереи →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
