import { Router } from "express"
import productManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
const manager = new productManager(__dirname + '/files/Products.json')
const router = Router()


router.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    const part = products.slice(0, limit);
    limit ? res.status(200).json(part) : res.status(200).json(products)



});
router.get('/products/:id', async (req, res) => {
    const prodID = parseInt(req.params.id)
    const product = await manager.getProductById(prodID)
    product ? res.status(200).json(product) : res.status(400).json({ message: "Product not found" })

});
router.put('/products/:pid', async (req, res) => {

    const product = await manager.updateProduct(req.params, req.body);
    product ? res.status(200).json(product) : res.status(400).json({ messege: "Prducto no agregado" })



});
router.delete('/products/:pid', async (req, res) => {
    
    const product = await manager.deleteById(req.params);
    product ? res.status(400).json({ message: `error al eliminar el producto` }): res.status(200).json({ message: `Producto eliminado con exito` }) 
});
router.post('/products/:pid', async (req, res) => {
    const product = await manager.addProduct(req.body);
    product ? res.status(400).json({ message: `error al crear el producto`, product }): res.status(201).json({ message: `Producto creado con exito`, product }) 
})

export default router