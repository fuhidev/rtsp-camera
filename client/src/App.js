import React from "react";
import ReactPlayer from "react-player";
import "./App.css";

function App() {
 return (
  <div className="App">
   <h1>IP Camera Streaming</h1>
   URL : http://localhost:4000/index.m3u8
   <ReactPlayer
    url="http://localhost:4000/hls/camera1/index.m3u8"
    playing={true}
   />
  </div>
 );
}

export default App;
