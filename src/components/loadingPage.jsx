import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

class LoadPage {

  constructor() {
    this.#renderDom('loading-container', document.body, this.#loadingMask);
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

  #renderDom(eleId, documentNode, jsxDom) {
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

  }

  end() {
    const loadingMaskDom = document.getElementById('loading-mask');
    const isLoadingMask = loadingMaskDom.style.display !== 'none';
    if (isLoadingMask) {
      loadingMaskDom.style.display = "none";
    }
  }

}


export default new LoadPage()

