export const ROUTES = {
    //domain
    baseUrl: "http://127.0.0.1:8000/",
    baseApiUrl: "http://127.0.0.1:8000/api",

    // Commom to all
    home: "/",
    about: "/about",
    notFound: "*",

    // Without login
    login: "/login",

    // With logged in common to all user
    logout: "/logout",
    dashboard: "/dashboard",
    viewProfile: "/dashboard/view-profile",
    editProfile: "/dashboard/edit-profile",
    changeProfilePic: "/dashboard/change-profile-picture",
    changePassword: "/dashboard/change-password",

    // Admin user
    verifyUsers: "/admin/verify-users",
    viewUsers: "/admin/view-users",
    viewPermissions: "/admin/view-permissions",
    addUser: "/admin/add-user",
    addPermission: "/admin/add-permission",
    sendVerificationLink: "/admin/send-verification-link",

    // Manager user
    viewEmployee: "/manager/view-employees",
    viewCategories: "/manager/view-categories",
    viewBranches: "/manager/view-branches",
    addEmployee: "/manager/add-employee",
    addCategory: "/manager/add-category",
    addBranch: "/manager/add-branch",
};
