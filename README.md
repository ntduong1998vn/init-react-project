Các bước tích hợp Sonarqube vào quá trình cicd của project trên gitlab. (Mặc định máy đã cài Sonarqube)

1. Cài đặt gitlab runner:
Cài đặt theo link bài hướng dẫn tại trang chủ, với mỗi hệ điều hành có các bước khác nhau:

https://docs.gitlab.com/runner/install/

hoặc sử dụng docker (khuyến khích), chạy lệnh

`docker run -d --name gitlab-runner --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v gitlab-runner-config:/etc/gitlab-runner \
    gitlab/gitlab-runner:latest`

Để custom config theo ý muốn, làm theo hướng dẫn tại: 

https://docs.gitlab.com/runner/install/docker.html

2. Đăng kí gitlab runner:

Nếu cài đặt gitlab runner với  các hệ điều hành khác, làm theo các bước tại:
https://docs.gitlab.com/runner/register/index.html

Nếu sử dụng docker , chạy:
`docker exec -it gitlab-runner gitlab-runner register`

Sau đó nhập các trường:

URL: http://gitlab.dc.local
Token: Lấy trong phần setting-> cicd-> runner của repo trên gitlab
Mô tả: để trống
Tag: Để trống
Executor: docker
Specify a default Docker image: alpine:latest

Chạy `docker restart gitlab-runner`


Quay lại  setting-> cicd-> runner, F5 và kiểm tra đã thấy Runner chưa.


3. Cài đặt Sonar scanner để tiến hành kiểm tra code:

Cài đặt với docker, chạy lệnh :
`docker run \
    --rm \
    -e SONAR_HOST_URL="http://${SONARQUBE_URL}" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${YOUR_PROJECT_KEY}" \
    -e SONAR_TOKEN="myAuthenticationToken" \
    -v "${YOUR_REPO}:/usr/src" \
    sonarsource/sonar-scanner-cli`

4. Truy cập trang chủ http://YourIP:9000 , đăng nhập ( mặc định tk: admin mk: admin) 
Để nhập các dự án GitLab của bạn vào SonarQube, trước tiên bạn cần đặt cài đặt SonarQube config của mình. Điều hướng đến :

Administration > Configuration > General Settings > DevOps Platform Integrations, chọn GitLab

Sau đó nhập :

Configuration Name (Enterprise and Data Center Edition only): Tuỳ chọn
GitLab URL: http://gitlab.dc.local/api/v4
Personal Access Token: Vào http://gitlab.dc.local/-/profile/personal_access_tokens, tạo token mới, tại mục "Select scopes", tick api. Sau đó lấy API tạo được dán vào

Tiếp theo, về lại trang chủ, chọn Project -> Create project, chọn gitlab và chọn repo muốn sử dụng.

Lúc này Sonar tự động tạo hướng dẫn, gồm các bước "Tạo key, tạo biến, môi trường, tạo file để chạy cicd.", cứ làm theo họ ghi là được.

Ở Bước tạo file chạy cicd, nếu bạn đã có file gilab-ci trước, chỉ cần thêm :

```gitlab-ci.yml
sonarqube-check:
    stage: sonarqube-check
    image:
        name: sonarsource/sonar-scanner-cli:latest
        entrypoint: ['']
    variables:
        SONAR_USER_HOME: '${CI_PROJECT_DIR}/.sonar' 
        GIT_DEPTH: '0' # Tells git to fetch all the branches of the project, required by the analysis task
    cache:
        key: '${CI_JOB_NAME}'
        paths:
            - .sonar/cache
    script:
        - sonar-scanner
    allow_failure: false```



