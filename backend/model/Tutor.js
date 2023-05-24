import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    generalInformation: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        birthDate: Date,
        profilePicture: Object,
        studiedAt: {
            type: Array,
           required: true
        }
    },
    courseInformation: [
        {
            subject: String,
            classes: {
                type: Array,
                default: []
            },
            startPrice: Number,
            endPrice: Number,
            field: String
        }
    ],
    available: [
        {
            date: Date,
            startTime: String,
            endTime: String,
            booked: {
                type: Boolean,
                default: false
            },
            repeatEveryWeek: Boolean
        }
    ],
    preferedLocation: [],
    preferedPlatform: []

});

export default mongoose.model('Tutor', userSchema);