import express, { urlencoded } from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import { title } from "process";

const app = express();
const port = 3000;



let __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.set("view engine", "ejs");

let x = [
  {
    title: "basam",
    yourStory: "im bassam faris",
  },
  {
    title: "bass",
    yourStory:
      "This is a simple Bootstrap jumbotron that sits within a, recreated with built-in utility classes.",
  },
];

// console.log(x.filter(item=>item.title !=""))

function deleteBlog(req,res,next){
    x.filter(item=>item.title !=title)
    console.log(x.filter(item=>item.title !=title))
    res.redirect("/")
   // next()
}


function writeBlog(req, res, next) {
  let { title, yourStory } = req.body;
  x.push({ title, yourStory });
  console.log(title);
  console.log(yourStory);
  res.redirect("/");
  //  next()
}
 
function  date() {  
let datee = new Date().toDateString();


let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();

let fullTime=hours+":"+minutes+":"+seconds
return {fullTime:fullTime ,datee:datee}

}

let dateTime=date()



app.get("/", (req, res) => {
  res.render(path.join(__dirname, "home"), { date: dateTime.datee, x: x ,fullTime:dateTime.fullTime});
});

app.get("/write", (req, res) => {
  res.render(path.join(__dirname, "writeBlog"));
});

app.post("/submit", writeBlog, (req, res) => {});

app.delete("/delete", deleteBlog, (req, res) => {
  console.log("deleted")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
