import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Input, Space } from 'antd';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';


const { Search } = Input;

const onSearch = value => console.log(value);

function searchBar() {



  return (
    //hi
    <div>
          <Search 
          placeholder="wish book to summarize !" 
          
          onSearch={onSearch} 
          enterButton  />

    </div>
    

  );
}


export default searchBar;
