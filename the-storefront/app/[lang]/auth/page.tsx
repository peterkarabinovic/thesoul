
import { HeaderOne } from 'components/header';
import { GoogleAuthBtn } from "./google-auth"


type Props = {
  params: { lang: string };
};

export default async function AuthPage({ params }: Props) {
  return (
    <>

      <HeaderOne lang={params.lang} transparent={false} />
      <div className='container flex place-content-center'>
          <GoogleAuthBtn/>
      </div>
    </>
  );
}

