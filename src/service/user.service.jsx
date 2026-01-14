import { http } from "../constraints/http.common";

export const userLogin = (data) => {
    return http.post(`/users/api/user-login`, data)
}

export const superUserLogin = (data) => {
    return http.post(`/users/api/super-user-login`, data)
}

export const getUserDetails = (_id) => {
    return http.get(`/users/api/get-user-details/${_id}`);
}

export const getUserRoles = () => {
    return http.get(`/users/api/get-roles`);
}

export const getUserRolesForAdmin = () => {
    return http.get(`/users/api/get-admin-roles`);
}

export const getUserRolesForSuperAdmin = () => {
    return http.get(`/users/api/get-super-admin-roles`);
}

export const getAllUserList = () => {
    return http.get(`/users/api/get-all-users`);
}

export const addNewMember = (data) => {
    return http.post(`/users/api/user-add`, data);
}

export const updateMember = (id, data) => {
    return http.put(`/users/api/user-update/${id}`, data);
}

export const updateAdminMember = (id, data) => {
    return http.put(`/users/api/user-admin-update/${id}`, data);
}

export const updateUserPassword = (id, data) => {
    return http.put(`/users/api/user-password-update/${id}`, data);
}

export const removeMember = (_id) => {
    return http.delete(`/users/api/delete-team-member/${_id}`)
}

export const userSoftDelete = (_id) => {
    return http.put(`/users/api/user-soft-delete/${_id}`)
}