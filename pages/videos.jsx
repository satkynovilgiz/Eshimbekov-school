import { useEffect, useState } from "react";
import styles from "@/styles/Videos.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const endpoint = "/videos/";  // полный путь к API (добавил /api/)

    fetch(`${API_URL}${endpoint}`)
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Ошибка загрузки видео:", err));
  }, []);

  function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  return (
    <div className={styles.container}>
      <h1>Видео</h1>
      <div className={styles.videoGrid}>
        {videos.map((video) => {
          const videoId = getYouTubeId(video.youtube_url);
          return (
            <div key={video.id} className={styles.videoCard}>
              <h3>{video.title}</h3>
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                  title={video.title}
                  loading="lazy"
                />
              ) : (
                <p>Неверная ссылка на видео</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
