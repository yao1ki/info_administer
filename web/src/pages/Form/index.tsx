import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import { values } from 'lodash';
import styles from './index.less';
import { Select } from 'antd';
import moment from 'moment';

let times = moment().format('YYYY-MM-DD HH:mm:ss');
const state = '1';
const { Option } = Select;
type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};
const tabList = [
  {
    key: 'order',
    tab: '未处理',
  },
  {
    key: 'process',
    tab: '勾魂中',
  },
  {
    key: 'checkout',
    tab: '阎王验收',
  },
  {
    key: 'chargeback',
    tab: '受刑中',
  },
];

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.querystate(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );
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
      key: 'id',
      valueType: 'textarea',
    },
    {
      title: '种族',
      key: 'name',
      valueType: 'textarea',

      render: (_: any, record: any)=> {
        return record.rein==null?'':record.rein.name ;

      },
    },

    {
      title: '死亡方式',
      dataIndex: 'cause',
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
              showEditModal(item);
            }}
          >
            选择勾魂人
          </a>
          <Divider type="vertical" />
        </span>
      ),
    },
  ];
  /* 编辑框将item传给current */
  const showEditModal = (item: GhostItem) => {
    setVisible(true);
    setCurrent({ ...item });
  };

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
  const pagination = {
    position: ['bottomRight'],
    showTotal: (total: number) => {
      return `共 ${total} 条记录 第 ${pagesize} / ${Math.ceil(total / 10)} 页`;
    },
    pageSize: 10,
    onChange: handleJump,
  };
  const handleTabChange = (key: string) => {
    switch (key) {
      case 'order':
        history.push(`/Form/index.tsx`);
        break;
      case 'process':
        history.push(`/Form/process.tsx`);
        break;
      case 'checkout':
        history.push(`/Form/checkout.tsx`);
        break;
      case 'chargeback':
        history.push(`/Form/chargeback.tsx`);
        break;
      default:
        break;
    }
  };
  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    setParams(value);
    setOpFlag(opFlag + 1);
  };

  // const getTabKey = () => {
  //   const { match, location } = props;
  //   const url = match.path === '/' ? '' : match.path;
  //   const tabKey = location.pathname.replace(`${url}/`, '');
  //   if (tabKey && tabKey !== '/') {
  //     return tabKey;
  //   }
  //   return 'articles';
  // };

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
        // tabActiveKey={getTabKey()}
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
      {/* <Select>
            {(arr.data===undefined)?"":arr.data.map(((v:any) => (<Option value={v.name}>{v.name}</Option>)))}
          </Select> */}
    </div>
  );
};

export default Personnel;
