import { FC, useState } from 'react';
import { Row,Card,  Col, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import service from './service';
import { useRequest } from 'umi';
import styles from './style.less';
import moment from 'moment';

const Personnel: FC<{}> = () => {
  const [opFlag, setOpFlag] = useState<number>(0);

  let times = moment().format("YYYY-MM-DD HH:mm:ss"); 




  let bb = parseInt(new Date().toLocaleString());
  parseInt(moment(times).format('YYYY'))
  moment(times).startOf('hour').fromNow(); 



  
  let { data } = useRequest(
    async () => {
      return await service.list();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const updateItem = async (id: number, title: any) => {
    const res =
      title == 0
        ? await service.updateTool(id, { titles: '1' }):title==1?
         await service.updateTool(id, { titles: '0' }):
         await service.updateTool(id, { year: title });
    if (!res.error) {
      message.success(title==9?'更换成功':title==0?'重启成功':'暂停成功');
      setOpFlag(opFlag + 1);
    }
  };
  return (
    <PageContainer >
      {
        <Row>
          {data === undefined
            ? ''
            : data.map((v: any, i: any) => (
                <Col span={6} >
                  {
                    <Card
                      className={styles.aa}
                      cover={<img src={v.titles==1?v.covers:'https://img2.baidu.com/it/u=4273932495,1345879263&fm=26&fmt=auto&gp=0.jpg'} />}
                      title={
                        <div>
                          <Row className={styles.bb}>
                            <Col span={12}>{v.name}</Col>
                            {v.titles == 0 ? (
                              <Col span={12} style={{ color: 'red' }}>
                                设备检修
                              </Col>
                            ) : (
                              <Col span={12} style={{ color: 'green' }}>
                                设备正常
                              </Col>
                            )}

                            <Col span={12}>{'操纵员:' + (v.user===undefined?"暂无" :v.user.name)}</Col>
                            <Col span={12}>{'使用时间' +(bb-v.year-parseInt(moment(v.created_at).format('YYYY')))+
                              '年'}</Col>
                          </Row>
                        </div>
                      }
                    >
                      {
                        <Row style={{ textAlign: 'center' }}>
                          <Col span={24}>
                            {
                              <a
                                style={{ fontSize: '150%' }}
                                onClick={() => {
                                  updateItem(v.id, v.titles);
                                }}
                              >
                                {v.titles == 0 ? '设备重启' : '设备暂停'}
                              </a>
                            }
                          </Col>
                          
                        </Row>
                      }
                    </Card>
                  }
                </Col>
              ))}
        </Row>
      }
   </PageContainer>
  );
};

export default Personnel;
