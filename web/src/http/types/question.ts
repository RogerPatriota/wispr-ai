export type Question = {
    id: string;
    title: string;
    answer: string;
    createdAt: string;  
}

export type GetQuestionResponse = {
    questions: Question[];
}

export type CreateQuestionRequest = {
    title: string;
}

export type CreateQuestionResponse = {
    questionId: string
}