const express = require("express");
const app = express();
const http = require("http").createServer(app);
const onvif = require("node-onvif");
const fs = require("fs");
// Create an ONVIF device instance
const device = new onvif.OnvifDevice({
 xaddr: "http://117.2.82.149:8252/onvif/device_service",
 user: "admin",
 pass: "Lacduong@123",
});

// Initialize the ONVIF device
device.init().catch((error) => {
 console.error("Error:", error);
});
app.get("/image", (req, res) => {
 device.fetchSnapshot((error, image) => {
  if (error) {
   console.error("Error capturing image:", error);
  } else {
   // Serve the captured image through an Express route
   res.setHeader("Content-Type", "image/jpeg");
   res.send(image.body);
  }
 });
});
http.listen(3000, () => {
 console.log("Express server is running on port 3000.");
});
