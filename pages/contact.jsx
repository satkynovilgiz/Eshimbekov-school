import React, { useState } from 'react';
import styles from '@/styles/Contact.module.scss';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${API_URL}/contact/send/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse({ type: 'success', message: data.success });
        setForm({ name: '', email: '', message: '' });
      } else {
        setResponse({ type: 'error', message: data.error });
      }
    } catch (error) {
      setResponse({ type: 'error', message: 'Ошибка при отправке' });
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h1>Связаться с нами</h1>
        <p className={styles.subtitle}>Заполните форму ниже — мы ответим вам в ближайшее время</p>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ваш email"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Сообщение"
              rows={5}
              required
            />
            <button type="submit">Отправить</button>
            {response && (
              <p style={{ color: response.type === 'success' ? 'green' : 'red' }}>
                {response.message}
              </p>
            )}
          </form>

          <div className={styles.info}>
            <h3>Контакты</h3>
            <p>Адрес: г. Бишкек, ул. Образования 123</p>
            <p>Телефон: +996 700 123 456</p>
            <p>Email: info@eshimbekov.edu.kg</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
