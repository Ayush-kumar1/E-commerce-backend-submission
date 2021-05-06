const mongoose = require("mongoose")

// TODO: move to .env/sec
// TODO: use async await instead of then/catch
function initializeDBConnection() {
    // Connecting to DB
    mongoose.connect("mongodb+srv://neoGcamp-db:Ayushkumar321%40@cluster0.pmnpj.mongodb.net/test", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log("successfully connected"))
        .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { initializeDBConnection }