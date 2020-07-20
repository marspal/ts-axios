#!/usr/bin/env sh
# sh 枪模
set -e # true or false 退出
echo "Enter release version: " # 写入一句话
read VERSION  # 标准的输入里读取值 给version
# -p 提示功能
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  # version 修改version字段 --message 记录
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish  发布package.json files 下的dist目录
  npm publish

fi
