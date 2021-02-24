# solchive
솔룩스 프로젝트 아카이빙 플랫폼 개발을 위한 저장소


# solchive 소개

### 0. database

![database](https://user-images.githubusercontent.com/69200763/108874887-f62b9280-763f-11eb-857f-43fad662c44c.png)
* AWS의 RDS에서 solchivedb 데이터베이스를 생성

![project](https://user-images.githubusercontent.com/69200763/108874911-fe83cd80-763f-11eb-9557-a1273143c5d2.png)
* database에서 project 테이블을 생성하여 프로젝트의 이름, 팀, 기간, 프레임 워크, 본문, 이미지, 요약, 깃허브주소, 삭제확인변수를 저장

![comment](https://user-images.githubusercontent.com/69200763/108874922-02afeb00-7640-11eb-9925-52822cc63201.png)
* comment 테이블을 생성하여 프로젝트 참여자의 이름과 후기를 저장하고 project 테이블과 연결하여 project 테이블과 같이 삭제, 수정되도록 구현


### 1. 로그인 화면

![image](https://user-images.githubusercontent.com/61380136/108865301-74833700-7636-11eb-9c41-2ced3f5b4719.png)

<프론트>
* 실제 있는 아이디와 비밀번호인지 확인하여 실제 있는 아이디일 경우 로그인되도록 구현
* 로그인했을 때만 프로젝트 추가, 수정, 삭제 버튼이 보이도록 구현
* 로그인 없이 url을 이용하여 프로젝트 추가나 프로젝트 생성 페이지에 접근할 시 로그인 후 해당 페이지를 이용할 수 있도록 구현

<백>
* passport 패키지를 이용하여 로그인시 24시간 동안 유지되는 cookie를 생성하고 지속적으로 로그인이 되어있는지 확인하도록 구현

### 2. 게시물 추가 및 불러오기 구현

![image](https://user-images.githubusercontent.com/61380136/108871545-9e3f5c80-763c-11eb-8c7d-6dcde5258646.png)

<프론트>
* 

<백>
* 추가할 시 입력된 정보를 받아 데이터베이스에 저장
* 선택한 프로젝트의 id값을 받아 그 id값과 일치하는 정보를 프론트에 전달

### 3. 업데이트 및 삭제 구현

![image](https://user-images.githubusercontent.com/61380136/108867347-73530980-7638-11eb-99aa-2ed1e6827aa2.png)

<프론트>
* 수정할 시 기존에 입력한 내용이 폼에 나타나도록 설정
* 수정한 내용들이 데이터 베이스에 넘어가도록 구현
* 삭제 버튼을 누를 경우, 기본 화면에서 해당 프로젝트가 삭제되도록 구현


<백>
* 수정할 시 프론트에서 수정된 정보를 받아 데이터베이스에서 정보를 수정  
* 삭제 시 프론트에서 현재 프로젝트의 id 값을 받고 그 id 값이 속한 isdeleted 값을 1로 바꾸어 프로젝트가 보이지 않도록 구현

### 4. 년도별 게시물 보이기 구현

![image](https://user-images.githubusercontent.com/61380136/108871816-e1013480-763c-11eb-8c02-289f51f6ff49.png)

<프론트>


<백>
* 현재 database에 저장되어 있는 정보 중에 isdeleted=0인 모든 정보를 프론트에 전달

### 5. 다중 이미지 선택 구현

![image](https://user-images.githubusercontent.com/61380136/108867664-c331d080-7638-11eb-89a0-1a228c0a445e.png)

<프론트>
* 파일 선택으로 여러 이미지를 선택할 수 있도록 설정
* 썸네일에 가장 먼저 선택한 이미지가 보이도록 구현
* 여러 이미지를 포함한 프로젝트의 경우 프로젝트 상세보기를 하였을 때 선택한 이미지가 모두 나오도록 구현


<백>
* 프론트에서 받은 세션에서 filename을 가공하여 테이블에 저장
* 수정 시 이미지 수정이 없으면 원래의 이미지가 그대로 출력되도록 설정
