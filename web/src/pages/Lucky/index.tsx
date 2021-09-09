import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import React from 'react';
import { history } from 'umi';
import {  useState } from 'react';
import service from './service';
import { useRequest } from 'umi';
import { Badge } from 'antd';

type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};



const Search: FC<SearchProps> = (props) => {
  const [params, setParams] = useState<string>('');
  const [opFlag, setOpFlag] = useState<number>(0);
  let a = 0;
  let b = 0;
  let { data } = useRequest(
    async () => {
      return await service.listGhost(params);
    },
    {
      refreshDeps: [opFlag],
    },
  );
  data===undefined?'':data.map((v:any,i:any)=>v.dead==0?'':v.state==5?a++:v.state==6?b++:'')

  const tabList = [
    {
      key: 'undispose',
    },
    {
      key: 'rein',
      tab: <Badge count={a}>待投胎</Badge>,

    },
    {
      key: 'birth',
      tab: <Badge count={b}>待分配</Badge>,
    },
  ];
  console.log("ABCD",a,b)

  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'rein':
        history.push(`${url}/rein`);
        break;
      case 'birth':
        history.push(`${url}/birth`);

        break;
      default:
        break;
    }
  };


const refresh=()=>{
  setOpFlag(opFlag+1)
}
  const handleFormSubmit = (value: string) => {
    setParams(value)
  };
  // const constructor=(props:any)=>{
  //   super(props);
  //   this.state={
  //     name
  //   }

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
      {props.children && React.cloneElement(props.children, {
              params:params,refresh:refresh
            })}
    </PageContainer>
  );
};

export default Search;
