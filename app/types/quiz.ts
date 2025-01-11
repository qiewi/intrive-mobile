export interface Video {
    id: string;
    title: string;
    url: string;
  }
  
  export interface Module {
    id: string;
    type: 'integral' | 'derivative';
    title: string;
    level: number;
    status: 'complete' | 'incomplete';
    topic: string;
    videos: Video[];
    userScore: number;
  }
  
  export interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
  }
  
  export interface Quiz {
    id: string;
    questions: Question[];
  }
  
  