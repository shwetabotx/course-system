import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getStudents,
    deleteStudent
} from "../services/studentService";

function Dashboard() {

    // Students
    const [students, setStudents] = useState([]);

    // Search and filters
    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");

    // Loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Dashboard statistics
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        completed: 0,
        dropped: 0
    });


    // Load students
    const loadStudents = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getStudents({

                search: search,
                course: course,
                status: status,

                page: page,
                limit: 5,

                sort: sort

            });

            // Students for current page
            setStudents(response.data.data);

            // Overall dashboard statistics
            setStats(
                response.data.stats || {
                    total: 0,
                    active: 0,
                    completed: 0,
                    dropped: 0
                }
            );

            // Pagination
            setTotalPages(
                response.data.pagination?.totalPages || 1
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load students."
            );

        } finally {

            setLoading(false);

        }

    };


    // Search, filters, sorting and pagination
    useEffect(() => {

        const timer = setTimeout(() => {

            loadStudents();

        }, 500);

        return () => {

            clearTimeout(timer);

        };

    }, [search, course, status, sort, page]);


    // Delete student
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteStudent(id);

            // If deleting the last student on a page,
            // move back to the previous page.
            if (students.length === 1 && page > 1) {

                setPage(page - 1);

            } else {

                loadStudents();

            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete student."
            );

        }

    };


    return (

        <div className="container">

            <h1>
                Student Course Enrollment System
            </h1>


            {/* Dashboard Cards */}

            <div className="dashboard-cards">

                <div className="card">

                    <h3>
                        Total Students
                    </h3>

                    <p>
                        {stats.total}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Active Students
                    </h3>

                    <p>
                        {stats.active}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Completed
                    </h3>

                    <p>
                        {stats.completed}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Dropped
                    </h3>

                    <p>
                        {stats.dropped}
                    </p>

                </div>

            </div>


            {/* Search and Filters */}

            <div className="student-section">

                <h2>
                    Search & Filter
                </h2>

                <div className="filters">

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(event) => {

                            setSearch(
                                event.target.value
                            );

                            setPage(1);

                        }}
                    />


                    {/* Course */}

                    <select
                        value={course}
                        onChange={(event) => {

                            setCourse(
                                event.target.value
                            );

                            setPage(1);

                        }}
                    >

                        <option value="">
                            All Courses
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


                    {/* Status */}

                    <select
                        value={status}
                        onChange={(event) => {

                            setStatus(
                                event.target.value
                            );

                            setPage(1);

                        }}
                    >

                        <option value="">
                            All Status
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


                    {/* Sort */}

                    <select
                        value={sort}
                        onChange={(event) => {

                            setSort(
                                event.target.value
                            );

                            setPage(1);

                        }}
                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="name">
                            Name
                        </option>

                        <option value="enrollmentDate">
                            Enrollment Date
                        </option>

                    </select>

                </div>

            </div>


            {/* Student Table */}

            <div className="student-section">

                <div className="student-header">

                    <h2>
                        Students
                    </h2>

                    <Link to="/add-student">

                        <button>
                            Add Student
                        </button>

                    </Link>

                </div>


                {/* Loading */}

                {loading && (

                    <p>
                        Loading students...
                    </p>

                )}


                {/* Error */}

                {error && (

                    <p>
                        {error}
                    </p>

                )}


                {/* Table */}

                {!loading && !error && (

                    <>

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Enrollment Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {students.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                        >
                                            No students found
                                        </td>

                                    </tr>

                                ) : (

                                    students.map(
                                        (student) => (

                                            <tr
                                                key={
                                                    student._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        student.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.phone
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.course
                                                    }
                                                </td>

                                                <td>

                                                    {new Date(
                                                        student.enrollmentDate
                                                    ).toLocaleDateString()}

                                                </td>

                                                <td>
                                                    {
                                                        student.status
                                                    }
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
                                                        onClick={() =>
                                                            handleDelete(
                                                                student._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>


                        {/* Pagination */}

                        <div className="pagination">

                            <button
                                disabled={
                                    page === 1 ||
                                    loading
                                }
                                onClick={() =>
                                    setPage(
                                        page - 1
                                    )
                                }
                            >
                                Previous
                            </button>


                            <span>
                                Page {page} of {totalPages}
                            </span>


                            <button
                                disabled={
                                    page === totalPages ||
                                    loading
                                }
                                onClick={() =>
                                    setPage(
                                        page + 1
                                    )
                                }
                            >
                                Next
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}

export default Dashboard;