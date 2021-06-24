var express = require('express');
var router = express.Router();

//전체 게시글 목록 데이터 반환 라우팅 메소드
//라우팅주소:  localhost:3000/api/articles
//반환값: JSON 포맷 게시글 목록
router.get('/',function(req,res){

    //req : httpRequest객체로 브라우저에서 서버로 전달되는 정보를 추출할떄 사용
    //res : httpResponse객체로 웹서버에서 웹브라우저로 실행결과(html or json)을 전달할떄 사용

    //데이터 모델
    var articleList = [
        {articleIdx:1,title:"제목1",contents:"내용1"},
        {articleIdx:2,title:"제목2",contents:"내용2"},
        {articleIdx:3,title:"제목3",contents:"내용3"},
    ];

    //특정 데이터를 json포맷으로 변경하여 브라우저에 전달한다.
    //json메소드의 역할은 데이터모델을 문자열포맷의 json포맷으로 변환해서 브라우저에전달
    res.json(articleList);

});


//단일 게시글 등록 API 
//사용자 브라우저(AJAX)에서 단일 게시글 JSON데이터가 전달된다.
//라우팅 주소: localhost:3000/api/articles
//반환값 : 데이터 등록 처리 결과 값
router.post('/',function(req,res){

   //브라우저로부터 전달된 데이터를 추출한다.
   console.log("브라우저에서 전달된 제목 데이터",req.body.title);

   //DB저장을 위한 게시글 데이터 모델 정의 
   var registData = {
       articleIdx:req.body.articleIdx,
       title:req.body.title,
       contents:req.body.contents
    }

    //DB에 데이터 저장한다.


    //저장완료된 게시글 정보를 다시 브라우저에 반환한다.
    res.json(registData);

});


//단일게시글 수정 API 라우팅 메소드
//사용자 브라우저에서 수정된 게시글 JSON데이터가 아래 주소로 전달된다.
//호출되는 라우팅 주소가 동일해도 라우팅메소드는 메소드유형(get,post,put,delete)이 다르면 주소를 동일하게 사용가능하다.
//라우팅주소 : localhost:3000/api/articles
router.put('/',function(req,res){

   //브라우저로부터 전달된 데이터를 추출한다.
   console.log("브라우저에서 전달된 게시글고유번호",req.body.articleIdx);

   //해당 게시글 고유번호로 DB에 저장된 기존 게시글 정보를 조회해온다.

   //DB에 저장된 게시글정보를 사용자가 입력한 정보로 변경한다.
   var updateData = {
       articleIdx:req.body.articleIdx,
       title:req.body.title,
       contents:req.body.contents
    }

    //수정된 게시글 정보를 DB에 반영(업데이트)한다.
    //수정 완료된 게시글 정보를 다시 브라우저에 반환한다.

    const result = { code:200,data:updateData};
    res.json(result);

    //res.json(updateData);
});


//단일 게시글정보 조회 API 라우팅메소드
//라우팅 주소: localhost:3000/api/articles/1000
router.get('/:id',function(req,res){
    
    //조회하려는 게시글 고유번호 추출
    let articleIdx = req.params.id;

    console.log("브라우저url에서 전달된 번호",articleIdx);

    let article = {};

    try{
        //에러가 발생할 가능성이 있는 코드를 정의한다.

        //DB에서 해당 단일 게시글정보를 조회한다.
        article = {
            articleIdx:1000,
            title:"제목10000",
            contents:"내용10000"
        };

    }catch(error){
        return res.status(500).json({ code:500,message:"서버에러발생 관리자에게 문의바람"})
    }

    return res.json({ code:200,data:article,message:"OK"});
});


//게시글 삭제 API 라이팅 메소드
//사용자 브라우저에서 URL 주소를 통해 삭제하는 게시글 번호를 전달해온다.
//라우팅주소: localhost:3000/api/articles/1
router.delete('/:id',function(req,res){

    //삭제하고자하는 게시글 고유번호를 URL 에서 추출한다.
    const articleIdx = req.params.id;

    //DB에서 해당 데이터를 삭제한다.

    //처리 결과를 반환한다.

    //백엔드 개발자가 프론트엔드 개발에게 전달하는 서버 응답결과 메시지 형식 정의하여 전달
    //프론트엔드 개발자와 사전에 협의하여 제공
    const result = { code:200,data:"OK"};


    res.json(result);
});


module.exports = router;
