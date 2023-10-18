// THIS IS A TEMPRORY SERVICE UNTIL THE WEBAPP CAN CALL THE BOT DIRECTLY
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Bot = require('../models/bot');
const doAuth = passport.authenticate('jwt', {
  session: false
});
const config = require('../../config');
const FrontmRuntime = require('runtime').FrontmRuntime;
const runtime = new FrontmRuntime(config);
const ACTIONS = {
  START_COURSE: 'startCourse',
  END_COURSE: 'endCourse'
};

async function callBot(data, user) {
  const payload = {
    capability: "BackendBotCap",
    parameters: {
      command: 'asyncRequest',
      data: {
        state: {
          messageTypeFromUser: 'aiccResponse',
          messageFromUser: data
        }
      }
    },
    requestUuid: "id1",
    conversation: {
      conversationId: "aicc-response",
      bot: config.BOT_ID,
      participants: [user.userId]
    },
    user
  }
  let dbBot = await Bot.findOne({ botId: config.BOT_ID });
  if (_.isEmpty(dbBot)) {
    throw new Error('Invalid bot');
  }
  payload.botData = dbBot;
  console.log(payload);
  await runtime.execute(payload);
}

router.post('/aicc/startCourse', doAuth, async (req, res) => {
  try {
    let courseId = req.body.courseId;
    await callBot({ courseId, userId: req.user.userId, action: ACTIONS.START_COURSE }, req.user);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/aicc/endCourse', doAuth, async (req, res) => {
  try {
    let courseId = req.body.courseId;
    await callBot({ courseId, userId: req.user.userId, action: ACTIONS.END_COURSE }, req.user);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

