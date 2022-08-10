import { user } from "../models/user";
import { product } from "../models/product";
import { ProductRepository } from "../product/product.repository";

require("dotenv").config();

export class ProductService {
    public constructor(private readonly ProductRepository: ProductRepository) {
        this.ProductRepository = ProductRepository;
    }
    public async getUser(id: number): Promise<user | null> {
        return this.ProductRepository.getUser(id);
    };
    public async addProduct(product : product): Promise<product[]|any> {
        return this.ProductRepository.addProduct(product);
    };
    public async getProducts(): Promise<product[]|any> {
        return this.ProductRepository.getProducts();
    };
    public async getProduct(SId:number): Promise<product[]|any> {
        return this.ProductRepository.getProduct(SId);
    };

    public async getProductByPId(PId:number): Promise<product[]|any> {
        return this.ProductRepository.getProductByPId(PId);
    };

    public async editProduct(product : product,PId:number): Promise<product[]|any> {
        return this.ProductRepository.editProduct(product,PId);
    };

    public async deleteProduct(PId:number): Promise<null> {
        return this.ProductRepository.deleteProduct(PId);
    };
};