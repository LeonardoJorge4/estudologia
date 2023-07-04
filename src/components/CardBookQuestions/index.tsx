import { useRouter } from 'next/router';
import { Button } from '../Button';
import styles from './styles.module.scss';

interface BookQuestionProps {
  id: number;
  title: string;
  isAnswered: boolean;
}

interface Props {
  bookQuestion: BookQuestionProps;
  amountQuestions: number;
}

export function CardBookQuestions({ bookQuestion, amountQuestions }: Props) {
  const router = useRouter();
  const { id, title, isAnswered } = bookQuestion;

  function handleNavigateToQuestions() {
    router.push(`/questions/${id}`);
  }

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <span>{`${amountQuestions} questões`}</span>
      <span className={styles.isAnswered}>
        {isAnswered ? 'Respondido' : 'Não respondido'}
      </span>

      <Button
        title="Responder"
        disabled={isAnswered}
        onClick={handleNavigateToQuestions}
      />
    </div>
  );
}
