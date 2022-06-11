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

# ps 명령어 formatting
docker ps --format "table {{.Image}}\t{{.Status}}\t{{.Ports}}"

# 
```
3. 개념정리
  - 이미지와 컨테이너
    - 이미지 -> docker run 이미지 -> 컨테이너 생성
    - 이미지는 두가지로 구성되어있음
      - 컨테이너가 시작될때 실행될 명령어(run kakaotalk)
      - 실행에 필요한 파일 스냅샷 (카카오톡 파일)
  -   
  - 
