import { validateUploadedFile, sanitizeDocumentText, MAX_FILE_SIZE_BYTES } from '@/lib/parser';

describe('Document Parser & Sanitizer Unit Tests', () => {
  describe('validateUploadedFile', () => {
    it('accepts valid PDF files under 5MB', () => {
      const res = validateUploadedFile('lease_agreement.pdf', 'application/pdf', 1024 * 500);
      expect(res.valid).toBe(true);
      expect(res.extension).toBe('pdf');
    });

    it('accepts valid DOCX files', () => {
      const res = validateUploadedFile(
        'offer_letter.docx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        1024 * 200
      );
      expect(res.valid).toBe(true);
      expect(res.extension).toBe('docx');
    });

    it('accepts plain text TXT files', () => {
      const res = validateUploadedFile('contract.txt', 'text/plain', 1024 * 50);
      expect(res.valid).toBe(true);
      expect(res.extension).toBe('txt');
    });

    it('rejects files exceeding 5MB limit', () => {
      const res = validateUploadedFile('huge_file.pdf', 'application/pdf', MAX_FILE_SIZE_BYTES + 100);
      expect(res.valid).toBe(false);
      expect(res.error).toContain('exceeds the maximum limit');
    });

    it('rejects forbidden file extensions like .exe or .sh', () => {
      const resExe = validateUploadedFile('malware.exe', 'application/x-msdownload', 1024);
      expect(resExe.valid).toBe(false);
      expect(resExe.error).toContain('Unsupported file type');

      const resSh = validateUploadedFile('script.sh', 'application/x-sh', 1024);
      expect(resSh.valid).toBe(false);
    });
  });

  describe('sanitizeDocumentText', () => {
    it('escapes dangerous HTML characters to prevent XSS', () => {
      const dangerous = '<script>alert("xss")</script> & <b>bold</b>';
      const clean = sanitizeDocumentText(dangerous);
      expect(clean).not.toContain('<script>');
      expect(clean).toContain('&lt;script&gt;');
      expect(clean).toContain('&amp;');
    });

    it('handles empty strings gracefully', () => {
      expect(sanitizeDocumentText('')).toBe('');
    });
  });
});
