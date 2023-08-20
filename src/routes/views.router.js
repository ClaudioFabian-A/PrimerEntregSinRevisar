import { Router } from "express";
import productManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";



const manager = new productManager(__dirname + "/files/Products.json");
const router = Router()


router.get('/', async (req, res) => {

    const products = await manager.getProducts();

    res.render("home", { products });



});

router.get('/realTimeProducts', async (req, res) => {
    const products = await manager.getProducts();
    res.render("realTImeProducts", { products });
})