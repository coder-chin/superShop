# superShop商城项目
## 目录结构划分
superShop                                                        
├─ public                                
│  ├─ favicon.ico                        
│  └─ index.html                         
├─ src                                   
│  ├─ assets                           //公共css、图片                              
│  ├─ common                           //js代码        
│  ├─ components                       //组件
│  │  ├─ common                                       
│  │  └─ content                                  
│  ├─ network                          //网络请求相关                    
│  ├─ router                           //路由相关       
│  ├─ store                            //vuex状态管理           
│  ├─ views                            //主要页面
│  │  ├─ cart                          //购物车                 
│  │  ├─ category                      // coding    
│  │  ├─ detail                        //商品详情页             
│  │  ├─ home                          //首页         
│  │  └─ profile                       //个人       
│  ├─ App.vue                            
│  └─ main.js                          //项目入口文件
├─ babel.config.js                      
├─ package-lock.json                     
├─ package.json                          
├─ README.md                             
├─ vue.config.js                        //vue配置                           
## 项目中可能用到的第三方插件/框架
[better-scroll](https://github.com/ustbhuangyi/better-scroll)
[fast-click](https://github.com/ftlabs/fastclick)
[vue-lazyload](https://github.com/hilongjw/vue-lazyload)
[px2vw](https://github.com/evrone/postcss-px-to-viewport)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

