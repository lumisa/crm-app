import Request from "./request";

const getActivity = ()  => Request('/activity-types').then((res) => res.data);

const getActivityDetail = (id) =>
  Request(`/activity-types/${id}`).then((res) => res.data);

  const create = (data) => 
  Request('/activity-types', {
    method: "POST",
    data
  }).then((res) => res.data);

export default {
    getActivity,
    getActivityDetail,
    create
}