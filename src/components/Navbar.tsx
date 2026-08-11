import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APP_STORE_URL } from '../config';

const SECTIONS = [
  { href: '#features', label: 'Formats' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  /**
   * 与 index.html 里的首帧脚本**同源**：显式选择优先，没选过才跟随系统。
   *
   * 原来这里只判断 `classList.contains('dark')` 与「localStorage 里没有 theme
   * 时跟随系统」，唯独不读已存的 `theme === 'dark'` —— 结果是选了暗色刷新一次
   * 就掉回亮色，且下面的 effect 会把 localStorage 覆写成 'light'，把用户的选择
   * 静默丢掉。两个分支必须都显式判。
   */
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.theme;
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 路由一变就收起菜单，否则从 Privacy 点回首页时面板会挂在那儿。
  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isHome = location.pathname === '/';

  /**
   * 首页顶部时导航栏浮在浸染 hero 上，直接继承朱砂底、用纸色字；一旦滚动或
   * 换到 Privacy / Terms（那两页是纸底）就切回实底。
   * 不做这个分流的话，纸色字会落在纸色底上，直接消失。
   */
  const overDrench = isHome && !scrolled && !menuOpen;

  const linkColor = overDrench
    ? 'text-paper/80 hover:text-paper'
    : 'text-ink-soft hover:text-ink dark:text-ink-dim dark:hover:text-paper';

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-sticky transition-colors duration-300 ${
        overDrench
          ? 'bg-transparent'
          : 'border-b border-ink/10 bg-paper/95 backdrop-blur-sm dark:border-paper/10 dark:bg-ink/95'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className={`text-2xl font-extrabold tracking-tight transition-colors ${
              overDrench ? 'text-paper' : 'text-ink dark:text-paper'
            }`}
            style={{ fontStretch: '118%' }}
          >
            Maxproof
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={isHome ? s.href : `/${s.href}`}
                className={`text-[15px] font-semibold transition-colors duration-200 ${linkColor}`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className={`p-2 transition-colors duration-200 ${linkColor}`}
            >
              {isDark ? (
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.9 3.9l1.4 1.4M14.7 14.7l1.4 1.4M16.1 3.9l-1.4 1.4M5.3 14.7l-1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M17 12.3A7.5 7.5 0 017.7 3 7.5 7.5 0 1017 12.3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <a
              href={APP_STORE_URL}
              className={`hidden px-5 py-2.5 text-sm font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 sm:inline-flex ${
                overDrench ? 'bg-bone text-ink' : 'bg-shell text-paper'
              }`}
            >
              Add to Shopify
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`p-2 md:hidden ${linkColor}`}
            >
              <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                ) : (
                  <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-ink/10 bg-paper px-6 pb-6 pt-2 dark:border-paper/10 dark:bg-ink md:hidden"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={isHome ? s.href : `/${s.href}`}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-ink/8 py-3.5 text-base font-semibold text-ink dark:border-paper/8 dark:text-paper"
            >
              {s.label}
            </a>
          ))}
          <a
            href={APP_STORE_URL}
            className="mt-5 block bg-shell py-3.5 text-center font-bold text-paper"
          >
            Add to Shopify
          </a>
        </div>
      )}
    </nav>
  );
}
