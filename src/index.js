import React from "react";
import ReactDOM from "react-dom";
import { List, Avatar, Button, Skeleton } from 'antd';
import reqwest from 'reqwest';

import 'antd/lib/button/style/css';

const fakeDataUrl = `https://yaloha.herokuapp.com/v1/horos/list`

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: [],
    };
  }

  componentDidMount() {
    this.getData((res) => {
      console.log(res.body)
      this.setState({
        data: res.body,
        list: res.body,
      });
    });
  }

  getData(callback) {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
      },
      success: (res) => {
        callback(res);
      },
    });
  }

  render() {
    const { list } = this.state;
    return (
      <List
        itemLayout="vertical"
        dataSource={list}
        bordered= {true}
        size="large"
        grid={{ gutter: 12, column: 4, size:'middle' }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.icon} />}
              title={<a href="https://ant.design">{item.name}</a>}
            />
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));
