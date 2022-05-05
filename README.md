# **코인사이트 만들기** 8-)

### 구현기능

- 기본적 CSS는 styled-components 이용
- font : Google font 의 Sans font import
- reset css : app.tsx에 import해 기본 css 초기화

1. 로그인 / 로그아웃 (react-hook-form 사용)

   - 로그인

     - 아이디,비밀번호,비밀번호 확인, 닉네임 이용해 로그인 구현
     - 비밀번호와 비밀번호 확인 일치하지 않으면 erorr 화면에 출력

     \*로그인 화면이 넘어가면 로그아웃이 우측 상단에 표시

   - 로그아웃
     - 로그아웃 버튼 클릭시 로그인 화면으로 이동

2. My page

   - 즐겨찾기 코인목록 만들기
   - 구매한 코인 목록 리스트 추가
   - 평균 매입값 구하기

3. Home(Coin List화면)

   - 화면 중앙 상단에 오늘 날짜출력
   - 화면 우측 상단 구성요소
     - 로그아웃, MY PAGE, Search
   - 화면 좌측 상단 구성요소
     - 해당 계정의 즐겨찾기 코인 목록
   - 시총순위로 코인 출력(1-20개씩) 10페이지
   - 코인리스트 구성요소
     - 마크 , 시총순위, 이름 , 심볼, 즐겨찾기BTN , 구매여부 BTN
     - 즐겨찾기 BTN or 구매여부 BTN 클릭시 정보 이동

4. Coin(코인리스트중 코인하나 클릭시)

- 시총순위, 이름, 가격, 설명을 화면 중앙에 나열
- 차트
  - 1주/1달/1년 시세 그래프
- 관련정보,뉴스

  - Youtube와 google의 search api 이용해 구현

---

### Tool

1. React
2. Typescript
3. React-Router-Dom
4. React-hook-form (로그인 Form 구현)
5. styled-components (CSS구현)
6. Heroku (배포)
7. Express
8. MongoDB

---
