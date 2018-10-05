* ## 前言

本文讲述ss（shadowsocks简称）的整个搭建过程，包括国外VPS的选择，远程登录VPS的工具使用，在VPS上的搭建过程以及相关的配置操作。

* ## 租用一台国外服务器VPS

经过对digitalocean，vultr，linode和lightsail四家VPS对比后，最终选择了vultr，其配置高，价格优惠，主要是可以通过PayPal支付，方便简单。vultr官网：https://my.vultr.com/ （ps：可以通过完成相关指示领取优惠券哦）
![1](https://user-images.githubusercontent.com/30400864/29101358-418f4248-7ce4-11e7-830f-ad8070d30568.png)
本人租用的是东京的一个VPS，CentOS系统，一个月5刀。其配置如下。
![2](https://user-images.githubusercontent.com/30400864/29101483-0de37c7e-7ce5-11e7-88c4-7a2833d50a9f.png)

* ## PuTTY的安装与使用

PuTTY是一个跨平台的远程登录工具，本次使用主要用于登录VPS。PuTTY的官网是[http://www.chiark.greenend.org.uk/~sgtatham/putty/](http://www.chiark.greenend.org.uk/%7Esgtatham/putty/) 下载后点击putty.exe，输入服务器的IP和端口，点击open即可登录。
![3](https://user-images.githubusercontent.com/30400864/29101549-92b41cd8-7ce5-11e7-9eb2-5a64dac35139.png)
更详细的PuTTY安全配置可参考https://chaifeng.com/blog/2007/06/putty_200611.html

## Mac不需要PuTTY之类的工具啦，直接在终端输入命令行就可以连接远程终端啦
```
ssh username@yourwebsite.com
```
* ## ss的配制与使用

1. 检查Python版本
`$ python –version`
2. 安装m2crypto和python-setuptools
`$ yum install m2crypto python-setuptools`
3. 安装pip
pip是python的包管理工具。在本文中将使用 python 版本的 ss，此版本的 ss已发布到 pip 上，因此我们需要通过 pip 命令来安装。
`$ easy_install pip`
4. 安装ss
`$ pip install shadowsocks`
5. 配置服务器参数
通过vim创建该配置
`$ vi /etc/shadowsocks.json`
点击’I’进入编辑模式，若是单用户模式，输入：

```
{                                  
 "server":"my_server_ip",          //服务器的IP地址
 "server_port":7711,              //服务器的端口
 "local_address": "127.0.0.1",       //本机IP地址
 "local_port":1080,               //本机端口
 "password":"mypassword",        //自己设定的密码
 "timeout":300,                  //超出时间
 "method":"aes-256-cfb",          //加密方法，推荐使用"aes-256-cfb"
 "fast_open": false                //true 或 false}
}
```
若是多用户模式，将server_port和password合并为port_password：

```
"port_password": {
      "443": " mypassword 1”,  //对应端口设定不同的密码
      "8888": " mypassword 2”
  },
```
编辑完成，点击Esc键返回命令模式，输入’:wq’保存并退出。
服务器端口值，密码和加密方法在配置 ss客户端时需要保持一致。

1. 安装gevent
Gevent可以提高ss性能，由于gevent依赖于libevent和greenlet

```
$ yum install -y libevent
$ pip install greenlet
$ pip install gevent
```
1. 配置防火墙
为了提高系统的安全性，需要安装防火墙
`$ yum install firewalld`
启动防火墙
`$ systemctl start firewalld`
开启相应端口

```
$ firewall-cmd --permanent --zone=public --add-port=443/tcp
$ firewall-cmd –reload
```
1. 启动ss服务
`$ ssserver -c /etc/shadowsocks.json`
若想让ss一直在后台运行，可运行：
`$ nohup ssserver -c /etc/shadowsocks.json  /dev/null 2&1 &`

* ## 客户端配置
* PC端
下载ss客户端https://shadowsocks.org/en/download/clients.html
![4](https://user-images.githubusercontent.com/30400864/29101717-cbe37dc2-7ce6-11e7-8e82-de277ba055e1.png)
填写信息:服务器地址，端口号，密码，加密方式与代理端口默认即可。
右键任务栏图标，选择启用系统代理，接下来就可以打开世界的大门，自由自在地畅游在知识的海洋里啦~~~~
* IOS移动端
Appstore中下载wingy软件（免费的！！！！！），填写服务器IP地址，端口，密码，加密方法，那手机也可以科学上网啦~~~~

