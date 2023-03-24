const admins = [
  {
    _id: `ad${Math.random() * 100}`,
    email: "admin@gmail.com",
    password: "admin",
    fullName: "Admin",
    avatar: "/img/hi.gif",
  },
];

const products = [];
for (let i = 0; i < 10; i++) {
  const product = {
    _id: `pro${i}`,
    name: `IPhone ${i+1}`,
    price: `${i * 1000}`,
    img: `https://picsum.photos/${i * 100}`,
    color: `#37242${i}`,
    count: `${i*10}`,
    category: "Smart Phone",
  };
  products.push(product);
}

const users = [];
for (let i = 0; i < 10; i++) {
  const user = {
    _id: `u${i}`,
    fullName: "Lee",
    email: `lee${i}@fpt.edu.vn`,
    avatar: `https://picsum.photos/${i * 100}`,
    phoneNumber: "",
    address: "",
    orders: null,
  };
  users.push(user);
}

exports.admins = admins;
exports.products = products;
exports.users = users;
