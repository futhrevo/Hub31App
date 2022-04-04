import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withSize } from 'react-sizeme';

import { addSub, delSub } from '../../../redux/iot/actions';
import { getWhiteBoardTopic, sendWhiteBoardMsg } from '../../../redux/iot/topicUtils';
import Icon from '../../Icon';
import './styles.scss';


const BRUSH_WIDTH = 2;
const ERASER_WIDTH = 20;

function cloneCanvas(canvas) {
  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  context.drawImage(canvas, 0, 0);
  return newCanvas;
}

const WhiteBoard = ({ size, student = true, channel }) => {
  const [drawing, setDrawing] = useState(false);
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [brush, setBrush] = useState(BRUSH_WIDTH);
  const [color, setColor] = useState('black');
  const [last, setLast] = useState('black');
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const topic = useMemo(() => getWhiteBoardTopic(channel), [channel]);
  const iotMsg = useSelector(state => (state.IOT.topics[topic] || {}).messages);

  const clearCanvas = useCallback(e => {
    const canvas = canvasRef.current;
    if (e && !student) {
      sendWhiteBoardMsg(channel, { type: 'clear' });
    }
    // console.log(canvas.toDataURL());
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)
  }, [student, channel]);

  const drawLine = useCallback((x0, y0, x1, y1, color, brushwidth, emit) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    if (emit) {
      x0 = x0 - rect.left;
      y0 = y0 - rect.top;
      x1 = x1 - rect.left;
      y1 = y1 - rect.top;
    }
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = brushwidth;
    context.stroke();
    context.closePath();
    if (!emit) { return; }
    const w = canvas.width;
    const h = canvas.height;
    sendWhiteBoardMsg(channel, {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      c: color,
      p: brushwidth
    });
  }, [channel]);

  const resize = useCallback((width, height) => {
    if (canvasRef.current !== null && width > 0) {
      const canvas = canvasRef.current;
      let tempCanvas = cloneCanvas(canvas);
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.drawImage(tempCanvas, 0, 0);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current !== null && student && iotMsg) {
      if (iotMsg.hasOwnProperty('type')) {
        if (iotMsg.type === 'clear') {
          clearCanvas();
        }
      }
      if (iotMsg.hasOwnProperty('x0')) {
        const { x0, y0, x1, y1, c, p } = iotMsg;
        const canvas = canvasRef.current;
        const w = canvas.width;
        const h = canvas.height;
        drawLine(x0 * w, y0 * h, x1 * w, y1 * h, c, p, false);
      }
    }
  }, [iotMsg, student, clearCanvas, drawLine]);

  useEffect(() => {
    dispatch(addSub(topic));
    return () => {
      dispatch(delSub(topic));
    }
  }, [topic, dispatch]);

  useEffect(() => {
    let w = size.width;
    let h = w * 0.5625;

    resize(w, h);
  }, [size, resize]);

  useEffect(() => {
    if (canvasRef.current !== null && !student) {
      const onChange = e => {
        if (canvasRef.current.contains(e.target)) {
          e.preventDefault();
        }
      }
      document.body.addEventListener("touchstart", onChange, { capture: false, passive: false });
      document.body.addEventListener("touchend", onChange, { capture: false, passive: false });
      document.body.addEventListener("touchmove", onChange, { capture: false, passive: false });
      return () => {
        document.body.removeEventListener("touchstart", onChange, { capture: false, passive: false });
        document.body.removeEventListener("touchend", onChange, { capture: false, passive: false });
        document.body.removeEventListener("touchmove", onChange, { capture: false, passive: false });
      }
    }
  }, [student]);


  const onPen = useCallback(() => {
    setBrush(BRUSH_WIDTH);
    setColor(last);
  }, [last]);

  const onEraser = useCallback(() => {
    setBrush(ERASER_WIDTH);
    setLast(color);
    setColor('white');
  }, [color]);

  const onMouseDown = useCallback((e) => {
    setDrawing(true);
    setCurrent({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  }, []);

  const onMouseUp = (e) => {
    if (!drawing) { return; }
    if (e.clientX || e.touches.length > 0) {
      setDrawing(false);
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, color, brush, !student);
    }
  }

  const onMouseMove = (e) => {
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, color, brush, !student);
    setCurrent({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  }

  // limit the number of events per second
  const throttle = useCallback((callback, delay) => {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();
      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }, []);

  return (
    <div className="whiteboard-container" ref={targetRef}>
      {student ? null : (
        <>
          <ButtonGroup vertical className="position-absolute mt-3 ml-3" >
            <Button
              className="color black"
              variant="light"
              onClick={() => setColor('black')}
            >

            </Button>
            <Button
              className="color red"
              variant="light"
              onClick={() => setColor('red')}
            >

            </Button>
            <Button
              className="color green"
              variant="light"
              onClick={() => setColor('green')}
            >

            </Button>
            <Button
              className="color blue"
              variant="light"
              onClick={() => setColor('blue')}
            >

            </Button>
            <Button
              className="color yellow"
              variant="light"
              onClick={() => setColor('yellow')}
            >

            </Button>
          </ButtonGroup>

          <ButtonGroup className="position-absolute pens">
            <Button
              active={brush === BRUSH_WIDTH}
              variant="link"
              onClick={onPen}
            >
              <Icon iconStyle="solid" icon="pen" />
            </Button>
            <Button
              active={brush === ERASER_WIDTH}
              variant="link"
              onClick={onEraser}
            >
              <Icon iconStyle="solid" icon="eraser" />
            </Button>
          </ButtonGroup>

          <Button
            variant="link"
            className="position-absolute board-actions"
            style={{ marginTop: `calc(${canvasRef.current === null ? 200 : canvasRef.current.height}px - 2rem)` }}
            onClick={clearCanvas}
          >
            <Icon iconStyle="solid" icon="chalkboard" className="text-danger" />
          </Button>
        </>
      )}

      <canvas
        className="border border-primary rounded w-100 img-fluid whiteboard border-width-2 bg-white"
        ref={canvasRef}
        onMouseDown={student ? null : onMouseDown}
        onMouseUp={student ? null : onMouseUp}
        onMouseOut={student ? null : onMouseUp}
        onMouseMove={student ? null : throttle(onMouseMove, 10)}
        onTouchStart={student ? null : onMouseDown}
        onTouchEnd={student ? null : onMouseUp}
        onTouchCancel={student ? null : onMouseUp}
        onTouchMove={student ? null : throttle(onMouseMove, 10)}
      />
    </div>
  );
}

export default withSize()(WhiteBoard);


// function useDimensions(targetRef) {
//   const getDimensions = () => {
//     if (targetRef.current !== null) {
//       console.log(targetRef.current.getBoundingClientRect())
//     }

//     return {
//       width: targetRef.current ? targetRef.current.offsetWidth : 50,
//       height: targetRef.current ? targetRef.current.offsetHeight : 50
//     };
//   };

//   const [dimensions, setDimensions] = useState(getDimensions);

//   const handleResize = () => {
//     setDimensions(getDimensions());
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useLayoutEffect(() => {
//     handleResize();
//   }, []);
//   return dimensions;
// }
