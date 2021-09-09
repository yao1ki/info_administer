import React, { useEffect, useState } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import service from '../Lucky/service';
import { useRequest } from 'umi';
const headUrl = 'https://img1.baidu.com/it/u=4262778161,3449122068&fm=26&fmt=auto&gp=0.jpg';
export default function Demo() {
  // let data = async () => {
  //   return await service.recordlist();
  // };
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  const [flag, setFlag] = useState(false);

  const componentDidMount = () => setInterval(() => danmu(), 3000);

  let { data } = useRequest(async () => {
    return await service.recordlist();
  });
  let exper = new Array();
  data === undefined ? '' : data.map((v, i) => exper.push(v.experience));

  useEffect(() => {
    if (flag) {
      setInterval(() => danmu(), 1000);
    }
  }, [flag]);

  const handleSubmit = () => {
    setFlag(!flag);
  };

  const danmu = () => {
    const num = (Math.random() * exper.length) >> 0;
    console.log('exper', exper[num]);

    handleSend(exper[num]);
  };
  //////////////////////////////////////////
  // 弹幕屏幕
  ////////////////

  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    let s = new BulletScreen('.screen', { duration: 20 });
    // or
    // let s=new BulletScreen(document.querySelector('.screen));
    setScreen(s);
  }, []);
  // 弹幕内容输入事件处理
  // const handleChange = ({ target: { value } }) => {
  //   setBullet(value);
  // };
  // 发送弹幕
  const handleSend = (barr) => {
    // push 纯文本
    barr === undefined
      ? ''
      : (screen.push(barr)
        // or 使用 StyledBullet

        // screen.push(
        //   <StyledBullet head={headUrl} msg={barr} backgroundColor={'#fff'} size="large" />,
        // ),
        // // or 还可以这样使用，效果等同使用 StyledBullet 组件
        // screen.push({
        //   msg: barr,
        //   head: headUrl,
        //   color: '#eee',
        //   size: 'large',
        //   backgroundColor: 'rgba(2,2,2,.3)',
        // })
        );
  };
  componentDidMount();
  return (
    <main
      style={{
        background: 'url(https://cdn.pixabay.com/photo/2012/03/01/00/21/bridge-19513__340.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      <div className="screen" style={{ height: '90vh' }}></div>
    </main>
  );
}
