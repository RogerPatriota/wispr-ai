

export type GetQuestionResponse = Array<{
    id: string;
    title: string;
    answer: string | null;
    createdAt: string;
    isGeneratingAnswer?: boolean
}>

export type CreateQuestionRequest = {
    title: string;
}

export type CreateQuestionResponse = {
    questionId: string
    answer: string | null
}