import { useEffect, useState, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';
import { X } from 'lucide-react';
import { cn, useDebouncedValue } from '@/shared/lib';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  value: string;
  onCommit: (value: string) => void;
  icon?: ReactNode;
  trailing?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

/** Text input that keeps a local draft and commits it after the user stops typing. */
export function DebouncedInput({
  value,
  onCommit,
  icon,
  trailing,
  className,
  ref,
  ...props
}: Props) {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  const debounced = useDebouncedValue(draft);

  // Pick up external changes (reset, browser back/forward).
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }

  useEffect(() => {
    if (debounced !== value) onCommit(debounced.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- commit only when the draft settles
  }, [debounced]);

  return (
    <label
      className={cn(
        'group flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 transition-colors',
        'focus-within:border-portal/60 focus-within:ring-4 focus-within:ring-portal/10',
        className,
      )}
    >
      {icon && <span className="text-fg-subtle group-focus-within:text-portal">{icon}</span>}
      <input
        ref={ref}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onCommit(draft.trim());
          if (event.key === 'Escape') event.currentTarget.blur();
        }}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
        {...props}
      />
      {draft ? (
        <button
          type="button"
          aria-label="Clear"
          onClick={() => {
            setDraft('');
            onCommit('');
          }}
          className="cursor-pointer rounded-md p-0.5 text-fg-subtle hover:bg-white/10 hover:text-fg"
        >
          <X className="size-3.5" />
        </button>
      ) : (
        trailing
      )}
    </label>
  );
}
