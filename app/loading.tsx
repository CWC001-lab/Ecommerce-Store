import Loader from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <Loader size="lg" text="Loading page..." />
    </div>
  );
}
