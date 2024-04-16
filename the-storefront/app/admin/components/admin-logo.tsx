import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function AdminLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <UserGroupIcon className="h-12 w-12 me-4" />
      <p className="text-3xl">TheSoul</p>
    </div>
  );
}
