import { ImageResponse } from 'next/og';
import {LogoIcon} from './icons/logo';

export type Props = {
  title?: string;
  font: ArrayBuffer
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

//   const interBold = await readFile(path.join(__dirname, '../fonts/Inter-Bold.ttf'), { flag: 'rb'});

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: Buffer.alloc(0),
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}


