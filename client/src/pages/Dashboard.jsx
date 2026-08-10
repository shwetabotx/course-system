import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getStudents,
    deleteStudent
} from "../services/studentService";

function Dashboard() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load students.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteStudent(id);

            // Remove deleted student from the current table
            setStudents((currentStudents) =>
                currentStudents.filter(
                    (student) => student._id !== id
                )
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete student."
            );

        }
    };

    const totalStudents = students.length;

    const activeStudents = students.filter(
        (student) => student.status === "Active"
    ).length;

    const completedStudents = students.filter(
        (student) => student.status === "Completed"
    ).length;

    const droppedStudents = students.filter(
        (student) => student.status === "Dropped"
    ).length;

    return (
        <div className="container">

            <h1>Student Course Enrollment System</h1>

            {/* Dashboard Cards */}

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Students</h3>
                    <p>{totalStudents}</p>
                </div>

                <div className="card">
                    <h3>Active Students</h3>
                    <p>{activeStudents}</p>
                </div>

                <div className="card">
                    <h3>Completed</h3>
                    <p>{completedStudents}</p>
                </div>

                <div className="card">
                    <h3>Dropped</h3>
                    <p>{droppedStudents}</p>
                </div>

            </div>

            {/* Student Table */}

            <div className="student-section">

                <div className="student-header">

                    <h2>Students</h2>

                    <Link to="/add-student">
                        <button>
                            Add Student
                        </button>
                    </Link>

                </div>

                {loading && (
                    <p>Loading students...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading && !error && (

                    <table>

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Course</th>
                                <th>Enrollment Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {students.length === 0 ? (

                                <tr>
                                    <td colSpan="7">
                                        No students found
                                    </td>
                                </tr>

                            ) : (

                                students.map((student) => (

                                    <tr key={student._id}>

                                        <td>
                                            {student.name}
                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.phone}
                                        </td>

                                        <td>
                                            {student.course}
                                        </td>

                                        <td>
                                            {new Date(
                                                student.enrollmentDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            {student.status}
                                        </td>

                                        <td>

                                            <Link
                                                to={`/edit-student/${student._id}`}
                                            >
                                                <button>
                                                    Edit
                                                </button>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(student._id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default Dashboard;