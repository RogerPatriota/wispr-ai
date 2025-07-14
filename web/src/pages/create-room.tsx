import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = Array<{
    id: string,
    name: string;
    descrption: string;
}>

function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ["get-rooms"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms");
            const result: GetRoomsResponse = await response.json();

            return result
        },
    })

  return (
    <div className="">
        <h1>See all the rooms here</h1>

        {isLoading && <p>Loading...</p>}
        {data && data.map(room => (
            <div key={room.id}>
                <h2>{room.name}</h2>
                <Link to={`/room/${room.id}`}>Acessar salas</Link>
            </div>
        ))}
    </div>
  );
}

export default CreateRoom;