import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

export default function RadioButtons({ list, value, onChange, ...extra }) {

  return (<Radio.Group
    value={value}
    onChange={e => onChange(e.target.value)}
    {...extra}
  >
    {list.map(item => (<Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>))}
  </Radio.Group>)
}

RadioButtons.propTypes = {
  list: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func
}

RadioButtons.defaultProps = {
  list: [],
  value: 3,
  onChange: () => { }
}