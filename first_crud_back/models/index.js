const mongoose = require('mongoose');
require('dotenv').config();

// 접근할 몽고디비의 정보들을 .env로부터 갖고온다.
const {
    NODE_ENV,
    MONGO_URL
} = process.env;
// 접근할 몽고디비 URL

module.exports = () => {
    const connect = () => {
        if (NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'tutorial',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };

    connect();

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    });

    require('./Tutorial');
};
