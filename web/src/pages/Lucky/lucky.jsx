import React from 'react';
import { LuckyWheel } from 'react-luck-draw';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import { useRequest, Link, history } from 'umi';
import service from './service';
import { GhostItem } from './data.d';

export default class App extends React.Component {
  constructor() {
    super();
    this.myLucky = React.createRef();
    this.state = {
      blocks: [{ padding: '26px', background: '#d64737' }],
      prizes: [
        {
          key:'1',
          title: '天人道',
          background: '#f9e3bb',
          fonts: [{ text: '天人道', top: '30%', fontSize: '30px' }],
        },
        {
          key:'2',
          title: '修罗道',
          background: '#f8d384',
          fonts: [{ text: '修罗道', top: '30%', fontSize: '30px' }],
        },
        {
          key:'3',
          title: '畜牲道',
          background: '#f9e3bb',
          fonts: [{ text: '畜牲道', top: '30%', fontSize: '30px' }],
        },
        {
          key:'4',

          title: '饿鬼道',
          background: '#f8d384',
          fonts: [{ text: '饿鬼道', top: '30%', fontSize: '30px' }],
        },
        {
          key:'5',

          title: '地狱道',
          background: '#f9e3bb',
          fonts: [{ text: '地狱道', top: '30%', fontSize: '30px' }],
        },
        {
          key:'6',

          title: '人间道',
          background: '#f8d384',
          fonts: [{ text: '人间道', top: '30%', fontSize: '30px' }],
        },
      ],
      buttons: [
        { radius: '50px', background: '#d64737' },
        { radius: '45px', background: '#fff' },
        { radius: '41px', background: '#f6c66f', pointer: true },
        {
          radius: '35px',
          background: '#ffdea0',
          fonts: [{ text: '开始\n轮回', fontSize: '18px', top: -18 }],
        },
      ],
      defaultStyle: {
        fontColor: '#d64737',
        fontSize: '14px',
      },
    };
  }
  render() {
    let id = this.props.match.params.id;

    let { data } = service.showGhost(id);
    return (
      <PageContainer>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            {
              <LuckyWheel
                ref={this.myLucky}
                width="600px"
                height="600px"
                blocks={this.state.blocks}
                prizes={this.state.prizes}
                buttons={this.state.buttons}
                defaultStyle={this.state.defaultStyle}
                onStart={() => {
                  // 点击抽奖按钮会触发star回调
                  // 调用抽奖组件的play方法开始游戏
                  this.myLucky.current.play();
                  // 模拟调用接口异步抽奖
                  setTimeout(() => {
                    // 假设拿到后端返回的中奖索引
                    const index = (Math.random() * 6) >> 0;
                    // 调用stop停止旋转并传递中奖索引
                    this.myLucky.current.stop(index);
                  }, 2500);
                }}
                onEnd={(prize) => {
                  // 抽奖结束会触发end回调
                  service.updateGhost(id, { rein_id: prize.key }).error?alert("投胎失败"):
                  alert('恭喜投胎进入:' + prize.title)
                  history.push(`/Rein`);
                }}
              ></LuckyWheel>
            }
          </Col>
          <Col span={8}></Col>
        </Row>
      </PageContainer>
    );
  }
}
