import needle from "needle";

needle.post("http://localhost:3000/update-order-status",
    { orderId: '681c44b83a64df33a3a8e367', status: 1},
    { json: true }, 
    (err, res) => {
        if(!err) console.log(res.body);
});

needle.post("http://localhost:3000/add-product",
    {   name: "Calabasa",
        type: 1,
        price: 45,
        description: "Fresh farm-grown Calabasa, rich in vitamins A and C. Ideal for soups and stews.",
        quantity: 100
    },
    { json: true }, 
    (err, res) => {
        if(!err) console.log(res.body);
});

needle.post("http://localhost:3000/decrease-quantity",
    { productId: '681c44b83a64df33a3a8e35c', quantityToDeduct: 10},
    { json: true }, 
    (err, res) => {
        if(!err) console.log(res.body);
});

needle.post("http://localhost:3000/update-product-type",
    { productId: '681c44b83a64df33a3a8e35c', newType: 1},
    { json: true }, 
    (err, res) => {
        if(!err) console.log(res.body);
});

needle.post("http://localhost:3000/remove-product",
    { productId: '681ede0ff6ae71948edbc016'},
    { json: true }, 
    (err, res) => {
        if(!err) console.log(res.body);
});