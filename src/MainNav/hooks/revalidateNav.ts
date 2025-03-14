import type { GlobalAfterChangeHook } from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateNav: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating navigation`);

    revalidateTag('global_header');
  }

  return doc;
};
