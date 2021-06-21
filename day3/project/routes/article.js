
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


router.get('/list', function(req, res, next){ 
    res.render('article/list.ejs');
});

router.post('/regist', function(req,res,next){
    res.render('article/regist');
});

router.get('/modify', function(req,res,next){

    res.render('article/modify');
});


//상단에 정의한 router객체를 모듈외부로 노추리킨다.
//모듈내에 정의된 기능과 속성을 외부에 노출하려면 module.exports를 사용한다.
module.exports = router;
