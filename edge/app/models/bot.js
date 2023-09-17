const mongoose = require('mongoose');

const BotFarmSchema = new mongoose.Schema(
    {
        botId: { type: String, required: true},
        userDomain: { type: String, required: true},
        botName: { type: String, required: true},
        botUrl: { type: String, required: true},
        category: { type: String},
        conversational: { type: Boolean},
        createdBy: { type: String},
        createdOn: { type: Number, required: true},
        description: { type: String},
        developer: { type: String},
        featured: { type: Boolean},
        frameworkVersion: { type: String},
        logoUrl: { type: String, required: true},
        modifiedBy: { type: String, required: true},
        modifiedOn: { type: Number, required: true},
        userRoles: { type: String, required: true}
    },
    {
        collection: 'botfarm',
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('Bot', BotFarmSchema);
