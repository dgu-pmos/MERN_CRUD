import http from '../http-common';

// 해당 클래스를 이용해 HTTP request를 구체화
class TutorialDataService {
    getAll() {
        return http.get('/tutorials');
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }
    create(data) {
        return http.post('/tutorials', data);
    }
    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }
    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }
    deleteAll() {
        return http.delete('/tutorials');
    }
    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();