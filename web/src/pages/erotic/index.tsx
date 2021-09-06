import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import { history } from 'umi';
import { useRequest } from 'umi';
import {  useState } from 'react';
import { Badge, Avatar } from 'antd';
import moment from 'moment';
import service from './service';
import React, { Component } from 'react';

type SearchProps = {
  a:{
    hello:string;
  }
  match: {
    url: string;
    path: string;
    name:string;
  };
  location: {
    pathname: string;
  };

};



const Search: FC<SearchProps> = (props) => {


var a =0
var b =0
var c = 0
var d = 0
const [params, setParams] = useState<string>('');

let { data } = useRequest(
  async () => {
    return await service.listGhost(params);
  },
);
const aa = ()=>{
}
data===undefined?'':data.map((v:any,i:any)=>v.dead==0?'':v.state==1?a++:v.state==2?b++:v.state==3?c++:v.state==4?d++:'')
const tabList = [
  {
    key: 'undispose',
    tab: <Badge count={a}>未处理</Badge>,
  },
  {
    key: 'process',
    tab: <Badge count={b}>勾魂中</Badge>,
  },
  {
    key: 'checkout',
    tab: <Badge count={c}>阎王验收</Badge>,
  },
  {
    key: 'punishment',
    tab: <Badge count={d}>受刑中</Badge>,
  },
];

  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'undispose':
        history.push(`${url}/undispose`);
        break;
      case 'process':
        history.push(`${url}/process`);
        break;
      case 'checkout':
        history.push(`${url}/checkout`);
        break;
      case 'punishment':
        history.push(`${url}/punishment`);
        break;
      default:
        break;
    }
  };
const pop = ()=>{
  class App extends Component {
    constructor(props:any){
        super(props);
        this.state={
            msg:'父类的消息',
            name:'John',
            age:99
        }
      }
      }  
    

}
  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
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
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={pop}
            style={{ maxWidth: 522, width: '100%' }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default Search;
