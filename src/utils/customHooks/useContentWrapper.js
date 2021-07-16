/* eslint-disable react/display-name */
import React from 'react';
import usePersistFn from './usePersistFn';
import { makeStyles } from '@material-ui/styles';

export default function useContentWrapper() {
  const classes = makeStyles(theme => ({
    contentWrapper: {
      background: '#ffffff',
      padding: "16px 24px 16px 24px",
      minHeight: 'calc(100% - 37px )'
    }
  }))();

  const ContentWrapper = ({ children }) => {
    return (<div
      className={classes.contentWrapper}
      children={children}
    />)
  };
  return usePersistFn(ContentWrapper);
}