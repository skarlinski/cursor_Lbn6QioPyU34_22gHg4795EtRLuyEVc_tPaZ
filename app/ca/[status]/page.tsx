import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusDescription from '@/components/StatusDescription';

import statuses from '@/lib/statuses';
import { getStatusInfo } from '@/lib/status-info';
import { getTranslations } from '@/lib/translation';

export const revalidate = 0;

export default async function Info({ params }: { params: { status: string } }) {
  const code = params.status;

  const baseStatus = (statuses as any)[code];

  let hasCustom = false;
  try {
    const res = await fetch('http://localhost:3001/api/statuses', { cache: 'no-store' });
    if (res.ok) {
      const customCodes: string[] = await res.json();
      hasCustom = customCodes.includes(code);
    }
  } catch (_) {}

  const statusObj = baseStatus ?? { code, message: 'Custom status cat' };
  const statusInfoHTML = baseStatus ? await getStatusInfo(code) : '<p>Això és un estat personalitzat pujat per un usuari.</p>';
  const imageUrl = hasCustom ? `http://localhost:3001/api/images/${code}` : `/images/${statusObj.code.toString()}.jpg`;

  const t = await getTranslations('ca');

  return (
    <>
      <Header t={t} />
      <main>
        <nav>
          <Link href="/ca" className="text-white">{`< ${t.BACK_TO_HOME}`}</Link>
        </nav>

        <h1 className="text-center my-12">
          {statusObj.code} {statusObj.message}
        </h1>

        <div className="text-center">
          <Image
            src={imageUrl}
            alt={statusObj.message}
            width={750}
            height={600}
            className="w-full h-full max-w-3xl"
          />
        </div>
        <section className="flex justify-center tracking-wider">
          <StatusDescription>
            <div dangerouslySetInnerHTML={{ __html: statusInfoHTML }} />
            <div className="mt-4 text-center">
                <Link href={`/upload?status=${statusObj.code}`} className="text-interactive hover:underline">
                    Falta un gat per a aquest codi? Puja'n un!
                </Link>
            </div>
          </StatusDescription>
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}

export function generateMetadata({
  params,
}: {
  params: { status: string };
}): Metadata {
  const statusObj = (statuses as any)[params.status] ?? { code: params.status, message: 'Custom status cat' };

  return {
    title: `${statusObj.code} ${statusObj.message} | HTTP Cats`,
    description: `HTTP Cat for status ${statusObj.code} ${statusObj.message}`,
    openGraph: {
      title: `${statusObj.code} ${statusObj.message} | HTTP Cats`,
      images: [
        {
          url: `https://http.cat/${statusObj.code}.jpg`,
          alt: statusObj.message,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: `https://http.cat/${statusObj.code}`,
      title: `${statusObj.code} ${statusObj.message} | HTTP Cats`,
      images: [`https://http.cat/${statusObj.code}`],
    },
  };
}
