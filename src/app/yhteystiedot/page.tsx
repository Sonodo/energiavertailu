import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Yhteystiedot',
  description:
    'Ota yhteyttä Valitse Sähköön. Autamme mielellämme kaikissa sähkövertailuun ja palveluumme liittyvissä kysymyksissä.',
  openGraph: {
    title: `Yhteystiedot | ${SITE_NAME}`,
    description:
      'Ota yhteyttä Valitse Sähköön. Autamme mielellämme kaikissa sähkövertailuun liittyvissä kysymyksissä.',
    url: `${SITE_URL}/yhteystiedot`,
  },
  alternates: {
    canonical: `${SITE_URL}/yhteystiedot`,
  },
};

const contactChannels = [
  {
    icon: Mail,
    title: 'Yleinen yhteydenotto',
    description: 'Kysymykset palvelusta, yhteistyöehdotukset ja palaute.',
    contact: 'Yhteydenottolomake tulossa pian',
    href: '#',
  },
  {
    icon: MessageSquare,
    title: 'Media ja lehdistö',
    description: 'Haastattelupyynnöt, tiedotteet ja mediatiedustelut.',
    contact: 'Yhteydenottolomake tulossa pian',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Tietosuoja-asiat',
    description: 'GDPR-pyynnöt, tietojen poisto ja tietosuojaan liittyvät kysymykset.',
    contact: 'Yhteydenottolomake tulossa pian',
    href: '#',
  },
];

export default function YhteystiedotPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent">Yhteystiedot</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ota yhteyttä
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Autamme mielellämme kaikissa sähkövertailuun ja palveluumme liittyvissä
            kysymyksissä. Vastaamme yhteydenottoihin yleensä 1–2 arkipäivän kuluessa.
          </p>
        </div>
      </div>

      {/* Contact channels */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              className="group rounded-xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-accent/30 hover:bg-accent/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <channel.icon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{channel.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{channel.description}</p>
              <p className="mt-3 text-sm font-medium text-accent group-hover:underline">
                {channel.contact}
              </p>
            </a>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>Usein kysyttyä yhteydenotoista</h2>

          <h3>Sähkösopimukseen liittyvät kysymykset</h3>
          <p>
            Valitse Sähkö on vertailupalvelu — emme myy sähköä emmekä tee
            sähkösopimuksia. Jos sinulla on kysyttävää olemassa olevasta
            sähkösopimuksestasi, ota yhteyttä suoraan sähköyhtiöösi.
          </p>

          <h3>Virheellinen tieto palvelussa</h3>
          <p>
            Jos huomaat palvelussamme virheellisen hinnan tai muun tiedon, ilmoitathan
            siitä meille. Yhteydenottolomake on tulossa pian.
            Korjaamme virheet mahdollisimman nopeasti.
          </p>

          <h3>Yhteistyö ja medialle</h3>
          <p>
            Sähköyhtiöiden ja median edustajille tarjoamme lisätietoa{' '}
            <a href="/media" className="text-accent hover:underline">
              Media-sivullamme
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
