import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next'

import { RTC_MSG_TYPE, updateCourse, updateApplyUser } from '../../../redux/live/liveReducer';
import { updateCoVideoUsers } from '../../../redux/live/roomActions';

export function useChatService(ctrlMsg: any) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (ctrlMsg && ctrlMsg.hasOwnProperty('type')) {
      switch (ctrlMsg.type) {
        // room member Changed
        case RTC_MSG_TYPE.updateMemberCount:
          dispatch(updateCourse({ stuC: ctrlMsg.total }))
          break;
        // update course state
        case RTC_MSG_TYPE.roomInfoChanged:
          dispatch(updateCourse({ courseState: ctrlMsg.cSt, muteChat: ctrlMsg.offC }))
          break;
        // update room co-video-users
        case RTC_MSG_TYPE.coVideoUsersChanged:
          dispatch(updateCoVideoUsers(ctrlMsg.users))
          break;
        // teacher start screen share
        case RTC_MSG_TYPE.screenShare:
          dispatch(updateCourse({ screenId: ctrlMsg.screenId }))
          break;
        // peer hands up, update Apply user
        case RTC_MSG_TYPE.sendApply:
          dispatch(updateApplyUser({ account: ctrlMsg.userName, userId: ctrlMsg.userId, uid: ctrlMsg.uid }))
          alert.info(t("alerts", "student_send_co_video_apply", { reason: ctrlMsg.userName }))
          break;
        // teacher send reject
        case RTC_MSG_TYPE.sendReject:
          alert.error(t("alerts", "teacher_reject_co_video", { reason: ctrlMsg.userName }))
          break;
        // teacher send Accepted
        case RTC_MSG_TYPE.sendAccept:
          alert.success(t("alerts", "teacher_accept_co_video", { reason: ctrlMsg.userName }))
          break;
        // teacher send Stop
        case RTC_MSG_TYPE.sendStop:
          alert.info(t("alerts", "stop_co_video", { reason: ctrlMsg.userName }))
          break;
        default:
          break;
      }
    }
  }, [ctrlMsg, dispatch, alert, t])
}
