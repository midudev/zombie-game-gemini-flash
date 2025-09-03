import { Message, MessageContent } from "@/components/message";
import { Loader } from '@/components/loader';


export function GameLoader() {
  return (
    <Message from="assistant">
      <MessageContent>
        <div className="flex items-center gap-2">
          <Loader />
          Cargando historia...
        </div>
      </MessageContent>
    </Message>
  )
}