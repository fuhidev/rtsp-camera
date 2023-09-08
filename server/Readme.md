```shell
ffmpeg -i "rtsp://admin:Lacduong@123@117.2.82.71:5540/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102" -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -vcodec copy -y "./videos/ipcam/index.m3u8"
```

```shell
ffmpeg -i "rtsp://admin:Lacduong@123@117.2.82.71:5540/Stream/Live/102?transportmode=unicast&profile=ONFProfileToken_102" -c:v copy -c:a aac -f hls -hls_flags delete_segments -hls_time 2 -hls_list_size 5 -hls_segment_filename "./videos/ipcam/segment%03d.ts" "./videos/ipcam/index.m3u8"

```
