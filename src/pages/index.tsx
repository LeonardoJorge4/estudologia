import { useEffect, useState } from 'react';
import { CardBookQuestions } from '@src/components/CardBookQuestions';
import styles from '@src/styles/pages/Home.module.scss';
import { useBookQuestions } from '@src/contexts/BookQuestions.context';

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const { bookQuestions, fetchBookQuestions } = useBookQuestions();

  const bookQuestionsFiltered = bookQuestions.filter((item) =>
    isChecked ? !item.isAnswered : item
  );

  useEffect(() => {
    fetchBookQuestions();
  }, []);

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
