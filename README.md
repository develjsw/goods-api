
## Nest.js - goods-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

### goods-api 구성

| 위치                        | 설명                                 |
|---------------------------|---------------------------------------|
| goods-api                | 프로젝트 최상단                          |
| goods-api > dockerfile   | dockerfile                            |
| goods-api > secret       | DB 접속 정보 등 secret file             |
| goods-api > src > config | 환경별 설정 파일, redis-api endpoint 파일 |

### docker 실행
~~~
# goods-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/goods-api

# 도커 이미지 빌드 (local)
$ docker build -t goods-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name goods-api -p 8002:8002 goods-api

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

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)