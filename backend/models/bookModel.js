import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false, 
        },
        pictureURL: {
            type: String,
            required: false, 
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('book', bookSchema);
