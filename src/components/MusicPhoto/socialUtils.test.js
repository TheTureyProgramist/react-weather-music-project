import { normalizeLikeValue, getLikeStateLabel, getDailyCommentQuotaLeft } from "./socialUtils";

describe("social utils", () => {
  it("normalizes like values to the intended social state", () => {
    expect(normalizeLikeValue(2)).toBe(1);
    expect(normalizeLikeValue(1)).toBe(1);
    expect(normalizeLikeValue("2")).toBe(1);
    expect(normalizeLikeValue(-1)).toBe(-1);
    expect(normalizeLikeValue(0)).toBe(0);
  });

  it("returns a readable label for the current state", () => {
    expect(getLikeStateLabel(2)).toBe("like");
    expect(getLikeStateLabel(-1)).toBe("dislike");
    expect(getLikeStateLabel(0)).toBe("none");
  });

  it("calculates remaining daily comment quota", () => {
    expect(getDailyCommentQuotaLeft(4, 0)).toBe(4);
    expect(getDailyCommentQuotaLeft(4, 2)).toBe(2);
    expect(getDailyCommentQuotaLeft(4, 4)).toBe(0);
  });
});
