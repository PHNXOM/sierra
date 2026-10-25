import { ChatProvider } from "../context/ChatContext";
import { SocketProvider } from "../context/SocketContext";
import MainStack from "./MainStack";

export default function AuthenticatedLayout() {
  return (
    <SocketProvider>
      <ChatProvider>
        <MainStack />
      </ChatProvider>
    </SocketProvider>
  );
}
