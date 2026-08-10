import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getStudentById,
    updateStudent
} from "../services/studentService";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "React",
        status: "Active"
    });


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // Load student

    useEffect(() => {

        loadStudent();

    }, [id]);


    const loadStudent = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getStudentById(id);


            const student =
                response.data.data;


            setFormData({

                name: student.name,

                email: student.email,

                phone: student.phone,

                course: student.course,

                status: student.status

            });


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load student."
            );


        } finally {

            setLoading(false);

        }
    };


    // Handle input changes

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({

            ...formData,

            [name]: value

        });


        setError("");
    };


    // Validate form

    const validateForm = () => {

        const nameRegex =
            /^[A-Za-z ]+$/;


        const phoneRegex =
            /^\d{10}$/;


        // Name

        if (!formData.name.trim()) {

            setError(
                "Name is required."
            );

            return false;
        }


        if (
            !nameRegex.test(
                formData.name.trim()
            )
        ) {

            setError(
                "Name should contain only alphabets and spaces."
            );

            return false;
        }


        // Phone

        if (!formData.phone.trim()) {

            setError(
                "Phone number is required."
            );

            return false;
        }


        if (
            !phoneRegex.test(
                formData.phone.trim()
            )
        ) {

            setError(
                "Phone number must contain exactly 10 digits."
            );

            return false;
        }


        // Course

        if (!formData.course) {

            setError(
                "Please select a course."
            );

            return false;
        }


        // Status

        if (!formData.status) {

            setError(
                "Please select a status."
            );

            return false;
        }


        return true;
    };


    // Submit update

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        if (!validateForm()) {

            return;
        }


        setSaving(true);


        try {

            await updateStudent(id, {

                name:
                    formData.name.trim(),

                phone:
                    formData.phone.trim(),

                course:
                    formData.course,

                status:
                    formData.status

            });


            navigate("/");


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update student."
            );


        } finally {

            setSaving(false);

        }

    };


    // Loading screen

    if (loading) {

        return (

            <div className="container py-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                    </div>

                    <p className="text-muted mt-2">
                        Loading student...
                    </p>

                </div>

            </div>

        );
    }


    return (

        <div className="container py-4">

            {/* Header */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    Edit Student
                </h1>

                <p className="text-muted">
                    Update student information.
                </p>

            </div>


            {/* Form Card */}

            <div className="card shadow-sm border-0">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>


                        {/* Error */}

                        {error && (

                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {error}
                            </div>

                        )}


                        <div className="row g-3">


                            {/* Name */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="name"
                                    className="form-label"
                                >
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Email */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    disabled
                                />

                                <div className="form-text">
                                    Email cannot be changed.
                                </div>

                            </div>


                            {/* Phone */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="phone"
                                    className="form-label"
                                >
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                    inputMode="numeric"
                                    required
                                />

                            </div>


                            {/* Course */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="course"
                                    className="form-label"
                                >
                                    Course
                                </label>

                                <select
                                    id="course"
                                    name="course"
                                    className="form-select"
                                    value={formData.course}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="React">
                                        React
                                    </option>

                                    <option value="Node">
                                        Node
                                    </option>

                                    <option value="Java">
                                        Java
                                    </option>

                                    <option value="Python">
                                        Python
                                    </option>

                                </select>

                            </div>


                            {/* Status */}

                            <div className="col-md-6">

                                <label
                                    htmlFor="status"
                                    className="form-label"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Dropped">
                                        Dropped
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving ? "Updating..." : "Update Student"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/")}
                                disabled={saving}
                            >
                                Back
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default EditStudent;