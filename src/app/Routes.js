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
    viewStatistic: "/admin/category-statistic",
    verifyUsers: "/admin/verify-users",
    verifyUserId: "/admin/verify-user/:id", // Id
    unVerifyUserId: "/admin/unverify-user/:id", // Id
    viewUsers: "/admin/view-users",
    addUser: "/admin/add-user",
    editUser: "/admin/edit-user/:id", // Id
    deleteUser: "/admin/delete-user/:id", // Id
    viewPermissions: "/admin/view-permissions",
    addPermission: "/admin/add-permission",
    editPermission: "/admin/edit-permission/:id", // Id
    deletePermission: "/admin/delete-permission/:id", // Id
    sendEmailVerificationLink: "/admin/send-email-verification-link",

    // Manager user
    viewEmployee: "/manager/view-employees",
    viewCategories: "/manager/view-categories",
    viewBranches: "/manager/view-branches",
    addEmployee: "/manager/add-employee",
    addCategory: "/manager/add-category",
    addBranch: "/manager/add-branch",
};
