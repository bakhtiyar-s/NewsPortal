import http from "../http-common";
import authHeader from "./auth.header";

class NewsDataService {
    getAll() {
        return http.get("/news", { headers: authHeader() });
    }

    get(id) {
        return http.get(`/news/${id}`, { headers: authHeader() });
    }

    create(data) {
        return http.post("/news/add", data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`/update/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(`/delete/${id}`, { headers: authHeader() });
    }
}

export default new NewsDataService();
