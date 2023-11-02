const _ = require('lodash');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

function validateFields(input, fieldsToValidate) {
  _.forEach(fieldsToValidate, field => {
    if(_.isEmpty(_.get(input, field))) {
      throw new Error('Required fields missing');
    }
  });
}

async function getUserFromDB(userIdForLogin) {
  let user = await User.findOne({userIdForLogin});
  if(_.isEmpty(user)) {
    throw new Error('User not found');
  }
  return user;
}

function verifyDateOfBirth(user, inputDOB) {
  if(!user.compareDOB(inputDOB)) {
    throw new Error('Date of Birth is incorrect');
  }
}

async function setUserPin(req, res) {
  let {userId, dateOfBirth, pin} = req.body;
  try {
    validateFields(req.body, ['userId', 'pin', 'dateOfBirth']);
    let user = await getUserFromDB(userId);
    verifyDateOfBirth(user, dateOfBirth);
    user.pin = pin;
    await user.save();
    return res.status(200).json({success: true, message: 'User pin updated successfully'});
  } catch(err) {
    return res.status(500).json({error: err.message});
  }
}

router.post('/register', setUserPin);

router.post('/forgotPin', setUserPin);

router.post('/login', (req, res) => {
    req.body.userIdForLogin = req.body.userId;
    passport.authenticate('local', { session: false },
      (err, user) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    return res.status(200).json({user});
  })(req, res);

});

router.post('/verifyUser', async (req, res) => {
  let {userId, dateOfBirth} = req.body;
  try {
    validateFields(req.body, ['userId', 'dateOfBirth']);
    let user = await getUserFromDB(userId);
    verifyDateOfBirth(user, dateOfBirth);
    return res.status(200).json({success: true, message: 'userId is valid'});
  } catch(err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
