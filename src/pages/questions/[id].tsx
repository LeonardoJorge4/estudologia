import { BookQuestionsProps, QuestionProps } from '@src/@types/bookQuestion';
import { Button } from '@src/components/Button';
import { api } from '@src/services/api';
import styles from '@src/styles/pages/Questions.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Questions() {
  const router = useRouter();
  const [answerValue, setAnswerValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<BookQuestionsProps>(
    {} as BookQuestionsProps
  );
  const [newAnswers, setNewAnswers] = useState<QuestionProps[]>([]);

  useEffect(() => {
    async function loadData() {
      if (router.query.id) {
        const response = await api.get(`/bookQuestions/${router.query.id}`);
        setCurrentQuestion(response.data);
      }
    }

    loadData();
  }, [router]);

  useEffect(() => {
    if (newAnswers.length > selectedIndex && newAnswers[selectedIndex].answer) {
      setAnswerValue(newAnswers[selectedIndex].answer);
    } else {
      setAnswerValue('');
    }
  }, [selectedIndex, newAnswers]);

  async function handleFinalizeForm() {
    if (newAnswers.length < currentQuestion?.questions?.length) {
      alert('Para finalizar, responda todas as perguntas!');
      return;
    }

    try {
      await api.put(`/bookQuestions/${router.query.id}`, {
        ...currentQuestion,
        isAnswered: true,
        questions: newAnswers,
      });

      router.push(`/thanks?book_question_id=${currentQuestion.id}`);
    } catch (error) {
      alert('Erro ao enviar formulário!');
    }
  }

  async function handleSubmitAnswer() {
    const newObject = {
      ...currentQuestion.questions[selectedIndex],
      answer: answerValue,
    };

    if (!newAnswers[selectedIndex]?.answer) {
      setNewAnswers((oldState) => [...oldState, newObject]);
      if (selectedIndex !== currentQuestion.questions.length - 1) {
        setSelectedIndex((prevIndex) => prevIndex + 1);
      }
      setAnswerValue('');
      alert('Resposta criada com sucesso!');
    } else {
      newAnswers[selectedIndex] = newObject;
      alert('Resposta editada com sucesso!');
    }
  }

  function handlePrevQuestion() {
    setSelectedIndex((prevIndex) => prevIndex - 1);
  }

  function handleNextQuestion() {
    setSelectedIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <main className={styles.container}>
      <header>
        <span>{currentQuestion?.questions?.[selectedIndex]?.title}</span>
        <p>{currentQuestion?.questions?.[selectedIndex]?.question}</p>

        <textarea
          cols={30}
          rows={10}
          value={answerValue}
          placeholder="Responda aqui"
          onChange={(event) => setAnswerValue(event.target.value)}
        ></textarea>

        <span>{answerValue.length} Caracteres</span>

        <Button
          title="Enviar resposta"
          disabled={!answerValue}
          onClick={handleSubmitAnswer}
        />
      </header>

      <footer>
        <Button
          title="Pergunta anterior"
          disabled={selectedIndex === 0}
          onClick={handlePrevQuestion}
        />
        {selectedIndex === currentQuestion?.questions?.length - 1 ? (
          <Button
            title="Finalizar"
            onClick={handleFinalizeForm}
          />
        ) : (
          <Button
            title="Próxima pergunta"
            disabled={selectedIndex === currentQuestion?.questions?.length - 1}
            onClick={handleNextQuestion}
          />
        )}
      </footer>
    </main>
  );
}
