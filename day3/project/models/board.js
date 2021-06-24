
//모델 클래스를 화살표 함수내에 정의하고 관련 기능을 외부로 노출한다.
//화살표함수 입력매개변수로는  sequelize orm객체와 sequelize Node DataType정보를 전달받는다.
//데이터 모델은 해당 정보의 구조를 노드백엔드 개발언어로 정의한다.
module.exports = (sequelize,DataTypes)=>{

//화살표 함수의 모델구조 정의 결과를 반환한다.
//sequelize객체의 define메소드('물리적 테이블 이름',{해당 테이블과 맵핑되는 컬럼명과 데이터 타입정의},{각종옵션설정})를 
//이용해 모델의 구조를 정의한다.  
//return sequelize.define('board',{},{});

//sequlize ORM은 기존에 테이블이 없으면 테이블을 자동으로 생성하는데
//id (Identitiy) 컬럼을 자동으로 생성하고 자동체번(1,2,3(AI=Auto Increment)) 속성의 컬럼을 pk로 만들어준다.
//모델 클래스에서 PK 설정이 없으면 자동 ID 컬럼을 생성해서 PK컬럼으로 활용한다.

return sequelize.define('board',{
    boardname:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    desc:{
        type:DataTypes.STRING(500),
        allowNull:true
    },
    useyn:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    createduid:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:true,
    paranoid:true
});

//timestamps 옵션이 true이면 물리적 테이블에 자동으로 createdAt,updatedAt 컬럼을 자동추가해주고
//데이터가 추가된 일시정보와 수정된 일시정보를 자동으로 입력해준다.
//paranoid 옵션이 true이면 deletedAt이란 컬럼이 자동추가되고 데이터 삭제시
//물리적 테이블에서 실제 삭제하지 않고 deletedAt컬럼에 삭제일시가 마크되고 NodeApp에서는 삭제된것으로 인식하지만
//실제 물리적 테블에는 데이터가 실제 존재하고 deletedAt컬럼에 삭제일시가 마킹되어 있다.
};
