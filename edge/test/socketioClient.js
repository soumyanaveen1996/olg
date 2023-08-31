const io = require("socket.io-client");
let baseURL = 'http://localhost:4001';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlYzE3MjExZDJhZjMxYjAzNmJhNmEiLCJpYXQiOjE2OTM0NzE2ODl9.plje4qHy6zitWmhURlkW3LGSVXCQUIfZ0LM4FuRzXfE';
const USER_ID = '111';

const socket = io.connect(baseURL, {
    path: "/clientConn",
    transports: ["polling", "websocket"],
    transportOptions: {
        polling: { extraHeaders: { token: TOKEN }},
        websocket: { extraHeaders: { token: TOKEN }},
    },
    reconnection: false,
    withCredentials: true,
});

socket.on("connect", () => {
    console.info("SOCKET successfully connected!", );
    socket.emit("getMessages");
    console.log(`time: ${Date.now()}, socket.connect:: socket id: ${socket.id}, socket connected: ${socket.connected}`);
});

socket.on(USER_ID, (data) => {
    if (typeof data.data === "string") {
        console.log(JSON.parse(data.data));
    } else {
        console.log(data.data);
    }
});
