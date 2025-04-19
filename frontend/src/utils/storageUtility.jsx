export const setTokenToLocalStorage = (token) => localStorage.setItem("practice_token", JSON.stringify(token));

export const getTokenFromLocalStorage = () => {
    //  return localStorage.getItem("practice_token") 
    let token = localStorage.getItem("practice_token");
    if (token) {
        token = token.replace(/"/g, ""); // Remove extra quotes if they exist
    }
    return token || null;
};

export const removeTokenFromLocalStorage = () => { localStorage.removeItem("practice_token") };

export const setCurrentUserDetailsToLocalStorage = (details) => localStorage.setItem("practice_CurrentUserDetails", JSON.stringify(details));

export const getCurrentUserDetailsFromLocalStorage = () => {
    const currentUserDetails = localStorage.getItem("practice_CurrentUserDetails");
    if (currentUserDetails) {
        return JSON.parse(currentUserDetails);
    }
    return {};
};

export const removeCurrentUserDetailsFromLocalStorage = () => { localStorage.removeItem("practice_CurrentUserDetails") };
