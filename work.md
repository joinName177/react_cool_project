## 工作资料 ##

# antd 官网  https://4x.ant.design/index-cn?theme=compact
# ahooks官网 https://ahooks.js.org/zh-CN/

# 611前端项目部署地址  http://192.168.5.195:9999/job/SyswareORM/job/Sysware_ORM_FRONT_TEST/
# 账密 wanggang sysware123

# git账号  chengzhiqiang sysware123456
# 611禅道地址 http://192.168.5.19/zentao/user-login-L3plbnRhby9teS1idWctYXNzaWduZWRUby5odG1s.html
# 账密 chengzhiqiang chengzhiqiang@sysware123

# 工时填报系统 http://192.168.5.108/portal/newPortalView.portalmesh?currentMenuId=1-1
# 账密 chengzhiqiang 123456
          c
# 产品地址  http://192.168.5.197:8034/orm/
# 611测试环境 http://192.168.5.195:8088/login.html/

## https://blog.csdn.net/yheartbeats/article/details/124046823  
# git合并代码





执行这个   npm config set registry https://registry.npmjs.org/     --611淘宝镜像

http://192.168.5.197:8631/orm   这个是631的测试环境   
http://192.168.5.195:8088/login.html    这个是611的测试环境 

前端项目代码库：http://192.168.5.193:8081/ORM_611/Sysware.ORM.Front.git
前端组件库：http://192.168.5.193:8081/IDP_FROND/sys-antd.git
1、组件库代码可以克隆下来做参考，但不能提交代码，以dev分支为主
2、前端项目代码库，可以提交修改，但要遵循以下分支管理规范：

任务单系统：http://192.168.5.99/uiframe/jsp/login6.jsp
分支管理：
每次新任务均以dev分支为基础创建分支，做任务时，比如任务单里的001任务，
则分支名为：feat-001；如果修改bug时，如果是001号bug，分支名为：fixbug-001.
每次分支合并到dev之前，必须找杨超或者我进行review代码后才允许合并。


今天执行以下任务：
1、安装 SourceTree，cmder，vscode, 
2、修改npm源，执行命令：    npm config set registry http://192.168.5.206:8082/repository/npm-test/
3、根目录下配置.env文件（等下发给你）
4、下载项目代码
5、在项目代码里执行：
yarn install  #注意 antd的版本要为4.15.5，现在是模糊匹配，可能会有问题
再运行 yarn build
再运行 yarn start

创建分支
git checkout -b test,创建test分支，并切换到test分支
git push origin test,将test分支推到远程仓库
git branch --set-upstream-to=origin/test 将test本地分支和远程test分支进行关联
git pull


-611代码合并规范-
接到任务后开发流程是：
1、基于dev新建个人开发分支 a
2、开发完成先push到个人远程分支
3、切换到dev分支，执行git pull
4、切换回个人分支 a ，执行git rebase dev，有冲突解决冲突。
5、强制git push -f 个人分支
6、切换到dev分支，执行git rebase a 
7、成功后，dev分支执行git push 合并到dev远程

https://x6.antv.vision/zh/docs/tutorial/basic/graph   antv/x6文档
https://antv-x6.gitee.io/zh/docs/tutorial/basic/node











