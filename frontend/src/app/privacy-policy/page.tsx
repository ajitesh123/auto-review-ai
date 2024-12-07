'use client';

import React from 'react';
import CustomMarkdown from 'src/components/CustomMarkdown';

type Props = {};

const BRAND_NAME = 'OpenHR AI';
const SUPPORT_EMAIL = 'support@getopenhrai[dot]com';

const page = (props: Props) => {
  const privacyPolicyContent = `

  **Last Updated: December 5, 2024**

  ### **1\. INTRODUCTION**

  ${BRAND_NAME}, Inc. (“${BRAND_NAME},” “we,” “our,” or “us”) respects your privacy and is committed to protecting it through our compliance with this Privacy Policy (“Policy”). This Policy describes our practices for collecting, using, maintaining, protecting, and disclosing your information through our website and services.

  ### **2\. INFORMATION WE COLLECT**

  We collect information to provide better services to our users. The types of information we collect include:

  **Information You Provide to Us:**

  - **Personal Information:** When you register for an account, we collect personal information such as your name and email address.
  - **Review Data:** Information you provide about work performance, achievements, and other professional details to generate performance reviews.

  **Information Collected Automatically:**

  - **Usage Information:** Details about your interactions with our services, such as access times and pages viewed.
  - **Device Information:** Information about your device, including IP address, operating system, and browser type.

  ### **3\. HOW WE USE YOUR INFORMATION**

  We use the information we collect to:

  - Provide and improve our services.
  - Generate performance reviews based on the data you provide.
  - Communicate with you about your account and our services.
  - Ensure the security and integrity of our services.

  ### **4\. DATA SECURITY**

  We implement reasonable security measures to protect your information from unauthorized access and use. However, no security system is impenetrable, and we cannot guarantee the security of our systems.

  ### **5\. DATA RETENTION**

  We retain your personal information for as long as necessary to provide our services or as required by law. You can request deletion of your data by contacting us at ${SUPPORT_EMAIL}.

  ### **6\. YOUR RIGHTS AND CHOICES**

  You have the right to access, update, or delete your personal information. You can also opt out of receiving marketing communications from us.

  ### **7\. CHANGES TO THIS POLICY**

  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Policy on our website.

  ### **8\. CONTACT US**

  If you have any questions about this Privacy Policy, please contact us at ${SUPPORT_EMAIL}.

  `;

  return (
    <section className="relative isolate px-6 lg:px-8 widget-animate animate">
      <div className="mx-auto max-w-6xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-16">
          <CustomMarkdown content={privacyPolicyContent} />
        </div>
      </div>
    </section>
  );
};

export default page;