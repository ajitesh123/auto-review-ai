'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { NAV_LINKS } from '@constants/links';
import { TextButton } from '@components/ui/button';
import Profile from '@components/Profile';
import { useAppContext } from '@contexts/AppContext';
import { isPerfReviewType } from '@constants/common';
import { login } from '@services/auth';
import githubLogo from '@assets/icons/github-logo.svg';
import { SvgIcon } from './ui/svg-icon';

export default function Header() {
  const { reviewType, accessToken, user, isAuthorizing } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav !== null) {
        if (window.scrollY > 100) {
          nav.classList.add('bg-background');
        } else {
          nav.classList.remove('bg-background');
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
    <header className="bg-neutral-white relative z-10 flex-shrink-0">
      <nav className="fixed w-full z-20 top-0 start-0 h-[75px] border-b-2 border-slate-800">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href={NAV_LINKS.Logo}
            passHref
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <rect
                width="40"
                height="40"
                rx="4"
                fill="black"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x="20"
                y="28"
                fontFamily="Arial"
                fontSize="24"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
              >
                H
              </text>
            </svg>
            <span className="text-xl font-semibold text-white">OpenHR AI</span>
          </Link>
          <Link
            href={NAV_LINKS.Github}
            passHref
            target='_blank'
          >
            <SvgIcon svg={githubLogo} size='custom' width={35} height={35} />
          </Link>
          {!isAuthorizing && (
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {!accessToken ? (
                <>
                  <div
                    className="items-center justify-between flex w-auto"
                    id="navbar-sticky"
                  >
                    <ul className="flex flex-row p-0 font-normal gap-3 md:gap-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                      <li className="md:block">
                        <Link
                          href={'#pricing'}
                          className="block rounded text-gray-300 md:hover:text-white"
                          scroll={true}
                        >
                          Pricing
                        </Link>
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
