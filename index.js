const express = require("express");
const cors = require("cors");
const fs = require('fs');
const ytdl = require('ytdl-core');
const app = express();
app.use(cors());

app.get("/test", (req, res) => {
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
})

app.get("/getInfo", async (req, res) => {
  console.log("Getting video from youtube")
  // Get video info
  try {
    video = await ytdl.getInfo('http://www.youtube.com/watch?v=aqz-KE-bpKQ');
    console.log(video)
  } catch (e) {
    console.log(e);
    return null;
  }
  res.json(video)
})


app.listen(3001, () => console.log("Server is listening to port 3001"));