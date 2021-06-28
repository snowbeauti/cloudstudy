var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var db = require("../models/index");
var Member = db.Member;
var bcrypt = require('bcryptjs');


//JWT토큰 발급 폼 페이지(MVC)
//localhost:3000/member/form
//JWT 토큰 발급 데이터 입력폼 
router.get('/form',async(req,res)=>{
    res.render("member/form");
});

//폼에서 전달된 토큰발급정보를 이용 JWT 토큰을 발급한다.
router.post('/form',async(req,res)=>{

    const productId = req.body.productId;
    const productName= req.body.productName;
    const price = req.body.price;
    const provider = req.body.provider;
    const stock = req.body.stock;

    const product ={
        productId:productId,
        productName:productName,
        price:price,
        provider:provider,
        stock:stock
    };

    //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
    const token = jwt.sign(product,process.env.JWT_SECRET,{
        expiresIn:'12h',// 60m,10s,24h 60분,10초,24시간
        issuer:'companyname'
    });

    //res.send()메소드는 모든 데이터 형식를 전달할수 있는 만능메소드
    //view,json,file,text 등 다양한 포맷의 결과물을 브라우저에 전달할수 있다.
    res.send(token);

});


//로그인 OPEN API 
//사용자 아이디/암호를 전달받아 사용자 인증 후 
//사용자 정보를 기반으로 JWT 토큰을 발급한다.
router.post('/login',async(req,res)=>{

    //사용자 아이디/암호를 호출한곳에서 받아온다.
    const userId = req.body.userId;

    //메일주소와 동일한 사용자 정보조회
    const member = await Member.findOne({where:{email:userId}});

    
    //난독화 및 복화 불가능한 해시코드로 생성하여 db에 저장
    const result = await bcrypt.compare(req.body.userpwd, member.userpwd);


    if(result == true){
        console.log("암호가 일치합니다.")
        var userInfo = {
            userId: member.email,
            username:member.username,
            telephone:member.telephone
        };

        //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
        const token = jwt.sign(userInfo,process.env.JWT_SECRET,{
            expiresIn:'12h',// 60m,10s,24h 60분,10초,24시간
            issuer:'software'
        });

        return res.json({code:"200",data:token,msg:"인증토큰이 발급되었습니다."});
    }else{
        return res.json({code:"400",data:{},msg:"로그인에 실패하였습니다. 아이디암호를 정확히 입력해주세요."});
    }
});

//JWT토큰 유효성 검사 API 
//JWT토큰이 전달되면 해당 토큰에서 JSON 데이터를 추출하자
//localhost:3000/token/verify?token=토큰값
//localhost:3000/token/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0SWQiOiIzMzMzMyIsInByb2R1Y3ROYW1lIjoi7JeY7KeA64W47Yq467aBIiwicHJpY2UiOiIzMzMzMzMiLCJwcm92aWRlciI6IkxH7KCE7J6QIiwic3RvY2siOiIxMDAiLCJpYXQiOjE2MjQ2MDYxNDAsImV4cCI6MTYyNDY0OTM0MCwiaXNzIjoiY29tcGFueW5hbWUifQ.nu4SseHZTPnSqe2Y3ePlGutRabv6eeSl_Ucx-G9f89Y
router.get('/token/verify',async(req,res)=>{

    const token = req.query.token;

    //토큰에서 JSON 데이터를 추출하자
    //jwt.verify(JWT토큰값,토큰생성시 사용한 인증키값=비밀번호)
    var tokenData = jwt.verify(token,process.env.JWT_SECRET);

    console.log("토큰내 JSON데이터 값: ",tokenData);

    //데이터를 json으로 전달
    res.json(tokenData);
});

//회원목록조회
router.get('/list', async(req,res)=>{

    const memberList = await Member.findAll();
    res.render("member/list", {data : memberList});

 });


//회원가입 페이지 열기
router.get('/regist',async(req,res)=>{

    res.render("member/regist");
});



//회원가입
router.post('/regist', async(req,res)=>{

    //난독화 및 복화 불가능한 해시코드로 생성하여 db에 저장
    const hashPwd = await bcrypt.hash(req.body.userpwd,12);

    let member = {
        email:req.body.email,
        userpwd:hashPwd,
        nickname:req.body.nickname,
        entrytype:req.body.entrytype,
        snsid:req.body.snsid,
        username:req.body.username,
        telephone:req.body.telephone,
        photo:req.body.file,
        lastip:req.ip,
        usertpye:req.body.usertpye,
        userstate:req.body.userstate,        
        createduid:1,
        updateduid:1
    };

    console.log(member);



    //DB에 해당 데이터를 저장하고 결과를 다시 받아옴
    var savedMember = await Member.create(member);
     

    res.redirect("/member/list");
 });


 //회원정보 수정페이지 열기
 router.get('/modify',async(req,res)=>{
    res.render("member/regist");
});


//회원정보 수정
router.post('/modify', async(req,res)=>{

    res.render("member/list");
 });


//회원정보 삭제 후 페이지 이동
router.post('/delete/:id', async(req,res)=>{

    res.render("member/list");
 });


router.get('/modify/:id',async(req,res)=>{
    
    //조회하려는 게시글 고유번호 추출
    const userIdx = req.params.id;

    try{
        const member = await Member.findOne({where:{id:userIdx}});
        console.log(member);
        return res.json({code:200,data:member,msg:"OK"});

    }catch(error){
        return res.json({code:500,data:{},msg:"서버에러발생 관리자에게 문의바람"});
    }

});

module.exports = router;