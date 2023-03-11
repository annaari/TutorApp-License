import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    role: Number,
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

export default mongoose.model('User', userSchema);