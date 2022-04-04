// Behavior
export const TOGGLE_CHAT = 'TOGG_CHAT';
export const TOGGLE_INPUT_DISABLED = 'TOGG_INP';
export const TOGGLE_MESSAGE_LOADER = 'TOGG_LDR';

// Messages
export const SET_BADGE_COUNT = 'SET_BADG_C';
export const OPEN_FULLSCREEN_PREVIEW = 'OPEN_FS_PREVIEW';
export const CLOSE_FULLSCREEN_PREVIEW = 'CLOSE_FS_PREVIEW';
export const MARK_ALL_READ = 'MARK_ALL_READ';

export function toggleChat() {
  return { type: TOGGLE_CHAT }
}

export function toggleInputDisabled() {
  return { type: TOGGLE_INPUT_DISABLED }
}

export function toggleMsgLoader() {
  return { type: TOGGLE_MESSAGE_LOADER }
}

export function setBadgeCount(count) {
  return { type: SET_BADGE_COUNT, count }
}

export function openFullscreenPreview(payload) {
  return { type: OPEN_FULLSCREEN_PREVIEW, payload }
}

export function closeFullscreenPreview() {
  return { type: CLOSE_FULLSCREEN_PREVIEW }
}

export function markAllMessagesRead(topic) {
  return { type: MARK_ALL_READ, topic }
}
