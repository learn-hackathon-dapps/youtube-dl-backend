// import { Web3Storage, getFilesFromPath } from 'web3.storage';
const Web3Storage = require('web3.storage');
const dotenv = require("dotenv");
dotenv.config();
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


const token = process.env.TOKEN;

app.get("/test", async (req, res) => {
  console.log(__dirname);
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
  console.log(__dirname);
  console.log(req.body);
  const json = req.body;
  const youtubeUrl = json.url;
  const videoId = youtubeUrl.split('v=')[1];
  const filename = "./videos/"  + videoId + ".mp4";
  var cid;
  // Get video info
  try {
      ytdl(youtubeUrl)
      .pipe(fs.createWriteStream(filename))
      .on('close', async () => {
        const storage = new Web3Storage.Web3Storage({ token });
        const files = await Web3Storage.getFilesFromPath('./videos');
        cid = await storage.put(files);
        console.log('cid: ' + cid);
        res
        .status(200)
        .json({
          message: "Download from youtube was a success",
          cid: cid,
          status: 200
        });
      });
  } catch (e) {
    console.log(e);
    return null;
  }
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