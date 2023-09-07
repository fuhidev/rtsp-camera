import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const CameraViewer = () => {
 const [videoUrl, setVideoUrl] = useState("");

 useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000"); // Thay đổi địa chỉ WebSocket nếu cần

  ws.onmessage = (event) => {
   // Nhận dữ liệu video từ WebSocket và hiển thị nó
   setVideoUrl(URL.createObjectURL(event.data));
  };

  return () => {
   ws.close();
  };
 }, []);

 return (
  <div>
   <ReactPlayer url={videoUrl} controls={true} width="100%" height="auto" />
  </div>
 );
};

export default CameraViewer;
