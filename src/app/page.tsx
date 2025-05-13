"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ValOps from '@/resources/ValOps.svg'
import Style from './Style.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', height: '60vh', alignContent: 'baseline', justifyContent: 'center'}}>
          <div style={{ flex: '0 1 50%' }}>
            <Image
              src={ValOps}
              alt="ValidationOperations"
              width="400"
              style={{translate: '10px 120px'}}
            />
          </div>
          <div style={{ flex: '1 1 50%' }}>
            <Image
              src='/pipelineSample.jpeg'
              alt="DAG Pipeline"
              width="800"
              height="800"
            />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <button
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={() => router.push('/pipeline')}
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Dashboard
        </button>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to ValOps.wellsfargo.net →
        </a>
      </footer>
    </div>
  );
}
