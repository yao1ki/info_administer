import { FC, useState } from 'react';
import { Row, Card, Col, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import service from './service';
import { useRequest } from 'umi';
import styles from './style.less';

const Personnel: FC<{}> = () => {
  const [opFlag, setOpFlag] = useState<number>(0);
  const [visiable, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>();


  let data = useRequest(
    async () => {
      return await service.recordlist();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const b = data.data===undefined?'':data.data.length;
  return (
    <PageContainer >
      {
        <Row>
          {data.data === undefined
            ? ''
            : data.data.map((v: any, a: any) => (
              data.data === undefined
                ? ''
                : data.data.map((v: any, i: any) => (
                  (b-a==i+1&&v.experience!=undefined)?
                    (<Col span={6} style={{}}>
                      {
                        <div
                        onClick={() => {
                          setVisible(true);
                          setCurrent(v.experience);
                        }}
                        >
                          {
                            <img
                              src={`https://img1.baidu.com/it/u=4262778161,3449122068&fm=26&fmt=auto&gp=0.jpg`}
                            />
                          }
                        </div>
                      }
                    </Col>):''
                  ))
              ))}
        </Row>
      }
       

      <Modal   visible={visiable} width={'0%'} onCancel={() => setVisible(false)}  closable={false} footer={null} closeIcon={null}  >
        <div style={{fontSize: '30px',color:'red',background:'',textAlign:'center',height:'200%',}}>{current}</div>
      </Modal>

    </PageContainer>
    
  );
};

export default Personnel;
