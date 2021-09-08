

console.log(buildEnv, 'buildEnv');

class InitEnv {
  constructor() {
    this.env = buildEnv === "online" ? "" : "pre";
    this.notLoginUrl = `//${buildEnv === "online" ? "" : "pre."}zxhj618.com/login`;
    this.baseUrl = `//${buildEnv === "online" ? "" : "pre-"}main-service.zxhj618.com`;
    // this.baseUrl = "192.168.1.40:8080"
    this.mallUrl = `//${buildEnv === "online" ? "" : "pre-"}saas-mall.zxhj618.com`;
    this.cookieName = this.matchCookieName();
    this.homePage = `//${buildEnv === "online" ? "" : "pre."}zxhj618.com`;
    this.rentMallUrl = `//${buildEnv === 'online' ? 'rent-mall' : 'pre-rent-mall'}.zxhj618.com`;
    this.domain = process.env.NODE_ENV === "production" ? "domain=zxhj618.com;" : "";
  }

  matchCookieName() {
    let result = [];
    switch (appName) {
      case "ZXHJ":
        result = `zxhj-${buildEnv === "online" ? "token" : "preToken"}`;
        break;
      case "SAAS":
        result = `${buildEnv === "online" ? "token" : "pre-token"}`;
        break;
      default:
        break;
    }
    return result;
  }
}

const initEnv = new InitEnv();

export default initEnv;
