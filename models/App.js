const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    link: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([^\s]*)?$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
});

module.exports = mongoose.model('App', appSchema);

