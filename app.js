import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./routers/users.router.js";
import DocumentRouter from "./routers/documents.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use("/api", [UsersRouter, DocumentRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸습니다.");
});

// import express from "express";

// const app = express();

// app.get('/api',(req,res) => { 
//   return res.status(200).json({message : "asdasd"})
// })
//   app.listen(8000, () => {
//     console.log(`8000`);
//   })
