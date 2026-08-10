import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentService";

function AddStudent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "React",
        status: "Active"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error while typing
        setError("");
    };


    const validateForm = () => {

        const nameRegex = /^[A-Za-z ]+$/;

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
            /^\d{10}$/;


        // Name validation

        if (!formData.name.trim()) {

            setError("Name is required.");

            return false;
        }

        if (!nameRegex.test(formData.name.trim())) {

            setError(
                "Name should contain only alphabets and spaces."
            );

            return false;
        }


        // Email validation

        if (!formData.email.trim()) {

            setError("Email is required.");

            return false;
        }

        if (!emailRegex.test(formData.email.trim())) {

            setError(
                "Please enter a valid email address."
            );

            return false;
        }


        // Phone validation

        if (!formData.phone.trim()) {

            setError("Phone number is required.");

            return false;
        }

        if (!phoneRegex.test(formData.phone.trim())) {

            setError(
                "Phone number must contain exactly 10 digits."
            );

            return false;
        }


        // Course validation

        if (!formData.course) {

            setError("Please select a course.");

            return false;
        }


        // Status validation

        if (!formData.status) {

            setError("Please select a status.");

            return false;
        }


        return true;
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // Frontend validation

        if (!validateForm()) {

            return;
        }


        setLoading(true);


        try {

            await createStudent({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                course: formData.course,
                status: formData.status
            });


            navigate("/");


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to create student."
            );


        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="container py-4">

            {/* Header */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    Add Student
                </h1>

                <p className="text-muted">
                    Add a new student to the enrollment system.
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
                                    placeholder="Enter student name"
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
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

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
                                    placeholder="Enter 10 digit phone number"
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

                                    <option value="">
                                        Select Course
                                    </option>

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

                                    <option value="">
                                        Select Status
                                    </option>

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
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add Student"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/")}
                                disabled={loading}
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

export default AddStudent;