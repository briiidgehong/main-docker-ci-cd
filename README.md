# docker-ci

1. docs 
2. command
```
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

```
3. 개념정리
  - 이미지와 컨테이너
    - 이미지 -> docker run 이미지 -> 컨테이너 생성
    - 이미지는 두가지로 구성되어있음
      - 컨테이너가 시작될때 실행될 명령어(run kakaotalk)
      - 실행에 필요한 파일 스냅샷 (카카오톡 파일)
  - 도커 컨테이너의 생명주기
    - 생성(create) -> 시작(start) -> 실행(running) -> 중지(stopped) -> 삭제(deleted)
