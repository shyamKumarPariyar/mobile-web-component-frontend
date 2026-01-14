import { http } from "../constraints/http.common";

export const clientCreate = (data) => {
    return http.post(`/consultant/api/consultant-create`, data)
}

export const getConsultants = () => {
    return http.get(`/consultant/api/consultants`)
}

export const getConsultantById = (id) => {
    return http.get(`/consultant/api/consultant/${id}`)
}

export const updateConsultant = (id) => {
    return http.put(`/consultant/api/consultant-update/${id}`)
}

export const deleteConsultant = (id) => {
    return http.put(`/consultant/api/consultant-delete/${id}`)
}