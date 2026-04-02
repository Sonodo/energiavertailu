'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Miten sähkön vaihto toimii?',
    answer:
      'Sähköyhtiön vaihtaminen on helppoa ja ilmaista. Valitset uuden sähkösopimuksen, teet sopimuksen uuden yhtiön kanssa, ja he hoitavat vanhan sopimuksen irtisanomisen puolestasi. Sähköt eivät katkea missään vaiheessa. Vaihto kestää tyypillisesti 2–4 viikkoa.',
  },
  {
    question: 'Mikä on pörssisähkö?',
    answer:
      'Pörssisähkössä sähkön hinta vaihtelee tunneittain Nord Pool -sähköpörssin hintojen mukaan. Hinta voi olla hyvin edullinen yöaikaan ja kalliimpi päivisin, erityisesti kulutushuipun aikana. Pörssisähkö sopii erityisesti niille, jotka voivat ajoittaa kulutustaan edullisille tunneille.',
  },
  {
    question: 'Paljonko voin säästää vaihtamalla sähköyhtiötä?',
    answer:
      'Säästö riippuu nykyisestä sopimuksestasi ja kulutuksestasi. Tyypillisesti omakotitalossa voi säästää 200–500 euroa vuodessa ja kerrostaloasunnossa 50–150 euroa vuodessa vaihtamalla edullisempaan sopimukseen. Vertailutyökalullamme näet tarkan säästöarvion omalle kulutuksellesi.',
  },
  {
    question: 'Onko vertailu ilmaista?',
    answer:
      'Kyllä, palvelumme on täysin ilmainen kuluttajille. Emme peri mitään maksuja vertailun tekemisestä tai sopimuksen vaihtamisesta. Tuotamme tuloja, kun kuluttajat solmivat uuden sähkösopimuksen palvelumme kautta.',
  },
  {
    question: 'Kuinka nopeasti sähköyhtiön vaihto tapahtuu?',
    answer:
      'Uusi sähkösopimus astuu voimaan tyypillisesti 2–4 viikon kuluessa sopimuksen tekemisestä. Toimitusvelvollisuussopimuksesta voi vaihtaa heti, mutta määräaikaisesta sopimuksesta vaihtaminen onnistuu vasta sopimuskauden päätyttyä ilman lisäkustannuksia.',
  },
  {
    question: 'Mikä sopimustyyppi on paras minulle?',
    answer:
      'Se riippuu tilanteestasi. Kiinteähintainen sopimus tuo ennustettavuutta — tiedät tarkalleen mitä maksat. Pörssisähkö voi olla edullisempi, mutta hinta vaihtelee. Toistaiseksi voimassa oleva sopimus on joustava, mutta usein hieman kalliimpi. Suosittelemme vertailemaan vaihtoehtoja omalla kulutuksellasi.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Usein kysytyt kysymykset
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Vastauksia yleisimpiin kysymyksiin sähkön vertailusta ja vaihtamisesta.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-0">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-slate-900 sm:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200 ease-in-out',
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                )}
              >
                <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
