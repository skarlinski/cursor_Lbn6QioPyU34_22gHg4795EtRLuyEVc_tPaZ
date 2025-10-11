import Usage from '@/components/Usage';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import Thumbnail from '@/components/Thumbnail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTranslations } from '@/lib/translation';

import statuses from '@/lib/statuses';

type CustomStatuses = {
  [key: string]: {
    code: string;
    message: string;
    isCustom: boolean;
  };
}

export default async function Home() {
  const t = await getTranslations('en');

  let customStatuses: CustomStatuses = {};
  try {
    const res = await fetch('http://localhost:3001/api/statuses');
    if (res.ok) {
      const customStatusCodes = await res.json();
      for (const code of customStatusCodes) {
        customStatuses[code] = {
          code: code,
          message: 'Custom status cat',
          isCustom: true,
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch custom statuses', error);
  }

  const allStatuses = { ...statuses, ...customStatuses };

  return (
    <>
      <Header t={t} />
      <main>
        <Usage t={t} />
        <ThumbnailGrid>
          {Object.values(allStatuses).map((status) => (
            <Thumbnail
              code={status.code}
              key={status.code}
              description={status.message}
              t={t}
              isCustom={Boolean((status as { isCustom?: unknown }).isCustom)}
            />
          ))}
        </ThumbnailGrid>
      </main>
      <Footer t={t} />
    </>
  );
}
