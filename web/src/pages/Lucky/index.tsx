import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table,message } from 'antd';
import { GhostItem } from './data';
import OperationModal from './components/OperationModal';

import { useRequest, Link } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';

type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const state = '5';

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');

  //获取数据
  let aa = useRequest(
    async () => {
      return await service.list();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  let { data } = useRequest(
    async () => {
      return await service.querystate(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const confirmDelete = async (id: any,gnosis:any,ghost_id:any) => {
    let res,les;
    // const res = await service.removeGhost(id);
    aa.data === undefined ? '' : aa.data.map((v: any, i: any) => (v.quantity >= i + 1)?'':(res=0,les=v.name));

    if (res!=0) {
      res =
        aa.data === undefined
          ? ''
          : aa.data.map((v: any, i: any) =>(
             service.updateMaterial(v.id, { quantity: (v.quantity -i- 1) })
             
             )
            );
      !res.error ? history.push(`/Lucky/${id}`) : '';
      await service.updateGhost(id, {  ghost_id: parseInt(ghost_id)+1 ,state:"6"})
      les = await service.experience({"experience":gnosis})

    }else{
      message.success('孟婆汤原料:'+les+'库存不足，请补充');
    }
  };
  //<Link to={`/Lucky/${record.id}`}>投胎</Link>
  const tabList = [
    {
      key: 'rein',
      tab: '投胎管理',
    },
    {
      key: 'birth',
      tab: '已投胎',
    },
  ];
  const columns = [
    {
      title: '灵魂ID',
      dataIndex: 'id',
      key: 'id',
      valueType: 'textarea',
    },
    {
      title: '姓名/种类',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },
    {
      title: '投胎次数',
      dataIndex: 'ghost_id',
      key: 'id',
      valueType: 'textarea',
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span>
          <a
            onClick={() => {
              confirmDelete(item.id,item.gnosis,item.ghost_id);
            }}
          >
            投胎
          </a>
        </span>
      ),
    },
  ];

  const handleOk = () => {
    setVisible(false);
    setOpFlag(opFlag + 1);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleJump = (page: number) => {
    setPagesize(page);
  };
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'rein':
        history.push(`/rein`);
        break;
      case 'birth':
        history.push(`/birth`);
        break;
      default:
        break;
    }
  };
  const pagination = {
    position: ['bottomRight'],
    showTotal: (total: number) => {
      return `共 ${total} 条记录 第 ${pagesize} / ${Math.ceil(total / 10)} 页`;
    },
    pageSize: 10,
    onChange: handleJump,
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    setParams(value);
    setOpFlag(opFlag + 1);
  };
  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <div>
      <PageContainer
        content={
          <div style={{ textAlign: 'center' }}>
            <Input.Search
              placeholder="请输入"
              enterButton="搜索"
              size="large"
              onSearch={handleFormSubmit}
              style={{ maxWidth: 522, width: '100%' }}
            />
          </div>
        }
        tabList={tabList}
        tabActiveKey={getTabKey()}
        onTabChange={handleTabChange}
      >
        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: GhostItem): number => record.id as number}
          />
        </Card>
        
      </PageContainer>
      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default Personnel;
