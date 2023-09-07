var http = require("http"),
 Cam = require("onvif").Cam;

const hostname = "117.2.82.149",
 port = 8252,
 username = "admin",
 password = "Lacduong@123";

new Cam(
 {
  hostname,
  username,
  password,
  port,
 },
 function (err) {
  this.absoluteMove({ x: 1, y: 1, zoom: 1 });
  this.getStreamUri({ protocol: "RTSP" }, function (err, stream) {
   http
    .createServer(function (req, res) {
     res.writeHead(200, { "Content-Type": "text/html" });
     res.end(
      "<html><body>" +
       '<embed type="application/x-vlc-plugin" target="' +
       stream.uri +
       '"></embed>' +
       "</body></html>"
     );
    })
    .listen(3030);
  });
 }
);
