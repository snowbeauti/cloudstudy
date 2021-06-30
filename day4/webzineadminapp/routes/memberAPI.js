var express = require('express');
var router = express.Router();

//db참조
var db = require("../models/index");
var Member = db.Member;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var multer = require('multer');
//var upload = multer({dest:'public/upload/'});

var storage  = multer.diskStorage({ 
    destination(req, file, cb) {
      cb(null, 'public/upload/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
  });
  var upload = multer({ storage: storage });


//회원가입
router.post('/regist',  async(req,res)=>{
    //여러개 저장시 single >> array

    //난독화 및 복화 불가능한 해시코드로 생성하여 db에 저장
    const hashPwd = await bcrypt.hash(req.body.userpwd,12);

    let member = {
        email:req.body.email,
        userpwd:hashPwd,
        nickname:req.body.nickname,
        entrytype:req.body.entrytype,
        snsid:req.body.snsid,
        photo:req.body.photo,
        username:req.body.username,
        telephone:req.body.telephone,
        lastip:req.ip,
        usertpye:req.body.usertpye,
        userstate:req.body.userstate,        
        createduid:1,
        updateduid:1
    };

    try{
        //DB에 해당 데이터를 저장하고 결과를 다시 받아옴
        var savedMember = await Member.create(member);

            console.log("=============");
            console.log(savedMember);

            return res.json({
                code:"200",
                data:savedMember,
                mas:"ok"
            });
        }catch(err){
            console.log(err);
            return res.json({
                code:"500",
                data:[],
                mas:"서버에러발생"
            });
        }

});

//파일 업로드 처리
router.post('/upload', upload.single('photo'), async(req,res)=>{
    const uploadFile = req.file;
    let uploadFilePath = "/upload/"+uploadFile.filename;

    return res.json(uploadFilePath);
});


//회원목록조회
router.get('/list', async(req,res)=>{

    //예외처리하기
    try{
        const memberList = await Member.findAll();
        return res.json({code:"200", data : memberList, mas:"ok"});
    }catch(err){
        //에러 무시하기
        console.log("서버에러 발생");
        //에러내용인 err을 DB/WAS서버내 File로 기록하거나/SMS/메일로 에러발생 사실을 알림(notification)처리해준다.
        
        result.code="500";
        result.data=[];
        result.msg="서버에러발생";

        return res.json(result);
    }
 });


//회원정보 수정
router.put('/modify', async(req,res)=>{

   //난독화 및 복화 불가능한 해시코드로 생성하여 db에 저장
   const hashPwd = await bcrypt.hash(req.body.userpwd,12);

   try{
       const updatedId = await Member.update({
               email:req.body.email,
               userpwd:hashPwd,
               nickname:req.body.nickname,
               entrytype:req.body.entrytype,
               snsid:req.body.snsid,
               username:req.body.username,
               telephone:req.body.telephone,
               photo:req.body.photo,
               lastip:req.ip,
               usertpye:req.body.usertpye,
               userstate:req.body.userstate,        
               updateduid:1
       },{
           where:{id:req.body.id}
       });

       console.log("===========================updatedId=====");
       return res.json({code:"200", data:{}, msg:"정상적으로 수정완료되었습니다."});

   }catch(err){
    console.log("==error===================>");
       return res.json({code:"500", data:0, msg:"서버에러발생"})
   }

});

router.get('/:id',async(req,res)=>{
    
    //조회하려는 게시글 고유번호 추출
    const userIdx = req.params.id;

    try{
        const member = await Member.findOne({where:{id:userIdx}});
        return res.json({code:200,data:member,msg:"OK"});

    }catch(error){
        return res.json({code:500,data:{},msg:"서버에러발생 관리자에게 문의바람"});
    }

});

//회원정보 수정페이지 열기
router.get('/modify/:id',async(req,res)=>{

    //조회하려는 게시글 고유번호 추출
    const userIdx = req.params.id;
    

    try{
        const member = await Member.findOne({where:{id:userIdx}});
        return res.json({code:200,data:member,msg:"OK"});

    }catch(error){
        return res.json({code:500,data:{},msg:"서버에러발생 관리자에게 문의바람"});
    }

  
});


//회원정보 삭제 후 페이지 이동
router.get('/delete/:id', async(req,res)=>{

    var userIdx = req.params.id;

    console.log("==================",userIdx)
    var deletedCnt = await Member.destroy({where:{id:userIdx}});
    res.json({code:200,data:deletedCnt,msg:"OK"});
 });



module.exports = router;
