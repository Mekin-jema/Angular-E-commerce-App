import express from 'express';

import {
    deleteOrder,
    getAllOrders,
    getOrderCount,
    getOrdersById,
    getTotalSales,
    getUserOrdersByUserId,
    insertOrder,
    updateOrder
} from '../controllers/order.controller.js';

// routes
const router = express.Router();

router.get(`/get-all-orders`, getAllOrders);

router.get(`/get-orders-by-id/:id`, getOrdersById);

router.post('/add-order/', insertOrder);

router.put('/update-order/:id', updateOrder);

router.delete('/delete-order/:id', deleteOrder);

router.get('/get-totalsales', getTotalSales);

router.get(`/get-total-orders`, getOrderCount);

router.get(`/get-user-orders/:userid`, getUserOrdersByUserId);
export default router;
