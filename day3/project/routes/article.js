
//node express 객체를 참조한다.
//노드에서 특정 패키지 또는 프레임워크의 기능을 불러와 사용하고자 할떄는
//require 명령어를 사용

var express = require('express');

//express객체의 Router메소드를 호출해 라우팅 객체를 생성한다.
//라우팅 객체는 사용자 요청 URL에 대한 처리를 담당하는 각종 기능을 제공한다. 
var router = express.Router();

//라우팅객체에 get방식 호출 라우팅메소드 정의
//get 메소드('사용자가 호출할 url 주소', url 호출시 실행될 기능(함수)정의)
//url 호출시 실행될 기능(함수)에는 사용자 브라우저로부터 전달되는 각종정보(req객체 = httprequest 객체)와
//gkatnrk tlfgodgndp qmfkdnwjdp wjsekfehlf dmdekqrorcp(res = httpresponse 객체)가 매개변수 = 파라미터로 전달된다.

//router.get 메소드는 웹브라우저가 최초로 웹페이지를 호출하는 방법

//router.get('/list', function(req,res,next){

    //response객체의 render()메소드는 뷰파일(views/~ .ejs)을 호출하고 
    //view파일의 최종 html결과물을 웹브라우저로 전달한다.
    //res.render("해당뷰파일", "뷰파일에 전달할 데이터")
//    res.render("/article/list");
//});


//리스트 불러오기
router.get('/list', function(req, res, next){ 

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

    //게시글 목록 데이터를 목록 뷰페이지인 List.ejs 페이지에 전달함
    res.render('article/list', {data:articleList});
});

//게시글 작성 get
router.get('/regist', function(req,res,next){

    var article = {
        articleIdx:1,
        title:"공지사항입니다.",
        content: "오늘부터 마스크를 벗어도 된다고 합니다. <br>만세...",
        display: "true",
        writer : "강창훈",
        registDate : Date.now()
    };

    //views/article/regist.ejs 뷰파일에 데이터를 전달한다.
    res.render('article/regist',article);
});

//브라우저에서 post방식으로 데이터를 전송하는 경우 해당 라우팅메소드가 데이터 수신
//post('url주소', 처리함수(req,res))
//사용자가 입력한 게시글 데이터를 DB에 저장하고 결과를 반환한다.


//게시글 작성 post
router.post('/regist', function(req,res){

    console.log("백엔드 로그입니다.");

    //웹브라우저에서 사용자가 입력한 데이터는 req.body 객체에 속성으로 접근한다.
    //req.body 객체에 속성명은 ui 요소 name 속성값으로 접근한다.
    console.log("웹브라우저에서 전달된 제목",req.body.title);

    //브라우저에서 사용자가 입력한 데이터로 객체세팅
    var article = {
        articleIdx:1,
        title:req.body.title,
        content: req.body.content,
        display: req.body.display,
        writer : req.body.writer,
        registDate : Date.now()
    };

    console.log("DB저장 데이터", article);

    //DB저장

    //저장후 목록으로 이동
    return res.render("article/list", {data:[article]})
});


//쿼리 게시글 수정
router.post('/modify', function(req,res,next){

    //article 1 URL에 포함된 값을 {id} 값으로 추출할떄
    //req.params.{변수값}으로 추출한다.


    //해당글의 고유번호로 DB에서 최근 해당 게시글정보를 조회한다.

    //step1
    //DB에서 가져온 해당 게시글 정보
    var articleIdx = req.query.Idx;

    var article = {
        articleIdx:1,
        title:"공지사항입니다.",
        content: "오늘부터 마스크를 벗어도 된다고 합니다. <br>만세...",
        display: "true",
        writer : "강창훈",
        registDate : Date.now()
    };

    //step3업데이트한 데이터를 최종 db에 반영한다.
    res.render('article/modify', article);
});


//쿼리 게시글 수정 저장
router.post('/modifysave', function(req,res,next){

    //article 1 URL에 포함된 값을 {id} 값으로 추출할떄
    //req.params.{변수값}으로 추출한다.


    //해당글의 고유번호로 DB에서 최근 해당 게시글정보를 조회한다.

    //step1
    //DB에서 가져온 해당 게시글 정보
    var articleIdx = req.body.articleIdx;
    
    //step2
    //DB에서 가져온 정보를 화면에서 전달된 정보로 수정한다.
    article.title = req.body.title;
    article.content = req.body.content;
    article.display = req.body.display;
    article.writer = req.body.writer;
    article.registDate = req.body.registDate;


    //step3업데이트한 데이터를 최종 db에 반영한다.
    console.log(article);

    res.render('article/modify', {data:[]});
});














//게시글 수정
//파라미터 타입 라우팅 메소드는 라우팅 파일 맨 하단에 정의할것
router.get('/:id', function(req,res,next){

    //article 1 URL에 포함된 값을 {id} 값으로 추출할떄
    //req.params.{변수값}으로 추출한다.

    //localhost:3000/article/modif?id=1&productcode=aaaa
    //req.query.키명(id or productcode)으로 전달된 값을 추출할 수 있다.
    var articleIdx = req.params.id;
    console.log("전달된 글의 고유번호", articleIdx);

    //해당글의 고유번호로 DB에서 최근 해당 게시글정보를 조회한다.

    //DB에서 가져온 해당 게시글 정보
    var article = {
        articleIdx:1,
        title:"공지사항입니다.",
        content: "오늘부터 마스크를 벗어도 된다고 합니다. <br>만세...",
        display: "true",
        writer : "강창훈",
        registDate : Date.now()
    };
    
    res.render('article/modify', article);
});



//상단에 정의한 router객체를 모듈외부로 노추리킨다.
//모듈내에 정의된 기능과 속성을 외부에 노출하려면 module.exports를 사용한다.
module.exports = router;
