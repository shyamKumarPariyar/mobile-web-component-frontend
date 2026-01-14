import { http } from "../constraints/http.common";

export const clientCreate = (data) => {
    return http.post(`/client/api/client-create`, data)
}

export const getClients = () => {
    return http.get(`/client/api/clients`)
}

export const getClientById = (id) => {
    return http.get(`/client/api/client/${id}`)
}

export const updateClient = (id) => {
    return http.put(`/client/api/client-update/${id}`)
}

export const deleteClient = (id) => {
    return http.put(`/client/api/client-delete/${id}`)
}