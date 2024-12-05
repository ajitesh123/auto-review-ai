'use client';

import React from 'react';
import CustomMarkdown from 'src/components/CustomMarkdown';

type Props = {};

const page = (props: Props) => {
  const termsOfServiceContent = `

**Last Updated: May 4, 2024**

This page outlines the standard Terms of Service for using Archie AI. If you have signed a separate agreement to access Archie AI with the same account, and that agreement is still in effect, these terms do not apply to you. Instead, the terms of your separate agreement will govern your use of Archie AI.

This Agreement is between Archie AI, operated by Archie AI, Inc., and the individual or entity accessing or using the product ("Customer"). By accessing or using Archie AI, Customer agrees to these terms and conditions.

#### **1\. Cloud Service Description**

Archie AI is an AI-powered platform designed to assist developers in fixing bugs, reviewing code, and answering questions about codebases. Archie AI uses a variety of models, including those from Anthropic, OpenAI, and Google Gemini, and integrates with the Pinecone Inc. vector database for advanced functionalities.

#### **2\. Subscription and Fees**

- **Subscription Period:** The subscription is on a month-to-month basis.
- **Fees:** Pricing for Archie AI varies depending on the selected plan and usage. All fees are charged monthly in advance, with any usage-based fees charged in arrears.
- **Payment Method:** Fees are automatically charged to the payment method on file. Customer authorizes automatic billing for these charges.

#### **3\. Customer Responsibilities**

- **User Accounts:** Customer is responsible for maintaining the confidentiality of login credentials and ensuring that all users comply with these terms.
- **Content and Data:** Customer retains responsibility for the content and data provided to Archie AI. The platform will not use Customer's data to develop or enhance machine learning models unless explicitly permitted by the Customer.

#### **4\. Data Security and Privacy**

- **Security:** Archie AI uses commercially reasonable measures to protect customer data and adheres to industry standards.
- **Data Use:** Customer data will not be used for training or enhancing AI models without explicit permission. Aggregated and anonymized usage data may be collected to improve the service.

#### **5\. Termination and Suspension**

- **Termination:** Either party may terminate the agreement with 30 days' notice before the end of the current subscription period. Immediate termination is possible for material breaches or insolvency events.
- **Suspension:** Archie AI reserves the right to suspend access if there is an outstanding balance, breach of terms, or misuse of the product.

#### **6\. Legal and Compliance**

- **Governing Law:** This Agreement is governed by the laws of the State of Delaware, and any legal actions must be brought in the state or federal courts of Delaware.
- **Export Compliance:** Customer agrees to comply with all relevant export laws and regulations.

#### **7\. Warranties and Disclaimers**

- **Limited Warranty:** Archie AI will not materially reduce the functionality of the service during the subscription period. If such a reduction occurs, Customer may terminate the agreement and receive a prorated refund.
- **Disclaimer:** Except as expressly provided in this agreement, Archie AI disclaims all other warranties, including implied warranties of merchantability and fitness for a particular purpose.

#### **8\. Liability**

- **Limitation of Liability:** Each party's cumulative liability for all claims is limited to the fees paid by Customer in the 12 months preceding the claim. Neither party will be liable for indirect, incidental, or consequential damages.

#### **9\. Indemnification**

- **By Archie AI:** Archie AI will defend and indemnify the Customer against claims that the service infringes on intellectual property rights, provided the Customer promptly notifies Archie AI and cooperates in the defense.
- **By Customer:** The Customer will defend and indemnify Archie AI against claims arising from the Customer's content or breach of this agreement.

#### **10\. General Terms**

- **Entire Agreement:** This Agreement constitutes the entire understanding between the parties.
- **Assignment:** Neither party may assign this Agreement without the other party's consent, except in cases of merger or acquisition.
- **Independent Contractors:** The parties are independent contractors, not agents, partners, or joint venturers.

These terms provide a high-level overview of your rights and obligations when using Archie AI. Please review the full text for comprehensive details.`;

  return (
    <div className="flex flex-col items-center overflow-y-auto h-full w-full px-16 md:px-48 py-16 mb-16">
      <label className="text-lg font-bold pb-8">
        Archie AI's Terms of Service
      </label>
      <CustomMarkdown content={termsOfServiceContent} />
    </div>
  );
};

export default page;
