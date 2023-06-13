import JSEncrypt from "jsencrypt";

/**
 * 生成UUID
 * @returns
 */
const uuid = () => {
    return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
};

  /**
   * @param data 加密解密数据
   * @param isEncrypt 是否加密
   * @param key 公钥/私钥key  //去密钥生成网址去生成公钥和密钥 http://tools.jb51.net/password/rsa_encode
   */
  //测试key MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMcSD7J4dc1H4MT8C1zEt9Bhr9VYxnJt8oIRGO0i9jjDqM13M7sNnKZxddIryTkRezeM1ySZpQ
  const RSA_JM = (data: string, isEncrypt: boolean, key: string)=> {
    const encryptor = new JSEncrypt(); // 实例
    let __str: any = "";
    if (isEncrypt) {
      encryptor.setPublicKey(key); //设置公匙
      __str = encryptor.encrypt(data); // 进行加密并返回加密后的字符串
    } else {
      encryptor.setPrivateKey(key); // 设置私匙
      __str =  encryptor.decrypt(data) // 进行加密并返回解密后的字符串
    }
    return __str
  }

  // 校验字符串是否为JSON字符串
  const isJSON = (str:string)=> {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    console.log('It is not a string!')    
}


export {
    uuid,
    RSA_JM,
    isJSON
}