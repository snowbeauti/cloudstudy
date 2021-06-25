var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

//JWT 토큰 발급 폼 페이지
router.get('/form',async(req,res)=>{
    
    res.render("member/form");

});

//폼에서 전달된 토큰발급정보를 이용 JWT 토큰을 발급한다.
router.post('/form',async(res,req)=>{
    
    const productId = req.body.productId;
    const productName = req.body.productName;
    const price = req.body.price;
    const provider = req.body.provider;
    const stock = req.body.stock;

    const product = {
        "productId":productId,
        "productName":productName,
        "price":price,
        "provider":provider,
        "stock":stock
    }

    //jwt.sign('JSON데이터, 토큰인증키,{옵션(유효기간,발급자)}')
    const token = jwt.sign(
        product,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h',//60min, 10s, 24h etc..
            issuer:'com'
        });

    //res.send()메소드는 모든 데이터 형식을 전달할 수 있는 만능메소드
    //view, json, file, text 등 다양한 포맷의 결과물을 브라우저에 전달할 수 있다.
    res.send(token);

});


//로그인 open api
//사용자 ID/PW를 전달받아 사용자 인증 후 사용자 정보를 기반으로 JWT 토큰을 발급한다.
router.post('/login',async(res,req)=>{
    const userId = req.body.userId;
    const userpwd = req.body.userpwd;

    if(userId == "123@naver.com" && userpwd == "1234"){
    var userinfo = {
        "userId" : userId,
        "username" : "이건무엇",
        "email" : "123@naver.com",
        "tel" : "010-1234-5687"
    };

    const token = jwt.sign(
        userinfo,
        process.env.JWT_SECRET,
        {
            expiresIn:'1h',//60min, 10s, 24h etc..
            issuer:'com'
        });

        
        return res.json({code:"ok",Data:token, msg:"로그인성공"});
 
    }else{
        return res.json({code:"400",Data:{}, msg:"로그인실패"});
    }

});


//JWT 토큰 유효성 검사 API
//JWT 토큰이 전달되면 해당 토큰에서 JSON epdlxjfmf cncnfgkwk
//token/verify?token=토큰값
router.get('/token/verify',async(res,req)=>{

    const token = req.query.token;

    //토큰에서 JSON 데이터를 추출하자
    //jwt.verify(JWT 토큰값, 토큰생성시 사용한 인증키값=비밀번호)
    var tokenData = jwt.verify(token, process.env.JWT_SECRET);

    console.log("토큰내 JSON데이터 값 : ",tokenData);

    res.json(tokenData);

})

module.exports = router;
