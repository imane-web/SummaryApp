import React from 'react';
import { Menu } from 'antd';
import ResearchSummary from '../../ResearchSummary/ResearchSummary';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item>
      <h1 style={ {backgroundColor: "F4202A"}} > Choose efecently your next book !</h1>
    </Menu.Item>
    <Menu.Item key="mail">
      <a href="/home">Home</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/subscription">Subscription</a>
    </Menu.Item>
    <Menu.Item>
      <h1 style={{ }}></h1>
    </Menu.Item>
  
  </Menu>
  )
}

export default LeftMenu