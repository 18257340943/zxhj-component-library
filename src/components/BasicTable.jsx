import React from 'react';
import { Table } from 'antd';
import { calcScrollX } from '../utils/utils';




export default function BasicTable({ columns, pagination, ...extraProps }) {

  return (<Table
    columns={columns}
    scroll={{
      x: calcScrollX(columns),
    }}
    pagination={pagination ? {
      showSizeChanger: false,
      ...pagination
    } : false}
    {...extraProps}
  />)
}