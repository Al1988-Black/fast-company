import httpServece from "./http.service";

const professionEndPoint = "profession/";

const proffesionService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(professionEndPoint);
        return data;
    }
};

export default proffesionService;
