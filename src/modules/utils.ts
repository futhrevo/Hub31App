import { MESSAGE_BOX_SCROLL_DURATION } from './config';

export function getStringBytes(nBytes: number) {
  let sOutput = nBytes + " bytes";
  // optional code for multiples approximation
  const aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  for (let nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
  }
  return sOutput;
}

export function getDocType(doc: { [x: string]: any }) {
  if (doc.hasOwnProperty('questions')) {
    return 0; // quiz
  }
  if (doc.hasOwnProperty('poster')) {
    return 1; // video
  }
  if (doc.hasOwnProperty('question')) {
    return 3; // question
  }
  return 2; // document type
}

export function tryParseJSON(jsonString: string) {
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }

  return false;
};

export function getHMSString(ms: number) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 1000 / 60) % 60);
  let hours = Math.floor((ms / 1000 / 3600) % 24);
  let days = Math.floor((ms / 1000 / 86400));

  let shours = (hours < 10) ? "0" + hours : hours;
  let sminutes = (minutes < 10) ? "0" + minutes : minutes;
  let sseconds = (seconds < 10) ? "0" + seconds : seconds;

  return `${days > 0 ? `${days} days, ` : ''} ${shours}:${sminutes}:${sseconds}`;
}

export function getDateTimeLocal(timestamp: number, isDate = true) {
  if (!timestamp) {
    timestamp = Date.now()
  }
  const unixTime = new Date(timestamp);
  // convert the local time zone offset from minutes to milliseconds
  const z = unixTime.getTimezoneOffset() * 60 * 1000

  // subtract the offset from unixTime
  const tLocal = unixTime.valueOf() - z;

  // create shifted Date object and convert to ISO format string
  const iso = new Date(tLocal).toISOString();

  if (isDate) {
    return iso.substring(0, 10);
  }
  return iso.substring(11, 16);
}

export function getUnixTimestamp(date: string, time: string) {
  const tLocal = new Date(`${date} ${time}`);
  return tLocal.getTime()
}
export function getNameProfession(title: string) {
  const [name = '', profession = ''] = (title.split(' &&& ')) || [];
  return { name, profession }
}

function sinEaseOut(timestamp: any, begining: any, change: any, duration: any) {
  return change * ((timestamp = timestamp / duration - 1) * timestamp * timestamp + 1) + begining;
}

/**
 *
 * @param {*} target scroll target
 * @param {*} scrollStart
 * @param {*} scroll scroll distance
 */
function scrollWithSlowMotion(target: any, scrollStart: any, scroll: number) {
  const raf = window?.requestAnimationFrame;
  let start = 0;
  const step = (timestamp: number) => {
    if (!start) {
      start = timestamp;
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION);
    let total = scrollStart + stepScroll;
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step);
    }
  }
  raf(step);
}


export function scrollToBottom(messagesDiv: HTMLDivElement) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight;
  const scrollTop = messagesDiv.scrollTop;
  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight);
  if (scrollOffset) scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}

export function arrayCompare(a1: Array<any>, a2: Array<any>): boolean {
  if (typeof a1 === 'undefined' || typeof a2 === 'undefined') {
    return false;
  }
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    // Don't forget to check for arrays in our arrays.
    if (a1[i] instanceof Array && a2[i] instanceof Array) {
      if (!arrayCompare(a1[i], a2[i])) {
        return false;
      }
    }
    else if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}
