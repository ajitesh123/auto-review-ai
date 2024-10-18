'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { NAV_LINKS } from '@constants/links';
import { TextButton } from '@components/ui/button';
import Profile from '@components/Profile';
import { useAppContext } from '@contexts/AppContext';
import { isPerfReviewType } from '@constants/common';
import { login } from '@services/auth';

export default function Header() {
  const { reviewType, accessToken, user, isAuthorizing } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav !== null) {
        if (window.scrollY > 100) {
          nav.classList.add('bg-background');
          nav.classList.add('border-b');
          nav.classList.add('border-slate-800');
        } else {
          nav.classList.remove('bg-background');
          nav.classList.remove('border-b');
          nav.classList.remove('border-slate-800');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    const response = (await login()) as {
      login_url: string;
    };
    // login redirection
    router.push(response.login_url);
  };

  return (
    <header className="bg-neutral-white relative z-10">
      <nav className="fixed w-full z-20 top-0 start-0">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href={NAV_LINKS.Logo}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center md:text-2xl text-xl font-bold whitespace-nowrap dark:text-white">
              Perf Review AI
            </span>
          </a>
          {!isAuthorizing && (
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {!accessToken ? (
                <>
                  <div
                    className="items-center justify-between flex w-auto"
                    id="navbar-sticky"
                  >
                    <ul className="flex flex-row p-0 font-normal gap-3 md:gap-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                      <li className="hidden md:block">
                        <a
                          href={NAV_LINKS.Pricing}
                          target="_blank"
                          className="block rounded text-gray-300 md:hover:text-white"
                        >
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </div>
                  <TextButton
                    variant={`primary-${
                      isPerfReviewType(reviewType) ? 'perf' : 'self'
                    }-review`}
                    onClick={handleLogin}
                  >
                    {'Login'}
                  </TextButton>
                </>
              ) : (
                <Profile user={user} />
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
