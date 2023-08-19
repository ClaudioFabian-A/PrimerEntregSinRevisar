import { Router } from "express";
import CartsManager from "../managers/cartsManager.js";
import { __dirname } from "../utils.js";
const manager = new CartsManager(__dirname + "/files/Carts.json");
const router = Router();

router.get('/carts', async (req, res) => {
    const carts = await manager.getOllCart();
    carts.length === 0 ? res.status(400).json({ message: `No existen Carts` }) : res.status(200).json(carts)

})
router.get('/carts/:cid', async (req, res) => {
    const cartsId = parseInt(req.params.cid);
    const carts = await manager.getCartById(cartsId);
    carts ? res.status(200).json(carts) : res.status(400).json({ message: `Cart inexistente` })
})
router.post('/carts/', async (req, res) => {
    const cart = await manager.addCart(req.body);
    cart ? res.status(400).json({ message: `Error al crear el Cart`, cart }) : res.status(201).json({ message: `Cart creada con exito` })
})
router.post('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const pId = parseInt(req.params.pid);
        const cId = parseInt(req.params.cid);
        await manager.addPCartWithId(pId, cId);
        res.json({ message: "producto agregado con exito" })
    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(400).json({ message: `error al cargar el cart` })
    }
})
router.delete('/carts/:cid', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await cartManager.getCartsById(id)
    cart ? res.status(200).json({ message: `Cart eliminada con exito` }) : res.status(400).json({ message: `error al eliminarel cart` })
})
router.put('/cart/:cid', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await manager.getCartsById(id);
    cart ? res.status(200).json(cart) : res.status(400).json({ message: `Cart no agregada.` })
})
export default router