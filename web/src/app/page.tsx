import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";

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

      <div className="mx-auto h-px w-[var(--space-16)] bg-[color:var(--border-hairline)]" />

      <section
        id="about"
        className="px-[var(--space-5)] pt-[var(--space-10)] pb-[var(--space-10)] sm:px-[var(--space-8)] sm:pt-[var(--space-12)] sm:pb-[var(--space-12)] lg:px-[var(--space-12)] lg:pt-[var(--space-16)] lg:pb-[var(--space-16)]"
      >
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display text-[32px] font-medium leading-[40px] text-[color:var(--text-primary)] sm:text-[40px] sm:leading-[48px]">
            Что такое <span className="text-bronze-deep">«Психология масштаба личности»</span>
          </h2>

          <p className="mt-[var(--space-6)] font-body text-[17px] leading-[28px] text-[color:var(--text-primary)] sm:text-[17px] sm:leading-[28px]">
            ПМЛ — это методика длительной работы с тем, что определяет
            масштаб ваших решений: с собственной оптикой, ограничениями,
            привычными способами справляться. Не быстрый коучинг и не
            мотивационный курс — спокойная, последовательная работа в
            индивидуальном темпе.
          </p>

          <p className="mt-[var(--space-5)] font-body text-[17px] leading-[28px] text-[color:var(--text-primary)]">
            В основе — клиническая психология и опыт работы с
            предпринимателями, руководителями и людьми, отвечающими за
            крупные решения. Мы исходим из того, что внешний результат —
            следствие внутренней структуры: то, какие задачи человек
            способен удерживать, какие напряжения выдерживать и какие
            решения принимать без потери себя.
          </p>

          <ul className="mt-[var(--space-8)] grid gap-[var(--space-5)] sm:gap-[var(--space-6)]">
            <li className="border-t border-[color:var(--border-hairline)] pt-[var(--space-4)]">
              <p className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
                Формат
              </p>
              <p className="mt-[var(--space-2)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                Индивидуальные встречи и сопровождение между ними — в Telegram,
                в удобное для вас время.
              </p>
            </li>
            <li className="border-t border-[color:var(--border-hairline)] pt-[var(--space-4)]">
              <p className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
                Темп
              </p>
              <p className="mt-[var(--space-2)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                Длительный — от трёх месяцев. Без обещаний «трансформации за
                неделю» и без давления на сроки.
              </p>
            </li>
            <li className="border-t border-[color:var(--border-hairline)] pt-[var(--space-4)]">
              <p className="font-ui text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-[color:var(--text-muted)]">
                Для кого
              </p>
              <p className="mt-[var(--space-2)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                Для тех, кто принимает решения с долгими последствиями: для
                себя, своей команды, своего дела.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className="mx-auto h-px w-[var(--space-16)] bg-[color:var(--border-hairline)]" />

      <section
        id="how-it-works"
        className="px-[var(--space-5)] pt-[var(--space-10)] pb-[var(--space-10)] sm:px-[var(--space-8)] sm:pt-[var(--space-12)] sm:pb-[var(--space-12)] lg:px-[var(--space-12)] lg:pt-[var(--space-16)] lg:pb-[var(--space-16)]"
      >
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display text-[32px] font-medium leading-[40px] text-[color:var(--text-primary)] sm:text-[40px] sm:leading-[48px]">
            Как устроена работа
          </h2>

          <p className="mt-[var(--space-6)] font-body text-[17px] leading-[28px] text-[color:var(--text-primary)]">
            Эта страница — точка входа. Дальше всё происходит спокойно и
            предсказуемо: ничего не теряется, никто не пропадает.
          </p>

          <ol className="mt-[var(--space-8)] grid gap-[var(--space-8)]">
            <li className="grid grid-cols-[auto_1fr] gap-[var(--space-5)] sm:gap-[var(--space-6)]">
              <span
                aria-hidden
                className="font-display text-[32px] font-medium leading-[40px] text-bronze-deep sm:text-[40px] sm:leading-[48px]"
              >
                01
              </span>
              <div className="pt-[var(--space-1)]">
                <p className="font-display text-[20px] font-medium leading-[28px] text-[color:var(--text-primary)] sm:text-[24px] sm:leading-[32px]">
                  Вы оставляете заявку
                </p>
                <p className="mt-[var(--space-3)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                  Короткая форма: имя, удобный контакт, пара слов о запросе.
                  Без обязательств.
                </p>
              </div>
            </li>

            <li className="grid grid-cols-[auto_1fr] gap-[var(--space-5)] sm:gap-[var(--space-6)]">
              <span
                aria-hidden
                className="font-display text-[32px] font-medium leading-[40px] text-bronze-deep sm:text-[40px] sm:leading-[48px]"
              >
                02
              </span>
              <div className="pt-[var(--space-1)]">
                <p className="font-display text-[20px] font-medium leading-[28px] text-[color:var(--text-primary)] sm:text-[24px] sm:leading-[32px]">
                  Заявка приходит в Telegram-бот
                </p>
                <p className="mt-[var(--space-3)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                  Бот — это и канал связи с вами, и рабочая среда
                  администратора. Все данные хранятся в одной защищённой базе.
                </p>
              </div>
            </li>

            <li className="grid grid-cols-[auto_1fr] gap-[var(--space-5)] sm:gap-[var(--space-6)]">
              <span
                aria-hidden
                className="font-display text-[32px] font-medium leading-[40px] text-bronze-deep sm:text-[40px] sm:leading-[48px]"
              >
                03
              </span>
              <div className="pt-[var(--space-1)]">
                <p className="font-display text-[20px] font-medium leading-[28px] text-[color:var(--text-primary)] sm:text-[24px] sm:leading-[32px]">
                  Мы связываемся с вами
                </p>
                <p className="mt-[var(--space-3)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                  В течение рабочего дня. Договариваемся о первой встрече —
                  знакомство и разбор запроса, без оплаты.
                </p>
              </div>
            </li>

            <li className="grid grid-cols-[auto_1fr] gap-[var(--space-5)] sm:gap-[var(--space-6)]">
              <span
                aria-hidden
                className="font-display text-[32px] font-medium leading-[40px] text-bronze-deep sm:text-[40px] sm:leading-[48px]"
              >
                04
              </span>
              <div className="pt-[var(--space-1)]">
                <p className="font-display text-[20px] font-medium leading-[28px] text-[color:var(--text-primary)] sm:text-[24px] sm:leading-[32px]">
                  Дальнейшее общение — внутри бота
                </p>
                <p className="mt-[var(--space-3)] font-body text-[15px] leading-[24px] text-[color:var(--text-primary)]">
                  Расписание встреч, материалы, переписка между сессиями —
                  всё в одном месте. Вам не нужно ничего ставить и
                  настраивать.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <div className="mx-auto h-px w-[var(--space-16)] bg-[color:var(--border-hairline)]" />

      <section
        id="lead"
        className="px-[var(--space-5)] pt-[var(--space-10)] pb-[var(--space-10)] sm:px-[var(--space-8)] sm:pt-[var(--space-12)] sm:pb-[var(--space-12)] lg:px-[var(--space-12)] lg:pt-[var(--space-16)] lg:pb-[var(--space-16)]"
      >
        <div className="mx-auto max-w-[560px]">
          <h2 className="font-display text-[32px] font-medium leading-[40px] text-[color:var(--text-primary)] sm:text-[40px] sm:leading-[48px]">
            Оставить заявку
          </h2>
          <p className="mt-[var(--space-5)] font-body text-[17px] leading-[28px] text-[color:var(--text-primary)]">
            Заполните короткую форму — мы свяжемся в течение рабочего дня и
            договоримся о первой встрече, без оплаты.
          </p>
          <LeadForm />
        </div>
      </section>

      <footer className="mt-[var(--space-10)] border-t border-[color:var(--border-hairline)] bg-ivory-light px-[var(--space-5)] pt-[var(--space-8)] pb-[var(--space-8)] sm:px-[var(--space-8)] sm:pt-[var(--space-10)] sm:pb-[var(--space-10)] lg:px-[var(--space-12)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[var(--space-6)] sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-[var(--space-3)]">
            <Image
              src="/brand/pml-logo.png"
              alt="Психология масштаба личности"
              width={1536}
              height={1024}
              className="h-auto w-[80px]"
            />
            <p className="max-w-[320px] font-body text-[13px] leading-5 text-[color:var(--text-secondary)]">
              Психология масштаба личности — методика длительной работы для
              предпринимателей и лидеров.
            </p>
          </div>

          <nav
            aria-label="Навигация в подвале"
            className="flex flex-col gap-[var(--space-3)] font-ui text-[15px] font-medium leading-[22px] text-[color:var(--text-primary)]"
          >
            <a href="#about" className="hover:text-bronze-deep">
              Что такое проект
            </a>
            <a href="#how-it-works" className="hover:text-bronze-deep">
              Как устроена работа
            </a>
            <a href="#lead" className="hover:text-bronze-deep">
              Оставить заявку
            </a>
          </nav>
        </div>

        <p className="mx-auto mt-[var(--space-8)] max-w-[1200px] font-ui text-[12px] font-medium leading-[18px] tracking-[0.04em] text-[color:var(--text-muted)]">
          © 2026 Психология масштаба личности
        </p>
      </footer>
    </main>
  );
}
