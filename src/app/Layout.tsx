import { Outlet, ScrollRestoration } from 'react-router';
import { HistoryDrawer } from '@/features/history';
import { ApiStatusBanner } from '@/widgets/ApiStatusBanner';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        <Outlet />
      </main>
      <Footer />
      <HistoryDrawer />
      <ApiStatusBanner />
      <ScrollRestoration />
    </div>
  );
}
