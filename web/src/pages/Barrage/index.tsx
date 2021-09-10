import { FC, useState } from 'react';
import { Row, Card, Col, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Table } from 'antd';
import { history } from 'umi';
import styles from './style.less';

import service from './service';
import { useRequest } from 'umi';
import { copyFile } from 'fs';
const Personnel: FC<{}> = () => {
  const [opFlag, setOpFlag] = useState<number>(0);
  const [visiable, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>();

  var a = new Array(10);

  let data = useRequest(
    async () => {
      return await service.recordlist();
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const danmu = new Array();
  let c;
  // console.log('Math.random()', (Math.random() * 100000) % 20 >> 0);
  data.data === undefined ? '' : data.data.map((v: any, i: any) => danmu.push(v.experience));
  danmu.shift();
  let b = data.data === undefined ? '' : data.data.length;
  b = parseInt(b);
  for (let i = 9; i >= 0; i--) {
    c = (Math.random() * 10000000) % b >> 0;
    console.log('typeof(b)', c);

    a[i] = danmu[c];
  }
const pus =()=>{
    history.push(`/barr`)
}
const rand =()=>{
  console.log("bbbbbbbb",a)

   let b = Math.floor(Math.random()*a.length)
   console.log("bbbbbbbb",b)
}
// Array.prototype.getRandomItem=function(){
//   return this[Math.floor(Math.random()*this.length)]
// }
//className={styles.aa}

  return (
    <main style={{background:`url(')` }}>
     <div style={{ height: '80vh'}} className={styles.aa} >
        {a === undefined
          ? ''
          : a.map((v, i) => (
              <ol
                style={{ fontSize: '20px', color: '	#FF0000', textShadow: ' 5px 5px 5px #DC143C' }}
              >
                {v}
              </ol>
            ))}
      </div>
            <button onClick={rand}  >aaa</button>
      <Modal>
        <div>{current}</div>
      </Modal>
    </main>
  );
};

export default Personnel;
