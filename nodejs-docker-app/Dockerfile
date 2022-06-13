# npm 명령어를 사용할 수 있는 base image 선정
FROM node:10

# 실행에 필요한 파일들을 docker container 안에 copy
# COPY <현재디렉토리> <컨테이너 내의 디렉토리>
# COPY package.json ./
# COPY server.js ./
COPY ./ ./

# package.json -> dependency 의 종속성들을 설치해줌
# 여기서는 express 설치
RUN npm install

# node 서버 시작
CMD ["node", "server.js"]