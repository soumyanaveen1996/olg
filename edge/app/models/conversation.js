const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        conversationId: { type: String, required: true},
        bot: { type: String, required: true},
        participants: [{ type: String, required: true}],
    },
    {
        collection: 'conversations',
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
