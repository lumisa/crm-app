import Request from "./request";
import RequestForm from "./requestForm";

const get = () => Request("/bonificacion").then((res) => res.data);

const getDetail = (id) =>
    Request(`/bonificacion/${id}`).then((res) => res.data);

    const create = (data) =>
    Request("/bonificacion", {
        method: "POST",
        data
    }).then((res) => res.data);

    const updateFile = (id, formData) =>
    RequestForm(`/bonificacion/${id}`, {
      method: "PATCH",
      formData,
    }).then((res) => res.data);

    const update = (id, data) =>
    Request(`/bonificacion/${id}`, {
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


