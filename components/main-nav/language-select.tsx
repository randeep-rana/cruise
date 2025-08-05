"use client"

import Script from "next/script"

function LanguageSelect() {
  return (
    <>
      <div id="google_translate_element" className="w-[150px] md:mr-6"></div>
      <Script
        id="google-translate-init"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "hi,en,bn,or,pa,gu,kn,ml,mr,ta,te",
                  autoDisplay: "true",
                  layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                }
                , 'google_translate_element');
              }
            `,
        }}
      />
      <Script
        id="google-translate-lib"
        type="text/javascript"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  )
}

export default LanguageSelect
