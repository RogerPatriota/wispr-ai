import RoomForm from "@/components/room-form";
import RoomList from "@/components/room-list";



function CreateRoom() {

  return (
    <div className="min-h-screen py-8 px-4">
        <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 items-start gap-8">
                <RoomForm />
                <RoomList />
            </div>
        </div>
    </div>
  );
}

export default CreateRoom;