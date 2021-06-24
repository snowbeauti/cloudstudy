
//node express 객체를 참조한다.
//노드에서 특정 팩키지 또는 프레임워크의 기능을 불러와 사용하고자할떄는 
//require란 명령어 사용합니다.

var express = require('express');

//express객체의 Router메소드를 호출해 라우팅 객체를 생성한다.
//라우팅 객체는 사용자 요청 URL에 대한 처리를 담당하는 각종 기능을 제공한다.
var router = express.Router();


//DB객체를 참조한다.
var db = require('../models/index');

//DB 프로그래밍을 위한 모델 객체(DB객체의 속성명)를 참조한다.
//var Board = require('../models/index').Board;
var Board = db.Board;

//라우팅객체를 이용해 get 방식 호출 라우팅메소드 정의
//get메소드('사용자가 호출할 url주소',url호출시 실행될 기능(함수)정의)
//url호출시 실행될 기능(함수)에는 사용자브라우저로부터 전달되는 각종정보(req객체=httprequest객체)와
//함수가 실행후에 브라우저에 전달될 응답객체(res= httpresponse 객체)가 매개변수=파라메터로 전달된다.
//브라우저에서 데이터를 보낼떄 get방식으로 전달하면 서버 라우팅 메소드에서도 get메소드로 받아야한다.
//post방식으로 보내면 post로 put방식으로 보내면 put으로 delete으로보내면 delete로 라우팅 메소드를 정의합니다.
//router.get메소드는 웹브라우저가 최초로 웹페이지를 호출할떄 사용하는방식
// router.get('/list',function(req,res,next){
//     //response객체의 render()메소드는 뷰파일(views/~.ejs)을 호출하고
//     //VIEW파일의 최종 HTML결과물을 웹브라우저로 전달한다.
//     //res.render("해당뷰파일","뷰파일에 전달할 데이터");
//     res.render("article/list");
// });


//라우터 파일을 만들면 반드시 app.js 파일내에 라우팅 파일을 등록해준다.
//등록 후 기본 라우팅 주소를 정의한다.


//게시글 목록 화면 반환
//localhost:3000/article/list
router.get('/list',function(req,res,next){

    //DB에서 최신게시글 목록을 조회합니다.

    //조회된 게시글 목록 데이터 
    var articleList = [
        { 
            articleIdx:1,
            title:"공지사항입니다.1111",
            contents:"오늘부터 마스크를 벗어도 된다고 합니다.<br> 만세...",
            display:true,
            writer:"강창훈",
            registDate:Date.now()
        },
        { 
            articleIdx:2,
            title:"공지사항입니다.2222",
            contents:"아직 주사를 못 맞았네요...ㅠㅠ",
            display:false,
            writer:"강민서",
            registDate:Date.now()
        },
        { 
            articleIdx:3,
            title:"공지사항입니다.33333333",
            contents:"얀센 맞았지롱.....",
            display:true,
            writer:"강현서",
            registDate:Date.now()
        },
    ];

    //게시글 목록 데이터를 목록 뷰페이지인 list.ejs파일에 전달한다.
    res.render("article/list",{ data:articleList });

});








//게시글 등록화면 최초호출시 반환
//localhost:3000/article/regist
router.get('/regist', function(req, res, next) {

    //데이터 객체 정의 및 데이터 정의
    var article = { 
        articleIdx:1,
        title:"공지사항입니다.",
        contents:"오늘부터 마스크를 벗어도 된다고 합니다.<br> 만세...",
        display:true,
        writer:"강창훈",
        registDate:Date.now()
    };

    //views/article/regist.ejs 뷰파일에 데이터를 전달한다.
    res.render('article/regist',article);
});

//브라우저에서 post 방식으로 데이터를 전송하는 경우 해당 라우팅메소드가 데이터 수신
//post('URL주소',처리함수(req,res))
//사용자가 입력한 게시글 데이터를 DB에 저장하고 결과를 반환한다.
router.post('/regist',function(req,res){

    console.log("백엔드 로그입니다.");
    
    //웹브라우저에서 사용자가 입력한 데이터는 req.body객체에 속성으로 접근한다.
    //req.body객체에 속성명은 ui 요소의 name속성값으로 접근한다.
    console.log("웹브라우저에서 전달된 제목: ",req.body.title);

    //브라우저에서 사용자가 입력한 데이터로 객체세팅
    var article = { 
        articleIdx:1,
        title:req.body.title,
        contents:req.body.contents,
        display:req.body.display,
        writer:req.body.writer,
        registDate:Date.now()
    };

    //DB에 저장처리
    console.log("DB저장 데이터확인:",article);

    //저장후 목록 페이지로 이동
    return res.render("article/list",{data:[]});

});


//게시글 수정 페이지 호출
//localhost:3000/article/modify?id=1
router.get('/modify', function(req, res, next) {

    //localhost:3000/article/modify?id=1&productcode=aaaa
    //상기와 같이 쿼리스트링방식으로 특정값이 전달되는경우
    //req.query.키명(id or productcode)으로 전달된 값을 추출할수있다.
    var articleIdx = req.query.id;
    console.log("전달된 글의 고유번호:",articleIdx);

    //해당글의 고유번호로 DB에서 최근 해당 게시글정보를 조회한다.
    //DB에서 가져온 해당 게시글 정보
    var article = { 
        articleIdx:1,
        title:"공지사항입니다.",
        contents:"오늘부터 마스크를 벗어도 된다고 합니다.<br> 만세...",
        display:true,
        writer:"강창훈",
        registDate:Date.now()
    };

    res.render('article/modify',article);
});


//게시글 정보 수정 저장처리 
router.post('/modify', function(req, res, next) {

    //step1)db에서 데이터를 조회한다.
    //게시글고유번호: 게시글 고유번호 조회 
    var articleIdx = req.body.articleIdx;

    var article = { 
        articleIdx:1,
        title:"공지사항입니다.",
        contents:"오늘부터 마스크를 벗어도 된다고 합니다.<br> 만세...",
        display:true,
        writer:"강창훈",
        registDate:Date.now()
    };

    //Step2)DB에서 조회한 최신데이터를 사용자가 수정한 데이터로 업데이트한다.
    article.title = req.body.title;
    article.contents = req.body.contents;
    article.display = req.body.display;
    article.writer = req.body.writer;
    article.registDate = Date.now();

    //STEP3)업데이트한 데이털 최종 DB에 반영한다.

    //db에 수정데이터 반영한 목록페이지로 이동한다.
    res.render('article/list',{data:[]});
});




//모든 게시판 목록 정보 조회
router.get('/boards', function(res,req,next){

    //게시판 정보 등록하기
    var board = {
        boardname:"공지게시판",
        desc:"설명입니다.",
        useyn:true,
        createduid:1
    }
    Board.createduid(board);

    //게시판 정보 조회하기

    //게시판 정보 수정하기

    //게시판 정보 삭제하기
});




//게시글 수정화면 최초호출시 반환
//파라메터방식으로 라우팅하는 메소드는 라우팅 파일의 맨 하단에 정의할것..
//localhost:3000/article/1
router.get('/:id', function(req, res, next) {

    ///article/1 URL에 포함된 값을 {id} 값으로 추출할떄
    //req.params.{변수값}으로 추출한다.
    var articleIdx = req.params.id;
    console.log("전달된 글의 고유번호:",articleIdx);

    //해당글의 고유번호로 DB에서 최근 해당 게시글정보를 조회한다.
    //DB에서 가져온 해당 게시글 정보
    var article = { 
        articleIdx:1,
        title:"공지사항입니다.",
        contents:"오늘부터 마스크를 벗어도 된다고 합니다.<br> 만세...",
        display:true,
        writer:"강창훈",
        registDate:Date.now()
    };

    res.render('article/modify',article);
});


//상단에 정의한 router객체를 모듈외부로 노출시킨다.
//모듈내에 정의된 기능과 속성을 외부에 노출하려면 module.exports를 사용한다.
module.exports = router;