
## Nest.js - goods-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

### goods-api 구성

| 위치                        | 설명                                 |
|---------------------------|------------------------------------|
| goods-api                | 프로젝트 최상단                           |
| goods-api > dockerfile   | dockerfile                         |
| goods-api > docker-compose.yml | docker-compose.yml |
| goods-api > secret       | DB 접속 정보 등 secret file             |
| goods-api > src > config | 환경별 설정 파일                          |

### 특이사항

mysql은 별도의 dockerfile없이 AWS RDB를 사용하여 연결  

단일 dockerfile로 실행하는 경우 main.ts에서 config file을 통해 받아온 port를 주입해서 사용해도 문제가 없었으나, docker-compose.yml파일로 실행하는 경우 host를 포함한 외부와의 통신이 불가능하여 main.ts에 port 하드코딩 진행

### docker 실행
~~~
[ 1번 방식 - dockerfile ]

# goods-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/goods-api

# 도커 이미지 빌드 (local)
$ docker build -t goods-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name goods-api -p 3002:8002 goods-api

----------------------------------------------------------------

** 문제 발생 시 확인 (docker gui tool을 활용해도 됨) **

# 종료된 컨테이너 재실행
$ docker start goods-api

# 컨테이너 로그 확인 
$ docker logs goods-api

# 컨테이너 접속하여 정상 실행중인지 확인
$ docker ps
$ docker exec -it <container_id> bash
~~~
~~~
[ 2번 방식 - dockerfile + docker-compose.yml ]

# goods-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/goods-api

# 이미지 빌드 및 컨테이너 실행 (백그라운드로 실행)
$ docker-compose up -d --build
~~~

### docker container와 통신 확인
1. browser에서 localhost:3002로 접속하여 확인
2. curl http://localhost:3002 명령어를 통해 확인

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)