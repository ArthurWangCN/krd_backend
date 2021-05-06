const express = require('express');
const Result = require("../model/Result");
const { login } = require("../service/user.js");
const { PWD_SALT } = require("../utils/constant.js");
const { md5 } = require("../utils/index.js");

const router = express.Router()

router.get('/info', function(req, res, next) {
  res.json('user info...')
})

router.post('/login', function(req, res, next) {
  let { username, password } = req.body;
  password = md5(`${password}${PWD_SALT}`);

  login(username, password)
    .then(user => {
      if (!user || user.length === 0) {
        new Result('登录失败').fail(res);
      } else {
        new Result('登录成功').success(res);
      }
    })
  
})

module.exports = router