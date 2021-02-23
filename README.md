# solchive
솔룩스 프로젝트 아카이빙 플랫폼 개발을 위한 저장소


# solchive 소개

### 1. 로그인 화면

![image](https://user-images.githubusercontent.com/61380136/108865301-74833700-7636-11eb-9c41-2ced3f5b4719.png)

<프론트>
* 실제 있는 아이디와 비밀번호인지 확인하여 실제 있는 아이디일 경우 로그인되도록 구현
* 로그인했을 때만 프로젝트 추가, 수정, 삭제 버튼이 보이도록 구현
* 로그인 없이 url을 이용하여 프로젝트 추가나 프로젝트 생성 페이지에 접근할 시 로그인 후 해당 페이지를 이용할 수 있도록 구현

<백>
* passport 패키지를 이용하여 로그인시 24시간 동안 유지되는 cookie를 생성하고 지속적으로 로그인이 되어있는지 확인하도록 구현

### 2. 업데이트 및 삭제 구현


