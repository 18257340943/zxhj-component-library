import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

const LoadingPage = () => {
  let container = document.getElementById('loading-container');
  const loadingDom = (<div
    id="loading-mask"
    style={{
      display: 'none',
      width: "100vw",
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1001,       // 默认设置高于 antd.Modal即可
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}>
    <Spin
      tip="Loading..."
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
      }} />
  </div >);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loading-container');
    document.body.appendChild(container);
  }

  if (!container.innerHTML) {
    ReactDOM.render(loadingDom, container);
  }

  // element.style.cssText += 'height: 100px !important';
  // box.style.cssText = 'width: 200px; height: 200px; border: 1px solid #f00;';

  const _this = this;

  // 实现插入虚拟dom，最外层必须命名容器id；
  this.rendDom = (eleId, documentNode, jsxDom) => {
    let container = document.getElementById('loading-container');
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', eleId);
      documentNode.appendChild(container);
    }
    if (!container.innerHTML) {
      ReactDOM.render(jsxDom, container);
    }
  };

  return ({
    start: () => {
      const loadingMaskDom = document.getElementById('loading-mask');
      const isLoadingMask = loadingMaskDom.style.display !== 'none';
      const antModal = document.querySelector('.ant-modal-content');
      const modalLoadingDom = (<div
        id="loading-mask"
        style={{
          display: 'none',
          width: "100%",
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1001,       // 默认设置高于 antd.Modal即可
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}>
        <Spin
          tip="Loading..."
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% , -50%)',
          }} />
      </div >);

      // 防止重复赋值;未加载则加载中;
      if (!isLoadingMask) {
        loadingMaskDom.style.display = "block";
      }
      // 弹窗模式下；改变加载蒙层
      if (antModal) {
        // antModal.appendChild();

        // loadingMaskDom.style.cssText += 'width: 100%; height: 100%; position: absolute'
      }

    },
    end: () => {
      const loadingMaskDom = document.getElementById('loading-mask');
      const isLoadingMask = loadingMaskDom.style.display !== 'none';
      if (isLoadingMask) {
        loadingMaskDom.style.display = "none";
      }
    }
  });
};

class LoadPage {

  constructor() {
    this.#rendDom('loading-container', document.body, this.#loadingMask);
  }

  #loadingMask = (<div
    id="loading-mask"
    style={{
      display: 'none',
      width: "100vw",
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1001,       // 默认设置高于 antd.Modal即可
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}>
    <Spin
      tip="Loading..."
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
      }} />
  </div >)

  #modalLoadingMask = (<div
    id="loading-mask"
    style={{
      display: 'none',
      width: "100%",
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1001,       // 默认设置高于 antd.Modal即可
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}>
    <Spin
      tip="Loading..."
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
      }} />
  </div >)


  #rendDom(eleId, documentNode, jsxDom) {
    let container = document.getElementById('loading-container');
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', eleId);
      documentNode.appendChild(container);
    }
    if (!container.innerHTML) {
      ReactDOM.render(jsxDom, container);
    }
  }

  start() {
    const loadingMaskDom = document.getElementById('loading-mask');
    loadingMaskDom.style.display = "block";
    // const antModal = document.querySelector('.ant-modal-content');

    // // 弹窗模式下；改变加载蒙层
    // if (antModal) {
    //   // antModal.appendChild();
    //   antModal.appendChild(this.modalLoadingMask);
    //   // loadingMaskDom.style.cssText += 'width: 100%; height: 100%; position: absolute'
    //   return
    // }

  }

  end() {
    const loadingMaskDom = document.getElementById('loading-mask');
    const isLoadingMask = loadingMaskDom.style.display !== 'none';
    if (isLoadingMask) {
      loadingMaskDom.style.display = "none";
    }
  }

}

// const loadingPage = LoadingPage();


// export default loadingPage

export default new LoadPage()

