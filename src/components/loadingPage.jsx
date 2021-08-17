import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

const LoadingPage = () => {
  let container = document.getElementById('loading-container');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loading-container');
    document.body.appendChild(container);
  }

  return ({
    start: () => {
      const antModal = document.querySelector('.ant-modal-body');
      const loadingDom = (<div
        id="loading-mask"
        style={{
          width: "100vw",
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1001,       // 默认设置高于 antd.Modal即可
          backgroundColor: !antModal ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0,0,0,0)'
        }}>
        {
          !antModal ? <Spin
            tip="Loading..."
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50% , -50%)',
            }} /> : null
        }
      </div >);

      if (!container.innerHTML) {
        // console.log('container 内容空节点了，可以添加节点了')
        ReactDOM.render(loadingDom, container);
      }
    },
    end: () => {
      const loadingMask = document.getElementById('loading-mask');

      if (loadingMask) {
        ReactDOM.unmountComponentAtNode(container);
      }
    }
  });
};

const loadingPage = LoadingPage();


export default loadingPage


