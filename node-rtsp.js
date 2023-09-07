Stream = require("node-rtsp-stream");
stream = new Stream({
 name: "name",
 streamUrl: "rtsp://admin:Lacduong@123@117.2.82.71:5540/Stream/Live/101",
 wsPort: 9999,
 ffmpegOptions: {
  // options ffmpeg flags
  "-stats": "", // an option with no neccessary value uses a blank string
  "-r": 30, // options with required values specify the value after the key
 },
});
