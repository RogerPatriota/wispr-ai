import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported = 
    !!navigator.mediaDevices 
    && typeof navigator.mediaDevices.getUserMedia === "function"
    && typeof window.MediaRecorder === "function"

type RoomParams = {
    roomId: string
}

function RecordRoom() {
    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)

    const params = useParams<RoomParams>()

    if (!params.roomId) {
        return <Navigate replace to="/" />
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData()

        formData.append('file', audio, 'audio.webm')
        
        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: 'POST',
            body: formData
        })

        const result = await response.json()

        return result
    }

    function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert('O seu navegador nao suporta gravação de audio')
            return
        }
        setIsRecording(true)

        try {
            const audio   = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44_100
                }
            })

            recorder.current = new MediaRecorder(audio, {
                mimeType: "audio/webm",
                audioBitsPerSecond: 64_000
            })

            recorder.current.ondataavailable = event => {
                if (event.data.size > 0) {
                    uploadAudio(event.data)
                }
            }

            recorder.current.onstart = () => {
                console.log('gravação iniciada')
            }
            recorder.current.onstop = () => {
                console.log('gravação finalizada')
            }

            recorder.current.start()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="h-screen flex flex-col gap-3 items-center justify-center">
            {isRecording ? (
                <Button onClick={stopRecording}>Parar Gravação</Button>
            ) : (
                <Button onClick={startRecording}>Gravar Audio</Button>
            )}
            {isRecording && <p>Gravando....</p>}
        </div>
    )
}

export default RecordRoom;