import { db } from "../models/index";
import { user } from "../models/user";
import { product } from "../models/product";


export class ProductRepository {
    public async getUser(id: number): Promise<user|null>{
        return db.user.findOne({ where: {id: id} });
    }

    public async addProduct(product: product): Promise<product> {
        const {amountAvailable, cost, productName, sellerId} = product;
        return db.product.create({
            amountAvailable: amountAvailable,
            cost: cost,
            productName: productName,
            sellerId: sellerId
        });
    }

    public async getProducts(): Promise<product[]|null>{
        return db.product.findAll();
    }
    public async getProduct(SId:number): Promise<product[]|null>{
        return db.product.findAll({where: {sellerId:SId} });
    }

    public async getProductByPId(PId:number): Promise<product|null>{
        return db.product.findOne({where: {id:PId} });
    }

    public async deleteProduct(PId:number): Promise<any>{
        return db.product.destroy({where: {id:PId} });
    }

    public async editProduct (product:product,PId:number): Promise<product[]|any> {
        const {amountAvailable, cost, productName} = product;
        return db.product.update({ 
            amountAvailable: amountAvailable,
            cost:cost,
            productName:productName}
            , { where: { id: PId } });    
    }
    
}