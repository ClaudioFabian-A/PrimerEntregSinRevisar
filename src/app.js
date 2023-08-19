import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/Products", productRouter)
app.use("/api/Carts", cartRouter)
app.use("/", viewRouter)


app.listen(PORT, () => {
    console.log(`Server on PORT : ${PORT}`);
})
