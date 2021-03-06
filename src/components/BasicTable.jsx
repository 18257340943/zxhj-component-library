import React from 'react';
import { Table } from 'antd';
import { calcScrollX } from '../utils/utils';

export default function BasicTable({ columns, pagination, ...extraProps }) {

  return (<Table
    columns={columns.filter(Boolean)}
    scroll={{
      x: calcScrollX(columns),
    }}
    pagination={pagination ? {
      showQuickJumper: true,
      ...pagination
    } : false}
    {...extraProps}
  />)
}