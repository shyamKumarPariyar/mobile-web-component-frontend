import { http } from "../constraints/http.common";

export const projectCreate = (data) => {
    return http.post(`/project/api/project-create`, data)
}

export const getProjects = () => {
    return http.get(`/project/api/projects`)
}

export const getClientProjects = (id) => {
    return http.get(`/project/api/client-projects/${id}`)
}

export const getConsultantAssignedProjects = (id) => {
    return http.get(`/project/api/consultant-assigned-projects/${id}`)
}

export const getProjectById = (id) => {
    return http.get(`/project/api/project/${id}`)
}

export const updateProject = (id, data) => {
    return http.put(`/project/api/project-update/${id}`, data)
}

export const updateProjectStatus = (id, data) => {
    return http.put(`/project/api/project-status-update/${id}`, data)
}

export const deleteProject = (id) => {
    return http.put(`/project/api/project-delete/${id}`)
}