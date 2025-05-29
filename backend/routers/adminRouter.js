//import functions from controller
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { addProduct, sortProducts, decreaseQuantity, updateProduct, removeProduct, fetchProductById } from "../controllers/productController.js";
import { getAllUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { getSalesReport } from "../controllers/salesReportController.js";

//assign routes
const adminRouter = (app) => {
    app.get("/api/get-all-orders", getAllOrders); //k
    app.get("/api/sort-products", sortProducts);  //k
    app.get("/api/sales-report", getSalesReport) //k
    app.get("/api/get-all-users", getAllUsers); //k
    app.get('/api/get-product', fetchProductById);
    app.post("/api/update-order-status", updateOrderStatus);  //k
    app.post("/api/add-product", addProduct);  //k
    app.post("/api/decrease-quantity", decreaseQuantity);  //k
    app.post("/api/update-product", updateProduct); //k
    app.post("/api/remove-product", removeProduct); //k
    app.post("/api/delete-user", deleteUser); //k
    app.post("/api/update-user", updateUser); //k
};

//export router
export default adminRouter;