import api from "../services/api";

export const fetchTasks = async () => {
const response = await api.get("/tasks");
return response.data;
};

export const createTask = async (formData) => {
    const response = await api.post("/tasks", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
    };

export const updateTask = async (id, updates) => {
const response = await api.put(`/tasks/${id}`, updates);
return response.data;
};

export const deleteTask = async (id) => {
await api.delete(`/tasks/${id}`);
};