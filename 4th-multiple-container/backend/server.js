const express = require("express");
const bodyParser = require("body-parser");

// export 된 db pool 불러오기
const db = require('./db');
const { removeAllListeners } = require("nodemon");

// express 서버 생성
const app = express();

// json 형태의 요청을 처리하기 위해
app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})

// db lists 테이블에 있는 데이터를 프론트 서버에 보내주기
app.get('/api/values', function (req, res) {
    // 데이터베이스에서 모든 정보 가져오기
    db.pool.query('select * from lists;',
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣기
app.post('/api/value', function (req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})

app.listen(5000, () => {
    console.log("애플리케이션이 5000번 포트에서 시작되었습니다.")
})
