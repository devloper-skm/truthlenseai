import { createFileRoute } from '@tanstack/react-router';
import { Workspace, Tips } from '@/components/truthlens/workspace';
import { pageHead } from '@/components/truthlens/meta';
export const Route=createFileRoute('/verify')({head:()=>pageHead('Verify content','Prepare a text claim, image or article URL for evidence-based verification.'),component:Verify});
function Verify(){return <><div className="page-heading"><div><h1>Follow the facts.</h1><p>Every good verification begins with a little context.</p></div></div><section className="workspace-grid"><div><h2 className="section-heading">New verification</h2><p className="section-subtitle">Text, images, and links. One evidence-first workspace.</p><Workspace/><div className="notice">AI assessments are available. Live evidence retrieval is not connected; answers are not independently verified fact-checks.</div></div><Tips/></section></>;}
