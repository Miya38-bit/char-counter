import { useLanguage } from '../context/LanguageContext';

export interface TextInputProps {
  text: string;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearText: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function TextInputSection({
  text,
  onChangeText,
  onClearText,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: TextInputProps) {
  const { t } = useLanguage();
  return (
    <section className="mx-0 my-8">
      <label
        className="mb-3 block font-light text-[var(--text-primary)]"
        htmlFor="textInput"
      >
        {t.textInput.label}
      </label>
      <textarea
        id="textInput"
        className="min-h-[200px] w-full resize-y rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-4 text-base/[1.5] text-[var(--text-primary)] transition-colors duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgb(59,130,246,0.1)] focus:outline-none"
        placeholder={t.textInput.placeholder}
        value={text}
        onChange={onChangeText}
        rows={8}
      ></textarea>

      <div className="mt-4 flex flex-wrap justify-center gap-5">
        <button
          className={`flex items-center gap-2 border border-[var(--border-color)] px-4 py-2 text-sm transition duration-300 ${
            canUndo
              ? 'cursor-pointer bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--border-color)]'
              : 'cursor-not-allowed bg-[var(--bg-available)] text-[var(--text-secondary)]'
          }`}
          id="undoBtn"
          title={
            canUndo ? t.textInput.undoTooltip : t.textInput.undoTooltipDisabled
          }
          onClick={onUndo}
          disabled={!canUndo}
        >
          ↶ {t.textInput.undoButton}
        </button>
        <button
          className={`flex items-center gap-2 border border-[var(--border-color)] px-4 py-2 text-sm transition duration-300 ${
            canRedo
              ? 'cursor-pointer bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--border-color)]'
              : 'cursor-not-allowed bg-[var(--bg-available)] text-[var(--text-secondary)]'
          }`}
          id="redoBtn"
          title={
            canUndo ? t.textInput.redoTooltip : t.textInput.redoTooltipDisabled
          }
          onClick={onRedo}
          disabled={!canRedo}
        >
          ↷ {t.textInput.redoButton}
        </button>
        <button
          className="flex cursor-pointer items-center gap-2 border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-primary)] transition duration-300 hover:bg-[var(--border-color)]"
          id="clearBtn"
          onClick={onClearText}
        >
          {t.textInput.clearButton}
        </button>
        {/* <button
          className="flex cursor-pointer items-center gap-2 border border-[var(--button-bg)] bg-[var(--button-bg)] px-4 py-2 text-sm text-white transition duration-300 hover:border-[var(--button-hover)] hover:bg-[var(--button-hover)]"
          id="copyBtn"
        >
          {t.textInput.copyButton}
        </button> */}
      </div>
    </section>
  );
}
