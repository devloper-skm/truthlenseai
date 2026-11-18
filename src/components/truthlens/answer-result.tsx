import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Download, Sparkles, Bot, Loader2, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportText, type VerificationDraft } from '@/lib/verification';

function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : part.startsWith('*') ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      ),
    );
}

function renderAnswer(text: string): ReactNode[] {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (!list.length) return;
    blocks.push(
      <ul key={key} className="answer-list">
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  text.split('\n').forEach((line, idx) => {
    const t = line.trim();
    if (!t) return;
    if (t.startsWith('- ')) {
      list.push(t.slice(2));
      return;
    }
    flush(`list-${idx}`);
    blocks.push(<p key={idx}>{inline(t)}</p>);
  });
  flush('list-end');
  return blocks;
}

export function AnswerResult({ draft }: { draft: VerificationDraft }) {
  const answer = draft.answer ?? '';
  const [shown, setShown] = useState(0);
  const done = shown >= answer.length;
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    const step = Math.max(6, Math.round(answer.length / 220));
    const t = window.setInterval(() => {
      setShown((n) => Math.min(answer.length, n + step));
    }, 16);
    return () => window.clearInterval(t);
  }, [answer.length, done]);

  useEffect(() => {
    bodyRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [shown]);

  function download() {
    const url = URL.createObjectURL(new Blob([reportText(draft)], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'truthlens-ai-assessment.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Button asChild variant="link" className="p-0 mb-6">
        <Link to="/verify">
          <ArrowLeft />
          Back to workspace
        </Link>
      </Button>
      <div className="page-heading">
        <div>
          <h1 className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI assessment
          </h1>
          <p>A real AI response, not an independently verified verdict.</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Download AI assessment"
          title="Download AI assessment"
          onClick={download}
        >
          <Download />
        </Button>
      </div>
      <div className="notice">
        No live sources were retrieved. This assessment may be inaccurate or outdated; review
        original sources before sharing.
      </div>

      <section className="answer-card" aria-live="polite">
        <div className="answer-card-head">
          <span className="answer-avatar">
            <Bot size={17} />
          </span>
          <div>
            <p className="answer-author">TruthLens AI</p>
            <p className="answer-status">
              {done ? (
                <>
                  <CircleCheck size={12} className="text-success" /> Assessment complete
                </>
              ) : (
                <>
                  <Loader2 size={12} className="animate-spin" /> Writing assessment…
                </>
              )}
            </p>
          </div>
        </div>
        <div className="answer-body" ref={bodyRef}>
          {done ? (
            renderAnswer(answer)
          ) : (
            <p className="whitespace-pre-wrap break-words">
              {answer.slice(0, shown)}
              <span className="answer-cursor" aria-hidden="true" />
            </p>
          )}
        </div>
      </section>

      <section className="prose-section">
        <h2>Submitted {draft.mode === 'image' ? 'image' : 'content'}</h2>
        <p className="break-words whitespace-pre-wrap">{draft.imageName ?? draft.content}</p>
      </section>
      <section className="prose-section">
        <h2>Evidence &amp; confidence</h2>
        <p>
          No supporting or contradicting sources have been independently retrieved. A confidence
          score is not available. Visual observations cannot establish whether an image is a
          deepfake.
        </p>
      </section>
    </>
  );
}
