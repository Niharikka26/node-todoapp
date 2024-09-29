import {app} from "./app.js";
import {connectDB} from "./data/database.js";


connectDB();
const port = process.env.PORT || 4000;

app.listen(port,()=>{
  console.log(`Server is working on port : ${port} in  ${process.env.NODE_ENV} mode`);
});