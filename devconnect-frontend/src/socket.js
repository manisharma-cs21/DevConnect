import { io } from "socket.io-client";

const socket = io(" https://devconnect-fqaf.onrender.com", {
  transports: ["websocket"],
}); // backend URL

export default socket;

// https://devconnect-fqaf.onrender.com
//http://localhost:5000/api