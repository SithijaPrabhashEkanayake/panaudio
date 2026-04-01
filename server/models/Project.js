import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    scope: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
