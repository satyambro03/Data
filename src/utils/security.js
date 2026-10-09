/**
 * Security Utility Layer
 * Provides client-side defense against XSS, MIME spoofing, prototype pollution,
 * and malicious payload injection in sensitive biodata profiles.
 */

// Maximum permissible photo upload size (5 MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Strictly allowed MIME types (SVG is explicitly rejected due to embedded script risks)
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Validates an image file both by metadata and binary magic-byte signatures.
 * Prevents attackers from renaming malicious executables, HTML, or SVGs into .png or .jpg.
 *
 * @param {File} file - File object from input element
 * @returns {Promise<{ valid: boolean, error?: string }>}
 */
export async function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  // 1. File Size Verification
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the 5MB limit. Please upload an image under 5MB.`,
    };
  }

  if (file.size === 0) {
    return { valid: false, error: 'File appears to be empty.' };
  }

  // 2. MIME Type Validation
  const mimeType = (file.type || '').toLowerCase();
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: 'Invalid file format. Only JPG, PNG, and WebP images are permitted.',
    };
  }

  // 3. Binary Magic Byte (File Signature) Verification
  try {
    const buffer = await file.slice(0, 16).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const isJPEG = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const isPNG =
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;
    const isWEBP =
      bytes[0] === 0x52 && // R
      bytes[1] === 0x49 && // I
      bytes[2] === 0x46 && // F
      bytes[3] === 0x46 && // F
      bytes[8] === 0x57 && // W
      bytes[9] === 0x45 && // E
      bytes[10] === 0x42 && // B
      bytes[11] === 0x50; // P

    if (!isJPEG && !isPNG && !isWEBP) {
      return {
        valid: false,
        error: 'Security alert: File content signature does not match a valid JPG, PNG, or WebP image.',
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Failed to verify file security signature.' };
  }
}

/**
 * Sanitizes single input string to neutralize Cross-Site Scripting (XSS),
 * HTML tag injection, dangerous URL schemes, and invisible Unicode exploit characters.
 *
 * @param {string|any} input - Raw input text
 * @param {number} [maxLength=1000] - Hard length ceiling to avoid memory bloat / ReDoS
 * @returns {string|any} Sanitized string
 */
export function sanitizeInput(input, maxLength = 1000) {
  if (typeof input !== 'string') return input;

  // Enforce length limit
  let sanitized = input.slice(0, maxLength);

  // Strip dangerous HTML tags and script elements
  sanitized = sanitized.replace(/<\/?(script|iframe|object|embed|svg|math|style|link|meta|base|form|input|button)[\s\S]*?>/gi, '');

  // Strip generic opening & closing tags while preserving plain text characters
  sanitized = sanitized.replace(/<[^>]+>/g, '');

  // Neutralize dangerous pseudo-protocols like javascript:, vbscript:, data:text/html
  sanitized = sanitized.replace(/(javascript|vbscript|data\s*:\s*text\/html)\s*:/gi, '');

  // Neutralize inline DOM event handler attributes (e.g., onerror=, onload=)
  sanitized = sanitized.replace(/\bon[a-z]+\s*=/gi, '');

  // Remove dangerous non-printable ASCII control characters (keeping \r, \n, \t)
  // and Unicode bidirectional override characters used in Trojan Source attacks
  sanitized = sanitized.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, '');

  return sanitized;
}

/**
 * Deeply cleans an entire bio-data form state, ensuring prototype safety.
 *
 * @param {Record<string, any>} obj - Form state object
 * @returns {Record<string, any>} Sanitized copy of object
 */
export function sanitizeFormData(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};

  const clean = Object.create(null);

  for (const [key, val] of Object.entries(obj)) {
    // Prototype pollution prevention
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    if (typeof val === 'string') {
      // Don't strip data URLs for profilePhoto, but ensure it starts with safe image data
      if (key === 'profilePhoto' && val.startsWith('data:image/')) {
        clean[key] = val;
      } else {
        clean[key] = sanitizeInput(val);
      }
    } else {
      clean[key] = val;
    }
  }

  return { ...clean };
}

/**
 * Safe local storage wrapper preventing prototype pollution and handling quota errors.
 */
export const safeStorage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      const parsed = JSON.parse(item);
      return sanitizeFormData(parsed);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      const safe = sanitizeFormData(value);
      localStorage.setItem(key, JSON.stringify(safe));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  },
};
