import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { SvgIcon } from '@components/ui/svg-icon';
import Logout from '@assets/icons/logout.svg';
import Price from '@assets/icons/price.svg';
import { logout } from '@services/auth';
import { NAV_LINKS } from '@constants/links';
import type { User } from '../types/user';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;

      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;

      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  // logout user
  const handleLogout = async () => {
    const response = (await logout()) as {
      logout_url: string;
    };
    console.log('logout url ', response.logout_url);
    router.push(response.logout_url);
  };

  // open billing page
  const handleBillingClick = () => {
    router.push(NAV_LINKS.Billing);
    setDropdownOpen(false);
  };

  return (
    <section className="">
      <div className="container">
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-900"
            >
              <Image
                src={user.picture}
                // src="https://cdn.tailgrids.com/2.2/assets/core-components/images/account-dropdowns/image-1.jpg"
                alt="profile image"
                width={12}
                height={12}
                loading={'lazy'}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={`absolute right-0 mt-2 bg-zinc-800 top-full w-[240px] divide-y divide-stroke overflow-hidden rounded-xl  ${
                dropdownOpen ? 'block' : 'hidden'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <div>
                  <p className="text-md font-semibold text-milk tracking-wide">
                    {`${user.given_name} ${user.family_name}`}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-700">
                <button
                  onClick={handleBillingClick}
                  className="flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-dark hover:bg-neutral-700"
                >
                  <span className="flex items-center gap-2 tracking-wide">
                    <SvgIcon svg={Price} size="md" />
                    Manage Subscription
                  </span>
                </button>
                {/* <Link href={NAV_LINKS.Billing} passHref 
                  className="flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-dark hover:bg-neutral-700"
                >
                  <span className="flex items-center gap-2 tracking-wide">
                    <SvgIcon svg={Price} size="md" />
                    Manage Subscription
                  </span>
                </Link> */}
              </div>
              <div className="border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-between px-4 py-4 text-md font-bold text-dark hover:bg-neutral-700"
                >
                  <span className="flex items-center text-red-500 gap-2">
                    <SvgIcon svg={Logout} size="xl" />
                    Log out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
