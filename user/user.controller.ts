import { Request, Response, NextFunction } from "express";
import { UserService } from "../user/user.service";
import jwt from "jsonwebtoken";
import { user } from "../models/user";
import bcrypt from "bcrypt";

require("dotenv").config();

const saltRounds: number = 10;

export class UserController {
    public constructor(private readonly UserService: UserService) {
        this.UserService = UserService;
    };

    public userSignup = async (req: Request, res: Response): Promise<Response> => {
        // console.log(req.body);
        return this.UserService 
        .getUser(req.body.username)
        .then(async(User : user|null)=>{
            if(!User){
                req.body.password = await bcrypt.hash(req.body.password,saltRounds);//Password encription
                return this.UserService     
                .userSignup(req.body)
                .then((User: user) => {
                    return res.status(200).json({
                        message:
                        "User registered",
                    });
                    })
                .catch((error: Error) => {
                    return res.status(500).json({error: error});
                }); 
            }else{
                return res.status(401).json("User Exist!! Login!!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({error: error});
            });
    };

    public Login = async (req: Request, res: Response): Promise<Response> => {
        return this.UserService
          .getUser(req.body.username)
          .then(async (user: user | null) => {
            if (user) {
                const isSame = await bcrypt.compare(
                  req.body.password,
                  user.password!
                );
                if (isSame) {
                  const token = this.UserService.createToken(user.id!);//creating jwt with id
                  if(user.role === 1){
                    return res
                      .status(200)
                      .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })//token in form of cookie
                      .json({ message: "login successful seller"});
                  }
                  else if(user.role === 2){
                    return res
                      .status(200)
                      .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                      .json({ message: "login successful buyer"});
                  }
                  else{
                    return res
                      .status(401)
                      .json({ message: "Invalid user!!"});
                  }
                }
                return res
                  .status(401)
                  .json({ message: "Invalid Username or Password" });
            }
            return res
              .status(401)
              .json({ message: "Invalid Username or Password" });
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({
              error: error,
            });
          });
    };

    //update details
    public update = async (req: Request, res: Response): Promise<Response|any> => {
        if (req.headers.authorization) {
          jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
              if (error) {
                return res
                  .status(401)
                  .json({ message: "invalid or expired token" });
              } else {
                //username and password both changes
                if(req.body.newpassword){
                    const id = user.id
                    const newusername = req.body.newusername;
                    const newpass = await bcrypt.hash(req.body.newpassword,saltRounds);

                    return this.UserService 
                    .getUser(req.body.newusername)
                    .then(async(User : user|null)=>{
                        // console.log(User);
                        if(User?.id != id && User != null){
                            return res
                            .status(401)
                            .json({ message: "username exist!!" }); 
                        }
                        else{
                            return this.UserService
                            .updateUserDetails(id,newusername,newpass)
                            .then((user) => {
                                  return res.status(200).json({ 
                                      username: newusername,
                                      password: req.body.newpassword
                                  });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
              }
              //only username changes
              else{
                    const id = user.id
                    const newusername = req.body.newusername;
    
                    return this.UserService 
                    .getUser(req.body.newusername)
                    .then(async(User : user|null)=>{
                        if(!User){
                            return this.UserService
                            .updateUserDetail(id,newusername)
                            .then((user) => {
                                  return res.status(200).json({ 
                                      username: newusername,
                                  });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else{
                            return res
                            .status(401)
                            .json({ message: "username exist!!" });   
                        }
                    });
                }
            }
            });
        }    
        else{
            return res.status(400).json("Some error occurred!");//no token in input
        }
    };  


    //deposit endpoint
    public deposit = async (req: Request, res: Response): Promise<Response|any> => {
        if (req.headers.authorization) {
          jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
              if (error) {
                return res
                  .status(401)
                  .json({ message: "invalid or expired token" });
              } else {
                    const uid = user.id;
                    return this.UserService
                    .getUserById(uid)
                    .then(async(User : user|null)=>{
                        console.log(User?.role);
                        if(User?.role != 2){
                            return res
                                .status(401)
                                .json({ message: "not allowed to deposit!!" }); 
                        }
                        else {
                            const deposit =  req.body.amount + User?.deposit;
                            //console.log(deposit);
                            return this.UserService
                            .depositAmount(uid,deposit)
                            .then((user) => {
                                return res.status(200).json({ message:"Amount deposited" });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        
                        }
                    })
                    .catch((error: Error) => {
                        return res.status(404).json({message:"user not found" });
                    });
                }
            });
        }

        else{
            return res.status(400).json("Some error occurred!");//no token in input
        }
    
    };


public buy = async (req: Request, res: Response): Promise<Response|any> => {
    
    const PId = parseInt(req.params.PId);
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
          if (error) {
            return res
              .status(401)
              .json({ message: "invalid or expired token" });
          } else {
                const uid = user.id;
                return this.UserService
                .getUserById(uid)
                .then(async(User : user|null)=>{
                    console.log(User?.role);
                    if(User?.role != 2){
                        return res
                            .status(401)
                            .json({ message: "not allowed to buy!!" }); // only buyer=role=2 are allowed to buy products
                    }
                    else {
                        const deposit = User?.deposit;
                        return this.UserService
                         .getProductByPId(PId)
                         .then((product) => {
                            console.log(product);
                            const amount = req.body.quantity;
                            const total = amount*product?.cost;
                            const prod = product?.productName;
                            const left = deposit - total;
                            const leftAmount = product?.amountAvailable - amount;

                            // check if required quantity < amountAvailabel, Spending deposit < total charge 
                            if(left<0 || leftAmount<0){
                                return res.status(401).json({ message: "Change the amount!" });
                            } 
                            return this.UserService
                            .buyProduct(PId,leftAmount)
                            .then((product) => {
                                console.log(leftAmount);
                                return this.UserService
                                .depositAmount(uid,left)
                                .then(()=> {
                                    return res.status(200).json({ 
                                    SpendedDeposit: total,
                                    Product: prod})
                                })    
                                .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                                
                            })
                        .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });
                        }
                    
                    })
                .catch((error: Error) => {
                    return res.status(404).json({message:"user not found" });
                });
            }
        });
    }

    else{
        return res.status(400).json("Some error occurred!");//no token in input
    }

};


public reset = async (req: Request, res: Response): Promise<Response|any> => {
        if (req.headers.authorization) {
          jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!,async(error, user: any) => {
              if (error) {
                return res
                  .status(401)
                  .json({ message: "invalid or expired token" });
              } else {
                    const uid = user.id;
                    return this.UserService
                    .getUserById(uid)
                    .then(async(User : user|null)=>{
                        console.log(User?.role);
                        if(User?.role != 2){
                            return res
                                .status(401)
                                .json({ message: "not allowed to deposit!!" }); 
                        }
                        else {
                            const deposit =  req.body.amount;
                            //console.log(deposit);
                            return this.UserService
                            .depositAmount(uid,deposit)
                            .then((user) => {
                                return res.status(200).json({ message:"Amount deposit reset!!" });
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        
                        }
                    })
                    .catch((error: Error) => {
                        return res.status(404).json({message:"user not found" });
                    });
                }
            });
        }

        else{
            return res.status(400).json("Some error occurred!");//no token in input
        }
    
    };


}
