import Link from "next/link";
import { PowerIcon } from '@heroicons/react/24/outline';
import AdminLogo from "./components/admin-logo";
import NavLinks from "./components/nav-links";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
            className="mb-2 flex h-20 items-end justify-start bg-primary p-4 md:h-40"
            href="/admin"
        >
            <div className="w-32 text-white md:w-40">
            <AdminLogo />
            </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow bg-gray-50 md:block"></div>
            <form>
            <button className="flex h-[48px] my-secondary-link">
                <PowerIcon className="w-6 mr-4" />
                <div className="hidden md:block">Вийти</div>
            </button>
            </form>
        </div>
        </div>
        
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}