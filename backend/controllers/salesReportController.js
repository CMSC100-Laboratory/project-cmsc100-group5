import OrderTransaction from "../models/orderTransactionModel.js";
import Product from "../models/productModel.js";


// this will get the list of all products sold (has an orderStatus of 1) and the total sales
const getSalesReport = async (req, res) => {
    try 
    {
      const orders = await OrderTransaction.find();
      const products = await Product.find();
      const productsSold = [];
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      let totalSales = 0
      let yearlySales = 0;
      let monthlySales = 0;

      for (let i = 0; i < orders.length; i++)
      { 

        if (orders[i]["orderStatus"] == 1)
        {
            for (let j = 0; j < products.length; j++)
            {
                if (products[j]["_id"].equals(orders[i]["productId"]))
                {
                    if (orders[i]["date"].getMonth() + 1 == currentMonth)
                    {
                        monthlySales += products[j]["price"] * orders[i]["orderQuantity"];
                    }
                    if (orders[i]["date"].getFullYear() == currentYear)
                    {
                        yearlySales += products[j]["price"] * orders[i]["orderQuantity"];
                    }

                    totalSales += products[j]["price"] * orders[i]["orderQuantity"];
                    productsSold.push({[products[j]["name"]] : products[j]["price"] * orders[i]["orderQuantity"]});
                    break;
                }
            }
        }
      }
      console.log(monthlySales)
      console.log(yearlySales)
      console.log(totalSales)
      res.status(200).json("hello");
    } 
    catch (error) 
    {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };

export {getSalesReport}
