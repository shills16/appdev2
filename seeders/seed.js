const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/user.model'); 
const Book = require('../models/book.model'); 

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    console.log('Users collection cleared');

    await Book.deleteMany({});
    console.log('Books collection cleared');

    const users = [];

    for (let i = 0; i < 5; i++) {
        const fakePassword = faker.internet.password();

        const hashedPassword = await bcrypt.hash(fakePassword, 10);
        const safeUsername = faker.string.alpha({ length: 8 });
        const user = new User({
            username: safeUsername,
            email: faker.internet.email(),
            password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }
    console.log('Added fake users');
    console.log('Users created:', users.map(user => user.username));
    // .join(', ')
    

    // Create 10 fake books to associate with the users
    for (let i = 0; i < 10; i++) {
      const book = new Book({
        title: faker.book.title(),
        author: faker.person.fullName(),
        year:  Math.floor(Math.random() * (2025 - 1950 + 1)) + 1950,
        userId: users[Math.floor(Math.random() * users.length)]._id
      });
      await book.save();
    }
    console.log('Added fake books');
    console.log('Books created:', (await Book.find()).map(book => book.title))
    // .join(', '));

    console.log('Database seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }
}

seedDatabase();
