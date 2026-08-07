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

// Get Student By ID

const getStudentById = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Student fetched successfully",
            data: student
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });

    }

};

// Update Student

const updateStudent = async (req, res) => {

    try {

        const { name, phone, course, status } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        // Update only editable fields

        if (name !== undefined) {
            student.name = name;
        }

        if (phone !== undefined) {
            student.phone = phone;
        }

        if (course !== undefined) {
            student.course = course;
        }

        if (status !== undefined) {
            student.status = status;
        }

        const updatedStudent = await student.save();

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });

    } catch (error) {

        console.error(error);

        if (error.name === "ValidationError") {

            const message = Object.values(error.errors)
                .map((err) => err.message)
                .join(", ");

            return res.status(400).json({
                success: false,
                message: message
            });

        }

        res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });

    }

};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent

};