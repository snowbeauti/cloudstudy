
//node express 객체를 참조한다.
//노드에서 특정 팩키지 또는 프레임워크의 기능을 불러와 사용하고자할떄는 
//require란 명령어 사용합니다.

var express = require('express');
const { Board, Article } = require('../models');

//express객체의 Router메소드를 호출해 라우팅 객체를 생성한다.
//라우팅 객체는 사용자 요청 URL에 대한 처리를 담당하는 각종 기능을 제공한다.
var router = express.Router();

//라우팅객체를 이용해 get 방식 호출 라우팅메소드 정의
//get메소드('사용자가 호출할 url주소',url호출시 실행될 기능(함수)정의)
//url호출시 실행될 기능(함수)에는 사용자브라우저로부터 전달되는 각종정보(req객체=httprequest객체) 와 
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
    const articleList = Article.findAll().then((result)=>{

        console.log("게시글목록:",result);

        return res.render("article/list", {data:result});
        
    }).catch((err)=>{

        next(err);
    });


});

//게시글 등록화면 최초호출시 반환
//localhost:3000/article/regist
router.get('/regist', function(req, res, next) {

    //views/article/regist.ejs 뷰파일에 데이터를 전달한다.
    res.render('article/regist');
});

//브라우저에서 post 방식으로 데이터를 전송하는 경우 해당 라우팅메소드가 데이터 수신
//post('URL주소',처리함수(req,res))
//사용자가 입력한 게시글 데이터를 DB에 저장하고 결과를 반환한다.
router.post('/regist',function(req,res){

    //모델 객체
    var article = { 
        title:req.body.title,
        boardid:1,
        contents:req.body.contents,
        viewcount:0,
        ipaddress:req.ip,
        displayyn:req.body.displayyn,
        createduid:1,
        updateduid:1
    };

    Article.create(article).then((savedArticle)=>{
        console.log("등록게시글:",savedArticle);
        return res.redirect("/article/list");
    }).catch((err)=>{
        next(err);
    });
});


//게시글 수정 페이지 호출
//async/await 비동기 방식으로 DB 작업하기
//비동기 방식으로 라우팅 메소드를 호출한다.

router.get('/modify', async(req,res,next)=>{

    //비동기방식으로 단일 게시글 조회하기
    let article = await Article.findOne({where:{id:req.query.id}});
    article.viewcount +1;

    const updatedArticleId = await Article.update(article,{where:{id:article.id}});
    return res.render("/article/modify",{article:article});
});

//게시글 정보 수정 저장처리 
router.post('/modify', function(req, res, next) {

    //step1)db에서 데이터를 조회한다.
    //게시글고유번호: 게시글 고유번호 조회 
    var articleIdx = req.body.id;

    Article.update({
        title:req.body.title,
        contents:req.body.contents,
        ipaddress:req.ip,
        displayyn:req.body.displayyn
    },{
        where:{id:articleIdx}
    }).then((affected)=>{
        console.log("수정된 게시글 고유번호", affected);
        return res.redirect("/article/list");

    }).catch((err)=>{
        next(err);
    })


});




//모든 게시판 목록 정보 조회
router.get('/ormsample', function(req,res,next){

    //게시판 정보 등록하기 : 동기방식
    var board = {
        boardname:"공지게시판",
        desc:"설명입니다.",
        useyn:true,
        createduid:1
    }
    Board.create(board);

    //게시판 정보 조회하기
    /*
    Board.create(board).then((result)=>{
        console.log("데이터 등록결과", result);

        //신규 데이터 등록후 게시글 목록으로 바로이동하기   
        //res.redirect("이동시키고자 하는 URL 주소")

        return res.redirect("/article/list");

    }).catch((error)=>{
    console.error("데이터 등록중 에러가 발생했습니다.");
    next(error);
    });
    */

    //게시판 정부 모두 조회하기
    /*
    Board.findAll().then((list)=>{
        console.log("모든 게시판목록 조회결과", list);
        return res.json(list);
    });
    */

    //단일 게시판 정보 모두 조회 (동기방식)
    let boardIdx = 1;
    Board.findOne({where:{id:boardIdx}}).then((board)=>{

        console.log("단일게시글정보:", board);
        return res.json(board);
    });

    //게시판 정보 수정하기
    boardIdx = 1;
    let boardname = "블로그게시판";

    Board.update({
        boardname:boardname,
        desc:"블로그 게시판 설명입니다."
    },{
        where:{id:boardIdx}
    }).then((result)=>{

        //수정이 완료되면 수정결과값이 넘어온다.
        //수정 결과물은 수정된 로우의 pk값을 반환한다. 게시판 고유번호
        console.log("수정결과값",result);
        return res.json(result);
    }).catch((error)=>{
        console.error("수정시 서버에러발생");
        //에러결과를 app.js로 전달한다.
        newx(error);

    });

    //게시판 정보 삭제하기
    boardIdx=2;
    Board.destroy({
        where:{id:boardIdx}
    }).then((result)=>{
        //삭제된 결과값은 적용건수 : 즉, 삭제된 건수가 반환된다.
        console.log("삭제결과:", result);
        return res.redirect("/article/list");
    }).catch((error)=>{
        console.error("삭제시 서버에러발생");
        //에러결과를 app.js로 전달한다.
        newx(error);
    });

    //res.json(board);
});

//삭제 비동기방식
router.get('/remove',async(req,res)=>{

    var articleId = req.params.id;

    var deletedCnt = await Article.destroy({where:{id:articleId}});
    res.redirect("/article/list");

});

//삭제
router.get('/remove/:id',function(req,res){

        var articleId = req.params.id;

        Article.destroy({where:{id:articleId}}).then((result)=>{
            return res.redirect("/article/list");
        }).catch((err)=>{
            next(err);
        });

});





//게시글 수정화면 최초호출시 반환
//파라메터방식으로 라우팅하는 메소드는 라우팅 파일의 맨 하단에 정의할것..
//localhost:3000/article/1
router.get('/:id', function(req, res, next) {

    ///article/1 URL에 포함된 값을 {id} 값으로 추출할떄
    //req.params.{변수값}으로 추출한다.


    //동기방식으로 DB처리를 하면(한번 라우팅 콜로 여러개의 DB작업을 진행할경우)
    //단계별 DB처리 작업이 완료되어야 다음단계에 대한 DB처리가 가능한 DB처리시 콜백지옥함수의 맛을 볼 수 잏음
    //동기방식 DB처리는 코드도 길어지고 처리완료시점에서 또다시 함수를 호출하는 방식이라 다중작업시 불편하다.
    //그래서 asyn/await과 같은 최신의 node 비동기


    //step 1)단일게시글 정보 조회
    Article.findOne({
        where:{id:req.params.id}
    }).then((result)=>{

        //step 2)단일게시글 정보조회 완료시
        //조회결과를 알 수 있는 지점
        //조회수++
        let currentViewCount = result.viewcount+1;

        Article.update({
            viewcount:currentViewCount
        },{
            where:{id:req.params.id}
        }).then((changeId)=>{
            result.viewcount
            return res.render('article/modify',{article:result});
    
        }).catch((err)=>{
            next(err);
        })


    }).catch((err)=>{
        next(err);
    });
});


  




//상단에 정의한 router객체를 모듈외부로 노출시킨다.
//모듈내에 정의된 기능과 속성을 외부에 노출하려면 module.exports를 사용한다.
module.exports = router;