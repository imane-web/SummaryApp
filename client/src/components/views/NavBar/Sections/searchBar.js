import React from "react";
import { withRouter } from 'react-router-dom';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#11111',
    }}
  />
);

const onSearch = value => console.log(value);
export default function searchBar() {
  return (
    //hi
    <div>
          <Search placeholder="input search text"  onSearch={onSearch} enterButton />

    </div>
    

  );
}
