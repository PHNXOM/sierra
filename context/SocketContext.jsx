import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { AppState } from "react-native";
import { client, socket } from "../config/socket";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const handlers = useRef({});

  const on = useCallback((event, fn) => {
    if (!handlers.current[event]) {
      handlers.current[event] = new Set();
    }

    handlers.current[event].add(fn);

    return () => handlers.current[event].delete(fn);
  }, []);

  useEffect(() => {
    if (!userId) return;

    let subscription;

    // 1. Tell STOMP exactly what to do the moment it connects
    client.onConnect = () => {
      subscription = client.subscribe(`/queue/events/${userId}`, (message) => {
        const { event, data } = JSON.parse(message.body);
        handlers.current[event]?.forEach((fn) => fn(data));
      });
    };

    // 2. Start the engine
    client.activate();

    // 3. Clean up: shut down everything safely when logging out
    return () => {
      subscription?.unsubscribe();
      client.deactivate();
    };
  }, [userId]);

  // handle mobile backgrounding
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && !client.connected) client.activate();
    });
    return () => sub.remove();
  }, []);

  return (
    <SocketContext.Provider value={{ client, socket, on }}>
      {children}
    </SocketContext.Provider>
  );
}
