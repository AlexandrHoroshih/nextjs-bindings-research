import { createEvent, sample, createStore, createEffect } from 'effector';

const pages = ['expo', 'index', 'jobs', 'schedule', 'speakers'] as const;

type PageType = typeof pages[number];
type Ctx = {
  page: PageType;
};

export const pageStarted = createEvent<Ctx>();
export const $isServer = createStore(typeof window === 'undefined');

const $currentPage = createStore<PageType | null>(null).on(
  pageStarted,
  (_, ctx) => ctx.page ?? null
);

/**
 * Matches started page
 */
export function matchPage({ page }: { page: PageType }) {
  const opened = sample({
    clock: pageStarted,
    filter: ctx => ctx.page === page
  });
  const $open = $currentPage.map(p => p === page);
  const closed = sample({
    clock: $open,
    filter: open => !open
  });

  return {
    opened,
    $open,
    closed,
    open: pageStarted.prepend(() => ({ page }))
  };
}

export const notifyUserFx = createEffect((msg: string) => {
  alert(msg);
});
