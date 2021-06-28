//node fraomwork에서 제공한 폴더경로/파일관리 객체 참조
const path = require('path');
//시퀄라이즈 ORM 프레임워크 패키지 참조
const Sequelize = require('sequelize');

//DB연결정보가 있는 config파일에서 development항목의 DB정보를 조회한다.
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

//DB관리 객체 생성
//DB객체는 실제 ORM 모델을 이용해 DB프로그래밍하는 Routing 메소드에서 사용하는 
//DB 데이터 제어
const db = {};

//시퀄라이즈 ORM객체 생성
//시퀄라이즈 ORM객체 생성시 관련 DB연결정보 전달생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//DB객체에 시퀄라이즈 객체를 속성에 바인딩한다.
//DB객체에 시퀄라이즈 모듈을 속성에 바인딩한다.
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Config = config;


//각종 모델 클래스를 db객체와 속성으로 노출해줘 Route에서
//해당 모델들을 접근하고 사용할 수 있는 환경을 제공한다.
//DB객체에 특정 테이블들을 제어하는 모델 클래스를 특정속성명으로 노출해준다.

//DB 객체에 Board속성을 정의하고 해당속성이 board.js 모델 클래스내 모듈을 호출하게하며
//호출시 두개의 파라매터를 전달한다.
db.Board = require('./board.js')(sequelize,Sequelize);

//article 모델을 DB의 Article 
db.Article = require('./article.js')(sequelize,Sequelize);

//member 모델을 DB의 Member 
db.Member = require('./member.js')(sequelize,Sequelize);

//DB관리객체 모듈 출력
module.exports = db;