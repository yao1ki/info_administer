import { FC, useState } from 'react';
import { Row, Card, Col, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Modal } from 'antd';

import service from './service';
import { useRequest } from 'umi';
import styles from './style.less';

const Personnel: FC<{}> = () => {
  
  var nIntervId: any, intervalID;

  function myCallback() {
    setVisible(false);
    console.log('+======', nIntervId);
    clearInterval(nIntervId);
  }
  const [visiable, setVisible] = useState<boolean>(false);

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
      setVisible(true);

      nIntervId = setInterval(myCallback, 1000);

      setOpFlag(opFlag + 1);
    }
  };
  setOpFlag(opFlag + 1);

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
                      title={<div style={{ fontSize: '200%', textAlign: 'center' }}>{v.name}</div>}
                    >
                      {
                        <Row style={{ textAlign: 'center', fontSize: '150%' }}>
                          <Col span={12}>库存：{v.quantity + v.unit}</Col>
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
      <Modal
        visible={visiable}
        width={'0%'}
        onCancel={() => setVisible(false)}
        footer={null}
        closable={false}
        closeIcon={null}
      >
        <img src={`https://cdn.pixabay.com/photo/2014/03/24/17/21/water-295492__340.png`} />
        {}
      </Modal>
    </PageContainer>
  );
};

export default Personnel;
