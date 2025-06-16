import styles from '@/styles/About.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function About({ blocks }) {
  return (
    <main className={styles.about}>
      <section className={styles.container}>
        <h1>О нашей школе</h1>
        {blocks.length === 0 ? (
          <p>Информация пока недоступна.</p>
        ) : (
          blocks.map((block, index) => (
            <div key={index}>
              <h2>{block.title}</h2>
              <p>{block.content}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}


export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/about/`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      console.error('Ошибка API:', res.status, res.statusText);
      return { props: { blocks: [] } };
    }

    const json = await res.json();

    return {
      props: {
        blocks: json.blocks || [],
      },
    };
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return { props: { blocks: [] } };
  }
}
