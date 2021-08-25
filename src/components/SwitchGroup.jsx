import React, { useState } from 'react';
import { Switch } from 'antd'
import { makeStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';

export default function SwitchGroup({ label, list, value, onChange, ...extra }) {
  const defaultWidth = 200;
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

  // const [switch0, switch1] = list;
  // const { label: label0, value: value0, ...extra0 } = switch0;
  // const { label: label1, value: value1, ...extra1 } = switch1;
  // switch 默认也支持参数配置;
  return (<div className={classes.topWrapper} {...extra}>
    {
      list.map(item => {
        const { value: switchVal, label, ...extra } = item;
        return (<div className={classes.switchBox} key={switchVal}>
          <span className={classes.label}>{label}</span>
          <Switch
            checked={switchVal === value}
            onChange={status => onChange(status ? switchVal : undefined)}
            {...extra}
          />
        </div>)
      })
    }

    { }
    {/* {<div className={classes.switchBox} key={value1}>
      <span className={classes.label}>{label1}</span>
      <Switch
        checked={value1 === value}
        onChange={status => onChange(status ? value1 : value0)}
        {...extra1}
      />
    </div>} */}
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