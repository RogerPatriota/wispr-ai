import { useMutation } from "@tanstack/react-query";

export function useCreateQuestion() {
    return useMutation({
        mutationFn: async (roomId: string) => {
            const response = await fetch('')

            const result = response.json()
        }
    })
}