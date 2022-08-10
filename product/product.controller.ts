import { Request, Response, NextFunction } from "express";
import { ProductService } from "../product/product.service";
import jwt from "jsonwebtoken";
import { product } from "../models/product";
import { user } from "../models/user";
 
export class ProductController {
    public constructor(private readonly ProductService: ProductService) {
        this.ProductService = ProductService;
    };

    public addProduct = async (req: Request, res: Response): Promise<Response|any> => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
                if (error) {
                  return res
                    .status(401)
                    .json({ message: "invalid or expired token" });
                } else {
                    return this.ProductService 

                    .getUser(user.id)
                    .then(async(User : user|null)=>{
                        // console.log(User);
                        if(User?.role == 1){//only seller = role = 1 can add the products
                            req.body.sellerId = user.id;
                            return this.ProductService
                            .addProduct(req.body)
                            .then((product) => {
                                return res.status(200).json({ message: "product added!!" });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else{
                            return res.status(200).json({ message: "Unauthorized User!" });
                        }
                    });
                }
            })
        }
    else{
        return res.status(400).json("Some error occurred!");
    }
        
    };

    public getAll = async (req: Request, res: Response): Promise<Response|any> => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
                if (error) {
                  return res
                    .status(401)
                    .json({ message: "invalid or expired token" });
                } 
                else {
                    return this.ProductService
                    .getProducts()
                    .then(async (pd) => {
                        if(pd && pd.length > 0) {
                            return res.status(200).json(pd);
                        }
                        else {
                            return res.status(400).json("No products exists!");
                        }
                    })
                    .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                    });
                }
            });
         
        }else{
            return res.status(400).json("Some error occurred!");
        }
    };  

    public getById = async (req: Request, res: Response): Promise<Response|any> => {
        const SId = parseInt(req.params.SId);
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
                if (error) {
                  return res
                    .status(401)
                    .json({ message: "invalid or expired token" });
                } 
                else {
                    console.log(SId);
                    return this.ProductService
                    .getProduct(SId)
                    .then(async (pd) => {
                        
                        if(pd && pd.length > 0) {
                            return res.status(200).json(pd);
                        }
                        else {
                            return res.status(400).json("No products exists!");
                        }
                    })
                    .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                    });
                }
            });
         
        }else{
            return res.status(400).json("Some error occurred!");
        }
    };  

    public EditById = async (req: Request, res: Response): Promise<Response|any> => {
        const PId = parseInt(req.params.PId);
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
                if (error) {
                  return res
                    .status(401)
                    .json({ message: "invalid or expired token" });
                } 
                else {
                    const uid = user.id;
                    console.log(PId);
                    return this.ProductService
                    .getProductByPId(PId)
                    .then((product) => {
                        console.log(product);
                        if(product?.sellerId == uid)
                        {
                            return this.ProductService
                            .editProduct(req.body,PId)
                            .then((product) => {
                                  return res.status(200).json("Updated!!");
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else{
                            return res.status(401).json("unauthorized!");
                        }
                        
                    })
                    .catch((error: Error) => {
                        return res.status(505).json({ error: error });
                    });
                }
            });
         
        }else{
            return res.status(400).json("Some error occurred!");
        }
    };

    public deleteById = async (req: Request, res: Response): Promise<Response|any> => {
        const PId = parseInt(req.params.PId);
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
                if (error) {
                  return res
                    .status(401)
                    .json({ message: "invalid or expired token" });
                } 
                else {
                    const uid = user.id;
                    console.log(PId);
                    return this.ProductService
                    .getProductByPId(PId)
                    .then((product) => {
                        console.log(product);
                        if(product?.sellerId == uid)
                        {
                            return this.ProductService
                            .deleteProduct(PId)
                            .then((product) => {
                                  return res.status(200).json("deleted!!");
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else{
                            return res.status(401).json("unauthorized!");
                        }
                        
                    })
                    .catch((error: Error) => {
                        return res.status(505).json({ error: error });
                    });
                }
            });
         
        }else{
            return res.status(400).json("Some error occurred!");
        }
    };
}