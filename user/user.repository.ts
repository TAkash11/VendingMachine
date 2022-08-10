import { db } from "../models/index";
import { user } from "../models/user";
import { product } from "../models/product";

export class UserRepository {

    public async userSignup(User: user): Promise<user> {
        const {username,password,deposit,role} = User;
        return db.user.create({
            username: username,
            password: password,
            deposit: deposit,
            role: role
        });
    }

    public async getUser(username: string): Promise<user|null>{
        return db.user.findOne({ where: {username: username} });
    }

    public async getUserById(id: number): Promise<user|null>{
        return db.user.findOne({ where: {id: id} });
    }

    public async updateUserDetails( id:number ,newusername:string,newpass:string ): Promise<user[]|any> {
        return db.user.update({ username: newusername, password: newpass }, { where: { id: id } });    
    }
    public async updateUserDetail( id:number ,newusername:string ): Promise<user[]|any> {
        return db.user.update({ username: newusername}, { where: { id: id } });    
    }

    public async getProductByPId(PId:number): Promise<product|null>{
        return db.product.findOne({where: {id:PId} });
    }

    public async buyProduct( PId:number ,leftAmount:number ): Promise<product[]|any> {
        return db.product.update({ amountAvailable: leftAmount}, { where: { id: PId } });    
    }

    public async depositAmount( id:number ,deposit:number ): Promise<user[]|any> {
        return db.user.update({ deposit:deposit}, { where: { id: id } });    
    }
}


