import OrderItem from '../models/order-item.model.js';
import Order from '../models/order.model.js';

export const getAllOrders = async (req, res) => {
    try {
        const orderList = await Order.find().populate('user', 'name').sort({ dateOrdered: -1 });

        if (!orderList) {
            res.status(500).json({ success: false });
        }
        res.status(200).send(orderList);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const getOrdersById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',

                    populate: 'category'
                }
            });
        if (!order) {
            res.status(500).json({ success: false });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
export const insertOrder = async (req, res) => {
    try {
        const orderItemsIds = Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });

                newOrderItem = await newOrderItem.save();

                return newOrderItem._id;
            })
        );

        const orderItemsIdsResolved = await orderItemsIds;
        const totalPrices = await Promise.all(
            orderItemsIdsResolved.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(orderItemId).populate(
                    'product',
                    'price'
                );
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            })
        );
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        console.log(totalPrice);

        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user
        });

        order = await order.save();

        if (!order) return res.status(400).send('the order cannot be created!');

        res.send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true }
        );

        if (!order) return res.status(400).send('the order cannot be update!');

        res.send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (order) {
            await order.orderItems.map(async (orderItem) => {
                await OrderItem.findByIdAndDelete(orderItem);
            });
            return res.status(200).json({ success: true, message: 'the order is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'order not found!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
};

export const getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
        ]);

        if (!totalSales) {
            return res.status(400).send('The order sales cannot be generated');
        }

        res.send({ totalsales: totalSales.pop().totalsales });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
export const getOrderCount = async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();

        if (!orderCount) {
            res.status(500).json({ success: false });
        }
        res.send({
            orderCount: orderCount
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
export const getUserOrdersByUserId = async (req, res) => {
    try {
        const userOrderList = await Order.find({ user: req.params.userid })
            // .populate({
            //     path: 'orderItems',
            //     populate: {
            //         path: 'product',
            //         populate: 'category'
            //     }
            // })
            .sort({ dateOrdered: -1 });

        if (!userOrderList) {
            res.status(500).json({ success: false });
        }
        res.send(userOrderList);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
