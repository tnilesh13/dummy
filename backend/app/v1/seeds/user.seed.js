const dotenv = require("dotenv");
const connectDB = require("../config/dbConnection.js")
const User = require("../models/user.model.js")
const service = require("../services/authentication.service.js")

dotenv.config();

const seedUsers = [
  {
    email: "shubham@gmail.com",
    fullName: "Shubham",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "pradeep@gmail.com",
    fullName: "Pradeep",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "aman@gmail.com",
    fullName: "Aman",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "nilesh@gmail.com",
    fullName: "Nilesh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "jayesh@gmail.com",
    fullName: "Jayesh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    seedUsers.map((user) => {
      service.createUser(user);
    })

    // const result = await User.findByIdAndUpdate("",
    //   {
    //     friendIds: [
    //     ]
    //   }, { new: true })
    // console.log("result", result)

    // await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
