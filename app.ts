import express from 'express';
import {sequelize} from "./models";
import userRoutes from './routes/userroute';
import productRoutes from './routes/productroute';


require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/vmachine', userRoutes);
app.use('/vm/product', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    sequelize.authenticate().then(async() => {
        console.log("database connected");
        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    });
});