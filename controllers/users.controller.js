const catchAsync = require('../helpers/catchAsync');
const Transfers = require('../models/transfers.model');
const User = require('../models/users.model');

const register = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  const accountNumber = Math.round(Math.random() * 100000) + 100000;
  const amount = 1000;

  const user = await User.create({
    name,
    accountNumber,
    password,
    amount,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been successfully created',
    user,
  });
});

const login = catchAsync(async (req, res) => {
  const { password, accountNumber } = req.body;

  const user = await User.findOne({
    where: {
      password,
      accountNumber,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user does not exist',
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Welcome ${
      user.name.charAt(0).toUpperCase() + user.name.slice(1)
    }`,
  });
});

const getHistory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const getUser = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!getUser) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  const transfers = await Transfers.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (transfers.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'This user has not made any transactions',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Transfers has found succesfully',
    transfers,
  });
});

module.exports = {
  register,
  login,
  getHistory,
};
