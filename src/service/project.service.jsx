import { http } from "../constraints/http.common";

export const projectCreate = (data) => {
    return http.post(`/project/api/project-create`, data)
}

export const getProjects = () => {
    return http.get(`/project/api/projects`)
}

export const getProjectById = (id) => {
    return http.get(`/project/api/project/${id}`)
}

export const updateProject = (id) => {
    return http.put(`/project/api/project-update/${id}`)
}

export const deleteProject = (id) => {
    return http.put(`/project/api/project-delete/${id}`)
}