import axios from 'axios';

// 공통적으로 HTTP 요청 시 필요한 정보들을 모듈화
export default axios.create({
    // server url
    baseURL: 'http://localhost:8080/api',
    // common header
    headers: {
        "Content-type": "application/json"
    }
});