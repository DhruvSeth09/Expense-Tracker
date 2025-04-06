export const BASE_URL = "http://localhost:8080/api/v1";

export const API_PATHS={
    AUTH:{
        LOGIN:"/auth/login",
        REGISTER:"/auth/register",
        GET_USER_INFO:"/auth/getUser",
        LOGOUT:"/auth/logout"
    },
    DASHBOARD:{
        GET_DATA:"/dashboard",
    },
    INCOME:{
        ADD_INCOME: "/income/add",
        GET_ALL_INCOME: "/income/get",
        DELETE_INCOME: (incomeId)=> `/income/${incomeId}`,
        DOWNLOAD_INCOME:"/income/downloadexcel",
        UPDATE_INCOME: (incomeId)=> `/income/${incomeId}`
    },
    EXPENSE:{
        ADD_EXPENSE: "/expense/add",
        GET_ALL_EXPENSE: "/expense/get",
        DELETE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
        DOWNLOAD_EXPENSE:"/expense/downloadexcel",
        UPDATE_EXPENSE: (expenseId) => `/expense/${expenseId}`
    },
    IMAGE:{
        UPLOAD_IMAGE:"/auth/upload-image"
    },
}