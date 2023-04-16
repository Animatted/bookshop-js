import express, { Express } from 'express';
import * as handlers from './handlers';
import bodyParser from 'body-parser';


const app: Express = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/books/new', handlers.createBook); //unchecked
app.get('/books/price', handlers.getPrice); //unchecked

app.post('/customers/new', handlers.createCustomer); //unchecked
app.put('/customers/address', handlers.updateCustomerAddress); //unchecked
app.get('/customers/balance', handlers.getCustomerBalance); //unchecked


app.post('/orders/new', handlers.createOrder); //unchecked 
app.get('/orders/shipped', handlers.getShipmentStatus); //unchecked
app.put('/orders/ship', handlers.shipOrder); //unchecked
app.get('/orders/status', handlers.getOrderStatus); //unchecked

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});