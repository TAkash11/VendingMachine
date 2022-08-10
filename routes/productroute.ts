import express from "express";
import { celebrate } from "celebrate";

import { ProductController } from '../product/product.controller';
import { ProductSchema } from "../product/product.model";
import { ProductRepository } from "../product/product.repository";
import { ProductService } from "../product/product.service";

const {Product} = ProductSchema;
const repo: ProductRepository = new ProductRepository();
const service: ProductService = new ProductService(repo);
const controller: ProductController = new ProductController(service);

const router:express.Router = express.Router();

router.post('/newproduct',celebrate(Product),controller.addProduct);//newproduct 

//retriving products routes
router.get('/allProducts',controller.getAll);
router.get('/:SId',controller.getById);

//edit product details
router.put('/edit/:PId',celebrate(Product),controller.EditById);

//delete product
router.delete('/delete/:PId',controller.deleteById)
export = router;