const WebSocket = require("ws");
const node_rtsp_stream = require("node-rtsp-stream");

const wss = new WebSocket.Server({ port: 8080 });
// Configure RTSP Stream
const rtspStream = new node_rtsp_stream({
 name: "streamName",
 streamUrl:
  "rtsp://admin:Lacduong@123@117.2.82.149:5252/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif",
 wsPort: 9999,
 ffmpegOptions: {
  "-vf": "scale=640:480",
 },
});
wss.on("connection", (ws) => {
 // Khi có kết nối WebSocket, gửi dữ liệu video từ luồng RTSP
 rtspStream.on("data", (data) => {
  ws.send(data);
 });
});
