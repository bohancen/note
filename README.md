# note

## ls -l 查看软链接实际位置

- lrwxrwxrwx. 1 root root 27 Aug 25 09:21 node -> /root/node-v8.11.4/bin/node
- lrwxrwxrwx. 1 root root 26 Aug 25 09:21 npm -> /root/node-v8.11.4/bin/npm

## nginx

config /etc/nginx/conf.d
/etc/nginx/conf.d
nginx -t
nginx -s reload

## 防火墙 centos7

    sudo systemctl stop firewalld.service && sudo systemctl disable firewalld.service

- [js-xx](https://github.com/leizongmin/js-xss)
- [koa](https://github.com/changeyu/Coding-Guide/blob/master/README.md#koa2系列教程)

## 更换vscode的默认终端

"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
[参考地址](https://blog.csdn.net/technofiend/article/details/72771277)

## Linux下查看文件内容的命令

    cat     由第一行开始显示内容，并将所有内容输出
    tac     从最后一行倒序显示内容，并将所有内容输出
    more    根据窗口大小，一页一页的现实文件内容
    less    和more类似，但其优点可以往前翻页，而且进行可以搜索字符
    head    只显示头几行
    tail    只显示最后几行
    nl      类似于cat -n，显示时输出行号
    tailf   类似于tail -f 
    
## cat 参数

    cat filename | tail -n 100 显示文件最后100行
    cat filename | head -n 100 显示文件前面100行
    cat filename | tail -n +100 从100行开始显示，显示100行以后的所有行
    显示100行到500行
    cat filename | head -n 500 | tail -n +100

## 设置环境变量的三种方法 ubantu in win10
### 1.1 临时设置
export PATH=/home/yan/share/usr/local/arm/3.4.1/bin:$PATH1

### 1.2 当前用户的全局设置
打开~/.bashrc，添加行：export PATH=/home/yan/share/usr/local/arm/3.4.1/bin:$PATH1
使生效：source .bashrc1

### 1.3 所有用户的全局设置
$ vim /etc/profile1
在里面加入：export PATH=/home/yan/share/usr/local/arm/3.4.1/bin:$PATH1
使生效 source profile

### vscode
https://www.jianshu.com/p/8f18ecacc4b5
1、安装插件：Path Intellisense
2、配置：

    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    }
3、在项目package.json所在同级目录下创建文件jsconfig.json：

    {
        "compilerOptions": {
            "target": "ES6",
            "module": "commonjs",
            "allowSyntheticDefaultImports": true,
            "baseUrl": "./",
            "paths": {
              "@/*": ["src/*"]
            }
        },
        "exclude": [
            "node_modules"
        ]
    }

