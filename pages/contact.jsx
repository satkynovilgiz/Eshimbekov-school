import styles from '@/styles/Contact.module.scss';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <h1>Свяжитесь с нами</h1>
        <p className={styles.subtitle}>
          У вас есть вопросы? Мы с радостью ответим!
        </p>

        <div className={styles.content}>
          <form className={styles.form}>
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Ваш email" required />
            <textarea placeholder="Ваше сообщение" rows="5" required></textarea>
            <button type="submit">Отправить</button>
          </form>

          <div className={styles.info}>
            <h3>Контактная информация</h3>
            <p>📍 Бишкек, Кыргызстан</p>
            <p>📞 +996 700 123 456</p>
            <p>✉️ info@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
