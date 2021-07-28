import React from 'react';
import { Modal } from 'antd';



export default function BasicModal({ ...props }) {

  return (<Modal
    width={1000}
    maskClosable={false}
    {...props}
  />)

}