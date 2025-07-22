import Image from "next/image";
import StarField from "../../components/StarField";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Star Field Background */}
      <StarField />
      
      {/* Overlay Content */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black/30">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-4">Multi-Colored Star Field</h1>
            <p className="text-white/80 mb-4">
              A Doctor Who-themed animated star field with audio synchronization
            </p>
            <ol className="list-inside list-decimal text-sm text-white/70 font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
                Watch the stars rotate and burst in sync with the Doctor Who theme
              </li>
              <li className="mb-2">Click anywhere to start/resume audio</li>
              <li>Experience multi-layered depth and nebula effects</li>
            </ol>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-white/20 bg-black/50 backdrop-blur-sm transition-colors flex items-center justify-center hover:bg-white/10 hover:border-white/40 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-white"
              href="https://github.com/TomMcAvoy/browser-graphics-programming"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source Code
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white/60 hover:text-white/80"
            href="https://github.com/TomMcAvoy/browser-graphics-programming"
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
            Documentation
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white/60 hover:text-white/80"
            href="https://github.com/TomMcAvoy/browser-graphics-programming/tree/main/multi-colored-star-field"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Project Info
          </a>
        </footer>
      </div>
    </div>
  );
}
