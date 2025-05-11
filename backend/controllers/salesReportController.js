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
      const currentDay = new Date().getDate();
      const currentWeek = Math.ceil(currentDay/7);
      let totalSales = 0
      let yearlySales = 0;
      let monthlySales = 0;
      let weeklySales = 0;
        
      // iterates through orders and cross references through products to check the name and price
      // as we iterate through, we check if the current order meets the criteria (either within the current week,
      // within the current month, or within the current year) and adds the sales to the appropriate variable
      // all sales will be added to the totalSales variable and all [{products sold:corresponding price}] will
      // be placed inside an object within a list (productsSold)
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

                        if (Math.ceil(orders[i]["date"].getDate()/7) == currentWeek)
                        {
                            weeklySales += products[j]["price"] * orders[i]["orderQuantity"];
                        }

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
      console.log(weeklySales)
      console.log(monthlySales)
      console.log(yearlySales)
      console.log(totalSales)
      console.log(productsSold)
      res.status(200).json("hello");
    } 
    catch (error) 
    {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };

export {getSalesReport}
