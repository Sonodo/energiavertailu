'use client'

import Script from 'next/script'

const GA_ID = 'G-JT1SCYMPW2'

export default function GoogleAnalytics() {

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          // Only grant analytics if user previously accepted
          try {
            var storedConsent = localStorage.getItem('analytics_consent');
            if (storedConsent === 'granted') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
          } catch(e) {}
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
