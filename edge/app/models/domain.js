const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema(
    {
        userDomain: { type: String, required: true},
        logoUrl: { type: String, required: true},
        name: { type: String, required: true},
        viewModes: {
            apps: {type: Boolean, required: true, default: false},
            channels: {type: Boolean, required: true, default: false},
            chat: {type: Boolean, required: true, default: false},
            voip: {type: Boolean, required: true, default: false},
        }
    },
    {
        collection: 'domains',
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('Domain', DomainSchema);
