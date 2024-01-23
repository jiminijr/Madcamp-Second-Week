# **카서유기 - 실시간 통신 퀴즈 게임**

**카서유기**는 4글자, 영화, 인물, 랜덤 퀴즈를 모두 즐길 수 있는 카이스트 신서유기 게임입니다.

## **프로젝트 소개**

### **팀원**

- 이중훈 (카이스트)
- 이경민 (카이스트)
- 최지민 (성균관대학교)

### **프로젝트 주제**

- **목적:** 서버 및 DB를 활용하는 것에 익숙해지기 위해 공통의 과제 수행.
- **결과물:** 서버, DB, SDK를 활용한 안드로이드 앱.
    - Firebase 사용을 지양하고, 데이터를 서버와 주고받는 기능 포함.

## **개발 환경**

- **프론트엔드:** React-Native (언어: TypeScript)
- **백엔드-서버:** Node.js express
- **Cloud:** AWS
- **DB:** AWS RDS-MySQL
- **SDK:** 카카오

## **구현 기능**

### **3.1 프론트**

- **SplashScreen:** 앱 시작 시 인트로 화면.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d04a3062-12e5-4391-9249-3bb1d580d5f5/Untitled.png)

- **LoginScreen:** 카카오 SDK를 이용한 로그인 기능.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/993d4c4c-52b8-476f-a858-9901313d271b/Untitled.png)

- **GameStackNavigator:** 스택 형태의 네비게이션 컴포넌트 구현.
- **EnterGameScreen:** 프로필 화면 및 게임 로비 화면으로의 이동 기능.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/01113fc7-a135-43ab-b8c3-0525577c568f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/6eea827e-cb74-43a5-8e82-7a67a5baca9c/Untitled.png)

- **GameLobbyScreen:** 게임 종류 변경 및 게임 시작 기능.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/b9400b44-7a82-4dcb-80c4-9bdf049508ed/Untitled.png)

- **DoingGameScreen:** 실시간 채팅과 30개의 문제 해결 기능.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/aae474a6-e270-426c-b537-e1e865d0dcb9/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/6d8f8560-5f37-406c-a466-df2c11037b95/Untitled.png)

- **EndingGameScreen:** 점수 기반 등수 표시 및 게임 종료 후 화면.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/2f7f6001-f491-40c7-b062-9e1be8f7810f/Untitled.png)

### **3.2 백엔드**

- socket.io를 이용하여 유저 간 실시간 통신 구현
- 유저가 게임을 생성하거나 로비에 입장하면 /gameLobby 경로로 이동
    - 같은 로비 코드를 가진 사람들끼리 socket.join하여 같은 로비 내의 사람들끼리 통신
- host가 게임을 시작하면 해당 로비에 있던 모든 유저들은 /playGame 경로로 이동
    - 게임을 시작하면 DB에 저장되어 있는 문제를 30개 불러옴
    - 같은 게임 내에 있는 사람들끼리 문제를 공유하고 실시간 채팅
    - 각 유저가 채팅을 입력하면 서버에서 채팅과 문제에 대한 정답이 일치하는지 확인
    - 정답이 일치하다면 각 유저의 점수를 갱신
    - 게임이 끝나면 각 유저에게 게임이 끝났다는 response 전달
