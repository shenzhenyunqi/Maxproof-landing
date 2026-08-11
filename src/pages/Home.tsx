import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { APP_STORE_URL, INVITE_CODE, INVITE_TRIAL_DAYS } from "../config";

/** 商家自己的商品图，占位用。真实上线前应换成商家实拍或产品截图。 */
const PRODUCT_SHOT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBwa6rEWXFO9Coj0d02s2odkGfxunoVKfgdrR3qt6O5pD--U5X2Kfxe29eaKyWdJtnz5WuCo1YLwR2iRwMrkDXws7UELyC3vi5hRZzhkxVripFoIJL0NIgsmfPl6tm7DqLtDUY8BTLtBVhMVA-lJWnjNdNaEfzMnUHAR4FRA52N82_Y-0SrGB42B6hVnogqzi1hWm_RYPVvxkLAQjHM1AfoVpTODIAVdhW7X83bPG2OvGp0dyDaK7tF3dgzzr9UlrypiyVT1TWb6g";

/* 图标一律内联 SVG。前身用 Material Icons Round —— 那是 Google 模板的招牌长相，
   而且要多拉两个渲染阻塞的字体请求，与「属于零售，不属于软件」直接冲突。 */
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none">
      <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

/**
 * 滚动进场只动 transform，**不动 opacity**。
 * 理由：whileInView 在隐藏标签页与无头渲染器里可能永不触发，一旦用 opacity 把
 * 内容藏起来，那些环境下整段就是空白。位移是增强，缺省态本身必须already可见。
 */
function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stories 形态的前台组件示意 —— 竖屏 + 贴底商品卡 + Shop 按钮。 */
function StoriesMock() {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-sm bg-ink">
      <img
        src={PRODUCT_SHOT}
        alt="商家自有商品的竖屏短视频，画面里是一罐补剂立在木托盘上"
        className="h-full w-full object-cover"
        loading="eager"
        width={720}
        height={1280}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 bg-paper p-2.5">
        <img src={PRODUCT_SHOT} alt="" aria-hidden="true" className="h-11 w-11 shrink-0 object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold leading-tight text-ink">Hina Supplement</p>
          <p className="text-[12px] leading-tight text-ink-soft">$29.00</p>
        </div>
        <span className="shrink-0 bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-paper">
          Shop
        </span>
      </div>
    </div>
  );
}

/**
 * 邀请码区块。放在定价面板正下方 —— 价格顾虑就在那一刻产生，破解它的东西
 * 应该紧挨着出现。
 *
 * 用第三种材质（墨底）而不是继续用骨白：定价区已经有「浸染 + 骨白面板」两层，
 * 再来一块骨白会读成同一张卡的延续，而这是一个独立的提议。
 */
function InviteBand() {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // 剪贴板在非安全上下文或权限被拒时会抛错。静默失败即可 —— 码本身是
      // 可见、可选中的文本，复制按钮只是便利，不是拿到码的唯一路径。
    }
  };

  return (
    <div className="mt-6 bg-ink p-8 text-paper lg:mt-8 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h3
            className="mb-4 max-w-[18ch] text-3xl font-extrabold lg:text-4xl"
            style={{ fontStretch: "116%" }}
          >
            Run it for a week before you pay a cent.
          </h3>
          <p className="measure mb-8 leading-relaxed text-ink-dim">
            Not a sandbox demo on a dummy store. {INVITE_TRIAL_DAYS} days of Pro on your real
            storefront, with your own videos and your own catalog — long enough for the
            attribution to tell you whether it actually moved anything.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* 等宽 + 字距是照 app 内 Plan 页对邀请码的处理：商家要肉眼抄写，
                比例字体下 l/1、O/0 会读混。码的字符集含大小写字母。 */}
            <code
              className="border border-paper/30 px-5 py-3.5 text-xl font-semibold text-amber"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                letterSpacing: "0.14em",
              }}
            >
              {INVITE_CODE}
            </code>
            <button
              type="button"
              onClick={copyCode}
              className="bg-paper px-6 py-3.5 text-[15px] font-bold text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              {copied ? 'Copied' : 'Copy code'}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? 'Invite code copied to clipboard' : ''}
            </span>
          </div>
        </div>

        <div>
          <ol className="mb-7 space-y-5">
            {[
              <>Install Maxproof from the <span className="font-semibold text-paper">Shopify App Store</span>.</>,
              <>Open <span className="font-semibold text-paper">Plan</span> in the app and find <span className="font-semibold text-paper">“Have an invite code?”</span></>,
              <>Paste the code. The trial starts immediately — no card, no call.</>,
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="shrink-0 text-2xl font-extrabold leading-none text-amber"
                  style={{ fontStretch: "118%" }}
                >
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[15px] leading-snug text-ink-dim">{step}</span>
              </li>
            ))}
          </ol>

          {/* 这三条限制都是硬的，藏起来只会让商家在 app 里撞墙。
              第一条尤其要紧：装完直接点订阅的店会被 HAS_SUBSCRIPTION 拒掉。 */}
          <p className="border-t border-paper/20 pt-5 text-sm leading-relaxed text-ink-dim">
            <span className="font-semibold text-paper">Redeem before you subscribe.</span> A
            store that already has an active subscription can’t apply a code. One redemption
            per store — but the code itself never expires.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const reduce = useReducedMotion();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        const data = await response.json();
        setFormStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <main className="flex-grow">
      {/* ── 浸染 1：Hero ───────────────────────────────────────────────── */}
      <section className="drench">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12 lg:pb-28 lg:pt-40">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-7 inline-flex items-center gap-2.5 border border-paper/35 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              Built for Shopify
            </p>
            <h1
              className="mb-7 font-extrabold leading-[0.95] text-paper"
              style={{ fontSize: "clamp(2.5rem, 6.4vw, 4.75rem)", fontStretch: "118%" }}
            >
              Your best videos are selling on TikTok. Not on your store.
            </h1>
            <p className="measure mb-10 text-lg leading-relaxed on-drench-soft lg:text-xl">
              Maxproof puts them back where the margin is. Paste a TikTok or Instagram link,
              tag the product, publish to your storefront as shoppable video. No theme edits,
              no developer.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={APP_STORE_URL}
                className="group inline-flex w-full items-center justify-center gap-2.5 bg-bone px-8 py-4 text-base font-bold text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 sm:w-auto"
              >
                Add to Shopify
                <Arrow className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </a>
              <a
                href="#pricing"
                className="inline-flex w-full items-center justify-center border border-paper/40 px-8 py-4 text-base font-semibold text-paper transition-colors duration-200 hover:border-paper sm:w-auto"
              >
                $10 a month. See what that buys.
              </a>
            </div>
            <p className="mt-7 text-sm on-drench-soft">
              Never billed by views · Cancel any time · Live the same afternoon
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[340px] lg:max-w-[400px]"
          >
            <StoriesMock />
          </motion.div>
        </div>
      </section>

      {/* ── 三种形态。刻意不做同构卡片：每种形态用它自己的物理形状表达 ──── */}
      <section id="features" className="bg-paper py-20 dark:bg-ink lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <Rise>
            <h2
              className="mb-4 max-w-[16ch] text-4xl font-extrabold text-ink dark:text-paper lg:text-5xl"
              style={{ fontStretch: "116%" }}
            >
              Three shapes. One catalog.
            </h2>
            <p className="measure mb-14 text-lg text-ink-soft dark:text-ink-dim">
              Same videos, same product tags. Pick the placement that fits the page you're
              putting it on.
            </p>
          </Rise>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {/* Carousel：横向条带 */}
            <Rise>
              <div className="mb-6 h-[190px] overflow-hidden border border-ink/12 bg-mist p-4 dark:border-paper/12 dark:bg-ink-raise">
                {/* 只有一张占位图，靠 object-position 错开取景，避免四格读成同一张贴图。
                    最后一格切出容器右缘，暗示这一排是可以横向滚动的。 */}
                <div className="flex h-full gap-2">
                  {['22% 28%', '52% 12%', '78% 46%', '38% 72%'].map((pos, i) => (
                    <div
                      key={pos}
                      className={`h-full overflow-hidden ${i === 3 ? 'w-[38%] shrink-0' : 'flex-1'}`}
                    >
                      <img
                        src={PRODUCT_SHOT}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: pos }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink dark:text-paper">Carousel</h3>
              <p className="measure-tight text-ink-soft dark:text-ink-dim">
                A scrolling row that sits inline on a collection or home page. Highest density —
                use it where people are already browsing.
              </p>
            </Rise>

            {/* Stories：竖屏 + 头像行 */}
            <Rise delay={0.08}>
              {/* 圆形，不是 9/16 —— rounded-full 压在竖屏比例上会拉成椭圆，
                  而 stories 气泡在任何平台上都是正圆，形状本身就是识别线索。 */}
              <div className="mb-6 flex h-[190px] items-center justify-center gap-4 border border-ink/12 bg-mist p-4 dark:border-paper/12 dark:bg-ink-raise">
                {['26% 30%', '54% 16%', '74% 52%'].map((pos) => (
                  <div
                    key={pos}
                    className="aspect-square w-[64px] shrink-0 overflow-hidden rounded-full ring-2 ring-shell ring-offset-[3px] ring-offset-mist dark:ring-amber dark:ring-offset-ink-raise"
                  >
                    <img
                      src={PRODUCT_SHOT}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: pos }}
                    />
                  </div>
                ))}
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink dark:text-paper">Stories</h3>
              <p className="measure-tight text-ink-soft dark:text-ink-dim">
                Tap-through bubbles that open full-screen vertical. The format your customers
                already know how to use.
              </p>
            </Rise>

            {/* Pop-up：页面轮廓上的浮层 */}
            <Rise delay={0.16}>
              {/* 底层要读得出「这是一个商品页」，浮层才有「浮在页面上」的意思；
                  只画几根灰线的话，这一格看上去就只是空的。 */}
              <div className="relative mb-6 h-[190px] overflow-hidden border border-ink/12 bg-mist p-4 dark:border-paper/12 dark:bg-ink-raise">
                <div className="flex gap-3 opacity-45">
                  <div className="h-[60px] w-[46px] shrink-0 bg-ink/20 dark:bg-paper/20" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-4/5 bg-ink/25 dark:bg-paper/25" />
                    <div className="h-2 w-2/5 bg-ink/15 dark:bg-paper/15" />
                    <div className="mt-3 h-5 w-3/5 bg-ink/20 dark:bg-paper/20" />
                  </div>
                </div>
                <div className="mt-4 space-y-2 opacity-30">
                  <div className="h-2 w-full bg-ink/15 dark:bg-paper/15" />
                  <div className="h-2 w-5/6 bg-ink/15 dark:bg-paper/15" />
                  <div className="h-2 w-3/4 bg-ink/15 dark:bg-paper/15" />
                </div>
                <div
                  className="absolute bottom-3 right-3 overflow-hidden shadow-[0_10px_28px_-8px_rgba(34,18,15,0.55)] ring-1 ring-ink/15"
                  style={{ width: "66px", aspectRatio: "9 / 16" }}
                >
                  <img
                    src={PRODUCT_SHOT}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "56% 34%" }}
                  />
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-ink/70 text-center text-[9px] font-bold leading-4 text-paper">
                    ×
                  </span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-ink dark:text-paper">Pop-up</h3>
              <p className="measure-tight text-ink-soft dark:text-ink-dim">
                A corner player that follows the page without taking it over. Dismissible, and
                it stays dismissed.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      {/* ── 三步。这里的编号是真序列，不是装饰性小节标记 ──────────────── */}
      <section id="how-it-works" className="bg-mist py-20 dark:bg-ink-raise lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <Rise>
            <h2
              className="mb-14 max-w-[18ch] text-4xl font-extrabold text-ink dark:text-paper lg:text-5xl"
              style={{ fontStretch: "116%" }}
            >
              Link in. Tagged. Live.
            </h2>
          </Rise>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                n: "1",
                t: "Paste the link",
                d: "Drop a TikTok or Instagram URL and Maxproof pulls the video in. Own footage uploads directly, up to 200MB a file.",
              },
              {
                n: "2",
                t: "Tag the product",
                d: "Pick from your Shopify catalog while you upload. Change the tags later straight from the list — no round trip through an edit page.",
              },
              {
                n: "3",
                t: "Drop it in the theme",
                d: "Add the block wherever you want it. It's a native theme block, so it moves with your theme editor instead of fighting it.",
              },
            ].map((s, i) => (
              <Rise key={s.n} delay={i * 0.08}>
                <li className="list-none">
                  <div className="mb-5 flex items-baseline gap-4">
                    <span
                      className="text-5xl font-extrabold leading-none text-shell dark:text-amber"
                      style={{ fontStretch: "118%" }}
                    >
                      {s.n}
                    </span>
                    <span className="h-px flex-1 bg-ink/15 dark:bg-paper/15" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-ink dark:text-paper">{s.t}</h3>
                  <p className="measure-tight text-ink-soft dark:text-ink-dim">{s.d}</p>
                </li>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 归因。这一段是可信度的支点：只列产品真实统计的指标，不编数值 ── */}
      <section className="bg-ink py-20 text-paper lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <Rise>
            <h2
              className="mb-5 max-w-[15ch] text-4xl font-extrabold lg:text-5xl"
              style={{ fontStretch: "116%" }}
            >
              Which video paid for itself?
            </h2>
            <p className="measure mb-8 text-lg leading-relaxed text-ink-dim">
              Not impressions dressed up as results. Maxproof separates the sales a video
              closed outright from the ones it merely touched, so you can retire the videos
              that only look busy.
            </p>
            <a
              href={APP_STORE_URL}
              className="group inline-flex items-center gap-2.5 border-b-2 border-amber pb-1 text-base font-bold text-amber"
            >
              Start tracking it
              <Arrow className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </a>
          </Rise>

          <Rise delay={0.1}>
            <dl className="border-t border-paper/15">
              {[
                ["Impressions", "The widget was on screen"],
                ["Views", "Watched in full-screen or picture-in-picture"],
                ["Video watch time", "Total seconds spent, not just opens"],
                ["Product clicks", "Tapped through to a product"],
                ["Sales — direct", "Bought from inside the video"],
                ["Sales — influenced", "Watched, then bought in the same session"],
              ].map(([term, desc]) => (
                <div key={term} className="flex flex-col gap-1 border-b border-paper/15 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <dt className="w-full font-semibold text-paper sm:w-[46%]">{term}</dt>
                  <dd className="flex-1 text-sm text-ink-dim">{desc}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-ink-dim">
              These are the metrics the app actually reports. No projected lift, no invented
              benchmark.
            </p>
          </Rise>
        </div>
      </section>

      {/* ── 浸染 2：定价。诚实本身当进攻动作用 ─────────────────────────── */}
      <section id="pricing" className="drench py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <Rise>
            <h2
              className="mb-5 max-w-[20ch] text-4xl font-extrabold text-paper lg:text-5xl"
              style={{ fontStretch: "116%" }}
            >
              $10 a month. Your traffic is none of our business.
            </h2>
            <p className="measure mb-14 text-lg leading-relaxed on-drench-soft">
              One plan, every feature. No tiers to compare, and nothing held back so we can
              sell you the next one up.
            </p>
          </Rise>

          {/* 只有一档，就不摆卡片 —— 卡片是用来比较的，无可比时它只是个空壳，
              而并排一张假的对照档只会让唯一的真实价格显得可疑（PRODUCT.md 原则 4）。 */}
          <Rise>
            <div className="bg-bone p-8 lg:p-12">
              <div className="mb-9 flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-shell">Pro</p>
                <p className="bg-shell px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-paper">
                  Save $20 on annual
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div>
                  <div className="mb-2 flex items-baseline gap-2.5">
                    <span
                      className="text-7xl font-extrabold leading-none text-ink"
                      style={{ fontStretch: "116%" }}
                    >
                      $10
                    </span>
                    <span className="text-lg font-semibold text-ink-soft">/ month</span>
                  </div>
                  <p className="mb-8 text-[15px] text-ink-soft">Or $100 billed once a year.</p>
                  <a
                    href={APP_STORE_URL}
                    className="group flex items-center justify-center gap-2.5 bg-shell py-4 font-bold text-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                  >
                    Add to Shopify
                    <Arrow className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </a>
                  {/* 邀请码不在这里重复 —— 紧接着的 InviteBand 把同一个提议说得更响，
                      相邻两处讲同一件事只会互相稀释。 */}
                </div>

                <div>
                  {/* 前四条与 app 内 Plan 页的 PRO_FEATURES 逐字同源；导入与打标两条
                      来自原 Free 卡 —— 现在一档全给，它们同样属于 Pro。
                      原 Free 卡的「Set up all three widget formats」不并入：它和
                      Carousel/Stories + Pop up 两条说的是同一件事，重复列只会稀释清单。
                      顺序按产品动线：拿进来 → 打标 → 放出去 → 看效果。 */}
                  <ul className="mb-8 grid gap-3.5 sm:grid-cols-2">
                    {[
                      'Import from TikTok, Instagram, or upload',
                      'Unlimited video uploads',
                      'Tag products from your catalog',
                      'Carousel and Stories widgets',
                      'Pop up widget',
                      'Video analytics',
                    ].map((f) => (
                      <li key={f} className="flex gap-3 text-ink">
                        <Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-amber-deep" />
                        <span className="text-[15px] leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {/* 「没有什么」和「有什么」一样是卖点 —— 这两条都是可核对的事实，
                      第二条与 app 内 Plan 页的原句同源。 */}
                  <dl className="border-t border-ink/15 pt-5 text-[15px]">
                    <div className="flex flex-col gap-1 pb-4 sm:flex-row sm:gap-5">
                      <dt className="font-semibold text-ink sm:w-[38%]">No view meter</dt>
                      <dd className="flex-1 text-ink-soft">
                        The bill never moves because a video did well.
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
                      <dt className="font-semibold text-ink sm:w-[38%]">Cancel any time</dt>
                      <dd className="flex-1 text-ink-soft">
                        Unused time is credited back to your Shopify bill.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </Rise>

          <Rise delay={0.08}>
            <InviteBand />
          </Rise>
        </div>
      </section>

      {/* ── 联系。次级出口，刻意压低音量 ───────────────────────────────── */}
      <section id="contact" className="bg-paper py-20 dark:bg-ink lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <Rise>
            <h2 className="mb-4 text-3xl font-extrabold text-ink dark:text-paper lg:text-4xl" style={{ fontStretch: "116%" }}>
              Still deciding?
            </h2>
            <p className="measure-tight text-ink-soft dark:text-ink-dim">
              Ask before you install. Questions about setup, your theme, or an invite code all
              land in the same inbox, and a person answers them.
            </p>
          </Rise>

          <Rise delay={0.08}>
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink dark:text-paper">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Your name"
                    className="w-full border border-ink/25 bg-transparent px-4 py-3 text-ink placeholder:text-ink-soft focus:border-shell focus:outline-none dark:border-paper/25 dark:text-paper dark:placeholder:text-ink-dim dark:focus:border-amber"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink dark:text-paper">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="you@yourstore.com"
                    className="w-full border border-ink/25 bg-transparent px-4 py-3 text-ink placeholder:text-ink-soft focus:border-shell focus:outline-none dark:border-paper/25 dark:text-paper dark:placeholder:text-ink-dim dark:focus:border-amber"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink dark:text-paper">
                  What do you want to know?
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your store and what you're trying to do."
                  className="w-full resize-none border border-ink/25 bg-transparent px-4 py-3 text-ink placeholder:text-ink-soft focus:border-shell focus:outline-none dark:border-paper/25 dark:text-paper dark:placeholder:text-ink-dim dark:focus:border-amber"
                />
              </div>

              {formStatus === 'error' && (
                <p role="alert" className="border border-shell bg-shell/8 px-4 py-3 text-sm font-medium text-shell dark:bg-shell/20 dark:text-amber">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className="w-full bg-ink py-4 font-bold text-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 dark:bg-paper dark:text-ink sm:w-auto sm:px-10"
              >
                {(formStatus === 'idle' || formStatus === 'error') && 'Send it'}
                {formStatus === 'submitting' && 'Sending…'}
                {formStatus === 'success' && 'Sent — we’ll reply shortly'}
              </button>
              <p aria-live="polite" className="sr-only">
                {formStatus === 'success' ? 'Message sent' : formStatus === 'error' ? errorMessage : ''}
              </p>
            </form>
          </Rise>
        </div>
      </section>
    </main>
  );
}
