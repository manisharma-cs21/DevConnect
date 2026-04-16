import { io } from "socket.io-client";

const socket = io("https://devconnect-fqaf.onrender.com"); // backend URL

export default socket;