/**
 * NodeJs服务器搭建[------------cool-------------]
 * createUser 程志强
 * createDate 2022-11-04
 */

// const formidable = require('formidable');
// 引入multer模块
// const multer = require("multer"); //文件上传需要
const express = require("express");

const app = express();
// const cors = require("cors")
// const router = express.Router();
const path = require("path");
/*对客户端发送的请求参数做处理便于获取*/
const bodyParser = require("body-parser");
/*(1)接收 json 参数：{“name”:“xxx”,“mobile”:“133897”}*/
const jsonParser = bodyParser.json();
const fs = require("fs");
/*(2)接收 x-www-form-urlencoded 参数：“name=xxx&mobile=133897”*/
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

/*上传使用此中间件*/
const multiparty = require("connect-multiparty");
const multiparMiddleware = multiparty();
//引入定义好的schema*modal
const Schema = require("../db/schema/schema");

const User = Schema.User;
const ImgFile = Schema.Attachment;
const CarouselModal = Schema.CarouselModal;

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
  next();
});

//__________________________________________________________________________________________
/**
 * 上传
 * *注：*设置后端响应头
  res.header("Access-Control-Allow-Headers","x-requested-with,content-type")
  开设public目录
  app.use(’/public/’,express.static(path.join(__dirname,’./public’)))
  版权声明：本文为CSDN博主「3积」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
  原文链接：https://blog.csdn.net/changan1999/article/details/114494921

  mongodb数据库添加账号 https://blog.csdn.net/weixin_63228975/article/details/127392890
                      ** https://blog.csdn.net/qq_24223159/article/details/127620951
 */
app.use("/public/", express.static(path.join(__dirname, "../public")));

app.post("/upload", multiparMiddleware, (req, res) => {
  //上传的图片参数
  const file = req.files.file ? req.files.file : req.files.headProfile;
  const fileGuid = new Date().getTime();
  //定义文件的存放路径
  const newName = fileGuid + "_" + file.originalFilename;
  const des_file = path.join(__dirname, "../public/uploads") + "\\" + newName;

  //将文件存入到本地服务器文件中
  fs.readFile(file.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        res.json({ code: 1 });
        return;
      }
    });
  });
  const imgUrl = `http://127.0.0.1:3300/public/uploads/${newName}`;
  //存入数据库
  const imgFile = new ImgFile({
    uid: fileGuid,
    name: file.originalFilename,
    status: "done",
    url: imgUrl,
    fileSize: file.size,
  });

  console.log("______________开始写入图片", imgFile);
  imgFile.save(function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      //将图片地址存放地址返回
      res.json({
        code: 0,
        size: file.size,
        url: imgUrl,
      });
      console.log("图片写入成功！！！");
    }
  });
});
//查询附件
app.post("/queryAttachment", jsonParser, (req, res) => {
  ImgFile.find(function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log("查询的图片信息", resp);
      res.send(resp);
    }
  });
});

app.post("/deleteAttachment", jsonParser, (req, res) => {
  console.log("服务端接收到请求参数______________", req.body);
  const body = req.body;
  // 传入的ID不用包装成ObjectID对象
  ImgFile.deleteOne({ uid: body.uid }, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.send({
      code: 200,
      message: "成功!",
    });
  });
});

/**
 * 定义用户表接口
 */
app.post("/addUser", jsonParser, (req, res) => {
  console.log("服务端收到请求...");
  console.log("服务端接收到请求参数", req.body);
  const body = req.body;
  //向数据库进行数据存储
  const userModal = new User({
    userId: body.userId,
    userName: body.userName,
    password: body.password,
    profile: body.profile,
    phone: body.phone,
    isManager: body.isManager, //1管理员 2超级管理员
    sex: body.sex, //0男 1女
    email: body.email, //电子邮件
    birthDay: body.birthDay,
  });
  console.log("DB:写入人员....");

  userModal.save(function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.send({ code: 200, data: body });
      console.log("数据写入成功！！！");
    }
  });
});
//根据账号查询是否已经注册
app.post("/findUser", jsonParser, (req, res) => {
  const body = req.body;
  User.findOne({ userName: body.userName }, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log("查询的数据信息", resp);
      res.send(resp);
    }
  });
});

//查询所有账户信息
app.post("/queryUsers", jsonParser, (_req, res) => {
  User.find(function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.send(resp);
    }
  });
});

app.post("/updateUsre", jsonParser, (req, res) => {
  console.log("服务端接收到请求参数______________", req.body);
  const body = req.body;
  User.updateOne(
    { userId: body.userId },
    {
      ...body,
    },
    (err, doc) => {
      res.send(doc);
    }
  );
});

// Carousel轮播
app.post("/addCarousel", jsonParser, (req, res) => {
  const body = req.body;
  const carouselList = body.list;
  console.log('___________________carr',carouselList)
  carouselList.map((item) => {
    //实例化数据对象
    const x = new CarouselModal({
      uid: item.uid,
      url: item.url,
    });
    //保存数据
    x.save(function (err, _resp) {
      if (err) {
        console.log(err);
      } else {
        console.log('增加数据成功....')
        res.send({ code: 200, data: body });
      }
    });
  });
});

app.post("/queryCarousel", jsonParser, (_req, res) => {
  CarouselModal.find(function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.send(resp);
    }
  });
});

/**
 * websoket通信
 */
const websocket = require("ws");
const server = new websocket.Server({
  port: 1234,
});
server.on("open", () => {
  console.log("open");
});
server.on("close", () => {
  console.log("close");
});
server.on("connection", (ws, req) => {
  console.log("connection连接成功");
  ws.on("message", (data) => {
    // data: 接收信息
    server.clients.forEach((item) => {
      if (item.readyState === ws.OPEN) {
        // console.log('' + data);
        item.send("" + data);
      }
    });
  });
});

/**
 * 监听3300端口
 */
app.listen(3300, () => {
  console.log("服务器运行在3300");
});
