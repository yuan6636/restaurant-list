# 餐廳清單

1. 此專案可以瀏覽首頁的餐廳清單、搜尋包含關鍵字的餐廳，點擊餐廳後，可以瀏覽餐廳的介紹與詳細資訊
   
2. 增加 `CRUD` 功能，使餐廳清單能夠建立新餐廳、修改餐廳詳細資料、刪除餐廳，進行餐廳清單的管理

3. 增加排序功能，使餐廳可以依照不同英文字母、類別、地區排序

4. 增加使用者註冊與登入功能，也可以使用 `Facebook` 第三方登入專案 

## 產品功能

1. 使用者可以瀏覽首頁全部的餐廳
2. 點擊餐廳的 `detail` 按鈕可以瀏覽餐廳的詳細資料
3. 在尋找餐廳的搜尋框，根據提示字，輸入相關的關鍵字，再點擊搜尋框旁的放大鏡按鈕，會呈現包含關鍵字的餐廳
4. 點擊餐廳清單頁上方的 `Create` 按鈕，可以建立新的餐廳
5. 點擊餐廳的 `edit` 按鈕，可以編輯餐廳的詳細資料
6. 點擊餐廳的 `delete` 按鈕，可以刪除餐廳
7. 點擊餐廳的類別下拉式選單，可以依照不同方式排序
8. 使用者要登入自己的 `email` 及密碼才可以點擊 `Login` 按鈕進入餐廳清單管理餐廳內容，若沒有註冊過，可以點擊 `Register` 連結，即可註冊使用者的 `email` 及密碼
9. 使用者可以使用 Facebook 帳號密碼登入此專案

## 開發環境

- [Windows](https://www.microsoft.com/zh-tw/windows/windows-11)
- [Node.js v18.15.0](https://nodejs.org/en)
- [MySQL v8.0.15](https://downloads.mysql.com/archives/installer/)

## 安裝流程

1. 打開終端機，輸入 `git clone` ，將專案存放到電腦。

```
$ git clone https://github.com/yuan6636/restaurant-list.git
```

2. 進入專案資料夾 `restaurant-list`

```
$ cd restaurant-list
```

3. 安裝 `npm` 套件管理器

```
$ npm install
```

4. 安裝 `MySQL` `v8.0.15` (包含 `server` 和 `workbench` )


5. 確認 `config.json` 的 `password` 與 `database` 設定

```
"development": {
    "username": "root",
    "password": "password",
    "database": "restaurant",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

6. 建置資料庫
   
```
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npm run seed
```

7. 到 `Meta for Developers` 登入自己的 `facebook` 帳號，登入後點擊`我的應用程式` ，建立應用程式 `restaurant-list`，建立完成後，點擊 `restaurant-list` ，查看左側`應用程式設定`的`基本資料`即可找到`應用程式編號`和`應用程式密鑰`，`應用程式編號`對應`FACEBOOK_CLIENT_ID`，`應用程式密鑰`對應`FACEBOOK_CLIENT_SECRET`，`應用程式密鑰`可以點擊顯示按鈕顯示，再點擊左側`使用案例`，到`驗證和帳號建立流程`點擊`自訂`，在`email` 的權限部分點擊新增，就完成基本設置

8. 建立`.env` 檔案，將 `.env.example` 的內容複製到 `.env`，`FACEBOOK_CLIENT_ID` 及 `FACEBOOK_CLIENT_SECRET`可以按照上一步找到輸入值，再將`FACEBOOK_CLIENT_ID` 及 `FACEBOOK_CLIENT_SECRET`輸入到`.env`內
   
9. 執行 `app.js`

```
$ npm run dev
```

10. 終端機顯示網址

```
express server is running on http://localhost:3000
```

11. 在瀏覽器輸入網址 `http://localhost:3000`，瀏覽專案

12. 若要關閉 `server` ，可以在終端機輸入 `ctrl + C`

## 專案畫面

![登入](https://github.com/yuan6636/restaurant-list/blob/main/public/img/login.jpg)
![餐廳清單](https://github.com/yuan6636/restaurant-list/blob/main/public/img/index.jpg)
![詳細資訊](https://github.com/yuan6636/restaurant-list/blob/main/public/img/detail.jpg)
![編輯](https://github.com/yuan6636/restaurant-list/blob/main/public/img/edit.jpg)

## 使用的工具

1. [Visual Studio Code](https://code.visualstudio.com/)：程式編輯器
2. [Node v18.15.0](https://nodejs.org/en)：執行環境
3. [express v4.18.2](https://www.npmjs.com/package/express)：Web 應用程式框架
4. [express-handlebars v7.1.2](https://github.com/express-handlebars/express-handlebars)：樣板引擎
5. [nodemon v3.0.1](https://www.npmjs.com/package/nodemon)：Node 輔助工具
6. [method-override v3.0.0](https://www.npmjs.com/package/method-override)：轉換 HTTP 方法的工具
7. [mysql2 v3.2.0](https://www.npmjs.com/package/mysql2)：MySQL client
8. [sequelize v6.30.0](https://sequelize.org/docs/v6/)：Node.js ORM 工具
9. [sequelize-cli v6.6.0](https://www.npmjs.com/package/sequelize-cli)：Sequelize 指令
10. [express-session v1.17.3](https://www.npmjs.com/package/express-session)：express middleware
11. [connect-flash v0.1.1](https://www.npmjs.com/package/connect-flash)：express middleware
12. [dotenv v16.0.3](https://www.npmjs.com/package/dotenv/v/16.0.3)：讀取 .env 文件環境變數設置的模組
13. [bcryptjs v2.4.3](https://www.npmjs.com/package/bcryptjs)：密碼加密套件
14. [passport v0.6.0](https://www.passportjs.org/)：使用者認證套件
15. [passport-facebook v3.0.0](https://www.passportjs.org/packages/passport-facebook/)：facebook OAuth
16. [passport-local v1.0.0](https://www.passportjs.org/packages/passport-local/)：passport 本地認證套件

### 參與者

開發者：[yuan6636](https://github.com/yuan6636)
