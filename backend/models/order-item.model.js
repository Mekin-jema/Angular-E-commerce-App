import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;

// const orderItems = [
//     {
//         quantity: 2,
//         product: '6752af374c7d062f4f7b1fbd' // Smartphone XYZ
//     },
//     {
//         quantity: 1,
//         product: '6752afe54c7d062f4f7b1fc1' // Amazing Book
//     },
//     {
//         quantity: 3,
//         product: '6752b05cfdd698319d8e9add' // Amazing Book
//     },
//     {
//         quantity: 5,
//         product: '6752b08892850de866112396' // Amazing Book
//     }
// ];

// OrderItem.insertMany(orderItems)
//     .then(() => {
//         console.log('Order Items inserted successfully!');
//     })
//     .catch((error) => {
//         console.log('Error:', error.message);
//     });
