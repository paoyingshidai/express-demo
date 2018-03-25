var express = require('express');
var router = express.Router();
var User = require("../models/User")

/* GET home page. */
router.get('/', function(req, res, next) {

    /**
     * 这里可以写相应的业务，然后在通过 res 转发
     */

    res.render('login', { title: 'my Express' });
});


/**
 * 这里通过查询 mongodb 来实现登录验证
 *
 *
 */
router.get('/login', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;

    var query = User.findOne({username : username});
    query.select('username password');
    query.exec(function (err, user) {

        if (!err) {

            if (user != null && user.username === username) {
                console.log("-----------------");
                res.render('loginresult', { msg: 'login failed : for username has been registed ' });
            } else {
                var user = new User({username:username, password:password});
                user.save();
                res.render('loginresult', { msg: 'loginsuccess' });
            }
            return ;
        } else {
            console.log(err);
        }
    });
    // 注意这里不能重复 res.render(); 否则会报错，因为query.exec 的毁掉函数是异步执行的两个程序；
});

module.exports = router;
