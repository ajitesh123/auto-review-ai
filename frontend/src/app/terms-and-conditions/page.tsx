'use client';

import React from 'react';
import CustomMarkdown from 'src/components/CustomMarkdown';

type Props = {};

const BRAND_NAME = 'OpenHR AI';

const page = (props: Props) => {
  const termsOfServiceContent = `

**Last Updated: December 5, 2024**

This page outlines the standard Terms of Service for using ${BRAND_NAME}. If you have signed a separate agreement to access ${BRAND_NAME} with the same account, and that agreement is still in effect, these terms do not apply to you. Instead, the terms of your separate agreement will govern your use of ${BRAND_NAME}.

This Agreement is between ${BRAND_NAME}, operated by ${BRAND_NAME}, Inc., and the individual or entity accessing or using the product ("Customer"). By accessing or using ${BRAND_NAME}, Customer agrees to these terms and conditions.

#### **1\. Cloud Service Description**

${BRAND_NAME} is an AI-powered platform designed to assist developers in fixing bugs, reviewing code, and answering questions about codebases. ${BRAND_NAME} uses a variety of models, including those from Anthropic, OpenAI, and Google Gemini, and integrates with the Pinecone Inc. vector database for advanced functionalities.

#### **2\. Subscription and Fees**

- **Subscription Period:** The subscription is on a month-to-month basis.
- **Fees:** Pricing for ${BRAND_NAME} varies depending on the selected plan and usage. All fees are charged monthly in advance, with any usage-based fees charged in arrears.
- **Payment Method:** Fees are automatically charged to the payment method on file. Customer authorizes automatic billing for these charges.

#### **3\. Customer Responsibilities**

- **User Accounts:** Customer is responsible for maintaining the confidentiality of login credentials and ensuring that all users comply with these terms.
- **Content and Data:** Customer retains responsibility for the content and data provided to ${BRAND_NAME}. The platform will not use Customer's data to develop or enhance machine learning models unless explicitly permitted by the Customer.

#### **4\. Data Security and Privacy**

- **Security:** ${BRAND_NAME} uses commercially reasonable measures to protect customer data and adheres to industry standards.
- **Data Use:** Customer data will not be used for training or enhancing AI models without explicit permission. Aggregated and anonymized usage data may be collected to improve the service.

#### **5\. Termination and Suspension**

- **Termination:** Either party may terminate the agreement with 30 days' notice before the end of the current subscription period. Immediate termination is possible for material breaches or insolvency events.
- **Suspension:** ${BRAND_NAME} reserves the right to suspend access if there is an outstanding balance, breach of terms, or misuse of the product.

#### **6\. Legal and Compliance**

- **Governing Law:** This Agreement is governed by the laws of the State of Delaware, and any legal actions must be brought in the state or federal courts of Delaware.
- **Export Compliance:** Customer agrees to comply with all relevant export laws and regulations.

#### **7\. Warranties and Disclaimers**

- **Limited Warranty:** ${BRAND_NAME} will not materially reduce the functionality of the service during the subscription period. If such a reduction occurs, Customer may terminate the agreement and receive a prorated refund.
- **Disclaimer:** Except as expressly provided in this agreement, ${BRAND_NAME} disclaims all other warranties, including implied warranties of merchantability and fitness for a particular purpose.

#### **8\. Liability**

- **Limitation of Liability:** Each party's cumulative liability for all claims is limited to the fees paid by Customer in the 12 months preceding the claim. Neither party will be liable for indirect, incidental, or consequential damages.

#### **9\. Indemnification**

- **By ${BRAND_NAME}:** ${BRAND_NAME} will defend and indemnify the Customer against claims that the service infringes on intellectual property rights, provided the Customer promptly notifies ${BRAND_NAME} and cooperates in the defense.
- **By Customer:** The Customer will defend and indemnify ${BRAND_NAME} against claims arising from the Customer's content or breach of this agreement.

#### **10\. General Terms**

- **Entire Agreement:** This Agreement constitutes the entire understanding between the parties.
- **Assignment:** Neither party may assign this Agreement without the other party's consent, except in cases of merger or acquisition.
- **Independent Contractors:** The parties are independent contractors, not agents, partners, or joint venturers.

These terms provide a high-level overview of your rights and obligations when using ${BRAND_NAME}. Please review the full text for comprehensive details.`;

  return (
    <section className="relative isolate px-6 lg:px-8 widget-animate animate">
      <div className="mx-auto max-w-6xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-16">
          <CustomMarkdown content={termsOfServiceContent} />
        </div>
      </div>
    </section>
  );
};

export default page;
