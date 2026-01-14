import axios from "axios";

export const fetchDashboardStats = async () => {
    const [consultants, clients, projects, contents] = await Promise.all([
        axios.get("/api/consultants"),
        axios.get("/api/clients"),
        axios.get("/api/projects"),
        axios.get("/api/contents")
    ]);

    return {
        consultants: consultants.data.data,
        clients: clients.data.data,
        projects: projects.data.data,
        contents: contents.data.data
    };
};
