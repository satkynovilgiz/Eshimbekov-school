import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/news.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function News() {
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/news/`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.newsContainer}>
      <h1>Новости</h1>
      {news.length === 0 && <p>Пока нет новостей.</p>}
      <div className={styles.newsGrid}>
        {news.map(item => (
          <div className={styles.newsCard} key={item.id}>
            {item.image && (
              <img
                src={
                  item.image.startsWith('http')
                    ? item.image
                    : `${API_URL.replace('/api', '')}${item.image}`
                }
                alt={item.title}
                className={styles.newsImage}
              />
            )}
            <h2>{item.title}</h2>
            <p>{item.content.slice(0, 100)}...</p>
            <small>{new Date(item.published_at).toLocaleDateString()}</small>
            <button onClick={() => router.push(`/news/${item.id}`)}>Подробнее</button>
          </div>
        ))}
      </div>
    </div>
  );
}
