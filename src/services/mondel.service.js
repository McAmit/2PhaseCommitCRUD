import http from "../http-common";
class MondelDataService {
  getAll() {
    return http.get("/mondels");
  }
  get(id) {
    return http.get(`/mondels/${id}`);
  }
  create(data) {
    return http.post("/mondels", data);
  }
  update(id, data) {
    return http.put(`/mondels/${id}`, data);
  }
  delete(id) {
    return http.delete(`/mondels/${id}`);
  }
  deleteAll() {
    return http.delete(`/mondels`);
  }
}
export default new MondelDataService();