"use strict";
const Controller = require("egg").Controller;

const crypto = require("crypto");

const loginRule = {
  username: "string",
  password: "string",
};

function encrypt(password) {
  const salt = "thmbji";
  const md5 = crypto.createHash("md5");
  const newpwd = md5.update(password + salt).digest("hex");
  return newpwd;
}

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    ctx.validate(loginRule);
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { username, password: encrypt(password) },
    });

    if (!user) {
      ctx.throw(401, "错误的用户名或密码");
    }
    const token = app.jwt.sign(
      {
        user: user.id,
        potence:user.potence,
        auth:user.auth
      },
      app.config.jwt.secret,
      { expiresIn: "3d" }
    );
    ctx.body = ctx.success({ token, id: user.id,potence:user.potence });
  }

  async index() {
    const { ctx, service } = this;

    const opt = ctx.helper.curd(ctx);
    const ret = await service.user.list(opt);
    ctx.body = ctx.success(ret.rows, { total: ret.count });
  }

  async create() {
    const ctx = this.ctx;
    const { username, password, name, e_mile, address, telephone } =
      ctx.request.body;
    const user = await ctx.service.user.create({
      username,
      password: encrypt(password),
      name,
      e_mile,
      address,
      telephone,
    });
    ctx.body = ctx.success(user);
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const user = await service.user.show(id);
    const { username, password, name, e_mile, address, telephone } =
      ctx.request.body;
    if (password == user.dataValues.password || !password) {
      await user.update({ username, name, e_mile, address, telephone });
    } else {
      await user.update({
        username,
        password: encrypt(password),
        name,
        e_mile,
        address,
        telephone,
      });
    }
    ctx.body = ctx.success();
  }

  async destroy() {
    const { ctx, service, app } = this;
    const { token } = ctx.request.query;
    let user_id = this.ctx.locals.user.user;
    let potence = this.ctx.locals.user.user;
    const id = ctx.params.id;
    if (user_id != id) {
      const user = await service.user.show(id);
      await user.destroy();
      const order = await service.order.showupdate(id);


      order.map((v,i)=>{ v.destroy()})
      ctx.body = ctx.success();
    } else {
      ctx.throw(500, "------");
    }
  }
  async userlist() {
    const { ctx, service } = this;
    const potence = ctx.params.potence;
    const user = await service.user.userlist(potence);
    ctx.body = ctx.success(user);
  }
  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const user = await service.user.show(id);
    ctx.body = ctx.success(user);
  }
  async current() {
    const { ctx, app } = this;
    const { token } = ctx.request.query;
    let decoded = await app.jwt.verify(token, app.config.keys);
    const user = await ctx.model.User.findByPk(decoded.user);
    if (user) {
      ctx.body = ctx.success({
        id: user.id,
        name: user.name,
        auth:user.auth,
      });
    } else {
      ctx.status = 401;
      ctx.throw(404, "该账号不存在或已删除");
    }
  }
}

module.exports = UserController;
