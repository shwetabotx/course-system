import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getStudents,
    deleteStudent
} from "../services/studentService";

function Dashboard() {

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
                search,
                course,
                status,
                page,
                limit: 5,
                sort
            });

            setStudents(response.data.data);

            setTotalPages(
                response.data.pagination.totalPages
            );

            if (response.data.stats) {
                setStats(response.data.stats);
            }

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

    // Search, filter, sorting and pagination
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

            loadStudents();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete student."
            );

        }
    };


    return (

        <div className="container py-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold mb-1">
                        Student Course Enrollment
                    </h1>

                    <p className="text-muted mb-0">
                        Manage students and their enrolled courses
                    </p>

                </div>

                <Link
                    to="/add-student"
                    className="btn btn-primary"
                >
                    + Add Student
                </Link>

            </div>


            {/* Dashboard Cards */}

            <div className="row g-3 mb-4">

                <div className="col-md-6 col-lg-3">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Total Students
                            </p>

                            <h2 className="fw-bold">
                                {stats.total}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-6 col-lg-3">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Active Students
                            </p>

                            <h2 className="fw-bold">
                                {stats.active}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-6 col-lg-3">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Completed
                            </p>

                            <h2 className="fw-bold">
                                {stats.completed}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-6 col-lg-3">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Dropped
                            </p>

                            <h2 className="fw-bold">
                                {stats.dropped}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>


            {/* Search and Filters */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="fw-bold mb-3">
                        Search & Filter
                    </h5>

                    <div className="row g-3">

                        {/* Search */}

                        <div className="col-md-6">

                            <label className="form-label">
                                Search
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(event) => {

                                    setSearch(event.target.value);
                                    setPage(1);

                                }}
                            />

                        </div>


                        {/* Course */}

                        <div className="col-md-3">

                            <label className="form-label">
                                Course
                            </label>

                            <select
                                className="form-select"
                                value={course}
                                onChange={(event) => {

                                    setCourse(event.target.value);
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

                        </div>


                        {/* Status */}

                        <div className="col-md-3">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(event) => {

                                    setStatus(event.target.value);
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

                        </div>


                        {/* Sorting */}

                        <div className="col-md-3">

                            <label className="form-label">
                                Sort By
                            </label>

                            <select
                                className="form-select"
                                value={sort}
                                onChange={(event) => {

                                    setSort(event.target.value);
                                    setPage(1);

                                }}
                            >

                                <option value="">
                                    Default
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

                </div>

            </div>


            {/* Student Table */}

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="fw-bold mb-0">
                            Students
                        </h5>

                        <span className="text-muted">
                            {students.length} records
                        </span>

                    </div>


                    {/* Loading */}

                    {loading && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                            <p className="mt-2 text-muted">
                                Loading students...
                            </p>

                        </div>

                    )}


                    {/* Error */}

                    {!loading && error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}


                    {/* Table */}

                    {!loading && !error && (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

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

                                            <td
                                                colSpan="7"
                                                className="text-center py-5 text-muted"
                                            >

                                                No students found.

                                            </td>

                                        </tr>

                                    ) : (

                                        students.map((student) => (

                                            <tr key={student._id}>

                                                <td className="fw-semibold">
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

                                                    <span
                                                        className={`badge ${
                                                            student.status === "Active"
                                                                ? "text-bg-success"
                                                                : student.status === "Completed"
                                                                ? "text-bg-primary"
                                                                : "text-bg-danger"
                                                        }`}
                                                    >

                                                        {student.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            to={`/edit-student/${student._id}`}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    student._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}


                    {/* Pagination */}

                    {!loading && !error && students.length > 0 && (

                        <div className="d-flex justify-content-between align-items-center mt-3">

                            <button
                                className="btn btn-outline-secondary"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage(page - 1)
                                }
                            >
                                ← Previous
                            </button>


                            <span className="fw-semibold">
                                Page {page} of {totalPages}
                            </span>


                            <button
                                className="btn btn-outline-secondary"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage(page + 1)
                                }
                            >
                                Next →
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}

export default Dashboard;