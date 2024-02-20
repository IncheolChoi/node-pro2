import express from "express";
import router from './routes/index.js';
import cookieParser from "cookie-parser";
import UsersRouter from "./routes/users.router.js";
import DocumentRouter from "./routes/documents.router.js";
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';


const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use("/api", [router, UsersRouter, DocumentRouter]);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트가 열렸습니다.")
});

// import express from "express";

// const app = express();

// app.get('/api',(req,res) => { 
//   return res.status(200).json({message : "asdasd"})
// })
//   app.listen(8000, () => {
//     console.log(`8000`);
//   })
