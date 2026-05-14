import { io } from "socket.io-client";

 //const socket = io("http://localhost:5000");

const socket = io("https://devconnect-fqaf.onrender.com", {
  transports: ["websocket"],
});// backend URL

export default socket;