const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");

const app = express();
const port = 4000; // Chọn cổng mà bạn muốn sử dụng

// Mảng cameras
const cameras = [
 {
  id: "camera1",
  rtsp:
   "rtsp://admin:Lacduong@123@117.2.151.67:554/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102",
 },
 {
  id: "camera2",
  rtsp:
   "rtsp://admin:Lacduong@123@117.2.151.153:554/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102",
 },
 {
  id: "camera3",
  rtsp:
   "rtsp://admin:Lacduong@123@117.2.82.71:5540/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102",
 },
 {
  id: "camera4",
  rtsp:
   "rtsp://admin:Lacduong@123@117.2.169.22:554/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102",
 },
];

// Định nghĩa endpoint để phục vụ tệp cameraId.m3u8
app.get("/hls/:cameraId/:file", async (req, res) => {
 try {
  res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
  const { cameraId, file } = req.params;
  const headers = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
   "Access-Control-Max-Age": 2592000, // 30 days
   /** add other headers as per requirement */
  };
  if (req.method === "OPTIONS") {
   res.writeHead(204, headers);
   res.end();
   return;
  }
  //  const cameraId = "camera1";
  const camera = cameras.find((cam) => cam.id === cameraId);

  if (!camera) {
   res.status(404).send("Camera not found");
   return;
  }

  // Xây dựng đường dẫn đến thư mục chứa tệp M3U8 cho cameraId
  const m3u8FolderPath = path.join(__dirname, "videos", "ipcam", cameraId);
  // Xây dựng đường dẫn đến tệp cameraId.m3u8
  const m3u8FilePath = path.join(m3u8FolderPath, file);

  if (file === "index.m3u8") {
   // Kiểm tra xem thư mục đã tồn tại hay chưa
   if (!fs.existsSync(m3u8FolderPath)) {
    // Nếu thư mục không tồn tại, hãy tạo nó
    fs.mkdirSync(m3u8FolderPath, { recursive: true });
   }

   // Kiểm tra xem tệp đã tồn tại hay chưa
   if (!fs.existsSync(m3u8FilePath) || !camera.running) {
    const options = [
     "-flags -global_header",
     "-c:v",
     "copy -y",
     "-f hls",
     "-hls_flags delete_segments ",
     "-hls_time 5",
     "-hls_list_size 3",
    ];
    const opts = options.join(" ");
    // Nếu tệp không tồn tại, thực hiện lệnh ffmpeg để tạo nó
    const ffmpegCommand = `
      ffmpeg -i "${camera.rtsp}" \
      ${opts} \
      -hls_segment_filename "./videos/ipcam/${cameraId}/segment%03d.ts" "./videos/ipcam/${cameraId}/index.m3u8"
    `;
    // try {
    exec(ffmpegCommand);
    // } catch (error) {
    //  console.error("Error executing ffmpeg command:", error);
    //  res.status(400).send("Error executing ffmpeg command");
    //  return;
    // }

    camera.running = true;
    await delay();
   }
  }
  // Nếu tệp đã tồn tại, đọc nó và gửi trong response
  const m3u8Content = fs.readFileSync(m3u8FilePath);
  res.end(m3u8Content, "utf8");
 } catch (readError) {
  console.error("Error reading M3U8 file:", readError);
  res.status(400).send("Internal Server Error");
 }
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

function delay() {
 return new Promise((resolve) => {
  setTimeout(() => {
   resolve();
  }, 5000);
 });
}
