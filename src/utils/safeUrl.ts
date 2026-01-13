/**
 * URL safety helpers for user/CMS-provided links.
 *
 * Goals:
 * - Block XSS vectors like `javascript:`, `data:`, `vbscript:`
 * - Allow common safe schemes (http/https, optionally mailto/tel)
 * - Optionally allow relative URLs (starting with `/`)
 */
export type SanitizeHrefOptions = {
  allowRelative?: boolean;
  allowHash?: boolean;
  allowMailto?: boolean;
  allowTel?: boolean;
  /**
   * When true, allow protocol-relative URLs like `//example.com`.
   * Default: false (these can unexpectedly downgrade/upgrade scheme).
   */
  allowProtocolRelative?: boolean;
};

const UNSAFE_PREFIXES = ["javascript:", "data:", "vbscript:"] as const;

function hasUnsafeScheme(input: string): boolean {
  const trimmed = input.trim().toLowerCase();
  return UNSAFE_PREFIXES.some((p) => trimmed.startsWith(p));
}

/**
 * Returns a safe href or null if the value should not be used.
 */
export function sanitizeHref(
  href: string | null | undefined,
  {
    allowRelative = true,
    allowHash = false,
    allowMailto = false,
    allowTel = false,
    allowProtocolRelative = false,
  }: SanitizeHrefOptions = {}
): string | null {
  if (!href) return null;
  const raw = String(href).trim();
  if (!raw) return null;

  if (hasUnsafeScheme(raw)) return null;

  if (raw.startsWith("#")) {
    return allowHash ? raw : null;
  }

  if (raw.startsWith("//")) {
    return allowProtocolRelative ? raw : null;
  }

  if (raw.startsWith("/")) {
    return allowRelative ? raw : null;
  }

  const lower = raw.toLowerCase();
  if (lower.startsWith("mailto:")) return allowMailto ? raw : null;
  if (lower.startsWith("tel:")) return allowTel ? raw : null;

  try {
    const url = new URL(raw);
    if (url.protocol === "http:" || url.protocol === "https:") return raw;
    return null;
  } catch {
    // Not a valid absolute URL; reject (prevents things like `example.com` being treated inconsistently)
    return null;
  }
}
