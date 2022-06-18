# docker-ci-docs
```
컨테이너 기본 ####################################################################################
- 이미지와 컨테이너
  - 이미지 -> docker run 이미지 -> 컨테이너 생성
  - 이미지는 두가지로 구성되어있음
    - 컨테이너가 시작될때 실행될 명령어(run kakaotalk)
    - 실행에 필요한 파일 스냅샷 (카카오톡 파일)
- 도커 컨테이너의 생명주기
  - 생성(create) -> 시작(start) -> 실행(running) -> 중지(stopped) -> 삭제(deleted)

# 컨테이너 생성 및 실행
docker run <이미지> / docker run hello-world

# 이미지 내부 파일 구조 보기 - 스냅샷 파일 조회
docker run alpine ls
(ls가 있는 자리: 원래 이미지가 가지고 있는 시작 명령어를 무시하고, 여기에 있는 커맨드를 실행하게함)

# 컨테이너 실행시에 자동으로 실행되는 명령어 조회
docker ps -a -> image / command
(ps: process status) / (a: all)

# 이미지 조회 docker images
# ps 명령어 formatting
docker ps --format "table {{.Image}}\t{{.Status}}\t{{.Ports}}"

# docker run -> docker create + docker start
docker run hello-world
docker create hello-world -> a7d8916dd40f23a16e666b121c7b5fec4d0369f1fe4ece3485d027153b3282a5
docker start -a(attach: output을 현재 터미널에 연결) a7d891'''

# 컨테이너 중지: docker stop / docker kill
docker stop <container id> -> gracefull / grace period / 하던작업을 마무리 하는 시간을 줌
docker kill <container id> -> 그런거 없이 걍 kill

# 컨테이너 삭제: docker rm
docker ps -a
docker rm <container id / name> (실행중인 컨테이너에는 영향을 미치지 않음)

# 이미지 삭제: docker rmi <image id>

# 이미지, 컨테이너, 네트워크 삭제 docker system prune (실행중인 컨테이너에는 영향을 미치지 않음)
# 모든 이미지 삭제 docker rmi -f $(docker images) (f: force)
# 모든 컨테이너 삭제 docker rm -f $(docker ps -aq) (f: force)

# !!이미 실행중인!! 컨테이너에 명령어를 전달
docker exec <container id> <명령어>
(execute: '조건을 가지고 찾은 파일들을 대상으로 다음 명령어를 실행하라)
docker exec c85002860025 ls
  - 실습
  docker run redis
  docker exec -it <redis container id> redis-cli
  (it: interactive / terminal) / (it가 없다면 redis-cli를 키기만 하고 밖으로 다시 나와버린다.)
  cli command: set jyhong 920125 / get jyhong / keys *

# !!이미 실행중인!! 컨테이너의 터미널/쉘에 접속
docker exec -it <container id> sh / bash / zsh (사용하는 bash image에 따라 다름)
docker run alpine ping localhost
docker exec -it 38c8233165b8 sh
exit: ctrl + D

이미지 생성 ###################################################################################
- 도커 이미지 생성하는 순서
dockerfile 작성 -> docker client -> docker server -> 이미지 생성
  - dockerfile 작성 docker image를 생성하기 위한 설정 파일 / 컨테이너가 어떻게 행동해야 하는지에 대한 설정
    - 도커이미지를 만들기 위해 필요한것 == dockerfile 생성 
    (도커 서버에게 무엇을 하라고 시키기 위해 FROM / RUN / CMD 등의 명령어를 작성한다.)
      - 1) 베이스이미지(file snapshot)
      (FROM: 이미지 생성시 기반이 되는 이미지 레이어 / <이미지 이름><태그> 형식으로 작성 (태그를 안붙이면 default는 가장 최신))
        - 도커 이미지는 여러개의 레이어로 되어 있다. 베이스 이미지는 이미지 레이어들의 근간 / 기본이 되는 이미지
        - 이 레이어들의 기반이 되는 OS라고 생각하면 된다.(window / mac / linux)
      - 2) 추가적으로 필요한 파일을 다운받기 위한 명령어들(file snapshot)
      (RUN: 도커 이미지가 생성되기 전에 수행할 쉘 명령어)
      - 3) 컨테이너 시작시 실행될 명령어
      (CMD: 컨테이너가 시작되었을 때 실행할 명령어)
  - 이미지 생성: docker build -t briiidgehong/hello:latest ./
  (docker build ./: 현재 디렉토리에서 Dockerfile을 찾아 이미지 생성)
  (-t: tag 원하는 태그 / <유저/이미지명:버전>)
  - 이미지 run: docker run -it briiidgehong/hello
 
 * 결론
  - 베이스 이미지에서 다른 종속성이나 새로운 커맨드를 추가 할때는 임시 컨테이너를 만든 후 그 컨테이너를 토대로
  새로운 이미지를 만든다!
  - 결국 새로운 도커 이미지를 생성한다는 것은 베이스 이미지를 기반으로 붙이고싶은것을 커스텀하게 붙여 새로운 이미지를 만드는 과정
 
1ST nodejs 서버 구축 ########################################################################
- node-js app 작성
   npm init -> entry point: (index.js) server.js
    - package.json(의존성) / server.js(nodejs 시작파일)
- node-js app 도커환경에서 실행
  - node-js app을 도커 환경에서 실행하려면 
  먼저 dockerfile을 작성하여
  이미지를 생성하고 -> [docker build -t briiidgehong/node-server:version2 ./ ]
  그 이미지를 run하여 컨테이너를 생성하고 [docker run -p 9999:8080 briiidgehong/node-server:version2]
  그 컨테이너 안에서 node-js 앱을 실행해야 한다. (server.js)
  테스트: http://0.0.0.0:9999/
  + 워킹디렉토리(WORKDIR) 을 쓰는 이유: !!! 베이스이미지 파일들과 섞이는 것을 방지하지 위해 !!!
  + 베이스 이미지의 파일과의 구분을 위해 따로 워킹디렉토리를 지정해서 소스파일을 복사한다.
  docker run -it -p 9999:8080 briiidgehong/node-server:version3 sh
  (워킹 디렉토리 지정시, 해당 워킹디렉토리로 sh 접속된다.)
  + 볼륨(volume)을 쓰는 이유: !!! 변경사항 반영을 위해 재빌드를 하지 않아도 된다. !!!
    - 로컬디렉토리와 컨테이너 안의 디렉토리를 맵핑시켜놓는다. -> 도커stop후 다시 run 해야 반영됨
    - copy vs volume 의 차이
  docker run -p 9999:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app <이미지 아이디>
  (로컬에는 node_modules이 없으므로 그냥 컨테이너 안의 파일을 사용 = 맵핑에서 제외)
  
2ND docker-compose ########################################################################
- redis container 하나, node container 하나가 따로 필요함
  - node 쪽에서 redis 서버쪽으로 접근(node쪽에도 client를 만들수 있는 redis 패키지 종속성 추가)
- npm init 으로 package.json file 생성
  - start script에 "node server.js" 작성
  - dependency 추가
- docker compose 를 쓰는 이유중 가장 큰이유
  - 포트라던지 volume같은 설정의 편리함도 물론 있지만
  - !!!컨테이너간 네트워크를 간편하게 묶어주는 역할을 한다.!!!
  - docker compose로 묶이지 않는 각각의 컨테이너 간의 통산은 따로 네트워크 설정이 필요하다.
  - docker compose는 두개의 컨테이너를 하나의 service로 묶어주는 역할을 한다.
- docker-compose up / docker-compose up --build / docker-compose down


3RD single-container #####################################################################
- 리액트 설치: npx create-react-app ./ 
  - 리액트 실행: npm run start / 테스트: npm run test / 배포를 위한 빌드: npm run build 
- Dockerfile.dev 작성
  - 이미지 생성: docker build -t 3rd-single-node-app:version1 -f Dockerfile.dev ./ (--find)
  - 이미지로 컨테이너 만들어서 실행
    -> docker images 
    -> docker run -p 9999:3000(react default running port) 3rd-single-node-app:version1
  - 컨테이너 실행시, volume 지정해서 실행
    - docker run -p 9999:3000 
    -v /usr/src/app/node_modules (로컬에는 없는대, 서버에는 있으므로)
    -v $(pwd):/usr/src/app 3rd-single-node-app:version1

4TH multiple-container ###################################################################
 

```

