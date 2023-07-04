export interface QuestionProps {
  id: number;
  title: string;
  question: string;
  answer: string;
  time?: number;
}

export interface BookQuestionsProps {
  id: number;
  title: string;
  isAnswered: boolean;
  questions: QuestionProps[];
}
