import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/newsDetail.module.scss';

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:8000/api/news/${id}/`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(console.error);
  }, [id]);

  if (!news) return <p>Загрузка...</p>;

  return (
    <div className={styles.detailContainer}>
      <a href="/news" className={styles.backLink}>&larr; Назад к новостям</a>
      <h1 className={styles.title}>{news.title}</h1>
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className={styles.image}
        />
      )}
      <small className={styles.date}>{new Date(news.published_at).toLocaleString()}</small>
      <p className={styles.content}>{news.content}</p>
    </div>
  );
}
