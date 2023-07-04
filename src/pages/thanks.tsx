import { BookQuestionsProps, QuestionProps } from '@src/@types/bookQuestion';
import { Button } from '@src/components/Button';
import { api } from '@src/services/api';
import styles from '@src/styles/pages/Thanks.module.scss';
import { formatTime } from '@src/utils/formatTime';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Props {
  answeredQuestions: QuestionProps[];
}

export default function Thanks({ answeredQuestions }: Props) {
  const router = useRouter();
  const totalTime = answeredQuestions.reduce(
    (acc, item) => acc + Number(item.time),
    0
  );

  function handleNavigateToHome() {
    router.push('/');
  }

  return (
    <main className={styles.container}>
      <h1>Obrigado por enviar!</h1>
      <span>Duração total da prova: {formatTime(totalTime)}</span>

      <div>
        <Button
          title="Voltar ao início"
          onClick={handleNavigateToHome}
        />
      </div>

      {answeredQuestions.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <span>Resposta:</span>
          <p>{item.answer}</p>
          <time>Tempo de resposta: {formatTime(Number(item.time))}</time>
        </div>
      ))}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.book_question_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const bookQuestionId = String(query.book_question_id);

  const session: BookQuestionsProps = await api
    .get(`/bookQuestions/${bookQuestionId}`)
    .then((response) => response.data);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      answeredQuestions: session.questions,
    },
  };
};
