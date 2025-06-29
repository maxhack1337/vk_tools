const formatViewsValue = (views: number) => {
  if (views < 1000) {
    return getLang?.("stories_views_title", views).toString() || "";
  }

  const thresholds = [
    { divider: 1_000_000_000, suffix: "B" },
    { divider: 1_000_000, suffix: "M" },
    { divider: 1_000, suffix: "K" },
  ];

  const { divider, suffix } = thresholds.find((t) => views >= t.divider) || { divider: 1, suffix: "" };

  const scaledValue = views / divider;

  const after = Number.isInteger(scaledValue) ? 0 : 1;

  const formattedViews = (scaledValue.toFixed(after) + suffix).replace(".", ",");
  const baseValue = Math.trunc(scaledValue) * divider;

  return (getLang?.("stories_views_title", baseValue).toString() || "").replace(baseValue.toString(), formattedViews).toString() || "";
};

export default formatViewsValue;
