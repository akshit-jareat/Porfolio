# Hero Video

Place your video file here as `hero.mp4`.

**Recommended specs:**
- Resolution: 1920x1080 or 1280x720
- Duration: 10–30 seconds (looping)
- Format: MP4 (H.264)
- File size: < 15MB (compress with HandBrake or ffmpeg)
- Content: Abstract tech, code, workspace, or motion background

**Compress with ffmpeg:**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M -vf scale=1280:-1 hero.mp4
```

The video is muted, autoplays, and loops. A dark overlay (85% opacity) sits on top,
so even bright footage will look dark and cinematic.
