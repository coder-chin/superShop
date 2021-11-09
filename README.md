# superShop 商城项目

体验地址(移动端扫描二维码)

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/qrcode_chrome.png)

#### 下载依赖包

`npm install`

#### 启动项目

`npm run serve`

#### 打包

`npm run build`

## 目录结构划分

```
superShop
├─ public                              //外部访问
├─ src                                 //源代码
│  ├─ assets                           //静态资源
│  ├─ common                           //公用函数
│  ├─ components                       //组件相关
│  ├─ network                          //网络请求
│  ├─ router                           //路由相关
│  ├─ store                            //状态管理
│  ├─ views                            //主要页面
│  │  ├─ cart                             // 购物车
│  │  ├─ category                         // coding
│  │  ├─ detail                           // 商品详情页
│  │  ├─ home                             // 首页
│  │  └─ profile                          // 个人
│  ├─ App.vue
│  └─ main.js                          //项目入口文件
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ vue.config.js                        //vue配置
```

## 项目中可能用到的第三方插件/框架

[better-scroll](https://github.com/ustbhuangyi/better-scroll)

[fast-click](https://github.com/ftlabs/fastclick)

[vue-lazyload](https://github.com/hilongjw/vue-lazyload)

[px2vw](https://github.com/evrone/postcss-px-to-viewport)
