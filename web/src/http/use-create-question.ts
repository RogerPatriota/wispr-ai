import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateQuestionRequest, CreateQuestionResponse, GetQuestionResponse } from "./types/question";

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`http://localhost:3333/room/${roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result: CreateQuestionResponse = await response.json()

            return result
        },

        onMutate({ title }) {
            const previousQuestions = queryClient.getQueryData<GetQuestionResponse>([
                'get-questions', 
                roomId
            ])

            const questions = previousQuestions ?? []

            const newQuestion = {
                id: crypto.randomUUID(),
                title,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true
            }

            const updatedData: GetQuestionResponse = [
                newQuestion, ...questions
            ]

            queryClient.setQueryData<GetQuestionResponse>(['get-questions', roomId], updatedData)

            return { newQuestion, previousQuestions}
        },

        onSuccess(data, _variables, context) {
            queryClient.setQueryData<GetQuestionResponse>(['get-questions', roomId], 
                questions => {
                    if (!questions || !context.newQuestion)  {
                        return questions
                    }
                    return questions.map(question => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...context.newQuestion, 
                                id: data.questionId, 
                                answer: data.answer,
                                isGeneratingAnswer: false
                            }
                        }

                        return question
                    })
                }
            )
        },

        onError(_error, _newQuestion, context) {
            if (context?.previousQuestions) {
                queryClient.setQueryData<GetQuestionResponse>(['get-questions', roomId], context.previousQuestions)
            }
        }
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['get-questions', roomId]})
        // }
    })
}