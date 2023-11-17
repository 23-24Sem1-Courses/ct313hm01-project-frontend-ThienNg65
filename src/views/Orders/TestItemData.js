// fakeData

// Fake data for MyOrder.vue
export const myOrdersData = [
    {
        id: 1,
        createdDate: '2023-01-01T12:00:00Z',
        totalPrice: 50.0,
        items: [
            {
                id: 1,
                quantity: 2,
                price: 25.0,
                createdDate: '2023-01-01T12:05:00Z',
                product: {
                    id: 1,
                    description: 'Product description 1',
                    imageUrl: 'https://example.com/product1.jpg',
                    name: 'Product Name 1',
                    price: 25.0,
                    categoryId: 1,
                },
            },
            // Add more items as needed
        ],
    },
    // Add more orders as needed
];

// Fake data for OrderDetails.vue
export const orderItemData = {
    id: 1,
    quantity: 2,
    price: 25.0,
    createdDate: '2023-01-01T12:05:00Z',
    product: {
        id: 1,
        description: 'Product description 1',
        imageUrl: 'assets/home.png',
        name: 'Product Name 1',
        price: 25.0,
        categoryId: 1,
    },


};
