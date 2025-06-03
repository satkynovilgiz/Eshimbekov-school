import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/news.module.scss';

export default function News() {
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/news/')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(console.error);
  }, []);
console.log(news);

  return (
    <div className={styles.newsContainer}>
      <h1>Новости</h1>
      {news.length === 0 && <p>Пока нет новостей.</p>}
      <div className={styles.newsGrid}>
     {news.map(item => (
  <div className={styles.newsCard} key={item.id}>

    {item.image && (
      <img
    src={item.image}
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
