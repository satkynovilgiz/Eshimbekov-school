import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/teacherDetail.module.scss';

export default function TeacherDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:8000/api/teachers/${id}/`)
      .then(res => res.json())
      .then(setTeacher)
      .catch(console.error);
  }, [id]);

  if (!teacher) return <p>Загрузка...</p>;

  return (
    <div className={styles.detail}>
      {teacher.photo && (
        <img src={teacher.photo} alt={teacher.name} className={styles.photo} />
      )}
      <div className={styles.info}>
        <h1 className={styles.name}>{teacher.name}</h1>
        <p className={styles.subject}>{teacher.subject}</p>
        <p className={styles.bio}>{teacher.bio}</p>
      </div>
    </div>
  );
}
