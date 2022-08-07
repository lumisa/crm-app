import Request from "./request";
import RequestForm from "./requestForm";

const get = () => Request("/subvencion").then((res) => res.data);

const getDetail = (id) =>
    Request(`/subvencion/${id}`).then((res) => res.data);

    const create = (data) =>
    Request("/subvencion", {
        method: "POST",
        data
    }).then((res) => res.data);

    const updateFile = (id, formData) =>
    RequestForm(`/subvencion/${id}`, {
      method: "PATCH",
      formData,
    }).then((res) => res.data);

    const update = (id, data) =>
    Request(`/subvencion/${id}`, {
        method: "PATCH",
        data
    }).then((res) => res.data);

    export default {
        get,
        getDetail,
        create,
        updateFile,
        update
    }


