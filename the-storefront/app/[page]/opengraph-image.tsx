import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = {} as any;
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
