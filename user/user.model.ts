import { Joi } from 'celebrate';

export const UserSchema = {
    User: {
        body: Joi.object({
            username: Joi.string()
                   .required()
                   .example('Akash108')
                   .description('Name of user'),
            password: Joi.string()
                        .required()
                        .example('Aka0987')
                        .description('Password of User'),
            deposit: Joi.number()
                        .required()
                        .example(20)
                        .description('Deposit ammount'),
            role: Joi.number()
                    .required()
                    .example(1)
                    .description('Role of user')//1 then seller and 2 for buyer           
        })
    },
    Login: {
        body: Joi.object({
            username: Joi.string()
                    .required()
                    .example('akash987')
                    .description('username'),
            password: Joi.string()
                .required()
                .description('password'),
        })
    },

    Update: {
        body: Joi.object({
            newusername: Joi.string()
                    .required()
                    .example('akash987')
                    .description('username'),
            newpassword: Joi.string()
                    .example('akash987')
                    .description('new password'),
        })
    },

    deposit:{
        body: Joi.object({
            amount : Joi.number()
                        .valid(5,10,20,50,100)
                        .required()
                        .example(20),
        })
    }
};