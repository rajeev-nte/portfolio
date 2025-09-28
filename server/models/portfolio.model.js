const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema for individual project
const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String }
});

// Schema for individual experience entry
const experienceSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    years: { type: String, required: true },
    description: { type: String }
});

// Main portfolio schema
const portfolioSchema = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    bio: { type: String, required: true },
    skills: [{ type: String, required: true }],
    projects: [projectSchema], // An array of projects using the schema above
    experience: [experienceSchema], // An array of experiences
    template: { type: String, required: true, default: 'template1' }
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;

