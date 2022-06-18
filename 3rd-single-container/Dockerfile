# for prod

# 1. 빌드 파일 생성 - builder stage
# as builder from부터 ~ 다음 from 까지는 builder stage
FROM node:alpine as builder 
WORKDIR '/usr/src/app'
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# 2. nginx를 가동하고, 첫번째 단계에서 생성된 빌드폴더의
# 파일들을 웹 브라우저의 요청에 따라 제공하여 준다. - run stage
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
