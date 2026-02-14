const STATUS_ID_PATTERN = /\/status\/(\d+)/;

export async function getVideoUrl(tweetUrl: string): Promise<string | null> {
  const match = tweetUrl.match(STATUS_ID_PATTERN);
  if (!match) return null;

  const statusId = match[1];
  const response = await fetch(`https://api.vxtwitter.com/i/status/${statusId}`);
  if (!response.ok) return null;

  const data = await response.json();
  const video = data.media_extended?.find(
    (m: { type: string }) => m.type === "video",
  );

  return video?.url ?? null;
}
