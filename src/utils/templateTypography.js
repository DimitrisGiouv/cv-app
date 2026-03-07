const TAILWIND_TEXT_SIZE_TO_PX = {
  'text-xs': 12,
  'text-sm': 14,
  'text-base': 16,
  'text-lg': 18,
  'text-xl': 20,
  'text-2xl': 24,
};

export const safeText = (value, fallback) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
};

export const createTemplateTypography = (fontSizes) => {
  const resolveFontSizePx = (key, fallbackPx) => {
    const raw = fontSizes?.[key];

    if (typeof raw === 'number' && Number.isFinite(raw)) {
      return Math.min(48, Math.max(10, raw));
    }

    if (typeof raw === 'string') {
      const parsed = Number.parseInt(raw, 10);
      if (Number.isFinite(parsed)) {
        return Math.min(48, Math.max(10, parsed));
      }

      if (TAILWIND_TEXT_SIZE_TO_PX[raw]) {
        return TAILWIND_TEXT_SIZE_TO_PX[raw];
      }
    }

    return fallbackPx;
  };

  const fontStyle = (key, fallbackPx) => ({
    fontSize: `${resolveFontSizePx(key, fallbackPx)}px`,
  });

  const iconSize = (key, fallbackPx = 14) => {
    const scaled = Math.round(resolveFontSizePx(key, fallbackPx) * 1.05);
    return Math.min(24, Math.max(12, scaled));
  };

  return {
    resolveFontSizePx,
    fontStyle,
    iconSize,
  };
};
