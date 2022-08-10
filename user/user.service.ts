import { user } from "../models/user";
import { product } from "../models/product";
import { UserRepository } from "../user/user.repository";
import jwt from "jsonwebtoken";

require("dotenv").config();

export class UserService {
    public constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async userSignup(User: user): Promise<user> {
        return this.userRepository.userSignup(User);
    };

    public async getUser(username: string): Promise<user | null> {
        return this.userRepository.getUser(username);
    };

    public async  getUserById( id: number): Promise<user | null> {
        return this.userRepository.getUserById(id);
    };
    
    public async updateUserDetails(id:number,newusername:string,newpass:string): Promise<user[]> {
        return this.userRepository.updateUserDetails(id,newusername,newpass);
    }
    public async updateUserDetail(id:number,newusername:string): Promise<user[]> {
        return this.userRepository.updateUserDetail(id,newusername);
    }

    public async depositAmount(id:number,deposit:number): Promise<user[]> {
        return this.userRepository.depositAmount(id,deposit);
    }

    public async getProductByPId(PId:number): Promise<product[]|any> {
        return this.userRepository.getProductByPId(PId);
    };

    public async buyProduct(PId:number,leftAmount:number): Promise<product[]|any> {
        return this.userRepository.buyProduct(PId,leftAmount);
    };

    public createToken(id:number):string{
        const token = jwt.sign({id},process.env.SECRET_KEY!,{expiresIn:'1h'});
        return token;
    }

}