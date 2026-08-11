import { Link } from 'react-router-dom';
import { APP_STORE_URL } from '../config';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper py-12 dark:border-paper/10 dark:bg-ink lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p
              className="mb-3 text-xl font-extrabold text-ink dark:text-paper"
              style={{ fontStretch: '118%' }}
            >
              Maxproof
            </p>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-ink-dim">
              Shoppable video for Shopify stores. Your TikTok and Instagram footage, earning
              on your own storefront.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link
              to="/privacy"
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink dark:text-ink-dim dark:hover:text-paper"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink dark:text-ink-dim dark:hover:text-paper"
            >
              Terms
            </Link>
            <a
              href={APP_STORE_URL}
              className="border border-ink/25 px-5 py-2.5 text-center text-sm font-bold text-ink transition-colors hover:border-ink dark:border-paper/25 dark:text-paper dark:hover:border-paper"
            >
              Add to Shopify
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6 dark:border-paper/10">
          <p className="text-sm text-ink-soft dark:text-ink-dim">
            © 2026 Maxproof Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
