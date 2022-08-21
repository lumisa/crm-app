import Request from "./request";

const get = ()  => Request('/formaPago').then((res) => res.data);

const create = (data) => 
Request("/formaPago", 
{ 
  method: "POST", 
  data 
}).then((res) => res.data);

const getDetail = (id) =>
  Request(`/formaPago/${id}`).then((res) => res.data);

export default {
  get,
  create,
  getDetail,
}