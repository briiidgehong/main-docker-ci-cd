# npm 명령어를 사용할 수 있는 base image 선정
FROM node:10

# package.json -> dependency 의 종속성들을 설치해줌
# 여기서는 express 설치
RUN npm install

# node 서버 시작
CMD ["node", "server.js"]