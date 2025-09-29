import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const {t} = useLanguage();
  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2 md:text-[2rem]">
        {t.hero.title}
      </h1>
      <p className="text-[var(--text-secondary)] text-[1rem]">
        {t.hero.subtitle}
      </p>
    </div>
  );
}
