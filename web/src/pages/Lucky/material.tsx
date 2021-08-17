import { FC, useState } from 'react';
import { Row, Card, Col, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import service from './service';
import { useRequest } from 'umi';
import styles from './style.less';

const Personnel: FC<{}> = () => {
  const [opFlag, setOpFlag] = useState<number>(0);

  let { data } = useRequest(
    async () => {
      return await service.list();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const updateItem = async (id: any) => {
    const res = await service.updateMaterial(id, { quantity: 100 });
    if (!res.error) {
      message.success('补充成功！');
      setOpFlag(opFlag + 1);
    }
  };
  return (
    <PageContainer>
      {
        <Row>
          {data === undefined
            ? ''
            : data.map((v: any, i: any) => (
                <Col span={6}>
                  {
                    <Card
                      className={styles.aa}
                      cover={<img src={v.picture} />}
                      title={
                        <div style={{fontSize:'200%',textAlign: 'center'}}>

                           {v.name}
                        </div>
                      }
                    >
                      {
                        <Row style={{ textAlign: 'center',fontSize:'150%'}}>
                          <Col span={12}>库存：{v.quantity+v.unit}</Col>
                          <Col span={12}>
                            {
                              <a
                                style={{ fontSize: '100%' }}
                                onClick={() => {
                                  updateItem(v.id);
                                }}
                              >
                                补货
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
