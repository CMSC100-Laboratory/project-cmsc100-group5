//import functions from controller
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { addProduct, sortProducts, decreaseQuantity, updateProductType, removeProduct } from "../controllers/productController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getSalesReport } from "../controllers/salesReportController.js";

//assign routes
const adminRouter = (app) => {
    app.get("/get-all-orders", getAllOrders); 
    app.get("/sort-products", sortProducts); 
    app.get("/sales-report", getSalesReport) 
    app.get("/get-all-users", getAllUsers)
    app.post("/update-order-status", updateOrderStatus);  
    app.post("/add-product", addProduct);  
    app.post("/decrease-quantity", decreaseQuantity); 
    app.post("/update-product-type", updateProductType); 
    app.post("/remove-product", removeProduct);
};

//export router
export default adminRouter;