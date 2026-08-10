import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const getStudents = (params = {}) => {
    return API.get("/students", {
        params
    });
};

export const getStudentById = (id) => {
    return API.get(`/students/${id}`);
};

export const createStudent = (studentData) => {
    return API.post("/students", studentData);
};

export const updateStudent = (id, studentData) => {
    return API.put(`/students/${id}`, studentData);
};

export const deleteStudent = (id) => {
    return API.delete(`/students/${id}`);
};