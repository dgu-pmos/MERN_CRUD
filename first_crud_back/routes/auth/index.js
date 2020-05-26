var express = require('express');
var router = express.Router({ mergeParams: true });
// 로그인, 로그아웃 상태 검증 미들웨어
const { isLoggedIn, isNotLoggedIn } = require('../../module/passport/log');
// 패스포트 모듈
const passport = require('passport');
// User controller
const users = require('../../controller/UserController');

// 로그아웃 route
router.get('/signout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send("Sign out success");
});

// passport.authenticate 메소드를 이용해 facebookStrategy를 호출한다.
// 세션이 존재하지 않는 상태인지 isNotLoggedIn으로 확인한다.
router.get('/google/signin', isNotLoggedIn, passport.authenticate('google', {
    scope: ["profile", "email"]
}));

// 구글 로그인을 끝내고 처리하는 콜백함수
// 세션이 존재하지 않는 상태인지 isNotLoggedIn으로 확인한다.
router.get('/google/signin/callback', isNotLoggedIn, passport.authenticate('google'), (req, res) => {
    res.status(200).send("Sign in success");
});

// local login route
router.post('/local/signin', isNotLoggedIn, (req, res, next) => {
    // authenticate는 passport에서 제공하는 함수
    // local Strategy를 호출
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return next(authError);
        }
        if (!user) {
            res.status(400).send("No user");
        }
        // 문제가 없다면 login 메소드를 이용해 세션 저장
        return req.login(user, (loginError) => {
            if (loginError)
                return next(loginError);
            res.status(200).send("Sign in success");
        });
    })(req, res, next);
});

// 회원가입 라우트
router.post('/local/signup', isNotLoggedIn, users.create);

module.exports = router;