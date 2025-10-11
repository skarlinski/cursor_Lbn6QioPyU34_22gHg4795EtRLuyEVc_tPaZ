import Link from 'next/link';
import Image from 'next/image';

type ThumbnailProps = {
  code: number | string;
  description: string;
  t: { [key: string]: string };
  isCustom?: boolean;
};

const Thumbnail = ({ code, description, t, isCustom = false }: ThumbnailProps) => {
  const hrefBase = t.LOCALE === 'ca' ? '/ca' : '';
  const imageUrl = isCustom ? `http://localhost:3001/api/images/${code}` : `/images/${code}.jpg`;

  return (
    <div className="flex flex-col flex-grow h-full text-white overflow-hidden rounded shadow bg-[--interactive]">
      <Link
        href={`${hrefBase}/${code}`}
        className="text-white no-underline"
      >
        <div className="pt-[56.25%] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt=""
            loading="lazy"
            fill
            className="contrast-[70%] hover:contrast-100 transition duration-500 object-cover scale-[140%]"
          />
        </div>
        <div className="flex flex-col px-4 pt-4">
          <div className="text-[2rem] tracking-[2px] font-semibold uppercase">
            {code}
          </div>
          <p className="font-semibold">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
