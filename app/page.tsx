import Editor from '@/app/ui/editor'
import { NextUIProvider } from '@nextui-org/react';

export default function Home() {
  return (
    <NextUIProvider>
      <div className="lg:flex dark text-foreground bg-background min-h-screen pb-1 lg:p-10 xl:p-20">
        <Editor />
      </div>
    </NextUIProvider>
  );
}
