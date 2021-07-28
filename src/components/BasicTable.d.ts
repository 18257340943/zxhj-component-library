import { TableProps } from 'antd';

declare function BasicTable<RecordType extends object = any>(props: TableProps<RecordType>): JSX.Element;

export default BasicTable;