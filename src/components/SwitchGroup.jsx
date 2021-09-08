import React, { useState } from 'react';
import { Switch } from 'antd'
import { makeStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';

export default function SwitchGroup({ list, value, onChange, handleChange, ...extra }) {
  // const [ ] = useState(list);
  const classes = makeStyles(() => ({
    topWrapper: {
      display: 'flex',
      // padding: theme.wrapperPd.common,
      backgroundColor: '#ffffff'
    },
    switchBox: {
      marginRight: 24,
    },
    label: {
      padding: '0 8px'
    },
  }))();

  const switchChange = (status, item) => {
    handleChange ? handleChange(status) : onChange(status ? item.switchVal : undefined)
  }

  // switch 默认也支持参数配置;
  return (<div className={classes.topWrapper} {...extra}>
    {
      list.map(item => {
        const { value: switchVal, label, ...extra } = item;
        return (<div className={classes.switchBox} key={switchVal}>
          <span className={classes.label}>{label}</span>
          <Switch
            checked={switchVal === value}
            onChange={status => switchChange(status, item)}
            {...extra}
          />
        </div>)
      })
    }
  </div>)
}

SwitchGroup.propTypes = {
  list: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
}
SwitchGroup.defaultProps = {
  list: [],
  value: undefined,
  onChange: () => { }
}