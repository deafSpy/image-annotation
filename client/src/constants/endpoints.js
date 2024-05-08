const END_POINTS = {
    GET_FILE: "api/s3/get", // :key
    UPLOAD_FILE: "api/s3/upload",
    DELETE_FILE: "api/s3/delete", // :key 
    LIST_ALL_FILES: "api/s3/files",
    LOGIN: "api/auth/login",
    REGISTER: "api/auth/register",
    LOGOUT: "api/auth/logout",
    CREATE_IMAGE: "api/image/create",
    UPDATE_IMAGE: "api/image/update", // :id 
    DELETE_IMAGE: "api/image/delete", // :id 
    GET_IMAGE: "api/image/", // :id 
    GET_ALL_IMAGES: "api/image/all",
    GET_IMAGES_BY_USER_ID: "api/image/user", // :userID 
    GET_USER_BY_ID: "api/user/", // :id

}

export default END_POINTS