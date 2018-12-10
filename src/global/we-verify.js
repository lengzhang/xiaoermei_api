import nodeFetch from 'node-fetch'

function WeVerify(appId, appSecret) {
  this.appId = appId;
  this.appSecret = appSecret;
}

WeVerify.prototype.getSectionKey = async function(code) {
  console.log('getSectionKey:\n');
  console.log("[appId]\t", this.appId);
  console.log("[appSecret]\t", this.appSecret);
  console.log("[code]\t", code);
  return await nodeFetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`)
  .then((res) => (res.json()))
  .then((res) => {
    console.log('code2session:\n');
    for (let v in res) {
      console.log(`[${v}]\t`, res[`${v}`]);
    }
    return res;
  });
}

module.exports = WeVerify
