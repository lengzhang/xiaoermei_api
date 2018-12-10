import crypto from 'crypto';

function CryptData(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

CryptData.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  let sessionKey = new Buffer(this.sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

CryptData.prototype.encryptSha1 = function (rawData = "") {
  return crypto.createHash('sha1').update(`${rawData}${this.sessionKey}`, 'utf8').digest('hex');
}

module.exports = CryptData
