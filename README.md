## node-board API Server

## [목표]
1) 서비스 완성
2) Directory Structure
3) AWS 배포

---
## Stack | [Why?](https://velog.io/@sksgur3217?tag=%ED%9A%8C%EA%B3%A0%EB%A1%9D)
- Node.js | [Why?](https://velog.io/@sksgur3217/Why-%EC%99%9C-Node.js%EC%9D%B8%EA%B0%80)
- mongoDB
- Express | [Why?](https://velog.io/@sksgur3217/Node.js-express%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%82%98)
- nodemon
- cors

---
## Directory Structure
```
.
├── app.js
├── routes
│   ├── index.js
│   ├── comments.js
│   └── posts.js
└── schemas
    ├── index.js
    ├── comment.js
    └── post.js
```
---
## Requirement: 서비스 구현에 요구되는 사항
```
1. 전체 게시글 목록 조회 API
    - 제목, 작성자명, 작성 날짜를 조회하기
    - 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성 API
    - 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
3. 게시글 조회 API
    - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기 
    (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
4. 게시글 수정 API
    - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
5. 게시글 삭제 API
    - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
6. 댓글 목록 조회
    - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
    - 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
    - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
    - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9. 댓글 삭제
    - 원하는 댓글을 삭제하기
```

---
## API 명세서 | [Notion](https://planet-aletopelta-fbc.notion.site/4331253a099e4e7f98e80478fadaa826?v=17a4a5a0e3794f29a6d25a04d21ec525)
![image](https://user-images.githubusercontent.com/61128538/204847206-d4d1d6dd-0108-40bc-82cf-4f7e824b3772.png)
![image](https://user-images.githubusercontent.com/61128538/204847440-732a7882-3592-4bfc-82b9-bf9e422f8a81.png)
![image](https://user-images.githubusercontent.com/61128538/204847313-c958568a-0e72-4c6f-9e43-a5d2a1049142.png)

---
## [트러블 슈팅]
- 브라우저에서 SOP(Same-Origin Policy) “같은 출처에서만 리소스를 공유할 수 있다”라는 규칙을 가진 정책으로 인해 CORS 에러 발생

## [해결]
- Server 에서 cross-origin 허용(CORS 설정)을 통한 문제 해결
