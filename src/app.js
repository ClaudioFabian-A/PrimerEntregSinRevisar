import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import productManager from "./managers/productManager.js"
import { __dirname } from "./utils.js"
import { Server } from "socket.io";
import handlebars from "express-handlebars"


const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use("/api/Products", productRouter)
app.use("/api/Carts", cartRouter)
app.use("/", viewsRouter)
const httpSocketServer = app.listen(PORT, () => {
    console.log(`Server on PORT : ${PORT}`);
})

const manager = new productManager(__dirname + "/files/Products.json")
const serverSocket = new Server(httpSocketServer);

serverSocket.on("connect", async (socket)=> {
    const products1 = await manager.getProducts({});
    serverSocket.emit("lista", products1);
})
