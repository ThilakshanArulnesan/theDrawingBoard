import { useState, useEffect } from "react";
import io from 'socket.io-client';

export const useSocket = (server = "localhost:8080") => {
  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);

  useEffect(() => {
    const s = io(server);

    setSocket(s);
    setSocketOpen(true);

    s.emit('loginAttempt', {email: 'ta@mail.com', password: 'p'});

    return () => {
      s.close();
    }
  }, [server]);

  return {
    socket,
    socketOpen
  };
};
