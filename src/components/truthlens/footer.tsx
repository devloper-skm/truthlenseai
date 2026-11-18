import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export function WebsiteFooter() {
  return (
    <footer className="website-footer" role="contentinfo">
      <div className="website-footer-main">
        <div className="website-footer-brand">
          <Link to="/" className="brand" aria-label="TruthLens AI home">
            <span className="brand-mark"><ShieldCheck size={23} /></span>
            <span>TruthLens <span className="brand-ai">AI</span></span>
          </Link>
          <p>A little doubt. A lot of clarity.<br />Evidence over assumptions, every time.</p>
        </div>
        <nav aria-label="Footer workspace navigation">
          <h2>Workspace</h2>
          <Link to="/">Overview</Link>
          <Link to="/verify">Verify content</Link>
          <Link to="/history">Verification history</Link>
        </nav>
        <nav aria-label="Footer about navigation">
          <h2>TruthLens AI</h2>
          <Link to="/welcome">Explore TruthLens <ArrowUpRight size={13} /></Link>
          <Link to="/about">Our methodology</Link>
          <Link to="/about">AI &amp; detection limitations</Link>
        </nav>
      </div>
      <div className="website-footer-disclaimer">
        <ShieldCheck size={17} />
        <p><strong>Think critically. Share responsibly.</strong> AI findings are not guaranteed truth. Always review original sources. AI assessments do not include live evidence retrieval.</p>
      </div>
      <div className="website-footer-bottom">
        <span>© 2026 TruthLens AI. All rights reserved.</span>
        <span>Built for clarity. Designed for transparency.</span>
      </div>
    </footer>
  );
}