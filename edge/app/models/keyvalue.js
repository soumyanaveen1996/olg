const mongoose = require('mongoose');

const KeyValueSchema = new mongoose.Schema(
    {
        key: { type: String, required: true},
        value: { type: String, required: true}
    },
    {
        collection: 'keyValues',
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('KeyValue', KeyValueSchema);
