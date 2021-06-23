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

//단일 게시글 데이터 제공 API 라우팅 메소드 제공
router.get("/g", function(req,res){
    var articleIdx = req.query.id;

    //게시글 정보를 조회한다.
    var article = {
        articleIdx:3,
        title:"공지사항3입니다.",
        content: "리스트가 세개나 있다니 우엑우엑우엑",
        display: "false",
        writer : "맞춰봐",
        registDate : Date.now()
    }
    res.json(article);

})



//여기부터 오늘수업내용


//단일 게시글 API
//사용자 브라우저(AJAX)에서 단일 게시글 JSON데이터가 전달된다. 
//변환값 : 데이터 등록 처리결과 값
router.post('/', function(req,res){

    //브라우저로부터 전달된 데이터를 추출한다.
    console.log("브라우저에서 전달된 제목 데이터", req.body.title);

    //DB저장을 위한 게시글 데이터 모델 정의
    var registData = {
        articleIdx:req.body.articleIdx,
        title:req.body.title,
        content:req.body.content
    }

    //DB에 데이터 저장한다.

    //저장완료된 게시글 정보를 다시 브라우저에 반환한다.
    res.json(registData);
});

//단일게시글 수정 api
//사용자 브라우저에서 수정된 게시글 JSON데이터가 주소로 전달된다.
//호출되는 라우팅 주소가 동일해도 라우팅메소드는 메소드유형(get,post,put,delete)이 다르면 주소를 동일하게 사용가능하다.
router.put('/', function(req,res){

    //브라우저로부터 전달된 게시글 고유번호를 추출한다.
    console.log("브라우저에서 전달된 게시글 고유번호", req.body.articleIdx);


    //해당 게시글 고유번호로  DB에 저장된 기존 게시글 정보를 조회해온다.

    //DB저장된 게시글정보를 사용자가 입력한 정보로 변경한다.
    var updateData = {
        articleIdx:req.body.articleIdx,
        title:req.body.title,
        content:req.body.content
    }

    //수정된 게시글 정보를 DB에 반영(업데이트)한다.
    const result = { code:200, data:updateDate};
    res.json(result);

    //수정완료된 게시글 정보를 다시 브라우저에 반환한다.
    res.json(updateData);
});

//단일 게시글정보 조회 API 라우팅메소드
//라우팅 주소 : /1
//
router.get('/:id', function(req,res){

    //조회하려는 게시글 고유번호 추출
    let articleIdx = req.params.id;
    console.log("브라우저url에서 전달된 번호", articleIdx);

    let article = {};

    try{
        //에러가 발생할 가능성이 있는 코드를 정의한다.

        //DB에서 해당 단일 게시글을 조회한다.
        article ={
            articleIdx:2000,
            title : "제목2000",
            content : "내용2000"
        };

    }catch(error){
        return res.status(500).json({code:500,message:"서버에러발생 - 관리자에게 문의바람"})
    }

    return res.json({code:200, data:article, message:"OK"});
});




//게시글 삭제 API 라이팅 메소드
//사용자 브라우저에서 URL 주소를 통해 삭제하는 게시글 번호를 전달해온다.
//라우팅 주소 : /1
router.delete('/:id',function(res,req){

    //삭제하고자하는 게시글 고유번호를 url에서 추출한다.
    const articleIdx = req.params.id;

    //해당데이터를 삭제한다.

    //처리결과를 반환한다.
    //백엔드 개발자가 프론트앤드 개발자에게 전달하는 서버 응답결과 메시지 형식 정의하여 전달.
    //프론트앤드 개발자와 사전에 협의하여 제공
    const result = { code:200, data:"OK"};

    res.json(result);
    
});

module.exports = router;
