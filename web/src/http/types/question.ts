export type Question = {
    id: string;
    title: string;
    answer: string;
    createdAt: string;  
}

export type GetQuestionResponse = {
    questions: Question[];
}

