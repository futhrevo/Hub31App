function generateVideoUrl(user: string, video: string) {
  return `https://www.media.hub31.com/${user}/${video}/master.m3u8`;
}

function generatePosterUrl(user: string, video: string) {
  return `https://www.assets.hub31.com/poster/${user}/${video}.png`;
}

export { generateVideoUrl, generatePosterUrl };
