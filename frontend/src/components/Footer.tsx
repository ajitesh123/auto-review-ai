'use client';

import { NAV_LINKS, SOCIAL_MEDIA_LINKS } from '@constants/links';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <footer className="bg-background border-t px-6 lg:px-8">
      <div className="mx-auto  max-w-4xl py-0 md:py-8">
        <div className="mt-8 w-full flex flex-col md:mt-0 md:flex-row justify-between lg:gap-y-16">
          <div className="mt-6 lg:mt-0 w-full md:w-52 lg:items-start">
            <Link
              href={NAV_LINKS.Logo}
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
                  width="35"
                  height="35"
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
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                Simple HR AI
              </span>
            </Link>
            <div className="col-span-2">
              <p className="mt-4 text-slate-300 text-sm">
                Smartest way to generate performance reviews.
              </p>
            </div>
          </div>
          <div className="mt-6 lg:mt-0">
            <p className="font-medium text-white">Products</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  href={'#'}
                  onClick={scrollToTop}
                  className="text-slate-300 transition hover:opacity-75"
                >
                  Performance Review
                </Link>
              </li>
              <li>
                <Link
                  href={'#'}
                  onClick={scrollToTop}
                  className="text-slate-300 transition hover:opacity-75"
                >
                  Self Review
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-6 lg:mt-0">
            <p className="font-medium text-white">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  href={NAV_LINKS.Priv_Policy}
                  className="text-slate-300 transition hover:opacity-75"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href={NAV_LINKS.Terms}
                  className="text-slate-300 transition hover:opacity-75"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:justify-between">
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              <li>
                <a
                  href={SOCIAL_MEDIA_LINKS.Instagram}
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={SOCIAL_MEDIA_LINKS.Linkedin}
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-300 transition hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>

                  <svg className="h-5 w-5" fill="none" viewBox="0 0 310 310">
                    <path
                      fill="currentColor"
                      d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73   C77.16,101.969,74.922,99.73,72.16,99.73z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4   c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599   c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319   c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995   C310,145.43,300.549,94.761,230.454,94.761z"
                    ></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href={SOCIAL_MEDIA_LINKS.Twitter}
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    className="h-5 w-5"
                    data-icon="tabler:brand-x"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                  >
                    <symbol id="ai:tabler:brand-x">
                      <path
                        d="m4 4l11.733 16H20L8.267 4zm0 16l6.768-6.768m2.46-2.46L20 4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </symbol>{' '}
                    <use
                      xlinkHref="#ai:tabler:brand-x"
                      href="#ai:tabler:brand-x"
                    />
                  </svg>
                </a>
              </li>
            </ul>
            <span className="text-xs text-gray-500 py-4 md:py-0">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
