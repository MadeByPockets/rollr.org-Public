// PostCSS config that is safe for both app and library builds
// - Tries to use Tailwind's PostCSS plugin if available
// - Falls back to no plugins so tsup can build without Tailwind present
export default async () => {
  const plugins = [];
  try {
    const mod = await import('@tailwindcss/postcss');
    const tailwind = mod.default ?? mod;
    if (tailwind) plugins.push(tailwind);
  } catch (_) {
    // Tailwind plugin not installed — skip it for library builds
  }
  return { plugins };
};
