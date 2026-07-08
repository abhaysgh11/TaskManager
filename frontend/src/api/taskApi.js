
const URL = "http://localhost:5001/tasks";

export async function fetchTasks() {
const res = await fetch(URL);
if (!res.ok) throw new Error("Failed to fetch tasks");
return res.json();
}

export async function createTask(t) {
const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: t }),
});
if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create task");
}
return res.json();
}

export async function updateTask(id, updates) {
const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
});
if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update");
}
return res.json();
}

export async function deleteTask(id) {
const res = await fetch(`${URL}/${id}`, { method: "DELETE" });
if (!res.ok) throw new Error("Failed to delete task");
}
