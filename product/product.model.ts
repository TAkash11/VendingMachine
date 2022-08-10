import { Joi } from 'celebrate';

export const ProductSchema = {
    Product: {
        body: Joi.object({
            amountAvailable: Joi.number()
                               .required()
                               .example(2)
                               .description('available quantity'),  
            cost: Joi.number()
                   .required()
                   .example(20)
                   .description('cost of product'),
            productName: Joi.string()
                        .required()
                        .example('soap')
                        .description('name of product'),
                  
        })
    },
};