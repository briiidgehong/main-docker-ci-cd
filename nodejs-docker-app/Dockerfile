# npm 명령어를 사용할 수 있는 base image 선정
FROM node:10

# create app directory
# 이미지안에서 어플리케이션 소스 코드를 가지고 있을 디렉토리를 생성하는것
# 이 경로가 바로 어플리케이션의 working directory가 됩니다.
# 워킹디렉토리를 왜 쓸까?
# 베이스 이미지의 파일과 섞여버리기때문에, 따로 워킹디렉토리를 지정해서 소스파일을 복사한다.

WORKDIR /usr/src/app

# 도커 빌드시에 종속성 부분은 캐시 사용 
# (종속성 변화 없을시에, npm install 반복하지 않기위해 !)
COPY package.json ./

# package.json -> dependency 의 종속성들을 설치해줌
# 여기서는 express 설치
RUN npm install

# 실행에 필요한 파일들을 docker container 안에 copy
# COPY <현재디렉토리> <컨테이너 내의 디렉토리>
# COPY package.json ./
# COPY server.js ./
COPY ./ ./


# node 서버 시작
CMD ["node", "server.js"]