/* eslint-disable no-restricted-globals */
/**
 * MediaSource helper
 */

export function getMediaSource() {
  return self.MediaSource || (self as any).WebKitMediaSource;
}
