import io from "socket.io-client";
console.log(process.env.WS_URL);
const socket = io(process.env.WS_URL);

// const socket = io(host + ":" + port);
// const socket = io();

export default socket;
