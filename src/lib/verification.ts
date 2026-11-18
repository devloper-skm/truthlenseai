export type InputMode = 'text' | 'image' | 'url';
export type VerificationDraft = { mode: InputMode; content: string; imageName?: string | undefined };
export function validateVerification(mode: InputMode, content: string, file?: File | null): string | null {
  if (mode === 'text') return content.trim().length < 20 ? 'Please enter at least 20 characters to provide enough context.' : content.length > 10000 ? 'Please keep your text under 10,000 characters.' : null;
  if (mode === 'image') {
    if (!file) return 'Choose an image before continuing.';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Choose a JPG, PNG or WebP image.';
    return file.size > 10 * 1024 * 1024 ? 'Your image must be 10 MB or smaller.' : null;
  }
  try { const url = new URL(content); return ['https:', 'http:'].includes(url.protocol) ? null : 'Enter a valid HTTP or HTTPS URL.'; } catch { return 'Enter a complete URL, including https://.'; }
}
export function prepareVerification(draft: VerificationDraft) {
  return { draft, status: 'not-connected' as const, verdict: null, confidence: null, evidence: [] };
}
export function reportText(draft?: VerificationDraft | null) {
  return `TruthLens AI — Unprocessed submission\n\nStatus: Not analyzed. Verification API is not connected.\nVerdict: Not available\nConfidence: Not available\nEvidence: None retrieved\n\nInput type: ${draft?.mode ?? 'None'}\nSubmitted content: ${draft?.imageName ?? draft?.content ?? 'No submission'}\n\nThis is not a fact-check report. No AI verification has been performed. AI findings require human review; image analysis cannot guarantee deepfake detection.`;
}
