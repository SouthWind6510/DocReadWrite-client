/**
 1. 服务器信息
 */
const fs = require('fs');
const envfile = process.env.NODE_ENV === 'prod' ? 0 : 1;
const SERVER_LIST = [
    {
        name: '生产环境',
        domain: 'www.xxxxx.xyz',// 域名
        host: '10.16.1.100',// ip
        port: 22,// 端口
        username: 'root', // 登录服务器的账号
        // password: 'Gyxxxxxxxx6',// 登录服务器的账号
        privateKey: fs.readFileSync('E:/xxxxx/deploy/MyServer'),  // 密钥文件
        path: '/opt/xxxxx'// 发布至静态服务器的项目路径
    },{
        name: '测试环境',
        domain: 'www.xxxxx.xyz',// 域名
        host: '10.16.1.100',// ip
        port: 22,// 端口
        username: 'root', // 登录服务器的账号
        // password: 'Gyxxxxxxxx6',// 登录服务器的账号
        privateKey: fs.readFileSync('E:/xxxxx/deploy/MyServer'),  // 密钥文件
        path: '/opt/xxxxx'// 发布至静态服务器的项目路径
    }
];
module.exports = SERVER_LIST[envfile];
