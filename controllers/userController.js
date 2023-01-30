const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/campaignSchema");

//@desc register new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email,
      token: generateToken(user._id),
      last: user.last,
      streak: user.streak,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc authenticate user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check user email
  const user = await User.findOne({ email });

  //check user pw
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email,
      token: generateToken(user._id),
      last: user.last,
      streak: user.streak,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

//@desc get user data
//@route GET /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
  console.log("getting me....");

  console.log({
    user: {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      token: generateToken(req.user._id),
      last: req.user.last,
      streak: req.user.streak,
    },
  });

  res.status(201).json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    token: generateToken(req.user._id),
    last: req.user.last,
    streak: req.user.streak,
  });
});

//@desc update user streak
//@route PUT /api/users/streak
//@access private
const updateStreak = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { last, streak } = req.body;

  try {
    user.streak = streak;
    user.last = last;
  } catch (error) {
    throw new Error("data error");
  }

  user.save();

  res.status(201).json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    token: generateToken(req.user._id),
    last: req.user.last,
    streak: req.user.streak,
  });
};

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getStats = async (req, res) => {
  const users = await User.find();

  const totalCards = users
    .map((user) => user.cards.length)
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const totalReviews = users.map((user) =>
    user.cards.map((card) => card.reviews)
  );

  const reducedReviews = [].concat
    .apply([], totalReviews)
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const maxStreak = Math.max(...users.map((user) => user.streak));

  var streaksArray = [];

  for (i = 0; i < maxStreak + 1; i++) {
    streaksArray.push(
      "streak length " +
        i +
        ": " +
        users.filter((user) => user.streak == i).length
    );
  }

  res.status(201).json({
    "total users": users.length,
    "total cards": totalCards,
    "total reviews": reducedReviews,
    "max streak": maxStreak,
    streaks: streaksArray,
  });
};

const changePassword = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  //hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.findOneAndUpdate(
    { email },
    { name, email, password: hashedPassword }
  );

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email,
      token: generateToken(user._id),
      last: user.last,
      streak: user.streak,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateStreak,
  getStats,
  changePassword,
};
