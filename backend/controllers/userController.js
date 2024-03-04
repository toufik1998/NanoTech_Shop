import asyncHandler from '../middleware/asyncHandler.js'; 
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user')
});


// @desc Register user 
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
});

// @desc Logout user / Clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
});


// @desc Get user profile 
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
});


// @desc Get Update profile 
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
});


// @desc Get users
// @route PUT /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
});


// @desc Get user by id
// @route PUT /api/users/:id
// @access private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
});


// @desc Get users
// @route delete /api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
});


// @desc update user
// @route PUT /api/users/:id
// @access private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
});


export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser}