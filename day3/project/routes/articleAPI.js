var express = require('express');
var router = express.Router();

//게시글 데이터 목록 제공 api
//localhost:3000/articleAPI/list
router.get('/list', function(req, res, next) {


    
    //조회된 게시물 목록리스트
    var articleList = [{
        articleIdx:1,
        title:"공지사항입니다.",
        content: "오늘부터 마스크를 벗어도 된다고 합니다. <br>만세...",
        display: "true",
        writer : "강창훈",
        registDate : Date.now()
        },
        {
            articleIdx:2,
            title:"공지사항2입니다.",
            content: "코로나 끝나라 끝나라 끝나라 우에우엑우엑",
            display: "true",
            writer : "누구게",
            registDate : Date.now()
        },
        {
            articleIdx:3,
            title:"공지사항3입니다.",
            content: "리스트가 세개나 있다니 우엑우엑우엑",
            display: "false",
            writer : "맞춰봐",
            registDate : Date.now()
        },
    ];

    //json목록으로 변환해서 브라우저에 전달
  res.json(articleList);
});

module.exports = router;
