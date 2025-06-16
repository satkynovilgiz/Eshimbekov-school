import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/teacherDetail.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function TeacherDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/teachers/${id}/`)
      .then(res => res.json())
      .then(setTeacher)
      .catch(console.error);
  }, [id]);

  if (!teacher) return <p>Загрузка...</p>;

return (
  <div className={styles.detail}>
    {teacher.photo ? (
      <img
        src={
          teacher.photo.startsWith('http')
            ? teacher.photo
            : `${API_URL.replace('/api', '')}${teacher.photo}`
        }
        alt={teacher.name}
        className={styles.photo}
      />
    ) : (
      <div className={styles.photoPlaceholder}>Фото отсутствует</div>
    )}

    <div className={styles.info}>
      <h1 className={styles.name}>{teacher.name}</h1>
      <p className={styles.subject}>{teacher.subject || 'Предмет не указан'}</p>
      <p className={styles.bio}>
        {teacher.bio?.trim() ? teacher.bio : 'Описание пока отсутствует.'}
      </p>
    </div>
  </div>
);

}
