import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import usePreview from './usePreview';
import usePortal from './usePortal';
import { closeFullscreenPreview } from '../../../../../../../redux/iot/chatActions';

import close from '../../../../../../../assets/close.svg';
import plus from '../../../../../../../assets/plus.svg';
import minus from '../../../../../../../assets/minus.svg';
import zoomIn from '../../../../../../../assets/zoom-in.svg';
import zoomOut from '../../../../../../../assets/zoom-out.svg';

const FullScreenPreview = ({ fullScreenMode, zoomStep }) => {
  const {
    state,
    initFileSize,
    onZoomIn,
    onZoomOut,
    onResizePageZoom
  } = usePreview(zoomStep);

  const dispatch = useDispatch();
  const { src, alt, width, height, visible } = useSelector((state: GlobalState) => ({
    src: state.IOT.chat.fs.src,
    alt: state.IOT.chat.fs.alt,
    width: state.IOT.chat.fs.width,
    height: state.IOT.chat.fs.height,
    visible: state.IOT.chat.fs.visible
  }));

  useEffect(() => {
    if (src) {
      initFileSize(width, height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  const pDom = usePortal();
  const onClosePreview = () => {
    dispatch(closeFullscreenPreview());
  };

  const childNode = (
    <div className="rcw-previewer-container">
      <div className="rcw-previewer-veil">
        <img {...state.layout} src={src} className="rcw-previewer-image" alt={alt} />
      </div>
      <button
        className="rcw-previewer-button rcw-previewer-close-button"
        onClick={onClosePreview}
      >
        <img alt="preview" src={close} className="rcw-previewer-icon" />
      </button>
      <div className="rcw-previewer-tools">
        <button
          className="rcw-previewer-button"
          onClick={onResizePageZoom}
        >
          <img
            src={state.zoom ? zoomOut : zoomIn}
            className="rcw-previewer-icon"
            alt="reset zoom"
          />
        </button>

        <button
          className="rcw-previewer-button"
          onClick={onZoomIn}
        >
          <img src={plus} className="rcw-previewer-icon" alt="zoom in" />
        </button>
        <button
          className="rcw-previewer-button"
          onClick={onZoomOut}
        >
          <img src={minus} className="rcw-previewer-icon" alt="zoom out" />
        </button>
      </div>
    </div>
  )

  return visible ? ReactDOM.createPortal(childNode, pDom) : null;
}

export default FullScreenPreview;
