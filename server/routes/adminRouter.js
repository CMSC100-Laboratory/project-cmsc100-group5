//import functions from controller
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { addProduct, sortProducts, decreaseQuantity, updateProduct, removeProduct } from "../controllers/productController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getSalesReport } from "../controllers/salesReportController.js";

//assign routes
const adminRouter = (app) => {
    app.get("/get-all-orders", getAllOrders); //k
    app.get("/sort-products", sortProducts);  //k
    app.get("/sales-report", getSalesReport) //k
    app.get("/get-all-users", getAllUsers) //k
    app.post("/update-order-status", updateOrderStatus);  //k
    app.post("/add-product", addProduct);  //k
    app.post("/decrease-quantity", decreaseQuantity);  
    app.post("/update-product", updateProduct); //k
    app.post("/remove-product", removeProduct); //k
};

//export router
export default adminRouter;