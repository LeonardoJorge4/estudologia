import { QuestionProps } from '@src/@types/bookQuestion';
import { BookQuestionsProps } from '@src/contexts/BookQuestions.context';
import { api } from '@src/services/api';
import styles from '@src/styles/pages/Thanks.module.scss';
import { GetServerSideProps } from 'next';

interface Props {
  answeredQuestions: QuestionProps[];
}

export default function Thanks({ answeredQuestions }: Props) {
  return (
    <main className={styles.container}>
      <h1>Obrigado por enviar!</h1>

      {answeredQuestions.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <span>Resposta:</span>
          <p>{item.answer}</p>
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
