// 로그인 된 상태인지 확인하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
    // req.isAuthenticated()가 true 라면 OK
    if (req.isAuthenticated())
        next();
    else
        res.status(400).send("need to sign in");
};

// 로그인 된 상태가 아닌지 확인하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
    // req.isAuthenticated()가 false 라면 OK
    if (!req.isAuthenticated())
        next();
    else
        res.status(400).send("already sign in");
};