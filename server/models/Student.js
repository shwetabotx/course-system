const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            match: [
                /^[A-Za-z ]+$/,
                "Name should contain only alphabets and spaces"
            ]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        phone: {
            type: String,
            required: [true, "Phone is required"],
            match: [/^[0-9]{10}$/, "Phone must be 10 digits"]
        },

        course: {
            type: String,
            required: [true, "Course is required"],
            enum: {
                values: ["React", "Node", "Java", "Python"],
                message: "Invalid course"
            }
        },

        enrollmentDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: {
                values: ["Active", "Completed", "Dropped"],
                message: "Invalid status"
            },
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;