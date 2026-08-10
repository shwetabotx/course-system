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

    useEffect(() => {
        loadStudent();
    }, [id]);

    const loadStudent = async () => {

        try {

            const response = await getStudentById(id);

            const student = response.data.data;

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

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSaving(true);

        try {

            await updateStudent(id, {
                name: formData.name,
                phone: formData.phone,
                course: formData.course,
                status: formData.status
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

    if (loading) {
        return (
            <div className="container">
                <p>Loading student...</p>
            </div>
        );
    }

    return (
        <div className="container">

            <h1>Edit Student</h1>

            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                {/* Name */}

                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={formData.email}
                        disabled
                    />
                </div>

                <small>
                    Email cannot be changed.
                </small>

                {/* Phone */}

                <div>
                    <label>Phone</label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        required
                    />
                </div>

                {/* Course */}

                <div>
                    <label>Course</label>

                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
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

                <div>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
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

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Updating..." : "Update Student"}
                </button>

            </form>

        </div>
    );
}

export default EditStudent;