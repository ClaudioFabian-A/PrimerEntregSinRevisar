

import fs from 'fs';


export default class productManager {
    constructor(path) {
        (this.path = path), (this.produsts = [])
    }
    getProducts = async () => {

        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const produ = JSON.parse(data);
                return produ;
            } else {
                return [];
            }
        } catch (error) {
            console.log(Error);
        }
    };

    getProductById = async (prodID) => {

        let datas = await this.getProducts();
        const idProd = datas.find((prod) => prod.id === prodID);
        if (idProd) {
            return idProd;
        } else {
            console.log('producto no encontrado');
        }
    };

    updateProduct = async (id, Products) => {
        const { pid } = id
        const { title, description, price, category, thumbnail, status, code, stock } = Products
        if (
            title === undefined
            || description === undefined
            || price === undefined
            || category === undefined
            || status === undefined
            || code === undefined
            || stock === undefined) {

            console.log(`Complete los campos requeridos`)
            return;
        } else {
            const produ = await this.getProducts({});
            const cprodu = produ.find((e) => e.code === code);
            if (cprodu) {
                console.log(`codigo invalido`);
                return;
            } else {
                const produ2 = await this.getProducts({});
                const produM = produ2.map((e) => {
                    if (e.id === parseInt(pid)) {
                        const prodUP = {
                            ...e,
                            title,
                            description,
                            price,
                            category,
                            status,
                            thumbnail,
                            code,
                            stock
                        };
                        return prodUP;

                    } else {
                        return e;
                    }
                });
                await fs.promises.writeFile(this.path, JSON.stringify(produM, null, 2));
            }
        }
    };




    deleteById = async (id) => {
        const { pid } = id       
        let allProds = await this.getProducts();
        let deleteProduct = allProds.filter((product) => product.id !== parseInt(pid));
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct, null, 2));

    };
    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            const {
                title,
                descripcion,
                price,
                thumbnail = [],
                category,
                status = true,
                code,
                stock,

            } = product;
            const rCode = products.find((e) => e.code === product.code);
            if (rCode) { return ` El codigo ${rCode} no puede utilizarce` };


            if (product.title || product.descripcion || product.price || product.thumbnail || category || status || product.code || product.stock) {
                let id;
                if (products.length === 0) {
                    id = 1;
                } else {
                    id = products[products.length - 1].id + 1;
                }



                const product = {

                    title,
                    descripcion,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id,
                }
                products.push({ ...product, id });

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(products, null, "\t")
                );
                return product;


            } else {
                console.log("campos incompletos");
            };
        } catch (error) {
            console.log(error);
        }
    };

}
