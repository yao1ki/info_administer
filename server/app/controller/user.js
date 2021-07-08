'use strict';
const Controller = require('egg').Controller;

const crypto = require('crypto');

const loginRule = {
    username: 'string',
    password: 'string',
};

function encrypt(password) {
    const salt = 'thmbji';
    const md5 = crypto.createHash('md5');
    const newpwd = md5.update(password + salt).digest('hex');
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
            ctx.throw(401, '错误的用户名或密码');

        }
        const token = app.jwt.sign({
            user: user.id,
        }, app.config.jwt.secret, { expiresIn: '3d' });
        ctx.body = ctx.success({ token, id: user.id, });
    }

    async index() {
        const { ctx, service } = this;
        const opt = ctx.helper.curd(ctx);
        const ret = await service.user.list(opt);
        ctx.body = ctx.success(ret.rows, { total: ret.count });
    }

    async create() {
        const ctx = this.ctx;
        const { username, password, name, } = ctx.request.body;
        const user = await ctx.service.user.create({
            username, password: encrypt(password), name,
        });
        ctx.body = ctx.success(user);
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const user = await service.user.show(id);
        const { username, password, name, } = ctx.request.body;
        if (password == user.dataValues.password) {
            await user.update({ username, name, });
        } else {
            await user.update({ username, password: encrypt(password), name, });
        }
        ctx.body = ctx.success();
    }

    async destroy() {
        const { ctx, service,app } = this;
        //获取本人id
        const {token} = ctx.request.query;
        let decode = await app.jwt.verify(token, app.config.keys);
        let user_id = decode.user;

        const id = ctx.params.id;
        console.log(id);
        if (user_id!=id){
            const user = await service.user.show(id);
            await user.destroy();
            ctx.body = ctx.success();
        }else{ 
            ctx.throw(500,'------');
        }
        
    }

    async current() {
        const { ctx, app } = this;
        const { token } = ctx.request.query;
        let decoded = await app.jwt.verify(token, app.config.keys);
        console.log('---->',decoded);
        const user = await ctx.model.User.findByPk(decoded.user,);
        if (user) {
            ctx.body = ctx.success({
                id: user.id,
                name: user.name,
            });
        } else {
            ctx.status = 401;
            ctx.throw(404, '该账号不存在或已删除');
        }
    }

}

module.exports = UserController;