import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";


const createRoomSchema = z.object({
    name: z.string().min(3, "Inclua no minimo 3 caracteres"),
    description: z.string()
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>



function RoomForm() {
    const { mutateAsync: CreateRoom } = useCreateRoom()


    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    async function handleCreateRoom(room: CreateRoomFormData) {
        await CreateRoom(room)
        createRoomForm.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Salas</CardTitle>
                <CardDescription>
                    Crie uma nova sala e começe um bate papo com I.A
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField 
                            control={createRoomForm.control}
                            name="name"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="mb-2">Nome da Sala</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o nome da sala"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField 
                            control={createRoomForm.control}
                            name="description"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="mb-2">Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Informa detalhes sobre a sala"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button type="submit" className="w-full mt-3" >Criar Sala</Button>     
                    </form>                    
                </Form>
            </CardContent>
        </Card>
    )
}

export default RoomForm;