import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const WITCH_IMAGE = "https://cdn.poehali.dev/projects/5c285f89-5dcb-4132-afd0-a2a00185954d/files/02fd8b3a-cdb5-4347-8aed-acb0df0f9b6f.jpg";
const ARTIFACTS_IMAGE = "https://cdn.poehali.dev/projects/5c285f89-5dcb-4132-afd0-a2a00185954d/files/e5bd60a9-b681-4075-9301-c7ac1cdbad07.jpg";
const BG_IMAGE = "https://cdn.poehali.dev/projects/5c285f89-5dcb-4132-afd0-a2a00185954d/files/62818806-4b51-40aa-80d8-fa91e7f774a2.jpg";

const services = [
  {
    icon: "👁️",
    title: "Скинуть скуду через бесов",
    desc: "Снятие тяжёлой порчи с задействованием тёмных сил. Срок проявления — 4 месяца.",
    price: "6 000 ₽",
    term: "4 месяца",
    note: "",
  },
  {
    icon: "🔥",
    title: "Ритуал на обольщение через бесов",
    desc: "Мощное притяжение и подчинение воли избранного человека. Быстрый результат.",
    price: "2 000 ₽",
    term: "1,5 недели",
    note: "",
  },
  {
    icon: "🪆",
    title: "Приворот вуду с куклой и подчинением",
    desc: "Полное подчинение воли объекта через обряд с куклой-вуду. Глубокое воздействие.",
    price: "30 000 ₽",
    term: "1 месяц",
    note: "Применение куклы",
  },
  {
    icon: "🩸",
    title: "Половая привязка",
    desc: "Крепчайшая привязка на физическом и энергетическом уровне через биоматериалы.",
    price: "16 000 ₽",
    term: "до 1 месяца",
    note: "Биоматериалы мужа и жены",
  },
  {
    icon: "🪆",
    title: "Приворот на куклу",
    desc: "Обряд привязки через куклу — образ объекта, созданный с намерением и силой.",
    price: "12 000 ₽",
    term: "до 1 месяца",
    note: "Применение куклы",
  },
  {
    icon: "🍯",
    title: "Приворот медовый (по фотографии)",
    desc: "Мягкий, но стойкий приворот с использованием сладкой магии. Работа по фото.",
    price: "3 000 ₽",
    term: "до 4 месяцев",
    note: "По фотографии",
  },
  {
    icon: "🌑",
    title: "Приворот «чёрная троица»",
    desc: "Тройной удар тёмных сил — один из самых сильных привязывающих обрядов.",
    price: "4 000 ₽",
    term: "до 4 месяцев",
    note: "",
  },
  {
    icon: "🫙",
    title: "Варочная магия «кандалы страсти»",
    desc: "Приготовление зелья на основе трав и тёмных компонентов. Страсть без возврата.",
    price: "7 000 ₽",
    term: "2 месяца",
    note: "",
  },
  {
    icon: "🧿",
    title: "Зомбирование (присушка)",
    desc: "Подавление воли и создание зависимости от заказчика. Самый быстрый результат.",
    price: "5 000 ₽",
    term: "неделя",
    note: "",
  },
];

const cardServices = [
  { icon: "❤️", title: "На любовь", desc: "Притяжение чувств и открытие сердца к любви.", price: "2 000 ₽", term: "", note: "" },
  { icon: "🍀", title: "На удачу", desc: "Поток удачи и благоприятных событий во всех сферах.", price: "2 000 ₽", term: "", note: "" },
  { icon: "⚖️", title: "На правосудие. Защита бесовская", desc: "Тёмная защита в делах правосудия. Бесовская сила на вашей стороне.", price: "3 000 ₽", term: "", note: "" },
  { icon: "🏪", title: "Привлечение заказчиков", desc: "Ритуальный поток клиентов и заказов в ваш бизнес.", price: "12 000 ₽", term: "3 месяца", note: "" },
  { icon: "🔥", title: "Болезни выжечь", desc: "Выжигание недугов тёмным огнём. Очищение тела и духа.", price: "6 000 ₽", term: "2 месяца", note: "" },
  { icon: "🌕", title: "Приворот сокровый", desc: "Сокровенный приворот — самый глубокий и тихий. Только в полнолуние.", price: "6 000 ₽", term: "", note: "Только в полнолуние" },
  { icon: "🌕", title: "Скрепить судьбы на век (чертов рог)", desc: "Скрепление двух судеб навечно через тёмный ритуал. Только в полнолуние.", price: "13 000 ₽", term: "", note: "Только в полнолуние" },
  { icon: "🖤", title: "Страсть безудержная", desc: "Неугасимая страсть через волосы с лобка мужчины. Быстрый эффект.", price: "4 000 ₽", term: "3 недели", note: "Волосы с лобка мужчины" },
  { icon: "🐺", title: "Распорка на шерсть", desc: "Разрыв нежелательных связей и привязанностей.", price: "3 000 ₽", term: "до 4 недель", note: "" },
  { icon: "💀", title: "Врага болью извести", desc: "Насылание хронической боли и страданий на врага.", price: "12 000 ₽", term: "2 месяца", note: "" },
  { icon: "😱", title: "Кошмарами истерзать", desc: "Наведение ночных кошмаров и бессонницы на обидчика.", price: "7 000 ₽", term: "неделя", note: "" },
];

const manifestService = {
  price: "6 000 ₽",
  steps: [
    { num: "01", title: "Анализ ситуации", desc: "Глубокое изучение вашей жизненной ситуации, выявление скрытых блоков и ограничений сознания." },
    { num: "02", title: "Создание манифеста", desc: "Индивидуальный манифест, направленный на пробуждение сознания и восстановление связи с памятью души." },
    { num: "03", title: "Практическое применение", desc: "Инструкции по интеграции манифеста в повседневную жизнь для достижения желаемых изменений." },
  ],
  benefits: [
    "Освобождение от деструктивных программ и негативных установок",
    "Свобода воли в мыслях и полный контроль над эмоциями",
    "Пробуждение сознания и открытие новых возможностей",
    "Восстановление связи с душой и обретение внутреннего покоя",
  ],
};

const reviews = [
  {
    name: "Анастасия К.",
    city: "Москва",
    text: "После ритуала на привлечение удачи в бизнесе мои доходы выросли вдвое за три месяца. Морана — настоящий мастер.",
    stars: 5,
  },
  {
    name: "Виктор Л.",
    city: "Санкт-Петербург",
    text: "Обратился по поводу снятия порчи. Уже на следующий день почувствовал облегчение. Результат держится уже год.",
    stars: 5,
  },
  {
    name: "Елена С.",
    city: "Казань",
    text: "Гадание на хрустальном шаре поразило точностью. Всё, что было сказано — сбылось до мелочей.",
    stars: 5,
  },
];

const artifacts = [
  {
    title: "Зеркало Мораны",
    desc: "Старинное магическое зеркало для ясновидения. Серебряная рама XVII века.",
    price: "45 000 ₽",
  },
  {
    title: "Руническая плита",
    desc: "Гранитная плита с вырезанными рунами Старшего Футарка. Освящена в полнолуние.",
    price: "18 000 ₽",
  },
  {
    title: "Чёрная свеча ручной работы",
    desc: "Изготовлена с добавлением трав и эфирных масел. Усиливает защитные практики.",
    price: "800 ₽",
  },
  {
    title: "Амулет «Вечная тьма»",
    desc: "Серебряный медальон с чёрным ониксом. Защищает владельца от враждебной магии.",
    price: "12 000 ₽",
  },
];

function Candle({ delay = 0, height = 60 }: { delay?: number; height?: number }) {
  return (
    <div className="flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
      <div className="w-3 h-8 relative animate-flicker" style={{ animationDelay: `${delay}s` }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6"
          style={{
            background: "radial-gradient(ellipse at 50% 90%, rgba(255,180,50,0.9) 0%, rgba(255,80,0,0.6) 40%, transparent 80%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-3"
          style={{ background: "radial-gradient(ellipse, #fff5c0 20%, #ffb020 60%, transparent 100%)" }}
        />
      </div>
      <div
        className="w-4 rounded-sm"
        style={{
          height: `${height}px`,
          background: "linear-gradient(to bottom, #3a2010, #1a0a05)",
          boxShadow: "0 0 8px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = () => {
    const text = `Новое обращение с сайта Мораны:%0A%0AИмя: ${encodeURIComponent(formName)}%0AКонтакт: ${encodeURIComponent(formContact)}%0AСитуация: ${encodeURIComponent(formMessage)}`;
    window.open(`https://wa.me/79251885363?text=${text}`, "_blank");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "artifacts", "reviews", "contacts"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О ведьме" },
    { id: "services", label: "Услуги" },
    { id: "artifacts", label: "Артефакты" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <div className="noise-overlay" />
      <div className="vignette" />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="text-lg tracking-widest cursor-pointer"
          style={{ fontFamily: "'Cormorant SC', serif", color: "hsl(42 70% 52%)" }}
          onClick={() => scrollTo("home")}
        >
          М О Р А Н А
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-link"
              style={{
                color: activeSection === item.id ? "hsl(42 70% 52%)" : "rgba(200,170,120,0.6)",
                background: "none",
                border: "none",
              }}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          style={{ background: "none", border: "none", color: "hsl(42 70% 52%)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(4,2,2,0.97)" }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              className="nav-link text-base"
              style={{
                background: "none",
                border: "none",
                opacity: 0,
                animation: `reveal-up 0.5s ease-out ${i * 0.07}s forwards`,
              }}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.22) saturate(0.5)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(80,0,0,0.45) 0%, transparent 70%)" }}
        />

        {/* Candles row */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-8 pb-2 opacity-55">
          {[0, 0.3, 0.8, 1.2, 1.7, 0.5, 1.0, 0.2, 1.5].map((delay, i) => (
            <Candle key={i} delay={delay} height={40 + (i % 3) * 20} />
          ))}
        </div>

        {/* Floating particles */}
        <div className="particles-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 9}%`,
                bottom: "25%",
                animationDelay: `${i * 0.45}s`,
                animationDuration: `${3.5 + (i % 3) * 0.8}s`,
                ["--drift" as string]: `${(i % 2 === 0 ? 1 : -1) * (10 + i * 3)}px`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Rune ring */}
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20">
              <div
                className="absolute inset-0 rounded-full border border-red-900/40 animate-rune"
                style={{ borderStyle: "dashed" }}
              />
              <div className="absolute inset-3 rounded-full border border-yellow-900/30 animate-rune-reverse" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl animate-float">
                ☽
              </div>
            </div>
          </div>

          <p
            className="mb-3 tracking-[6px] text-xs font-light"
            style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.65)", animation: "reveal-fade 1.5s ease-out forwards" }}
          >
            ТЁМНЫЕ ПРАКТИКИ · ВЫСШЕЕ ПОСВЯЩЕНИЕ
          </p>

          <h1
            className="text-7xl md:text-9xl font-light mb-4 shimmer-text"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-1px", lineHeight: 1, animation: "reveal-up 1.2s ease-out 0.2s both" }}
          >
            Морана
          </h1>

          <p
            className="text-xl md:text-2xl font-light mb-10 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(200,160,100,0.7)", animation: "reveal-up 1.2s ease-out 0.4s both" }}
          >
            Чёрная Ведьма. Хозяйка тьмы и тайн.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "reveal-up 1.2s ease-out 0.6s both" }}>
            <button className="btn-dark" onClick={() => scrollTo("services")}>Мои услуги</button>
            <button className="btn-dark" style={{ borderColor: "rgba(80,50,20,0.5)" }} onClick={() => scrollTo("contacts")}>Записаться</button>
          </div>
        </div>

        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 animate-float" style={{ color: "rgba(180,120,60,0.35)" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(139,0,0,0.3) 40px, rgba(139,0,0,0.3) 41px)" }}
        />
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal relative group">
              <div className="absolute -inset-px" style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.4), transparent, rgba(139,0,0,0.2))" }} />
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={WITCH_IMAGE}
                  alt="Морана — чёрная ведьма"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "saturate(0.65) contrast(1.1)" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l" style={{ borderColor: "rgba(180,120,60,0.35)" }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r" style={{ borderColor: "rgba(180,120,60,0.35)" }} />
            </div>

            <div className="reveal space-y-6">
              <div className="section-divider">
                <span className="text-xs tracking-[5px] font-light" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.55)" }}>
                  О ВЕДЬМЕ
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a", lineHeight: 1.1 }}>
                Хранительница<br /><em>древних знаний</em>
              </h2>

              <p className="text-base leading-relaxed" style={{ color: "rgba(200,180,150,0.65)", fontWeight: 300 }}>
                Я практикую тёмную магию более двадцати лет. Моя сила унаследована по женской линии — от бабки к матери, от матери ко мне. Каждый обряд я провожу лично, вкладывая всю свою силу и намерение.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(200,180,150,0.65)", fontWeight: 300 }}>
                Я не обещаю лёгких путей — настоящая магия требует жертв и терпения. Но если вы готовы к работе со мной, результат будет.
              </p>

              <div className="flex gap-12 pt-4">
                {[
                  { num: "20+", label: "лет практики" },
                  { num: "2 000+", label: "обрядов" },
                  { num: "98%", label: "результативность" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-light animate-glow-text" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(42 70% 52%)" }}>
                      {stat.num}
                    </div>
                    <div className="text-xs tracking-widest mt-1" style={{ color: "rgba(180,150,100,0.45)", fontFamily: "'Cormorant SC', serif" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANNOUNCEMENT ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(80,0,0,0.2) 0%, transparent 70%)" }} />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(139,0,0,0.04) 30px, rgba(139,0,0,0.04) 31px)",
          }}
        />
        <div className="container mx-auto px-6 max-w-3xl relative">
          <div className="reveal" style={{ border: "1px solid rgba(139,0,0,0.25)", background: "rgba(8,3,2,0.97)", padding: "3rem" }}>
            {/* Top ornament */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(139,0,0,0.4))" }} />
              <span className="text-xl animate-float" style={{ color: "rgba(139,0,0,0.7)" }}>🕯️</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(139,0,0,0.4))" }} />
            </div>

            <p
              className="text-xs tracking-[5px] text-center mb-6"
              style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.45)" }}
            >
              ВАЖНОЕ ОБРАЩЕНИЕ
            </p>

            <h3
              className="text-3xl md:text-4xl font-light text-center mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#b8906a", lineHeight: 1.3 }}
            >
              Почему нельзя так<br /><em>относиться к ведьме</em>
            </h3>

            <div className="space-y-5 text-sm leading-relaxed" style={{ color: "rgba(190,165,130,0.7)", fontWeight: 300 }}>
              <p>
                Каждый мой совет, каждый взгляд и даже краткое «посмотрю» — это расход реальной силы. Я не консультирую из вежливости. Я работаю. И эта работа имеет цену.
              </p>
              <p>
                Когда мастер отдаёт энергию безвозмездно — духи берут своё сами. Они не спрашивают разрешения и не выбирают удобное время. Бесплатная помощь возвращается ко мне бедой.
              </p>
              <p>
                Поэтому прошу запомнить раз и навсегда:
              </p>

              <div className="space-y-3 pl-4" style={{ borderLeft: "2px solid rgba(139,0,0,0.25)" }}>
                {[
                  "Не торопите меня вопросами «ну что там?» и «когда уже?». Высшие силы не работают по вашему расписанию.",
                  "Не пишите в ночное время без крайней нужды — у меня есть своё время и своё пространство.",
                  "Не ждите бесплатных советов. Я профессионал, а не подружка-добряшка.",
                  "Относитесь ко мне как к мастеру своего дела — с уважением, соответствующим моему статусу.",
                ].map((rule, i) => (
                  <div key={i} className="flex gap-3">
                    <span style={{ color: "rgba(139,0,0,0.5)", flexShrink: 0, marginTop: "2px" }}>◆</span>
                    <p>{rule}</p>
                  </div>
                ))}
              </div>

              <p
                className="text-base italic pt-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(190,155,100,0.65)" }}
              >
                Я не ваша подружка. Я ведьма. И моя энергия — это мой ресурс, который требует уважения и соответствующего вознаграждения.
              </p>
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(139,0,0,0.3))" }} />
              <span style={{ fontFamily: "'Cormorant SC', serif", fontSize: "11px", color: "rgba(160,110,60,0.4)", letterSpacing: "3px" }}>МОРАНА</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(139,0,0,0.3))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-32 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(60,0,0,0.35) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-20 reveal">
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>РИТУАЛЬНЫЕ ПРАКТИКИ</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Ритуальные услуги</h2>
            <p className="mt-4 text-sm" style={{ color: "rgba(160,130,90,0.5)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              с использованием бесов, вуду и биоматериалов
            </p>
            <div className="section-divider mt-6"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                className="reveal card-hover gothic-border p-7 group cursor-pointer flex flex-col"
                style={{ background: "rgba(12,6,4,0.9)", transitionDelay: `${i * 0.05}s` }}
              >
                <div className="text-3xl mb-4 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a878", lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(180,160,130,0.5)", fontWeight: 300 }}>
                  {service.desc}
                </p>
                {service.note ? (
                  <div className="text-xs mb-3 flex items-center gap-1" style={{ color: "rgba(160,100,60,0.6)", letterSpacing: "0.5px" }}>
                    <span style={{ color: "rgba(139,0,0,0.5)" }}>◆</span> {service.note}
                  </div>
                ) : null}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(80,30,10,0.2)" }}>
                  <div className="text-base font-light" style={{ fontFamily: "'Cormorant SC', serif", color: "hsl(0 55% 42%)", letterSpacing: "1px" }}>
                    {service.price}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(140,110,70,0.45)", fontFamily: "'Cormorant SC', serif", letterSpacing: "1px" }}>
                    {service.term}
                  </div>
                </div>
                <div className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: "rgba(139,0,0,0.35)" }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <button className="btn-dark" onClick={() => scrollTo("contacts")}>Получить консультацию</button>
          </div>
        </div>
      </section>

      {/* ─── CARD SERVICES ─── */}
      <section className="py-24 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(40,0,0,0.25) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>КАРТОЧНАЯ МАГИЯ</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Ритуалы с картами</h2>
            <p className="mt-4 text-sm italic" style={{ color: "rgba(160,130,90,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>
              игральные карты как проводник тёмной воли
            </p>
            <div className="section-divider mt-6"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardServices.map((service, i) => (
              <div
                key={i}
                className="reveal card-hover gothic-border p-7 group cursor-pointer flex flex-col"
                style={{ background: "rgba(10,5,3,0.92)", transitionDelay: `${i * 0.05}s` }}
              >
                <div className="text-3xl mb-4 animate-float" style={{ animationDelay: `${i * 0.25}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a878", lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(180,160,130,0.5)", fontWeight: 300 }}>
                  {service.desc}
                </p>
                {service.note ? (
                  <div className="text-xs mb-3 flex items-center gap-1" style={{ color: "rgba(160,100,60,0.6)", letterSpacing: "0.5px" }}>
                    <span style={{ color: "rgba(139,0,0,0.5)" }}>◆</span> {service.note}
                  </div>
                ) : null}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(80,30,10,0.2)" }}>
                  <div className="text-base font-light" style={{ fontFamily: "'Cormorant SC', serif", color: "hsl(0 55% 42%)", letterSpacing: "1px" }}>
                    {service.price}
                  </div>
                  {service.term ? (
                    <div className="text-xs" style={{ color: "rgba(140,110,70,0.45)", fontFamily: "'Cormorant SC', serif", letterSpacing: "1px" }}>
                      {service.term}
                    </div>
                  ) : null}
                </div>
                <div className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: "rgba(139,0,0,0.35)" }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <button className="btn-dark" onClick={() => scrollTo("contacts")}>Заказать ритуал</button>
          </div>
        </div>
      </section>

      {/* ─── MANIFEST ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(60,10,0,0.3) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>ПРОБУЖДЕНИЕ СОЗНАНИЯ</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Индивидуальный манифест</h2>
            <p className="mt-4 text-sm italic" style={{ color: "rgba(160,130,90,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>
              освобождение от деструктивных программ и связь с памятью души
            </p>
            <div className="section-divider mt-6"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Steps */}
            <div className="reveal space-y-6">
              {manifestService.steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                    style={{ border: "1px solid rgba(139,0,0,0.3)", color: "rgba(139,0,0,0.6)", fontFamily: "'Cormorant SC', serif", fontSize: "11px", letterSpacing: "1px" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-base font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#b8906a" }}>{step.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(170,145,110,0.55)", fontWeight: 300 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits + price */}
            <div className="reveal space-y-5">
              <div className="p-7" style={{ background: "rgba(8,4,2,0.95)", border: "1px solid rgba(100,40,10,0.22)" }}>
                <p className="text-xs tracking-[4px] mb-5" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(160,110,60,0.5)" }}>ПРЕИМУЩЕСТВА</p>
                <div className="space-y-3">
                  {manifestService.benefits.map((b, i) => (
                    <div key={i} className="flex gap-3 text-sm" style={{ color: "rgba(180,155,115,0.65)", fontWeight: 300 }}>
                      <span style={{ color: "rgba(139,0,0,0.45)", flexShrink: 0, marginTop: "3px" }}>◆</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 pt-6" style={{ borderTop: "1px solid rgba(80,30,10,0.2)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[3px]" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(140,110,70,0.45)" }}>СТОИМОСТЬ</span>
                    <span className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(0 55% 42%)" }}>
                      {manifestService.price}
                    </span>
                  </div>
                </div>
              </div>

              <button className="btn-dark w-full" onClick={() => scrollTo("contacts")}>
                Заказать манифест
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTIFACTS ─── */}
      <section id="artifacts" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: `url(${ARTIFACTS_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3) saturate(0.4)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(4,2,1,0.9)" }} />

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-20 reveal">
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>МАГИЧЕСКИЕ ПРЕДМЕТЫ</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Артефакты</h2>
            <div className="section-divider mt-6"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {artifacts.map((art, i) => (
              <div
                key={i}
                className="reveal card-hover p-6 group cursor-pointer"
                style={{ background: "rgba(10,5,3,0.95)", border: "1px solid rgba(100,40,10,0.22)", transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-10 h-10 rounded-full mb-5 flex items-center justify-center"
                  style={{ background: "rgba(80,0,0,0.25)", border: "1px solid rgba(139,0,0,0.3)" }}
                >
                  <Icon name="Gem" size={16} style={{ color: "rgba(180,80,60,0.65)" }} />
                </div>
                <h3 className="text-base font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#b89a60" }}>
                  {art.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(160,140,110,0.5)", fontWeight: 300 }}>
                  {art.desc}
                </p>
                <div className="text-sm" style={{ fontFamily: "'Cormorant SC', serif", color: "hsl(0 55% 38%)", letterSpacing: "1px" }}>
                  {art.price}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <p className="text-xs tracking-[3px] mb-6" style={{ color: "rgba(150,120,80,0.45)", fontFamily: "'Cormorant SC', serif" }}>
              ВСЕ АРТЕФАКТЫ ПРОХОДЯТ ОБРЯД ОСВЯЩЕНИЯ
            </p>
            <button className="btn-dark" onClick={() => scrollTo("contacts")}>Заказать артефакт</button>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="py-32 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(40,0,0,0.3) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="text-center mb-20 reveal">
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>СЛОВА ОБРАТИВШИХСЯ</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Отзывы</h2>
            <div className="section-divider mt-6"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="reveal card-hover p-8"
                style={{ background: "rgba(10,5,3,0.8)", border: "1px solid rgba(80,30,10,0.18)", transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <span key={j} style={{ color: "hsl(42 60% 45%)", fontSize: "12px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(200,175,140,0.7)", fontSize: "15px" }}>
                  «{review.text}»
                </p>
                <div className="h-px mb-5" style={{ background: "rgba(100,50,20,0.18)" }} />
                <div>
                  <div className="text-sm font-light" style={{ color: "rgba(180,140,90,0.75)", fontFamily: "'Cormorant SC', serif" }}>{review.name}</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(140,110,70,0.4)", letterSpacing: "2px" }}>{review.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(60,0,0,0.3) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 max-w-3xl relative text-center">
          <div className="reveal mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border border-red-900/30 animate-rune" />
                <div className="absolute inset-0 flex items-center justify-center text-xl animate-float">🌙</div>
              </div>
            </div>
            <p className="text-xs tracking-[6px] mb-4" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.5)" }}>СВЯЗАТЬСЯ</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c8a87a" }}>Контакты</h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "rgba(180,150,110,0.55)", fontWeight: 300 }}>
              Запись на консультацию и обряды — только через личное обращение.<br />
              Я работаю с теми, кого выбирает судьба.
            </p>
            <div className="section-divider mb-12"><span className="text-red-900/60 text-lg">✦</span></div>
          </div>

          <div className="reveal p-10" style={{ background: "rgba(8,4,2,0.95)", border: "1px solid rgba(100,40,10,0.22)" }}>
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-5 py-4 outline-none"
                style={{ background: "rgba(15,7,4,0.8)", border: "1px solid rgba(80,30,10,0.28)", color: "rgba(200,175,140,0.85)", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px" }}
              />
              <input
                type="text"
                placeholder="Telegram или телефон"
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
                className="w-full px-5 py-4 outline-none"
                style={{ background: "rgba(15,7,4,0.8)", border: "1px solid rgba(80,30,10,0.28)", color: "rgba(200,175,140,0.85)", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px" }}
              />
              <textarea
                rows={4}
                placeholder="Расскажите о вашей ситуации..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full px-5 py-4 outline-none resize-none"
                style={{ background: "rgba(15,7,4,0.8)", border: "1px solid rgba(80,30,10,0.28)", color: "rgba(200,175,140,0.85)", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px" }}
              />
              <button className="btn-dark w-full" onClick={handleSubmit}>Отправить обращение</button>
            </div>
          </div>

          <div className="reveal mt-10 flex flex-col sm:flex-row gap-5 justify-center">
            {[
              { icon: "Phone", label: "WhatsApp", value: "+7 (925) 188-53-63", href: "https://wa.me/79251885363" },
              { icon: "MessageCircle", label: "Telegram", value: "+7 (925) 188-53-63", href: "https://t.me/+79251885363" },
              { icon: "Clock", label: "Время приёма", value: "Пн–Пт, 10:00–20:00", href: null },
            ].map((contact) => (
              <div
                key={contact.label}
                className="flex flex-col items-center gap-2 p-5 cursor-pointer card-hover"
                style={{ border: "1px solid rgba(70,30,10,0.18)" }}
                onClick={() => contact.href && window.open(contact.href, "_blank")}
              >
                <Icon name={contact.icon} size={18} style={{ color: "rgba(139,0,0,0.65)" }} />
                <div className="text-xs tracking-widest" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(140,110,70,0.45)" }}>{contact.label}</div>
                <div className="text-sm" style={{ color: "rgba(200,170,120,0.7)", fontWeight: 300 }}>{contact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(60,20,5,0.18)" }}>
        <div className="text-2xl mb-3" style={{ fontFamily: "'Cormorant SC', serif", color: "rgba(180,120,60,0.35)" }}>
          М О Р А Н А
        </div>
        <p className="text-xs tracking-widest" style={{ color: "rgba(120,90,50,0.3)", fontFamily: "'Cormorant SC', serif" }}>
          © 2024 · ВСЕ ПРАВА ЗАЩИЩЕНЫ ТЁМНЫМИ СИЛАМИ
        </p>
      </footer>
    </div>
  );
}