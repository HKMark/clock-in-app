# 出勤打卡系統簡介
使用者可以使用此系統紀錄上下班打卡紀錄，並根據當日的工作時間判斷是否缺勤。
- 出缺勤僅計算工作日（根據中華民國政府行政機關辦公日曆表API）
- 使用者每日的第一次打卡為「上班打卡」，當日其他打卡為「下班打卡」。如「上班打卡」至最後一次「下班打卡」之間的時間滿8小時，紀錄為「確認出勤」。如未滿 8 小時紀錄為缺勤。
- 換日時間為上午五點 （GMT+8）
- 只有管理員可建立帳號，並有帳號權限分級功能（一般使用者 及 系統管理員）
- 所有使用者都有詳細職務資料（如：員工ID、職稱、工作地址及部門）以便公司進行人員管理

## 功能列表
* 使用者登入
* 使用者登出
* 使用者打卡
* 使用者修改密碼
* 出缺勤紀錄查詢

## 安裝

1. 將專案clone至本地端並開啟專案

```
git clone https://github.com/HKMark/clock-in-app.git
```

2. 安裝npm套件，在終端機輸入:

```
npm install
```

3. 環境變數設定 請參考.env.example檔案設定環境變數，並將檔名改為.env

4. 更改連線至資料庫的username和password: 在config/config.json下，將username和password改為自己本地端資料庫

5. 建立資料庫 開啟 MySQL workbench，連線至本地資料庫

6. 建立 MySQL Table，在終端機輸入

```
npx sequelize db:migrate 
```

7. 建立種子資料，在終端機輸入：

```
npx sequelize db:seed:all
```

8. 執行專案，在終端機輸入：

```
npm run dev
```

9. 使用 如果連線成功，終端機出現下列訊息 "Example app listening on port 3000!" 則可開啟瀏覽器輸入 http://localhost:3000 使用


## 環境建置及開發工具
主要套件：

- assert: ^2.0.0
- axios: ^1.4.0
- bcryptjs: ^2.4.3
- connect-flash: ^0.1.1
- dayjs: ^1.10.6
- dotenv: ^10.0.0
- express: ^4.17.1
- express-handlebars: ^5.3.3
- express-session: ^1.17.2
- faker: ^5.5.3
- method-override: ^3.0.0
- multer: ^1.4.3
- mysql2: ^2.3.0
- passport: ^0.4.1
- passport-local: ^1.0.0
- sequelize: ^6.6.5
- sequelize-cli: ^6.2.0

開發時使用的套件：

- chai: ^4.3.4
- eslint: ^7.32.0
- eslint-config-standard: ^16.0.3
- eslint-plugin-import: ^2.23.4
- eslint-plugin-node: ^11.1.0
- eslint-plugin-promise: ^5.1.0
- mocha: ^9.1.1
- nodemon: ^2.0.12
- proxyquire: ^2.1.3
- sequelize-mock: ^0.10.2
- sinon: ^11.1.2
- supertest: ^6.1.6

## 開發人員
Mark
