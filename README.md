Github Actions 自动构建前端项目并部署到服务器

在开始操作之前，需要先在项目仓库建立page站点。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/455c1b81ce5f453abccdf61cec7914f3~tplv-k3u1fbpfcp-watermark.image?)

## 1. 创建yml文件

在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 `.github/workflow` 目录下。你可以命名为 `ci.yml`，它类似于 Jenkins 的 `Jenkinsfile` 文件，里面包含的是要自动执行的脚本代码。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/525a35dfbcd4470c8a347430ee22cb61~tplv-k3u1fbpfcp-watermark.image?)

文件内容为

```yml
name: A TO A:GH_PAGES
on: # 监听 master 分支上的 push 事件
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 构建环境使用 ubuntu
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.VUEAD }} # VUEAD 是我的 secret 名称，需要替换成你的
        # 你要操作的目标仓库，注意：是项目仓库名
        TARGET_REPO: longweixia/vue-ad
        # 构建结果存储的分支
        TARGET_BRANCH: master
        # 要使用的构建命令
        BUILD_SCRIPT: npm install && npm run build # 下载依赖 打包项目
        # 构建结果存储目录，dist里面会有index.html，如果没有这个文件，显示不了，可在本地构建后去校验
        BUILD_DIR: dist
  # sync: //gitee配置
  #   needs: build-and-deploy
  #   runs-on: ubuntu-latest
  #   steps:
  #   - name: Sync to Gitee
  #     uses: wearerequired/git-mirror-action@master
  #     env:
  #       SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
  #     with:
  #       # 来源仓库
  #       source-repo: "git@github.com:linzowo/linzowo.github.io.git"
  #       # 目标仓库
  #       destination-repo: "git@gitee.com:linzowo/linzowo.git"
  # reload-pages:
  #   needs: sync
  #   runs-on: ubuntu-latest
  #   steps:
  #     - name: reload
  #       uses: mizuka-wu/gitee-pages-action@v1.0.0
  #       with:
  #         repository: linzowo/linzowo
  #         cookie: ${{ secrets.GITEE_COOKIE }}
  #         branch: gh_pages
```

## 2. 配置密钥

上面有一个 `ACCESS_TOKEN` 变量需要自己配置。

**1.  打开 Github 网站，点击你右上角的头像，选择 `settings`。**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9ad4eb4bc7841f9befa09760a3daaab~tplv-k3u1fbpfcp-watermark.image?)

**2.  点击左下角的 `developer settings`。**


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcb4fb9e261844af90c2643aabf86e4a~tplv-k3u1fbpfcp-watermark.image?)

**3.  在左侧边栏中，单击 `Personal access tokens（个人访问令牌）`。**


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b87f35d44842699ad480a5cbb53d8f~tplv-k3u1fbpfcp-watermark.image?)

**4.  单击 `Generate new token（生成新令牌）`。**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73277303e174404ba676f423d5031543~tplv-k3u1fbpfcp-watermark.image?)

**5.  输入名称并勾选 `repo`。**


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0702c385fff54f78a8d08f14190ab0c5~tplv-k3u1fbpfcp-watermark.image?)

**6.  拉到最下面，点击 `Generate token`，并将生成的 token 保存起来。**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da607905f6ea451c95feb81269257c4a~tplv-k3u1fbpfcp-watermark.image?)

**7.  打开你的 Github 项目，点击 `settings`。**



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9afefb891b7a48b7aa3f208811d74640~tplv-k3u1fbpfcp-watermark.image?)

点击 `secrets`->`new secret`。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5b10c639f7b423382a23407714c0430~tplv-k3u1fbpfcp-watermark.image?)

创建一个密钥，名称随便填（中间用下划线隔开），内容填入刚才创建的 token。



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee0a3afa6ebd4f4481a5f1ceb15add41~tplv-k3u1fbpfcp-watermark.image?)

**可以看到创建成功了：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0448e9c5f92e43edbf9d57c983ccc3a6~tplv-k3u1fbpfcp-watermark.image?)

将上文代码中的 `ACCESS_TOKEN: ${{ secrets.VUE_ADMIN_TEMPLATE }}` 替换成刚才创建的 secret 名字，替换后代码如下 `ACCESS_TOKEN: ${{ secrets.TEST_A_B }}`。保存后，提交到 Github。

以后你的项目只要执行 `git push`，Github Actions 就会自动构建项目并发布到你的 Github Page 上。

Github Actions 的执行详情点击仓库中的 `Actions` 选项查看。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d7a7fed07a041b08bed0d9dcd237854~tplv-k3u1fbpfcp-watermark.image?)

**构建中：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/480e281c4b1b481b8ac8af6a799b8b21~tplv-k3u1fbpfcp-watermark.image?)

**效果：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/033462ef55484cae9ccac54cea16a432~tplv-k3u1fbpfcp-watermark.image?)

## 3. 错误处理

注意，很大可能会出现Git Page上因为路径问题访问不到打包后的文件，即引入的css，js都是404，这是因为打包后的资源都没有加上仓库路径，所以访问不到

**修复**

1. package.json,homepage项填写仓库全名
```js
  "homepage": "https://longweixia.github.io/vue-ad",
```

2. vue.config.js的publicPath填写仓库名
```js
module.exports = {
    publicPath: '/vue-ad/',
}
```

修改好后，git push 就会触发自动构建了

[预览](https://longweixia.github.io/vue-ad/#/)

