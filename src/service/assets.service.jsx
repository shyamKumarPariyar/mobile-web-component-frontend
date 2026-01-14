import { http } from "../constraints/http.common";

export const addThreeDAssets = (data) => {
    return http.post(`/assets/api/add-threed-asset`, data);
}

export const updateThreeDAssets = (_id, data) => {
    return http.put(`/assets/api/update-threed-asset/${_id}`, data);
}

export const updateCustomizedThreeDAssets = (_id, data) => {
    return http.put(`/assets/api/update-customized-threed-asset/${_id}`, data);
}

export const getAll3DAssets = () => {
    return http.get(`/assets/api/get-all-threed-assets`);
}

export const getOrganizationAllAssets = (_id, _params) => {
    return http.get(`/assets/api/get-organization-all-threed-assets/${_id}/${_params}`);
}

export const getOrganizationFiveAssets = (_id) => {
    return http.get(`/assets/api/get-organization-five-threed-assets/${_id}`);
}

export const getAssignedAllUserAssets = (_id, _params) => {
    return http.get(`/assets/api/get-users-all-assigned-threed-assets/${_id}/${_params}`);
}

export const getThreeDAssetById = (_id) => {
    return http.get(`/assets/api/get-threed-asset-by-id/${_id}`);
}

export const checkOrganizationCustomizedData = (_assetId, _orgId) => {
    return http.get(`/assets/api/check-customized-asset-data-by-org-id/${_assetId}/${_orgId}`);
}

export const getThreeDAssetByAssetId = (_id) => {
    return http.get(`/assets/api/get-threed-asset-by-asset-id/${_id}`);
}

export const removeThreeDAssetById = (_id) => {
    return http.delete(`/assets/api/delete-threed-asset/${_id}`);
}

export const shareThreeDAssetsToOrganizations = (data) => {
    return http.post(`/assets/api/share-threed-asset`, data);
}

export const shareThreeDAssetsToOrganizationsUser = (data) => {
    return http.post(`/assets/api/share-threed-asset-to-users`, data);
}

export const unShareThreeDAssetsFromOrganization = (orgId, data) => {
    return http.post(`/assets/api/un-share-threed-asset/${orgId}`, data);
}

export const unAssignThreeDAssetsFromUsers = (userId, data) => {
    return http.post(`/assets/api/un-assign-threed-asset-from-user/${userId}`, data);
}

export const generateBypassURL = (data) => {
    return http.post(`/assets/api/generate-demo-link/`, data);
}
