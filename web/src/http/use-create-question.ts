import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateQuestionRequest, CreateQuestionResponse } from "./types/question";

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`http://localhost/3333/room/${roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result: CreateQuestionResponse = await response.json()

            return result
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-questions', roomId]})
        }
    })
}