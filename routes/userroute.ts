import express from "express";
import { celebrate } from "celebrate";

import { UserController } from '../user/user.controller';
import { UserSchema } from "../user/user.model";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";

const {User,Login,Update,deposit} = UserSchema;
const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

const router:express.Router = express.Router();

router.post('/newuser',celebrate(User),controller.userSignup);//user signup route
router.post('/login',celebrate(Login),controller.Login);//login route

router.put('/update',celebrate(Update),controller.update);//route to edit username or password

router.post('/deposit',celebrate(deposit),controller.deposit);// deposit amount route

router.post('/buy/:PId',controller.buy);//buy product

router.put('/reset',celebrate(deposit),controller.reset)
export = router;