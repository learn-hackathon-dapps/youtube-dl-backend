const express = require("express");
const cors = require("cors");
const fs = require('fs');
const ytdl = require('ytdl-core');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/test", (req, res) => {
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
})

app.post("/downloadVideoFromYoutube", async (req, res) => {
  console.log("Getting video from youtube");
  console.log(req.body);
  const json = req.body;
  const youtubeUrl = json.url;
  const videoId = youtubeUrl.split('v=')[1];
  const filename = videoId + ".mp4";
  // Get video info
  try {
    video = await ytdl(youtubeUrl)
                    .pipe(fs.createWriteStream(filename));
    console.log(video)
  } catch (e) {
    console.log(e);
    return null;
  }
  res
  .status(200)
  .json({
    message: "Download from youtube was a success",
    status: 200
  });
})

app.post("/getYoutubeVideoInfo", async (req, res) =>{
  console.log(req.body);
  const json = req.body;
  const youtubeUrl = json.url;
  console.log(youtubeUrl);

  // Get video info
  try {
    video = await ytdl.getInfo(youtubeUrl);
    console.log(video)
  } catch (e) {
    console.log(e);
    return null;
  }

  res
    .status(200)
    .json({
      message: "Successfully get youtube video info",
      videoInfo: video,
      status: 200
    });
});


app.listen(3001, () => console.log("Server is listening to port 3001"));