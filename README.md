# v3
## 目录结构划分

## To resolve
1. `Scroll.vue`中在mounted中开启定时器，触发__initScroll函数，在该函数中第一行`if (!this.$refs.wrapper) return`，如果还没有该dom就return。那岂不是起不到better-scroll的作用了。
2. 

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

