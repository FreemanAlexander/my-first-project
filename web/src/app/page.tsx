export default function Home() {
  return (
    <main className="min-h-screen bg-ivory-light text-graphite">
      <section
        id="hero"
        className="px-[var(--space-5)] pt-[var(--space-12)] pb-[var(--space-12)] sm:px-[var(--space-8)] sm:pt-[var(--space-16)] sm:pb-[var(--space-16)] lg:px-[var(--space-12)]"
      >
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <p className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.16em] text-[color:var(--text-secondary)]">
            Психология масштаба личности
          </p>

          <h1 className="mt-[var(--space-6)] font-display text-[40px] font-medium leading-[48px] sm:mt-[var(--space-8)] sm:text-[56px] sm:leading-[64px] lg:text-[72px] lg:leading-[80px]">
            Зрелая работа над тем, какой{" "}
            <span className="text-bronze-deep">масштаб</span> вы способны
            держать.
          </h1>

          <p className="mt-[var(--space-6)] max-w-[560px] font-body text-[17px] leading-[28px] text-[color:var(--text-secondary)] sm:mt-[var(--space-8)]">
            Программа для предпринимателей и лидеров, которые отвечают за
            крупные решения. Разбираем, как внутренняя оптика формирует то, что
            вы строите вовне.
          </p>

          <div className="mt-[var(--space-8)] flex w-full flex-col items-stretch gap-[var(--space-3)] sm:mt-[var(--space-10)] sm:w-auto sm:flex-row sm:items-center sm:gap-[var(--space-4)]">
            <a
              href="#lead"
              className="inline-flex h-11 items-center justify-center rounded-s bg-bronze px-[var(--space-5)] font-ui text-[15px] font-medium leading-[22px] text-ivory-light transition-colors hover:bg-bronze-deep"
            >
              Оставить заявку
            </a>
            <a
              href="#about"
              className="inline-flex h-11 items-center justify-center rounded-s border border-[color:var(--border-strong)] bg-transparent px-[var(--space-5)] font-ui text-[15px] font-medium leading-[22px] text-graphite transition-colors hover:bg-ivory-warm"
            >
              Подробнее о проекте
            </a>
          </div>

          <div className="mt-[var(--space-10)] flex flex-col items-center gap-[var(--space-3)] font-ui text-[13px] font-medium leading-5 tracking-[0.04em] text-[color:var(--text-muted)] sm:mt-[var(--space-12)] sm:flex-row sm:gap-[var(--space-6)]">
            <span>Индивидуальный разбор</span>
            <span
              aria-hidden
              className="hidden h-1 w-1 rounded-full bg-[color:var(--text-muted)] sm:block"
            />
            <span>Сопровождение в Telegram</span>
            <span
              aria-hidden
              className="hidden h-1 w-1 rounded-full bg-[color:var(--text-muted)] sm:block"
            />
            <span>Работа в своём темпе</span>
          </div>
        </div>
      </section>
    </main>
  );
}
