## node-board API Server

### [목표]
1) 서비스 완성
2) Directory Structure
3) AWS 배포
---
### Directory Structure
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
### Requirement: 서비스 구현에 요구되는 사항
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
## Stack
- todo

## Framework(Why)
- todo

## API 명세서(Notion)
![image](https://user-images.githubusercontent.com/61128538/204847206-d4d1d6dd-0108-40bc-82cf-4f7e824b3772.png)
![image](https://user-images.githubusercontent.com/61128538/204847440-732a7882-3592-4bfc-82b9-bf9e422f8a81.png)
![image](https://user-images.githubusercontent.com/61128538/204847313-c958568a-0e72-4c6f-9e43-a5d2a1049142.png)



