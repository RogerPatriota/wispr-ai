import { useQuery } from "@tanstack/react-query";
import type { GetQuestionResponse } from "./types/question";

function useQuestion(roomId: string) {
    return useQuery({
        queryKey: ['get-questions', roomId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/room/${roomId}/questions`,)

            const result: GetQuestionResponse =  await response.json()
            console.log(result)
            return result
        }
    })
    
}

export default useQuestion