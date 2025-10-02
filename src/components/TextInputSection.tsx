import { Check, CircleAlert, Copy, Redo2, Trash, Undo2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ButtonStatus } from '../types/editText';

export interface TextInputProps {
  text: string;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearText: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTextCopy: () => void;
  copyStatus: ButtonStatus;
  canUndo: boolean;
  canRedo: boolean;
}

export default function TextInputSection({
  text,
  onChangeText,
  onClearText,
  onUndo,
  onRedo,
  onTextCopy,
  copyStatus,
  canUndo,
  canRedo,
}: TextInputProps) {
  const { t } = useLanguage();
  return (
    <section className="mx-0">
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
          className={`flex w-[90px] items-center justify-center gap-2 border border-[var(--border-color)] px-4 py-2 text-sm transition duration-300 ${
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
          <Undo2 size={16}/>
          {t.textInput.undoButton}
        </button>
        <button
          className={`flex w-[90px] items-center justify-center gap-2 border border-[var(--border-color)] px-4 py-2 text-sm transition duration-300 ${
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
          <Redo2 size={16}/> {t.textInput.redoButton}
        </button>
        <button
          className="flex w-[100px] cursor-pointer items-center justify-center gap-2 border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-primary)] transition duration-300 hover:bg-[var(--border-color)]"
          id="clearBtn"
          onClick={onClearText}
        >
          <Trash size={16}/>
          {t.textInput.clearButton}
        </button>
        <button
          className={`relative flex w-[100px] cursor-pointer items-center justify-center gap-2 border px-4 py-2 text-sm text-white transition-colors duration-300 ${
            copyStatus === 'idle'
              ? 'border-[var(--button-bg)] bg-[var(--button-bg)] hover:border-[var(--button-hover)] hover:bg-[var(--button-hover)]'
              : copyStatus === 'success'
                ? 'border-green-500 bg-green-400'
                : 'border-red-500 bg-red-400'
          }`}
          id="copyBtn"
          onClick={onTextCopy}
        >
          {/* アイコン：状態によって変化 */}
          {copyStatus === 'idle' ? (
            // コピーアイコン（重なった四角形）
            <Copy size={16}/>
          ) : copyStatus === 'success' ? (
            // チェックマーク
            <Check size={16}/>
          ) : (
            // ×マーク
            <CircleAlert size={16}/>
          )}

          {/* テキスト：idle時のみ表示 */}
          {copyStatus === 'idle' && <span>{t.textInput.copyButton}</span>}
        </button>
      </div>
    </section>
  );
}
