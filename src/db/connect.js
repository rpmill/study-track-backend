const mongoose = require('mongoose');

async function connect() {
    const dbUri = process.env.DATABASE_URI || '';

    try {
        await mongoose.connect(dbUri);
    } catch(e) {
        console.log(e);
    }
}

module.exports = connect;