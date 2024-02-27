require('dotenv').config();

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Shoe = require('../models/Shoe');
const Category = require('../models/Category');

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Create your seeds (categories)
const seedCategories = async () => {
  const categories = ['Jordan', 'Yeezy', 'Nike', 'New Balance', 'Asics'];
  return await Category.insertMany(categories.map(category => ({ name: category })));
};

// Create your seeds (users)
const NUM_SEED_USERS = 10;

const generateFakeUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    username: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    hashedPassword: bcrypt.hashSync("password", 10)
  };
};

// Create your seeds (shoe listings)
const NUM_SEED_SHOES = 20;

const generateShoeName = (category) => {
  return `${category} ${faker.commerce.productName()}`;
};

const generateShoe = (categories) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  return {
    name: generateShoeName(category.name),
    category: category._id,
    photoUrl: `./j1-chi.jpeg`,
    description: faker.lorem.sentence(),
    size: (Math.floor(Math.random() * 22) + 4) / 2, // Generates size between 4 and 14, including halves
    price: Math.floor(Math.random() * 601) + 200 // Generates price between 200 and 800
  };
};

// Connect to the database, drop existing data, and seed users, categories, and shoes
mongoose.connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    await Promise.all([
      User.deleteMany(),
      Shoe.deleteMany(),
      Category.deleteMany()
    ]);
    const categories = await seedCategories();
    const users = Array.from({ length: NUM_SEED_USERS }, generateFakeUser);
    const shoes = Array.from({ length: NUM_SEED_SHOES }, () => generateShoe(categories));
    await User.insertMany(users);
    await Shoe.insertMany(shoes);
    console.log("Seeding completed!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });


