/**
 * 定义数据库admin user表模型
 * 参考资料1：https://blog.csdn.net/weixin_40629244/article/details/104906844
 * 参考资料2：https://www.gxlcms.com/JavaScript-60745.html
 * >定义 Schema<
 * 数据库中的 Schema，为数据库对象的集合，Schema 是 Mongoose 里使用的一种数据模式，
 *  可以理解为表结构的定义，每个 Schema 会映射到 Mongodb 中的一个 Collection，它不具备操作数据库的能力。
 * ----------------------------------------------
 * 创建数据模型
 * 数据模型 Model 是由 Schema 生成的模型，可以对数据库进行操作，定义模型可以传入两个参数也可以传入三个参数。
 * (1). 传两个参数格式如下：
 *  mongoose.model(ModelName，Schema）
 *   第一个参数ModeName为定义的模型名称，并且会和这个模型名称的复数集合所在的数据库建立连接，
 *  并操作这个集合，注意：模型名称首字母需要大写，第二个参数Schema为已定义好的Schema。
 *   const User = mongoose.model("User", UserSchema);
 *   如上面的定义的模型名称叫User，会操作所在数据库中的 users 这个集合。
 *  (2). 传三个参数时格式如下：
 *   const User=mongoose.model('User', UserSchema, Collection)
 *  传入三个参数时，前两个参数意思一样，第三个参数为所要操作的集合名称。
 *  如下面的定义的模型名称叫User，会操作所在数据库中的 info 这个集合
 */

const mongoose = require("../db");
const Schema = mongoose.Schema;

/**
 * ---------------------------------------------------------------------------------
 */
// 定义用户表Schema
const UserSchema = new Schema({
  userId: String,
  userName: String,
  password: String,
  profile: String,
  phone: String,
  isManager: Number, //1管理员 2超级管理员
  sex: Number, //0男 1女
  email: String, //电子邮件
  birthDay: String, //出生日期
});
const User = mongoose.model("User", UserSchema, "user");

//定义附件Schema
const AttachmentSchema = new Schema({
  uid: String,
  name: String,
  status: String,
  url: String,
  fileSize: Number,
});

const Attachment = mongoose.model("Attachment", AttachmentSchema, "attachment");

//定义主页轮播图Schema
const CarouselSchema = new Schema({
  uid: String,
  url: String,
});

const CarouselModal = mongoose.model("CarouselModal", CarouselSchema, "carousel");
/**
 * ---------------------------------------------------------------------------------
 */
//这样可以导出多个schem
module.exports = { User, Attachment, CarouselModal };
// module.exports = mongoose.model("User", UserSchema, "info");
