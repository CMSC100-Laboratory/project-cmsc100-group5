import needle from "needle";

const baseURL = "http://localhost:3000/api";
const testUser = {
  FirstName: "Ana",
  MiddleName: "Lopez",
  LastName: "Garcia",
  isMerchant: false,
  email: "anagarcia@example.com",
  password: "$2b$10$GYPtaPt8kEyupGb4X4GJDedEHQBfSrvFr1agVhdjce8SMlwl2T1Bm"
};

const exampleProductId = "681c44b83a64df33a3a8e35f";
const exampleOrderId = "682361a6394a05cbae7c19af";

console.log("Starting Farm-to-Table API Tests...");

// 1. Get all products
needle.get(`${baseURL}/products`, (err, res) => {
  if (!err) console.log("getAllProducts:", res.body);
});

// 2. Get products by type
needle.get(`${baseURL}/products-by-type?type=1`, (err, res) => {
  if (!err) console.log("getProductsByType:", res.body);
});

// 3. Get product by ID
needle.get(`${baseURL}/product?id=${exampleProductId}`, (err, res) => {
  if (!err) console.log("getProductById:", res.body);
});

// 4. Add product to cart
needle.post(`${baseURL}/cart/add`,
  { email: testUser.email, productId: exampleProductId, quantity: 5 },
  { json: true },
  (err, res) => {
    if (!err) console.log("addToCart:", res.body);
  }
);

// 5. Get cart contents
needle.post(`${baseURL}/cart/get`,
  { email: testUser.email },
  { json: true },
  (err, res) => {
    if (!err) console.log("getCart:", res.body);
  }
);

// 6. Update cart item
needle.post(`${baseURL}/cart/update`,
  { email: testUser.email, productId: exampleProductId, quantity: 6 },
  { json: true },
  (err, res) => {
    if (!err) console.log("updateCartItem:", res.body);
  }
);

// 7. Remove from cart
needle.post(`${baseURL}/cart/remove`,
  { email: testUser.email, productId: exampleProductId },
  { json: true },
  (err, res) => {
    if (!err) console.log("removeFromCart:", res.body);
  }
);

// 8. Create order
needle.post(`${baseURL}/orders/create`,
  { email: testUser.email },
  { json: true },
  (err, res) => {
    if (!err) console.log("createOrder:", res.body);
  }
);

// 9. Get user orders
needle.get(`${baseURL}/orders/user?email=${testUser.email}`, (err, res) => {
  if (!err) console.log("getUserOrders:", res.body);
});

// 10. Cancel order
needle.post(`${baseURL}/orders/cancel`,
  { email: testUser.email, orderId: exampleOrderId },
  { json: true },
  (err, res) => {
    if (!err) console.log("cancelOrder:", res.body);
  }
);

// 11. Clear cart
needle.post(`${baseURL}/cart/clear`,
  { email: testUser.email },
  { json: true },
  (err, res) => {
    if (!err) console.log("clearCart:", res.body);
  }
);
