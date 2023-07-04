import { useCallback, useEffect, useState } from 'react';
import { CardBookQuestions } from '@src/components/CardBookQuestions';
import styles from '@src/styles/pages/Home.module.scss';
import { api } from '@src/services/api';
import { BookQuestionsProps } from '@src/@types/bookQuestion';

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [bookQuestions, setBookQuestions] = useState<BookQuestionsProps[]>([]);

  const bookQuestionsFiltered = bookQuestions.filter((item) =>
    isChecked ? !item.isAnswered : item
  );

  const fetchBookQuestions = useCallback(async () => {
    try {
      const response = await api.get('/bookQuestions');

      setBookQuestions(response.data);
    } catch (error) {
      alert('Erro ao buscar cadernos de questões');
    }
  }, []);

  useEffect(() => {
    fetchBookQuestions();
  }, [fetchBookQuestions]);

  return (
    <main className={styles.container}>
      <div className={styles.containerCheckbox}>
        <input
          type="checkbox"
          id="notAnswered"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="notAnswered">
          Mostrar apenas questões não respondidas
        </label>
      </div>

      <section className={styles.containerCards}>
        {bookQuestionsFiltered.map((item) => (
          <CardBookQuestions
            key={String(item.id)}
            bookQuestion={item}
            amountQuestions={item.questions.length}
          />
        ))}
      </section>
    </main>
  );
}
