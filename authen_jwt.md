# AUTHENTICATION - xác thực
2 cách:
cookie-based: lưu thông tin vào session: triển khai theo server side: dữ liệu được lưu trên server
token-based: viết các api cho bên khác sử dụng: dữ liệu lưu phía client

NOTE: token dễ scale, session(cookie) khó scale
IWT: là tiêu chuẩn mã hóa của token: json web token

## JWT Authentication
- sử dụng mã hóa base64
- 3 phần: header, payload, signature
+ header: chứa tên thuật toán mã hóa và key: 
+ payload: object chứa toàn bộ thông tin gửi: sub, iat: thời gian tạo, expire: hạn
+ signature: chuỗi dùng hàm mã hóa, encode header và payload.

## access vs refresh token
1. access token là token dùng để truy cập data, lấy dữ liệu
- phải là acccess hợp lệ và khớp user nằm trên hệ thống
- thường lưu ở client

2. refresh token
- cấp lại acccess mới khi access cũ hết hạn
- jwt luôn sống nên cần gắn hạn cho nó
- refresh không dùng để truy cập data
- thường được lưu trên server
- thường lưu ở data để xóa

## các bước làm login:
1. validate
2. kiểm tra email tồn tại
3. lấy password hash
4. so sánh password hash với password từ request
5. tạo token bằng jwt
6. trả về response

- sử dụng thư viện jsonwwebtoken để hỗ trợ
npm i jsonwebtoken

- khai báo mã số bí mật bên .env:
JWT_SECRET=
JWT_ACCESS_TOKEN_EXPIRE=24h
JWT_REFRESH_TOKEN_EXPIRE=168h

sử dụng openssl hex 32 để tạo mã số:
$ openssl rand -hex 32

- thêm auth.controller > v1 > api > controllers
- thêm router cho auth trong router
- tạo jwt.js trong utils



