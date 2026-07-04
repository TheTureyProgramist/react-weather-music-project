export const MAX_DAILY_COMMENTS = 4;
export const MAX_VISIBLE_COMMENTS = 100;
export const MAX_TOTAL_COMMENTS = 100;
export const LIKE_VALUE_TO_SCORE = {
  1: 1,
  2: 2,
};

export const normalizeLikeValue = (value) => {
  if (value === 2 || value === "2" || value === 1 || value === "1") return 1;
  if (value === -1 || value === "-1") return -1;
  return 0;
};

export const getLikeStateLabel = (value) => {
  const normalized = normalizeLikeValue(value);
  if (normalized === 1) return "like";
  if (normalized === -1) return "dislike";
  return "none";
};

export const getDailyCommentQuotaLeft = (limit = MAX_DAILY_COMMENTS, used = 0) => {
  return Math.max(0, limit - used);
};

export const buildCommentPayload = ({
  trackId,
  user,
  text,
  avatar,
  color,
  supporterName,
}) => ({
  id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  trackId,
  text: String(text || "").trim(),
  createdAt: Date.now(),
  user: {
    uid: user?.uid || user?.id || "guest",
    email: user?.account || user?.email || "",
    name: supporterName || user?.firstName || user?.name || "Гість",
    avatar: avatar || user?.avatar || user?.avatarUrl || "",
    color: color || user?.borderColor || user?.textColor || "#ffb36c",
  },
  likes: 0,
  dislikes: 0,
  score: 0,
});

export const getInitialCommentStats = () => ({
  views: 0,
  likes: 0,
  dislikes: 0,
  comments: 0,
});
