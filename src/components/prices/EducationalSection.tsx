import { Zap, BarChart3, Users } from 'lucide-react';

const sections = [
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    title: 'Mikä on pörssisähkö?',
    content: `Pörssisähkö on sähkösopimus, jossa sähkön hinta vaihtelee tunneittain
    Nord Pool -sähköpörssin spot-hinnan mukaan. Hinta määräytyy sähkömarkkinoilla
    kysynnän ja tarjonnan perusteella tunti tunnilta. Pörssisähkössä maksat sähköstä
    sen hetkisen markkinahinnan — ei kiinteää hintaa. Tähän lisätään sähköyhtiön
    marginaali (tyypillisesti 0,2–0,5 c/kWh) ja kuukausimaksu.`,
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-accent" />,
    title: 'Miten pörssisähkön hinta määräytyy?',
    content: `Sähkön hinta määräytyy pohjoismaisessa sähköpörssissä Nord Poolissa,
    jossa sähköntuottajat ja -ostajat käyvät kauppaa. Hinta vaihtelee vuorokauden
    ja vuodenajan mukaan. Tyypillisesti sähkö on halvimmillaan yöllä (klo 00–06)
    ja viikonloppuisin, kun kulutus on vähäistä. Kalleinta sähkö on arkiaamuisin
    (klo 07–09) ja iltaisin (klo 17–20). Tuulisuus, sademäärä (vesivoima),
    lämpötila ja tuontisähkön saatavuus vaikuttavat hintaan merkittävästi.`,
  },
  {
    icon: <Users className="h-6 w-6 text-accent" />,
    title: 'Kenelle pörssisähkö sopii?',
    content: `Pörssisähkö sopii erityisesti niille, jotka voivat ajoittaa sähkönkäyttöään
    halvimpiin tunteihin. Sähköauton lataajat, lämpöpumppujen käyttäjät ja
    kodinkoneiden ajoittajat hyötyvät eniten. Pörssisähkö on ollut pitkällä
    aikavälillä edullisin vaihtoehto Suomessa. Riskinsietokyky on kuitenkin
    tärkeää — yksittäisinä tunteina hinta voi nousta korkeaksikin. Jos haluat
    ennakoitavan sähkölaskun etkä halua seurata hintoja, kiinteähintainen
    sopimus voi sopia paremmin.`,
  },
];

export default function EducationalSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Tietoa pörssisähköstä</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{section.content}</p>
          </article>
        ))}
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: sections.map((s) => ({
              '@type': 'Question',
              name: s.title,
              acceptedAnswer: {
                '@type': 'Answer',
                text: s.content.replace(/\s+/g, ' ').trim(),
              },
            })),
          }),
        }}
      />
    </section>
  );
}
