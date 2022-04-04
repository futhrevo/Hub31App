import { useEffect, useState, useCallback, useMemo } from 'react';
import Auth from '@aws-amplify/auth';
import { useAlert } from 'react-alert';

import { isSupported } from '../../../../../../../../modules/MSE/is-supported';
import { authVid, cookVid } from '../../../../../../../../api/videos';
import { useInterval } from '../../../../../../../useInterval';

export default function useVidSuffix(courseId, chapId, matId) {
  const alert = useAlert();
  const [head, setHead] = useState('');
  const [video, setVideo] = useState({});
  const [suffix, setSuffix] = useState('1');
  const [delay] = useState(25000);
  const [isRunning, setIsRunning] = useState(true);
  const [isSuffixFetched, setSuffixFetched] = useState(false);
  const [isHeadFetched, setHeadFetched] = useState(false);

  // check if MediaSource Extensions are enabled
  const isMSE = useMemo(() => isSupported(), []);

  const updateSuffix = useCallback(async () => {
    try {
      const res = await cookVid(courseId, chapId, matId, !isMSE); // send true for cookies, false for signed link
      if (res && Object.prototype.hasOwnProperty.call(res, 'vid')) {
        setVideo(res.vid);
      }

      if (res && Object.prototype.hasOwnProperty.call(res, 'signedUrl')) {
        const suffix = res.signedUrl.replace(res.cleanLink, '');
        setSuffixFetched(true);
        setSuffix(suffix);
        const head = (await Auth.currentSession()).getIdToken().getJwtToken();
        setHead(head);
      } else {
        setIsRunning(false);
      }

    } catch (e) {
      alert.error("Unable to get authorization");
    }
  }, [courseId, chapId, matId, alert, isMSE]);

  useEffect(() => {
    async function getHeader() {
      try {
        await authVid(courseId, chapId, matId);
        setHeadFetched(true);
      } catch (e) {
        alert.error("Unable to authenticate request");
      }
    }
    getHeader();
    updateSuffix();
  }, [courseId, chapId, matId, updateSuffix, alert]);

  useInterval(() => {
    updateSuffix();
  }, isRunning ? delay : null);

  return {
    video,
    head,
    suffix,
    ready: (isSuffixFetched && isHeadFetched && suffix !== '1')
  }
}
