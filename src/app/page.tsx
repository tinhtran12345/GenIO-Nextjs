import { LanguageSwitcher } from '@/components/language-switcher';
import * as m from '@/paraglide/messages';
export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center gap-3 p-24 border-2 border-red-300">
      <h1>{m.test_message()}</h1>
      <LanguageSwitcher />
    </main>
  );
}
