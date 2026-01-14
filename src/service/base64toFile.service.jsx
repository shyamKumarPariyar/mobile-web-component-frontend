/**
 * Converts a base64 string to a file object
 * @param base64String string
 * @returns file object
 */
export const base64ToFile = (base64String, fileName) => {
    let arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, { type: mime });
};