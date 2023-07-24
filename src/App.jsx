
import './App.css';
import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
const { CheckableTag } = Tag;
//ask share job good
const tagsData = ['全部', '精华', '分享', '问答', '招聘', '客户端测试']
const tab=(value)=>{
  switch(value){
    case 'ask' :
      return "问答"
      break;
      case 'share' :
      return "分享"
      break;
      case 'job' :
      return "招聘"
      break;
      case 'good' :
      return "精华"
      break;
      default :
      return "其他"
      break;
  }
}
function App() {

  const [topics, setTopics] = useState([]);
  const getTopics = () => {
    axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        setTopics(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      });
  }

  useEffect(() => {
    getTopics()
  }, [])
  const [selectedTag, setSelectedTag] = useState('全部');

  const handleChange = (tag, checked) => {

    setSelectedTag(tag);
  };
  return (
    <>
      <header>
        <div className="container">
          <div className='logo'>
            <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="" />

            <Space.Compact size="large">
              <Input addonBefore={<SearchOutlined />} placeholder="" />

            </Space.Compact></div>

          <ul>
            <li>首页</li>
            <li>新手入门</li>
            <li>API</li>
            <li>关于</li>
            <li>注册</li>
            <li>登录</li>
          </ul></div>

      </header>

      <main>
        <div className='main'>
          <div className="left">
            <div className="top">
              <Space size={[0, 8]} wrap>
                {tagsData.map((tag) => (
                  <CheckableTag
                    key={tag}
                    checked={selectedTag === tag}
                    onChange={(checked) => handleChange(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
              </Space></div>

            {topics.map((topic) => (
              <div className='cell'>
                <div className='cell-left'><img src={topic.author.avatar_url} alt="" />
                  <div className='cell-left-number'><i>{topic.reply_count}</i>/<em>{topic.visit_count}</em></div>
                  <CheckableTag checked={topic.top}>

                    {tab(topic.tab)}
                  </CheckableTag>
                  <h3>{topic.title}</h3>
                </div>
                <div className='cell-right'><img src="https://avatars.githubusercontent.com/u/51047556?v=4&s=120" alt="" />
                  <div className='day'>{topic.last_reply_at}</div></div>

              </div>
            ))}


          </div>
          <div className="right"></div>
        </div>
      </main>
    </>
  );
}

export default App;
