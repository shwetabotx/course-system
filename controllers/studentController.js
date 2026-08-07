const Student = require("../models/Student");


// Create Student

const createStudent = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            course,
            status
        } = req.body;

        const student = await Student.create({
            name,
            email,
            phone,
            course,
            status
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });

    } catch (error) {

        // Duplicate email
        if (error.code === 11000) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Mongoose validation error
        if (error.name === "ValidationError") {

            const message = Object.values(error.errors)
                .map((err) => err.message)
                .join(", ");

            return res.status(400).json({
                success: false,
                message: message
            });

        }

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// Get All Students

const getStudents = async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: students
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });

    }

};


module.exports = {
    createStudent,
    getStudents
};