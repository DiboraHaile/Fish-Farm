
import socketIOClient from "socket.io-client";
const socket = socketIOClient.connect("http://127.0.0.1:5000");
export default socket;

