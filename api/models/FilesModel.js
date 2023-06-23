const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    name: {type: String},
    data: [{ type: mongoose.Schema.Types.Mixed }],
}, { timestamps: true });

module.exports = mongoose.model("Files", FileSchema);


