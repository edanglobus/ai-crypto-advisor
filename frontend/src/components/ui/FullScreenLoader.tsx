import { Spinner } from './Spinner';

export function FullScreenLoader() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-[#f5f5f7]">
      <Spinner className="h-8 w-8 text-brand" />
    </div>
  );
}
