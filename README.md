# **코인사이트 만들기** 8-)

### 구현기능

- 기본적 CSS는 styled-components 이용
- font : Google font 의 Sans font import
- reset css : app.tsx에 import해 기본 css 초기화
- React-Query를 이용해 로딩중 화면 구현 & api 정보 활용
- framer-motion 을 이용해 코인목록 20개씩 출력
- ApexCharts 를 이용해 코인의 1주/1달/1년 시세 그래프 출력

1. Home(Coin List화면)

   - 화면 중앙 상단에 오늘 날짜출력 (getToday()을 만들어서 활용)~~
   - 화면 우측 상단 구성요소
   - 평단가 계산
   - 화면 좌측 상단 구성요소
   - 시총순위로 코인 출력(1-20개씩) 10페이지 (React-Query와 framer-motion 이용)
   - 코인리스트 구성요소
   - 마크 , 시총순위, 이름 , 심볼

4. Coin(코인리스트중 코인하나 클릭시)

- 시총순위, 이름, 가격, 설명을 화면 중앙에 나열
- 차트
- 1달 세 그래프 (ApexCharts)

---

### Tool

1. React
2. Typescript
3. React-Router-Dom
5. React-Query (fetch를 통한 api 사용)
6. framer-motion (Coin list를 Netflix 영화리스트 넘기는 것처럼 구현)
7. Apex Charts (Coin Chart 구현)
8. styled-components (CSS구현)
12. React-modal (로그인 Modal 구현)
13. nodemon (서버 재시작을 자동으로 해줌)
14. ts-node: node에서 typescript를 compiler 하지않고, 직접 실행
---
