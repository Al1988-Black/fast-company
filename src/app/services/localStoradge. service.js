const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const LOCALID_KEY = "jwt-local-id";
const REGISTERED = "jwt-registored";

export function setTokens({
    refreshToken,
    idToken,
    expiresIn = 3600,
    localId,
    registered = null
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    if (registered === null) {
        localStorage.setItem(TOKEN_KEY, idToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(EXPIRES_KEY, expiresDate);
    }
    if (registered) {
        localStorage.setItem(TOKEN_KEY, idToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(EXPIRES_KEY, expiresDate);
        localStorage.setItem(LOCALID_KEY, localId);
        localStorage.setItem(REGISTERED, registered);
    }
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshKey() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStoradgeService = {
    setTokens,
    getAccessToken,
    getRefreshKey,
    getTokenExpiresDate
};
export default localStoradgeService;
