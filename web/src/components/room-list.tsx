import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dayjs } from "@/lib/format-date";

type GetRoomsResponse = Array<{
    id: string,
    name: string;
    descrption: string;
    questionsCount: number;
    createdAt: string
}>

function RoomsList() {
    const { data, isLoading } = useQuery({
        queryKey: ["get-rooms"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms");
            const result: GetRoomsResponse = await response.json();

            return result
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>
                    Acesso rapido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading && <p className="text-muted-foreground text-sm">Carregando salas...</p>}
                {data?.map((room) => {
                    return (
                    <Link to={`/room/${room.id}`} key={room.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                        <div className="flex flex-row flex-1 justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-3">
                                    <Badge >{room.questionsCount}</Badge>
                                    <h3 className="font-medium">{room.name}</h3>                                        
                                </div>
                                <span className="text-sm text-zinc-400">
                                    {dayjs(room.createdAt).fromNow()}
                                </span>                                        
                            </div>


                            <div className="flex row items-center gap-2">
                                Entrar
                                <ArrowRight size={16} className="mt-1"/>
                            </div>
                        </div>
                    </Link >
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default RoomsList