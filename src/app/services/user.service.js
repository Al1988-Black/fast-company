import httpServece from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServece.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServece.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    getId: async (id) => {
        const { data } = await httpServece.get(userEndPoint + id);
        const { content } = data;
        console.log(content);
    }
};

export default userService;
