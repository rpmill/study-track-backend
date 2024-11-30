import mongoose from 'mongoose';

async function connect() {
    const dbUri: string = process.env.DATABASE_URI || '';

    try {
        await mongoose.connect(dbUri);
    } catch(e) {
        console.log(e);
    }
}

export default connect;