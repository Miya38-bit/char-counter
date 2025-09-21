import { useState } from "react";
import "./StringCounter.css";

export default function StringCounter() {
  const [counter, setCounter] = useState({
    text: "",
    charCount: 0,
    bytes: 0,
    searchTerm: "",
    wordCount: 0,
  });

  const countOccurencesRegex = (target: string, search: string) => {
    if (!search || !target) return 0;

    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?=${escapedSearch})`, `g`);
    return (target.match(regex) || []).length;
  };

  const onCounter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "text-area") {
      setCounter((prev) => ({
        ...prev,
        text: value,
        charCount: value.length,
        bytes: new Blob([value]).size,
        wordCount: prev.searchTerm
          ? countOccurencesRegex(value, prev.searchTerm || "")
          : 0,
      }));
    } else {
      const serachValue = value.trim();
      setCounter((prev) => ({
        ...prev,
        searchTerm: serachValue,
        wordCount: serachValue ? countOccurencesRegex(prev.text, value) : 0,
      }));
    }
  };
  return (
    <>
      <main className="counter">
        <h1 className="counter__title">Moji Counter</h1>
        <div className="counter__container">
          <section className="counter__input-area">
            <label htmlFor="text-input" className="sr-only">
              分析したい文章
            </label>
            <textarea
              id="text-input"
              name="text-area"
              className="counter__textarea"
              placeholder="文章を入力してください"
              aria-describedby="char-count"
              onChange={onCounter}
            ></textarea>

            <label htmlFor="target-char" className="sr-only">
              カウントしたい文字
            </label>
            <input
              type="text"
              id="target-char"
              name="input"
              className="counter__input"
              placeholder="数えたい文字を入力してください"
              aria-describedby="target-count"
              onChange={onCounter}
            />
          </section>

          <aside className="counter__result-area" aria-label="カウント結果">
            <div className="counter__result-item">
              <p className="counter__result-label">文字数</p>
              <p className="counter__result-value" id="char-count">
                {counter.charCount}
              </p>
            </div>

            <div className="counter__result-item">
              <p className="counter__result-label">バイト数</p>
              <p className="counter__result-value" id="byte-count">
                {counter.bytes}
              </p>
            </div>

            <div className="counter__result-item">
              <p className="counter__result-label">指定文字数</p>
              <p className="counter__result-value" id="target-count">
                {counter.wordCount}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
