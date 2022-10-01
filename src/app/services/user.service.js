import httpServece from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServece.get(userEndPoint);
        return data;
    }
};

export default userService;
