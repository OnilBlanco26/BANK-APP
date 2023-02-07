const catchAsync = require('../helpers/catchAsync');
const Transfers = require('../models/transfers.model');
const User = require('../models/users.model');

const transferAmount = catchAsync(async (req, res) => {
  const { amount, senderAccountNumber, receiverAccountNumber } = req.body;

  const userReceive = await User.findOne({
    where: {
      status: true,
      accountNumber: receiverAccountNumber,
    },
  });

  if (!userReceive) {
    return res.status(404).json({
      status: 'error',
      message:
        'This user account to which you want to send the amount does not exist.',
    });
  }

  const userReceiveId = userReceive.id;

  const userTransfer = await User.findOne({
    where: {
      status: true,
      accountNumber: senderAccountNumber,
    },
  });

  if (!userTransfer) {
    return res.status(404).json({
      status: 'error',
      message: 'The account of the user making the transfer does not exist.',
    });
  }

  const userTransferId = userTransfer.id;

  if (userReceiveId === userTransferId) {
    return res.status(400).json({
      status: 'error',
      message:
        'The user to whom you are sending is the same user who is sending',
    });
  }

  if (amount > userTransfer.amount) {
    return res.status(404).json({
      status: 'error',
      message:
        'The user cannot transfer more than the amount he has in his account.',
    });
  }

  const newAmountUserTransfer =
    parseInt(userTransfer.amount, 10) - parseInt(amount, 10);
  const newAmountUserReceiver =
    parseInt(userReceive.amount, 10) + parseInt(amount, 10);

  await userTransfer.update({ amount: newAmountUserTransfer });
  await userReceive.update({ amount: newAmountUserReceiver });

  const transfer = await Transfers.create({
    amount,
    senderUserId: userTransferId,
    receiverUserId: userReceiveId,
  });

  res.status(200).json({
    status: 'success',
    message: 'The transaction has been successfully completed',
    transfer,
  });
});

module.exports = {
  transferAmount,
};
