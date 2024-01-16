# Exercise 1

## 環境

### Node 版本

使用 Node 16.20.2 以上 的版本

再用 Node 16.20.2 以上 去裝 pnpm

```bash
$ npm install -g pnpm
```

---

## 執行

script 命令

### 安裝

```bash
$ pnpm install
```

### 開發

跑本地開發

```bash
$ pnpm dev
```

然後直接開啟本地 [http://localhost:3000/](http://localhost:3000/)

## 專案結構

#### 資料夾說明

```
根目錄
  ├── src                              # 主要原始碼目錄
  |   └── api                          # express api 路由
  |     ├── public                     # 前端靜態資源
  |     └── views                      # ejs 頁面
  └── app                              # node server 主程式
```
