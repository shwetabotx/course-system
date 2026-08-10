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

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await createStudent(formData);

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
        <div className="container">

            <h1>Add Student</h1>

            <form onSubmit={handleSubmit}>

                {error && (
                    <p>{error}</p>
                )}

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

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <div>
                    <label>Course</label>

                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option value="React">React</option>
                        <option value="Node">Node</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div>
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Student"}
                </button>

            </form>

        </div>
    );
}

export default AddStudent;