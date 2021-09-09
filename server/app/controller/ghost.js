"use strict";
const Controller = require("egg").Controller;
const Op = require("sequelize").Op;

const moment = require("moment");
const schedule = require("node-schedule");
// 定义规则
let rule = new schedule.RecurrenceRule();
rule.second = 0;
//每分钟 0 秒执行一次
// 启动任务

/////
class GhostController extends Controller {
  async aa() {
    console.log("bbbbbbbbbb");
    var  ret 

    schedule.scheduleJob ( rule, async() => {
      const { ctx, service } = this;
      ret =await ctx.model.Ghost.findAll({
        where: { dead: 0 },
      });
      ret === undefined
        ? ""
        : ret.map(async (v, i) =>
            moment(v.time_end).diff(moment(moment().format()), "hour") <=0
              ? (await v.update({dead:'1'}))
              : ""
          );
      console.log("----Controller.this------>", moment().format());
    });




  }
  async index() {
    const { ctx, service } = this;
    const opt = ctx.helper.curd(ctx);
    const ret = await service.ghost.list(opt);
    await service.ghost.aa();
    ctx.body = ctx.success(ret.rows, { total: ret.count });

  }

  async ghostlist() {
    const { ctx, service } = this;

    const { params } = ctx.request.query;
    const ghost = await service.ghost.ghostlist(params);
    ctx.body = ctx.success(ghost);
  }
  async create() {
    const ctx = this.ctx;

    const {
      name,
      dead,
      lifetime,
      cause,
      sort,
      state,
      ghost_id,
      time_start,
      time_end,
      gnosis,
      constellation,
    } = ctx.request.body;
    const ghost = await ctx.service.ghost.create({
      name,
      lifetime,
      cause,
      sort,
      gnosis,
      state,
      dead,

      ghost_id,
      time_start,
      time_end,
      constellation,
      time_start,
      time_end,
    });
    ctx.body = ctx.success(ghost);
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    let user_id = this.ctx.locals.user.user;
    const ghost = await service.ghost.show(id);
    const {
      name,
      dead,

      lifetime,
      cause,
      sort,
      state,
      ghost_id,
      reason,
      gnosis,
      rein_id,
      time_start,
      time_end,
      constellation,
    } = ctx.request.body;
    await ghost.update({
      name,
      lifetime,
      cause,
      sort,
      state,
      ghost_id,
      reason,
      gnosis,
      user_id: user_id,
      dead,

      rein_id,
      time_start,
      time_end,
      constellation,
    });
    ctx.body = ctx.success();
  }
  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    const ghost = await service.ghost.show(id);
    ctx.body = ctx.success(ghost);
  }
  async querystate() {
    const { ctx, service } = this;
    const state = ctx.params.state;
    const { params } = ctx.request.query;
    const ghost = await service.ghost.querystate(state, params);
    ctx.body = ctx.success(ghost);
  }
  async list() {
    console.log("============");
    const { ctx, service } = this;
    const state = ctx.params.state;
    const { params } = ctx.request.query;
    const ghost = await service.ghost.ghoststate(state, params);
    ctx.body = ctx.success(ghost);
  }
  // async list(){
  //   const{ctx , service } = this;
  //   const state = ctx.request.query;
  //   const { params } = ctx.request.query;

  //   const ghost = await service.ghost.ghoststate(state,params);
  //   ctx.body = ctx.success(ghost)
  // }
  async query() {
    const { ctx, service } = this;
    const { name } = ctx.request.query;
    const ghost = await service.ghost.query(name);
    ctx.body = ctx.success(ghost);
  }

  async move() {
    const { ctx, service } = this;

    const id = ctx.params.id;
    const ghost = await service.ghost.show(id);
    await ghost.update({ state: 4 });
    ctx.body = ctx.success();
  }
}

module.exports = GhostController;
