import { http } from "../constraints/http.common";

export const fetchDashboardStats = async () => {
    const [consultants, clients, projects] = await Promise.all([
        http.get(`/consultant/api/consultants`),
        http.get(`/client/api/clients`),
        http.get(`/project/api/projects`)
    ]);

    return {
        consultants: consultants.data.data,
        clients: clients.data.data,
        projects: projects.data.data,
    };
};
