import { useParams, Navigate } from "react-router-dom";

type RoomParams = {
    roomId: string;
}

function Room() {
    const params = useParams<RoomParams>();

    if (!params.roomId) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div>
            <h1>Rooms page</h1>
            <p>{JSON.stringify(params.roomId)}</p>
        </div>
    )
}

export default Room;