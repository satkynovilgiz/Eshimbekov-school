import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/teachers.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/teachers/`)
      .then(res => res.json())
      .then(setTeachers)
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Преподаватели</h1>
      <div className={styles.grid}>
        {teachers.map(teacher => (
          <div
            className={styles.card}
            key={teacher.id}
            onClick={() => router.push(`/teachers/${teacher.id}`)}
          >
            {teacher.photo ? (
              <img
                src={
                  teacher.photo.startsWith('http')
                    ? teacher.photo
                    : `${API_URL.replace('/api', '')}${teacher.photo}`
                }
                alt={teacher.name}
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>Фото отсутствует</div>
            )}
            <h2>{teacher.name}</h2>
            {teacher.subject && <p>{teacher.subject}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
