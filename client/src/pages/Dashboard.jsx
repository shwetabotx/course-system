import { Link } from "react-router-dom";
function Dashboard() {
    return (
        <div className="container">

            <h1>Student Course Enrollment System</h1>

            {/* Dashboard Cards */}

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Students</h3>
                    <p>0</p>
                </div>

                <div className="card">
                    <h3>Active Students</h3>
                    <p>0</p>
                </div>

                <div className="card">
                    <h3>Completed</h3>
                    <p>0</p>
                </div>

                <div className="card">
                    <h3>Dropped</h3>
                    <p>0</p>
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

                        <tr>
                            <td colSpan="7">
                                No students found
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}
export default Dashboard;