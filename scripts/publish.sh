#!/bin/bash 

# 发布流程：
#  1、新建 dist 目录，将 lib 和  拷贝到 dist 目录
#  2、将 scripts 下的 package.json 里面包含的版本号 +1，然后拷贝到 dist 目录
#  3、cd 到 dist 目录，执行发布流程
#  4、发布成功，删除 dist 目录，将新的版本号提交到 Git 远程仓库

npm config set registry=https://registry.npmjs.org/

npm publish --access public

npm config set registry=https://registry.npm.taobao.org
