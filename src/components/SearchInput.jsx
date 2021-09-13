import React, { memo, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import AppState from '../utils/appState';
import customHooks from '../utils/customHooks';

const { Option } = Select;
const { useDebounce, useLoading, useMount, useUnMount } = customHooks;

// SearchInput页面应用主要有两种情况 
// 页面级：路由切换，应保持原有数据，需要默认 labelInValue 初始化值；
// 弹窗：只需要保存当前value值即可，弹窗关闭打开时只需要配合initList 保存当前value，label即可；

const SearchInput = memo(function SearchInput({
  value: controlVal,
  onChange,
  initList,         // 初始化数据配置

  style,
  isInit,           // 是否初始化请求数据
  url,              // 根目录
  headers,          // 默认头部 
  paramType,        // 请求类型
  defaultPage,      // 默认分页参数
  // 部分业务存在首次请求字段和 onChange 时不一致
  queryField,       // onChange时请求参数
  initQueryField,   // 首次渲染的请求参数

  dataIndex,        // list数据源对应字段映射 类似 antd.Table 使用
  schema,           // 数据映射字段配置

  labelInValue,     // 绑定数据为{ value: "string" , label: "string" } 需与接口配合使用
  ...extra
}) {
  const [data, setData] = useState([]);
  const appState = useMemo(() => {
    const instance = new AppState();
    instance.isGetLoading = false;
    return instance
  }, []);

  const getData = useCallback((value, oneOfField) => appState.fetch(`/${url}`, {
    method: "GET",
    headers,
    [paramType]: {
      ...defaultPage,
      [oneOfField]: value
    }
  }), [appState, defaultPage, headers, paramType, url]);

  const { loading, wrapReq } = useLoading(getData, []);

  const handleSearch = useDebounce(async (value, oneOfField) => {
    let dataSource;
    const data = await wrapReq(value, oneOfField);
    dataSource = dataIndex.length > 0 ? data[dataIndex[0]] : data;
    setData(dataSource);
  }, 1500, []);

  useMount(() => {
    if (isInit) {
      handleSearch(labelInValue ? controlVal?.value : controlVal, initQueryField);
    }
  });

  useEffect(() => {
    data.length === 0 && setData(initList);
  }, [data.length, initList])

  const onSearch = useCallback((value) => {
    if (value) {
      handleSearch(value, queryField);
    }
  }, [handleSearch, queryField]);

  const onFocus = useCallback(() => {
    data.length === 0 && handleSearch(undefined, queryField)
  }, [data.length, handleSearch, queryField]);

  return (<Select
    onFocus={onFocus}
    filterOption={false}        // 关闭下拉框自动筛选功能
    loading={loading}
    showSearch
    labelInValue={labelInValue}
    value={controlVal}
    style={style}
    onSearch={onSearch}
    onChange={onChange}
    {...extra}
  >
    {data && data.map(d => <Option value={d[schema.value]} key={d[schema.key]}>{d[schema.label]}</Option>)}
  </Select>)
});

export default SearchInput;

SearchInput.propTypes = {
  isInit: PropTypes.bool,
  value: PropTypes.any,
  initList: PropTypes.array,
  defaultPage: PropTypes.shape({
    pageNum: PropTypes.number,
    pageSize: PropTypes.number
  }),
  dataIndex: PropTypes.arrayOf(PropTypes.string),
  queryField: PropTypes.string,
  initQueryField: PropTypes.string,
  onChange: PropTypes.func,
  url: PropTypes.string.isRequired,
  schema: PropTypes.object,
  labelInValue: PropTypes.bool,
  headers: PropTypes.object,
  style: PropTypes.object,
  paramType: PropTypes.oneOf(['search', 'body', 'inline']),
}

SearchInput.defaultProps = {
  initList: [],
  isInit: true,
  value: undefined,
  onChange: () => { },
  labelInValue: false,
  defaultPage: {
    pageNum: 1,
    pageSize: 10
  },
  headers: {},
  dataIndex: ['records'],
  queryField: "name",
  initQueryField: "name",
  schema: {
    value: 'id',
    key: 'id',
    label: 'name'
  },
  paramType: "search",
  style: {
    width: 200
  }
}

