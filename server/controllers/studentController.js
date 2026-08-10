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

        const {
            search,
            course,
            status,
            sort,
            page = 1,
            limit = 5
        } = req.query;

        const filter = {};

        // Search by Name or Email
        if (search) {

            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];

        }

        // Course Filter
        if (course) {
            filter.course = course;
        }

        // Status Filter
        if (status) {
            filter.status = status;
        }

        // Sorting
        let sortOption = {};

        if (sort === "name") {
            sortOption = {
                name: 1
            };
        }

        if (sort === "enrollmentDate") {
            sortOption = {
                enrollmentDate: -1
            };
        }

        // Pagination
        const skip =
            (Number(page) - 1) * Number(limit);

        // Total students matching current search/filter
        const totalStudents =
            await Student.countDocuments(filter);

        // Paginated students
        const students = await Student
            .find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        // Overall dashboard statistics
        const total = await Student.countDocuments();

        const active = await Student.countDocuments({
            status: "Active"
        });

        const completed = await Student.countDocuments({
            status: "Completed"
        });

        const dropped = await Student.countDocuments({
            status: "Dropped"
        });

        res.status(200).json({

            success: true,

            message: "Students fetched successfully",

            data: students,

            pagination: {

                currentPage: Number(page),

                totalPages: Math.ceil(
                    totalStudents / Number(limit)
                ),

                totalStudents: totalStudents,

                limit: Number(limit)

            },

            stats: {

                total: total,

                active: active,

                completed: completed,

                dropped: dropped

            }

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

        const student =
            await Student.findById(req.params.id);


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

        const {
            name,
            phone,
            course,
            status
        } = req.body;


        const student =
            await Student.findById(req.params.id);


        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"

            });

        }


        // Only editable fields

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


        const updatedStudent =
            await student.save();


        res.status(200).json({

            success: true,

            message: "Student updated successfully",

            data: updatedStudent

        });

    } catch (error) {

        console.error(error);


        // Mongoose validation error

        if (error.name === "ValidationError") {

            const message =
                Object.values(error.errors)
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


// Delete Student

const deleteStudent = async (req, res) => {

    try {

        const student =
            await Student.findById(req.params.id);


        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"

            });

        }


        await Student.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message: "Student deleted successfully",

            data: {}

        });

    } catch (error) {

        console.error(error);

        res.status(400).json({

            success: false,

            message: "Invalid student ID"

        });

    }

};


// Export Controllers

module.exports = {

    createStudent,

    getStudents,

    getStudentById,

    updateStudent,

    deleteStudent

};