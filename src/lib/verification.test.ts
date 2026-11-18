import { describe,it,expect } from 'vitest';
import { validateVerification,prepareVerification,reportText } from './verification';
describe('Verification integrity',()=>{
 it('never fabricates a verdict without API integration',()=>{const result=prepareVerification({mode:'text',content:'A claim requiring independent investigation'});expect(result.verdict).toBeNull();expect(result.confidence).toBeNull();expect(result.evidence).toEqual([]);expect(result.status).toBe('not-connected');});
 it('validates text context',()=>{expect(validateVerification('text','short')).not.toBeNull();expect(validateVerification('text','A complete claim with sufficient context.')).toBeNull();});
 it('rejects unsafe URL schemes',()=>{expect(validateVerification('url','javascript:alert(1)')).not.toBeNull();expect(validateVerification('url','https://example.com/article')).toBeNull();});
 it('rejects missing images',()=>{expect(validateVerification('image','',null)).not.toBeNull();});
 it('does not include a fake verdict in downloaded reports',()=>{expect(reportText({mode:'text',content:'A test claim'})).toContain('Verdict: Not available');expect(reportText()).toContain('No AI verification has been performed');});
});
