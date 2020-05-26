const User = require("../models/User");
const bcrypt = require('bcrypt');

// 회원 가입
exports.create = (req, res) => {
    // empty content
    if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).send({ message: "Something empty!" });
        return;
    }
    // 존재하는 계정인지 확인한다.
    User.findOne({
        email: req.body.email,
        provider: 'local'
    })
    // 유저가 있는 경우
    .then(data => {
        if(data != null)
            res.status(400).send("Already has ID");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while checking user."
        });
    })
    // bcrypt를 이용해 hash 처리한다.
    bcrypt.hash(req.body.password, 12)
    .then(password => {
        // hash 처리가 성공하면 회원등록
        User.create({
            email: req.body.email,
            name: req.body.name,
            password: password,
            provider: 'local'
        })
        .then(data => {
            res.status(200).send("sign up success");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sign up fail"
            });
        })
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "Sign up fail"
        });
    })
}
