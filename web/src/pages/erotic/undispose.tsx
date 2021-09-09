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
  params:string;
  refresh:any
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.querystate(state, props.params);
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
    props.refresh()
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

        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: GhostItem): number => record.id as number}
          />
        </Card>
      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
      {/* <Select>
            {(arr.data===undefined)?"":arr.data.map(((v:any) => (<Option value={v.name}>{v.name}</Option>)))}
          </Select> */}
    </div>
  );
};

export default Personnel;
