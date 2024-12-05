'use client';

import React from 'react';
import CustomMarkdown from 'src/components/CustomMarkdown';

type Props = {};

const BRAND_NAME = 'OpenHR AI';
const SUPPORT_EMAIL = 'support@openhrai[dot]com';

const page = (props: Props) => {
  const privacyPolicyContent = `

  **Last Updated: December 5, 2024**


  ### **1\. INTRODUCTION**
  
  ${BRAND_NAME}, Inc. (“${BRAND_NAME},” “we,” “our,” or “us”) respects your privacy and is committed to protecting it through our compliance with this Privacy Policy (“Policy”). A core element of our mission is our commitment to protect your personal information and to be transparent about the data we collect about you, how it is used, and with whom it is shared.
  
  This Policy describes our practices for collecting, using, maintaining, protecting, and disclosing your information through <http://openhrai.com> (our “Website”), our applications (our “Apps”), and our products, services, technology platforms, and related applications (collectively, the “Service(s)”).
  
  Please read this Policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our terms, your choice is not to use our Services. By accessing or using our Services, you agree to this Privacy Policy. This Policy may change from time to time (see **Changes to This Policy**). Your continued access to our Services after we make changes is deemed acceptance of those changes, so please check the Last Modified Date at the top of this Policy to ensure that you are viewing the most current version.
  
  ### **2\. INFORMATION WE COLLECT ABOUT YOU AND HOW WE COLLECT IT**
  
  We collect only the minimum amount of information needed to provide you with our Services. For example, we collect basic contact information when you sign up for an account. We don’t ask you for any information if you choose not to register for an account; however, you will not be able to use our Services without registering. Other types of information we collect relate to how you use our Website or Apps, which helps us improve our Services.
  
  **Information You Provide to Us or Received by Us on Your Behalf**
  
  - **Personal Information:** In the course of registering an account on our Services, we collect information that identifies you as a specific individual and can be used to contact or identify you (“Personal Information”). Examples include your name and email.
  - **Payment Information:** We may also process your payment information, such as credit card details, billing address, and other financial information necessary to purchase or otherwise use our Services. Please note that we do not collect or store your Payment Information. Your Payment Information is collected and stored by our Authorized Service Providers (see **How We Disclose and Share Your Information** for more information). By submitting your Payment Information, you consent to our providing it to those Authorized Service Providers as reasonably necessary to support and process your transactions as well as your credit card issuer and banking institution.
  - **User Contributions:** You may have the ability to interact with parts of our Website or with us through third-party platforms, such as posting on third-party forums or submitting tickets on our Website. Your feedback or posts may be published or displayed publicly or transmitted to third parties (collectively, "User Contributions"). Your User Contributions are posted and transmitted to others at your own risk. We cannot control the actions of other users of the Website or third-party platforms with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed or accessed by unauthorized persons. Use caution when posting any personal information online.
  
  When you provide us with information in connection with a particular activity or otherwise sign up for our services or provide your contact information to us, including your email address, you agree that such action constitutes a purchase or inquiry establishing a business relationship with us. You expressly consent to receiving communications from ${BRAND_NAME} through the information you provided to us. For more information on how to access and control your communication preferences, please see **Your Rights and Choices Regarding Your Information**, below.
  
  **Information Collected Automatically**
  
  As you navigate through and interact with our Website, we and our third-party service providers, including analytics and third-party content providers, may automatically collect certain information from you whenever you access or interact with the Service.
  
  - **Usage Information:** Details of your visits to our Website, including which links you clicked on, content response times, location data, logs, and other similar communication data and statistics about your interactions.
  - **Device Information:** Information about your computer and internet connection, including your Internet Protocol address, operating system, and browser type.
  - **Non-Identifying Information:** We may collect non-identifying or non-personal information when you use our Website, such as zip codes, demographic data, age, gender, time zone, publicly available data, and general information regarding your use of the Service.
  
  We may combine this automatically collected log information with other information we collect about you. We do this to improve services we offer you, analytics, and site functionality.
  
  **Cookies and Other Automatic Data Collection Technologies**
  
  ${BRAND_NAME} and its partners use cookies or similar technologies, which store certain information on your computer and allow us to, among other things, analyze trends, administer the Website, and gather demographic information about our user base as a whole. The technology used to collect information automatically from ${BRAND_NAME} Users may include the following:
  
  - **Cookies:** Like many websites, we and our operational partners, affiliates, analytics, and service providers use “cookies” to collect information. A cookie is a small data file that we transfer to your computer’s hard disk for record-keeping purposes. We use both persistent cookies that remain on your computer or similar devices (such as to save your registration ID and login password for future logins to the Service) and session ID cookies, which expire at the end of your browser session (for example, to enable certain features of the Service, to better understand how ${BRAND_NAME} Users interact with the Service, and to monitor aggregate usage by ${BRAND_NAME} Users and web traffic routing on the Service). You can control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functionality of the Service.
  - **Web Beacons:** We and our operational partners, affiliates, analytics, and service providers may also employ software technology known as “web beacons” and/or “tracking tags” to help us keep track of what content on our Service is effective and to serve relevant advertising to you. Web beacons are small graphics with a unique identifier that may be invisible to you, and are used to track the online activity of Internet users. Web beacons are embedded in the web pages you review or email messages you receive. Web beacons or similar technologies may be used for a number of purposes, including, without limitation, to count visitors to our Service, to monitor how ${BRAND_NAME} Users navigate the Service, to count how many emails were actually opened, or to count how many particular articles or links were actually viewed.
  - **Embedded Scripts:** We and our operational partners, affiliates, analytics, and service providers may also employ software technology known as an Embedded Script. An Embedded Script is programming code that is designed to collect information about your interactions with the Service, such as the links you click on. The code is temporarily downloaded onto your computer or other device and is deactivated or deleted when you disconnect from the Service.
  
  **Information Received from Third Parties**
  
  We also may receive information about you from third parties. For example, we and our partners, affiliates, and service providers may use a variety of other technologies (such as tags) that collect statistical data relating to your Website activity for security and fraud detection purposes.
  
  You may choose to elect that certain third parties share information with us, for example, when you choose to access the Services through another service, such as through Single Sign-on (e.g., GitHub and GitLab).
  
  - **GitHub/GitLab Details:** We may collect data necessary to enable your ${BRAND_NAME} account to interface with your GitHub account, such as your GitHub token, your user organization, your GitHub username, and your user role. We integrate tightly with GitHub's API and Open Authentication (OAUTH) system. We do not have access to your GitHub/GitLab credentials.
  - **Social Networking Services:** When you connect with us through a social media platform, we may, depending on your privacy settings, receive some information from your social media account, and what we collect depends on your privacy settings with that social networking service. The Service may also allow you to “like” or share content with social networking services. You may register to join the Service directly via the Service or by logging into your account with a third-party social networking service (“SNS”) via our Service (e.g., Discord). Note that the information we collect from and through an SNS may depend on the privacy settings you have set with the SNS and the permissions you grant to us in connection with linking your account with the Service to your account with an SNS.
  
  ### **3\. DO NOT TRACK SIGNAL**
  
  Do Not Track (DNT) is a privacy preference that users can set in some web browsers, allowing users to opt out of tracking by websites and online services. We do not track users and do not allow third parties to track the personal information of our users on our Website.
  
  ### **4\. CHILDREN’S PRIVACY**
  
  The Services are general audience and intended for users 13 and older. We do not knowingly collect Personal Information from anyone younger than age 13.
  
  ### **5\. HOW WE USE YOUR INFORMATION**
  
  We may use information that we collect about you or that you provide to us, including any personal information:
  
  - To provide you with an Account.
  - To perform code reviews, fix bugs, explain code, provide actionable suggestions, and enhance your development workflow.
  - To deliver, provide, and process payment for the Services.
  - To improve our Services.
  - To address your inquiries.
  - To tailor content we display to you and offer we may present to you, both on the Service and elsewhere online.
  - To communicate with you and to promote products, services, offers, and events offered by ${BRAND_NAME}.
  - To comply with legal requirements and assist law enforcement.
  - To stop any activity, we may consider to be, or to pose a risk of being, illegal, fraudulent, unethical, or legally actionable.
  - To identify ${BRAND_NAME} users.
  - For the purposes disclosed at the time you provide your information, and
  - As otherwise permitted with your consent.
  
  ### **6\. LEGAL BASES**
  
  To process your information as described above, we rely on the following legal basis:
  
  - **Contractual Necessity:** To provide you with the ${BRAND_NAME} Service and perform the contract that you have with us.
  - **Legitimate Interests:** It is in our legitimate interests to improve and analyze our Service, promote our products, prevent fraudulent transactions, maintain the security of our Services, and provide functionality.
  - **Consent:** In instances where we have indicated we will ask for consent within this Privacy Policy, you may withdraw your consent at any time by contacting us. Please see the **How to Contact Us** section for more information.
  
  ### **7\. HOW WE DISCLOSE AND SHARE YOUR INFORMATION**
  
  We do not sell personal information to third parties. We share information we receive about you as follows:
  
  - **With Our Service Providers:** We employ third-party companies to provide Services on our behalf, to perform Service-related operations (e.g., without limitation, maintenance services, database management, web analytics, server hosting, fraud detection, and improvement of ${BRAND_NAME}’s features) or to assist us in providing and analyzing how our Service is used. For example, we use Stripe to process your payments and Mixpanel for analytics.
  - **For Our Service Integrations:** We allow for a variety of Service integrations to provide you with the best possible functionality while using our Services. For example, we integrate with:
    - GitHub and GitLab for providing service on code.
      - GitHub’s privacy policy is available [here](https://github.com/site/privacy).
    - OpenAI. Google Gemini and Anthropic for various features.
      - OpenAI’s privacy policy is available [here](https://openai.com/policies/privacy-policy).
      - Neither of these model providers uses personal information collected as part of ${BRAND_NAME} usage to to train, refine, or otherwise influence our models or any third-party models.
  
  Your Personal Information is processed in accordance with the privacy policies and practices of such Service integration companies.
  
  - **For Corporate Transactions:** ${BRAND_NAME} may share information, including Personal Information, with any current or future subsidiaries or affiliates, primarily for business and operational purposes, in connection with a merger, acquisition, reorganization, or sale of assets (including, in each case, as part of the due-diligence process with any potential acquiring entity) or in the event of bankruptcy.
  - **If Required By Law:** ${BRAND_NAME} will disclose information about you to government or law enforcement officials or private parties as we, in our sole discretion, believe necessary or appropriate to respond to claims and legal processes (including but not limited to subpoenas), or, at the request of governmental authorities or other third parties conducting an investigation where we determine in our sole discretion the disclosure is necessary to (a) protect the property and rights of ${BRAND_NAME} or a third party, (b) protect the safety of the public or any person, or (c) prevent or stop activity we may consider to be, or pose a risk of being, illegal, fraudulent, unethical, or legally actionable activity.
  - **With your Consent:** You may submit Personal Information to us through a form on the Website and consent to receive communication from us or our business affiliates and non-affiliates based on the information in the form.
  
  ### **8\. THIRD-PARTY WEBSITES AND LINKS**
  
  Our Services may contain links and/or features to other websites and/or online platforms operated by third parties. We do not control such other online platforms and are not responsible for their content, their privacy policies, or their use of your information.
  
  ### **9\. YOUR RIGHTS AND CHOICES REGARDING YOUR INFORMATION**
  
  You have several ways to exercise control over your information:
  
  - **Account Settings:** You may contact us to access, update, or delete your personal information by accessing your Account settings in our App.
  - **Contact Us:** You may contact us to access, update, or delete your personal information by contacting us at ${SUPPORT_EMAIL}.
  - **E-Mail:** You also may opt out of receiving marketing emails from us by following the opt-out instructions provided in those emails. Please note that we reserve the right to send you certain communications relating to your account or use of the Service (for example, administrative and service announcements) via email and other means, and these transactional account messages may be unaffected if you opt out of receiving marketing communications.
  
  **European Residents**
  
  Under the General Data Protection Regulation (GDPR), ${BRAND_NAME} may be considered a data controller to the extent that we process personal information directly from European residents. To the extent that ${BRAND_NAME} is a data controller, European residents may access, correct, update, or delete their personal information; object to our processing of this information; ask us to restrict our processing of their personal information; or request portability of their personal information by accessing the account settings within the App or by contacting us at ${SUPPORT_EMAIL}.
  
  Upon request, ${BRAND_NAME} will provide you with information about whether we hold any of your personal information. You are responsible for maintaining the accuracy of the information you submit to us, such as your contact information. If you submit a request to access all personal information you’ve submitted, we will respond to your request within 30 days or as otherwise required by law.
  
  We will use commercially reasonable efforts to honor your requests for deletion; however, certain residual information may actively persist on the Service even if you close your account. In addition, the rights described above may be limited, for example, if fulfilling your request would reveal personal information about another person, or if you ask us to delete information we are required by law to keep or have compelling legitimate interests in keeping (such as for fraud prevention purposes). Your Personal Information may remain in our archives and information you update or delete, or information within a closed account, may persist internally for our administrative purposes, to the extent permitted by law. It is not always possible to completely remove or delete information from our databases. In addition, we typically will not remove information you posted publicly through or on the Service. Bear in mind that neither you nor ${BRAND_NAME} can delete all copies of information that have been previously shared with others on the Service. If your information is deleted, then your account may become deactivated. If your account is deactivated or you ask to close your account, you will no longer be able to use the Services.
  
  Please note that our Services require a minimum amount of Personal Information in order to function. European residents who do not provide Personal Information (e.g., by not creating an account) may not be able to access the full functionality of features found on ${BRAND_NAME}.
  
  **California Residents**
  
  If you are a California resident, the California Consumer Privacy Act (CCPA) may provide you with additional privacy rights with respect to our collection, use, and disclosure of your Personal Information. To the extent that ${BRAND_NAME} is a covered business under the CCPA, you may contact us for more information regarding the following rights:
  
  - The right to know what Personal information we have collected and how we have used and disclosed that Personal Information in the 12-month period preceding your request.
    - Please see the above section within this Policy titled **Information We Collect About You and How We Collect It** to see the categories of Personal Information we have collected about you.
    - Please see the above sections within this Policy titled **How We Use Your Information** and **How We Disclose and Share Your Information** to see applicable use and disclosures of your Personal Information.
  - The right to request the deletion of your Personal Information.
  - The right to be free from discrimination related to the exercise of any of your privacy rights.
  - The right to opt out of the sale of your personal information, and to request information about whether we have sold your personal information in the past 12 months.
    - ${BRAND_NAME} does not sell personal information, nor do we share personal information with third parties for marketing purposes, and we have not done so in the last year.
  
  For more information on how to exercise your rights, please contact us at ${SUPPORT_EMAIL}. Please note that we may require you to verify your credentials by matching your email address or other account information to the information in our systems before you can submit a request to exercise any of these rights. If you authorize another person to act as your agent to submit requests on your behalf, then unless you provide the agent with power of attorney under the California Probate Code, we will ask the agent to provide us the written and signed authorization that you provided to the agent, we will confirm with you that you did provide the authorization, and we will verify your identity.
  
  ### **10\. INTERNATIONAL JURISDICTIONS**
  
  Our servers are located in the United States, and your personal information passes through servers located in this geographic area. If you are accessing the Services from another country, please be advised that you may be transferring your personal information to such geographic areas and countries, and you consent to that transfer, processing, and storage of your personal information in accordance with this Privacy Policy. You also agree to abide by the applicable US federal, state, and local laws concerning your use of the Services and your agreements with us. Any persons accessing our Services from any jurisdiction with laws or regulations governing the use of the Internet, including the collection, use, or disclosure of personal information, different from those of the jurisdictions mentioned above, may only use the Services in a manner lawful in their jurisdiction. If your use of the Services is unlawful in your jurisdiction, you may not use our Services.
  
  ### **11\. SECURITY**
  
  We use physical, technical, and organizational measures designed to protect your information against unauthorized access, theft, and loss. We restrict access to your personal information to those employees who need to know that information to service your account or perform their job functions. Although we take precautions intended to help protect information that we process, no system or electronic data transmission is completely secure. Any transmission of your personal data is at your own risk, and we expect that you will use appropriate security measures to protect your personal information. You are responsible for maintaining the security of your account and the information in your account. We may suspend your use of all or part of the Services without notice if we suspect or detect any breach of security. You understand and agree that we may deliver electronic notifications about breaches of security to the email address on record in your account.
  
  ### **12\. DATA RETENTION, STORAGE, & USAGE FOR PROPRIETARY CODE**
  
  Unless you request that we delete certain information (see **Your Rights and Choices Regarding Your Information**), we will retain your personal information for the period necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
  
  - The length of time we have an ongoing relationship with you and provide services to you (for example, for as long as you have an account with us or keep using the Website).
  - Whether there is a legal obligation to which we are subject (for example, certain laws require us to keep records of your transactions for a certain period of time before we can delete them).
  - Whether retention is advisable, considering our legal position (such as for statutes of limitations, litigation, or regulatory investigations).
  
  **Data Storage for Review Improvement**
  
  ${BRAND_NAME} stores certain data to improve the service, refining them to align with your preferences. You can opt out of data storage. The stored data primarily consists of vector embeddings, which are critical for fetching specific code chunks and metadata to help with code explanation, actionable suggestion and review.
  
  The data storage is compliant with SOC2 Type II (in works for certification approval), GDPR, and HIPAA regulations. We ensure the utmost confidentiality and security of the data stored. You can opt out of data storage at any time.
  
  ### **13\. CHANGES TO THIS POLICY**
  
  ${BRAND_NAME} may update this Privacy Policy at any time, and any changes will be effective upon posting. In the event that there are material changes to the way we treat your Personal Information, we will update the Last Modified date at the top of this Policy upon becoming effective. We may also notify you by email, at our discretion.
  
  ### **14\. HOW TO CONTACT OPEN HR AI**
  
  A data protection officer has been appointed and can be reached at ${SUPPORT_EMAIL} for any questions.
  
  `;

  return (
    <section className="relative isolate px-6 lg:px-8 widget-animate animate">
      <div className="mx-auto max-w-6xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policies
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
