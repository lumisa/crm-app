import Request from "./request";

const get = () => Request("/subvencion").then((res) => res.data);

const getDetail = (id) =>
    Request(`/subvencion/${id}`).then((res) => res.data);

    const create = (data) =>
    Request("/subvencion", {
        method: "POST",
        data
    }).then((res) => res.data);

    export default {
        get,
        getDetail,
        create
    }


