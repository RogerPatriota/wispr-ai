import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CreateRoom from "./pages/create-room"
import Room from "./pages/room"
import RecordRoom from "./pages/record-room"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/room/:roomId/audio" element={<RecordRoom />} />
        </Routes>    
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
