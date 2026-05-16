import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory-light text-graphite">
      <section
        id="hero"
        className="px-[var(--space-5)] pt-[var(--space-10)] pb-[var(--space-10)] sm:px-[var(--space-8)] sm:pt-[var(--space-12)] sm:pb-[var(--space-12)] lg:px-[var(--space-12)]"
      >
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <Image
            src="/brand/pml-logo.png"
            alt="Психология масштаба личности"
            width={1536}
            height={1024}
            priority
            className="h-auto w-[170px] sm:w-[240px] lg:w-[300px]"
          />

          <h1 className="mt-[var(--space-4)] font-display text-[40px] font-medium leading-[48px] sm:mt-[var(--space-5)] sm:text-[56px] sm:leading-[64px] lg:text-[72px] lg:leading-[80px]">
            Зрелая работа над тем, какой{" "}
            <span className="text-bronze-deep">масштаб</span> вы способны
            держать.
          </h1>

          <p className="mt-[var(--space-5)] max-w-[560px] font-body text-[17px] leading-[28px] text-[color:var(--text-primary)] sm:mt-[var(--space-6)] sm:text-[20px] sm:leading-[32px]">
            Программа для предпринимателей и лидеров, которые отвечают за
            крупные решения. Разбираем, как внутренняя оптика формирует то, что
            вы строите вовне.
          </p>

          <div className="mt-[var(--space-6)] flex w-full flex-col items-stretch gap-[var(--space-3)] sm:mt-[var(--space-8)] sm:w-auto sm:flex-row sm:items-center sm:gap-[var(--space-4)]">
            <a
              href="#lead"
              className="inline-flex h-11 items-center justify-center rounded-s bg-bronze-deep px-[var(--space-5)] font-ui text-[15px] font-medium leading-[22px] text-ivory-light transition-colors hover:bg-[#6f4b2a]"
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

          <div className="mt-[var(--space-6)] flex flex-col items-center gap-[var(--space-3)] font-ui text-[13px] font-medium leading-5 tracking-[0.04em] text-[color:var(--text-muted)] sm:mt-[var(--space-8)] sm:flex-row sm:gap-[var(--space-6)]">
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
