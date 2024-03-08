import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('addOrderItems');
});


// @desc    Get loged in user orders
// @route   POST /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
});


// @desc    Get order by id
// @route   POST /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get  order by id');
});


// @desc    update order to paid
// @route   get /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});


// @desc    update order to delivered
// @route   get /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});


// @desc    Get all orders
// @route   POST /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all  orders');
});


export {
        addOrderItems, 
        getMyOrders, 
        getOrderById,
        updateOrderToDelivered, 
        updateOrderToPaid, 
        getOrders
    };