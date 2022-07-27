# creative-coding
Creative coding using JavaScript

### video export

- Install `ffmpeg-installer` module for storing frames as mp4
  ```bash
  npm i -g @ffmpeg-installer/ffmpeg
  ```
- Run following command to start the server for streaming
  ```bash
  canvas-sketch filename.js --output=output_path --stream
  ```
- Once the server is started. Press the following command to start and stop the stream capture:
  - start: `ctrl + shift + s` or `cmd + s`
  - stop: `ctrl + shift + s` or `cmd + s`
