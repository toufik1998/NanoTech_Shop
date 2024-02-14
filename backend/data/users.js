import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Toufik Shima',
        email: 'toufikshima@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },

    {
        name: 'reda reda',
        email: 'reda@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },

    {
        name: 'kamal kamal',
        email: 'kamal@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },

]

export default users; 