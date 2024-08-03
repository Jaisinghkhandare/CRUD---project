const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/person', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((e) => {
        console.log("Error: ", e.message);
    });

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", schema);
module.exports = User;
