export interface QuestionProps {
  id: number;
  title: string;
  question: string;
  answer: string;
}

export interface BookQuestionsProps {
  id: number;
  title: string;
  isAnswered: boolean;
  questions: QuestionProps[];
}
