// Extended provider details — long descriptions, pros/cons, contact info, etc.
// This file supplements the base provider data in providers.ts

export interface ProviderDetails {
  id: string;
  longDescription: string;
  type: 'national' | 'regional' | 'challenger';
  revenue?: string;
  customerServicePhone: string;
  pros: string[];
  cons: string[];
  specialFeatures: string[];
  satisfactionRating: number;
  faq: { question: string; answer: string }[];
}

export const providerDetails: Record<string, ProviderDetails> = {
  fortum: {
    id: 'fortum',
    longDescription: `Fortum on yksi Pohjoismaiden johtavista energiayhtiöistä, ja se on ollut keskeinen toimija Suomen sähkömarkkinoilla jo vuosikymmenten ajan. Yhtiö syntyi vuonna 1998 Imatran Voiman ja Neste Oy:n energiatoimintojen yhdistyessä, ja se on kasvanut yhdeksi Euroopan merkittävimmistä puhtaan energian tuottajista. Fortumin pääkonttori sijaitsee Espoossa, ja yhtiö työllistää tuhansia ihmisiä ympäri maailmaa.

Fortum tarjoaa kotitalouksille monipuolisen valikoiman sähkösopimuksia: pörssisähköä edullisella marginaalilla, kiinteähintaisia sopimuksia 12 ja 24 kuukauden pituuksina sekä vihreitä vaihtoehtoja alkuperätakuilla. Fortumin mobiilisovellus on yksi markkinoiden kehittyneimmistä ja tarjoaa reaaliaikaisen kulutusseurannan, hintahälytykset ja henkilökohtaiset energiansäästövinkit.

Fortumin vahvuudet ovat sen laaja tuotevalikoima, vahva brändi ja digitaaliset palvelut. Yhtiö investoi voimakkaasti uusiutuvaan energiaan ja tavoittelee hiilineutraaliutta. Suurena toimijana Fortum pystyy tarjoamaan kilpailukykyisiä hintoja erityisesti pörssisähkössä, vaikka pienimmät haastajat saattavat ajoittain alittaa sen hinnat.`,
    type: 'national',
    revenue: 'n.5,5 mrd € (2025)',
    customerServicePhone: '0200 19000',
    pros: [
      'Monipuolinen sopimusvalikoima kaikille tarpeille',
      'Erinomainen mobiilisovellus hintahälytyksineen',
      'Vahva taloudellinen asema ja luotettavuus',
      'Laajat vihreän energian vaihtoehdot',
    ],
    cons: [
      'Perusmaksu hieman keskiarvoa korkeampi',
      'Asiakaspalvelun ruuhka-ajat voivat olla pitkiä',
      'Kiinteät hinnat eivät aina kilpailukykyisimpiä',
      'Suuri yhtiö — henkilökohtainen palvelu voi jäädä vähäiseksi',
    ],
    specialFeatures: [
      'Fortum-sovellus: reaaliaikainen kulutusseuranta ja hintahälytykset',
      'Älykkäät energiansäästösuositukset',
      'Mahdollisuus valita 100% tuuli-, aurinko- tai vesivoimaa',
      'Sähköautojen latausratkaisut',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Kuinka vaihdan Fortumin asiakkaaksi?',
        answer: 'Voit tehdä sähkösopimuksen Fortumin verkkosivuilla, sovelluksessa tai puhelimitse. Vaihto tapahtuu automaattisesti 2-4 viikossa ilman katkoksia.',
      },
      {
        question: 'Onko Fortumilla pörssisähkön hintakattoa?',
        answer: 'Fortum ei tarjoa automaattista hintakattoa, mutta Fortum Tarkka -sovelluksessa voit asettaa hintahälytyksiä ja seurata kulutustasi tuntikohtaisesti.',
      },
      {
        question: 'Miten Fortumin vihreä sähkö toimii?',
        answer: 'Fortum Tarkka Vihreä -sopimuksessa sähkö tuotetaan 100% uusiutuvilla energialähteillä. Tämä varmennetaan eurooppalaisilla alkuperätakuilla.',
      },
    ],
  },

  helen: {
    id: 'helen',
    longDescription: `Helen on Helsingin kaupungin kokonaan omistama energiayhtiö, jonka juuret ulottuvat vuoteen 1909. Yhtiö on yksi Suomen suurimmista sähkönmyyjistä ja tunnettu erityisesti vahvasta brändistään, luotettavuudestaan ja innovatiivisuudestaan. Helen palvelee yli 400 000 asiakasta pääkaupunkiseudulla ja ympäri Suomea.

Helen on kunnostautunut erityisesti kaukolämmössä ja uusiutuvan energian tuotannossa. Yhtiö investoi voimakkaasti hiilineutraaliuteen ja on sitoutunut luopumaan kivihiilen käytöstä kokonaan. Helenin sähkönmyynnissä painottuvat sekä pörssisähkö että kiinteähintaiset sopimukset, ja vihreät vaihtoehdot ovat laajasti saatavilla.

Helenin digitaaliset palvelut ovat korkealla tasolla. Helen-sovellus tarjoaa selkeän kulutusseurannan, ja yhtiön verkkopalvelut ovat helppokäyttöisiä. Asiakastyytyväisyys on perinteisesti ollut hyvällä tasolla, mikä johtuu osittain kaupungin omistuksen tuomasta palvelualttiudesta ja pitkäjänteisyydestä.`,
    type: 'national',
    revenue: 'n.1,2 mrd € (2025)',
    customerServicePhone: '09 617 8080',
    pros: [
      'Erittäin luotettava kaupungin omistama yhtiö',
      'Hyvä asiakastyytyväisyys ja palvelu',
      'Vahva panostus uusiutuvaan energiaan',
      'Selkeä ja helppokäyttöinen Helen-sovellus',
    ],
    cons: [
      'Pörssisähkön marginaali hieman korkeampi kuin halvimmilla',
      'Kiinteän sähkön hinnat keskitasoa',
      'Asiakaspalvelu keskittyy pääkaupunkiseudulle',
      'Rajallinen sopimusvalikoima verrattuna Fortumiin',
    ],
    specialFeatures: [
      'Helsingin kaupungin omistama — vakaa ja luotettava',
      'Helen-sovellus: kulutusseuranta ja energiansäästövinkit',
      'Aurinkopaneelien ylijäämäsähkön osto',
      'Kaukolämmön ja sähkön yhdistelmätarjoukset',
    ],
    satisfactionRating: 4.1,
    faq: [
      {
        question: 'Palveleeko Helen vain helsinkiläisiä?',
        answer: 'Ei. Helen myy sähköä koko Suomeen. Sähkönmyynti on vapautettu kilpailulle, joten voit valita Helenin sähköyhtiöksesi asuinpaikastasi riippumatta.',
      },
      {
        question: 'Mikä on Helen Markkinasähkö?',
        answer: 'Helen Markkinasähkö on pörssisähkösopimus, jossa hinta seuraa Nord Poolin tuntihintaa. Maksat pörssisähkön hinnan + pienen marginaalin + kuukausimaksun.',
      },
      {
        question: 'Voiko Helenille myydä ylijäämäsähköä?',
        answer: 'Kyllä. Jos sinulla on aurinkopaneeleja, Helen ostaa verkkoon syöttämäsi ylijäämäsähkön ja hyvittää sen laskussasi.',
      },
    ],
  },

  vattenfall: {
    id: 'vattenfall',
    longDescription: `Vattenfall on ruotsalaisomisteinen eurooppalainen energiajätti, joka on yksi Euroopan suurimmista sähköntuottajista ja -myyjistä. Suomessa Vattenfall on toiminut pitkään ja vakiinnuttanut asemansa luotettavana sähkönmyyjänä. Yhtiön tavoitteena on mahdollistaa fossiiliton elämä yhden sukupolven aikana.

Vattenfall tarjoaa suomalaisille kotitalouksille selkeän valikoiman sähkösopimuksia. Pörssisähkö on saatavilla kilpailukykyisellä marginaalilla, ja kiinteähintaisia sopimuksia on tarjolla 12 ja 24 kuukauden pituuksina. Vattenfall panostaa erityisesti online-palveluihin ja digitaaliseen asiointiin.

Vattenfallilla on vahva tuotantopohja Pohjoismaissa, mikä tekee siitä luotettavan toimittajan myös suurkuluttajille. Yhtiön kansainvälinen kokemus näkyy palveluiden laadussa ja tuotekehityksessä. Vattenfall investoi merkittävästi tuuli- ja aurinkovoimaan sekä sähkön varastointiin osana siirtymää kohti uusiutuvaa energiaa.`,
    type: 'national',
    revenue: 'n.200 mrd SEK (konserni, 2025)',
    customerServicePhone: '020 770 5800',
    pros: [
      'Euroopan suurimpia energiayhtiöitä — vakaa toimija',
      'Kilpailukykyinen pörssisähkön marginaali',
      'Hyvät digitaaliset palvelut',
      'Vahva sitoutuminen fossiilittomaan energiaan',
    ],
    cons: [
      'Ulkomaalaisomistus — ei aina suomalaisten ensisijainen valinta',
      'Rajallisempi sopimusvalikoima kuin suurimmilla kilpailijoilla',
      'Ei paikallista läsnäoloa kaikissa kaupungeissa',
      'Asiakaspalvelu pääosin verkossa ja puhelimitse',
    ],
    specialFeatures: [
      'Fossiiliton elämä -visio ohjaa kaikkea toimintaa',
      'Vattenfallilla omaa tuuli- ja vesivoimatuotantoa Pohjoismaissa',
      'Sähköautojen latausverkosto InCharge',
      'Energiatehokkuusneuvonta kotitalouksille',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Onko Vattenfall luotettava sähköyhtiö?',
        answer: 'Kyllä. Vattenfall on Ruotsin valtion omistama, yli 100 vuotta vanha energiayhtiö. Se on yksi Euroopan suurimmista ja vakaimmista energiayhtiöistä.',
      },
      {
        question: 'Millaisia sopimustyyppejä Vattenfall tarjoaa?',
        answer: 'Vattenfall tarjoaa pörssisähköä, kiinteähintaisia sopimuksia (12 kk ja 24 kk) sekä vihreitä vaihtoehtoja. Kaikki sopimukset voi tehdä verkossa.',
      },
      {
        question: 'Miten vaihto Vattenfallille tapahtuu?',
        answer: 'Tee uusi sopimus Vattenfallin verkkopalvelussa. Vattenfall hoitaa vanhan sopimuksen irtisanomisen puolestasi, ja sähkö vaihtuu ilman katkoksia.',
      },
    ],
  },

  oomi: {
    id: 'oomi',
    longDescription: `Oomi on Suomen suurin sähkönmyyjä asiakasmäärällä mitattuna. Yhtiö syntyi vuonna 2018 usean alueellisen sähköyhtiön yhdistyessä, ja sillä on yli 600 000 asiakasta ympäri Suomea. Oomin pääkonttori sijaitsee Oulussa, ja yhtiö yhdistää valtakunnallisen toiminnan paikalliseen tuntemukseen.

Oomin vahvuus on sen laaja asiakaspohja ja kilpailukykyinen hinnoittelu. Yhtiö tarjoaa pörssisähköä edullisella kuukausimaksulla ja marginaalilla sekä kiinteähintaisia sopimuksia. Vihreän sähkön vaihtoehdot ovat myös saatavilla alkuperätakuilla varmennettuina.

Oomin digitaaliset palvelut ovat kehittyneet nopeasti, ja yhtiö tarjoaa modernin online-palvelun sähkösopimuksen hallintaan. Oomi tunnetaan myös reilusta hinnoittelusta ja selkeistä sopimusehdoista, mikä on kerännyt yhtiölle hyvät asiakasarviot. Suurena toimijana Oomi pystyy neuvottelemaan edullisia tukkuhintoja, ja nämä säästöt siirtyvät myös asiakkaille.`,
    type: 'national',
    revenue: 'n.800 milj. € (2025)',
    customerServicePhone: '08 5584 3300',
    pros: [
      'Suomen suurin sähkönmyyjä — vahva markkinaasema',
      'Edulliset kuukausimaksut ja marginaalit',
      'Selkeät ja reilut sopimusehdot',
      'Hyvä hinta-laatusuhde',
    ],
    cons: [
      'Brändi vähemmän tunnettu kuin Fortum tai Helen',
      'Digitaaliset palvelut vielä kehittymisvaiheessa',
      'Ei laajinta sopimusvalikoimaa',
      'Asiakaspalvelu voi ruuhkautua suurten asiakasmäärien vuoksi',
    ],
    specialFeatures: [
      'Suomen suurin sähkönmyyjä asiakasmäärällä',
      'Syntyi usean alueellisen yhtiön yhdistymisestä',
      'Edulliset pörssisähkön marginaalit',
      'Paikallisen ja valtakunnallisen palvelun yhdistelmä',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Mikä on Oomi?',
        answer: 'Oomi on Suomen suurin sähkönmyyjä asiakasmäärällä mitattuna. Se syntyi vuonna 2018 usean alueellisen sähköyhtiön yhdistyessä ja palvelee yli 600 000 asiakasta.',
      },
      {
        question: 'Onko Oomin pörssisähkö edullista?',
        answer: 'Kyllä. Oomin pörssisähkön marginaali (0,38 c/kWh) ja kuukausimaksu (3,49 €/kk) ovat markkinoiden edullisimpien joukossa.',
      },
      {
        question: 'Voiko Oomille vaihtaa mistä päin Suomea tahansa?',
        answer: 'Kyllä. Oomi myy sähköä koko Suomeen. Sähkönmyyjän vaihto ei vaikuta sähkön siirtoon tai jakeluun.',
      },
    ],
  },

  vare: {
    id: 'vare',
    longDescription: `Väre on vuonna 2017 perustettu suomalainen sähköyhtiö, joka on noussut nopeasti yhdeksi markkinoiden merkittävimmistä haastajista. Yhtiön missio on tarjota reilua ja selkeää sähköä ilman piilokustannuksia. Väreen pääkonttori sijaitsee Helsingissä, ja yhtiö on kerännyt jo yli 150 000 asiakasta.

Väreen kilpailuvaltti on poikkeuksellisen hyvä asiakaskokemus. Yhtiön sovellus on saanut erinomaisia arvioita, ja hinnoittelu on läpinäkyvää ja reilua. Pörssisähkön marginaali on markkinoiden edullisimpia, ja kiinteähintaisten sopimusten perusmaksut ovat pieniä. Väre on myös saanut useita palkintoja asiakastyytyväisyydestä.

Väre erottautuu kilpailijoistaan erityisesti käyttökokemuksella ja modernilla lähestymistavalla. Yhtiö ei tee pitkiä puhelinjonoja tai monimutkaisia sopimusehtoja, vaan kaikki hoidetaan digitaalisesti ja selkeästi. Vihreän sähkön vaihtoehdot ovat myös saatavilla kilpailukykyiseen hintaan.`,
    type: 'challenger',
    revenue: 'n.120 milj. € (2025)',
    customerServicePhone: '09 4245 0450',
    pros: [
      'Markkinoiden paras asiakaskokemus ja sovellus',
      'Erittäin kilpailukykyinen pörssisähkön marginaali',
      'Selkeä ja läpinäkyvä hinnoittelu',
      'Palkittu asiakastyytyväisyydestä',
    ],
    cons: [
      'Pienempi yhtiö — vähemmän resursseja kuin suurilla',
      'Ei laajinta sopimusvalikoimaa',
      'Vähemmän lisäpalveluita kuin suurilla yhtiöillä',
      'Ei omaa sähköntuotantoa',
    ],
    specialFeatures: [
      'Palkittu asiakaskokemus ja käyttöliittymä',
      'Läpinäkyvä hinnoittelu ilman piilokustannuksia',
      'Nopea ja helppo sopimusten teko verkossa',
      'Aktiivinen asiakasyhteisö ja palautteen kuuntelu',
    ],
    satisfactionRating: 4.3,
    faq: [
      {
        question: 'Miksi Väre on saanut niin hyviä arvioita?',
        answer: 'Väre panostaa asiakaskokemukseen: selkeä hinnoittelu, erinomainen sovellus ja nopea asiakaspalvelu. Yhtiö on voittanut useita asiakastyytyväisyyspalkintoja.',
      },
      {
        question: 'Onko Väre luotettava sähköyhtiö?',
        answer: 'Kyllä. Väre on vakavarainen suomalainen sähköyhtiö, joka on toiminut vuodesta 2017 ja palvelee yli 150 000 asiakasta.',
      },
      {
        question: 'Kuinka edullinen Väreen pörssisähkö on?',
        answer: 'Väreen pörssisähkön marginaali (0,34 c/kWh) ja kuukausimaksu (3,49 €/kk) ovat markkinoiden edullisimpien joukossa.',
      },
    ],
  },

  hehku: {
    id: 'hehku',
    longDescription: `Hehku Energia on vuonna 2019 perustettu moderni sähköyhtiö, jonka pääkonttori sijaitsee Tampereella. Yhtiö erottautuu kilpailijoistaan panostamalla erityisesti digitaalisiin palveluihin ja käyttäjäkokemukseen. Hehkun filosofia on tehdä sähköasioinnista helppoa, selkeää ja modernia.

Hehkun mobiilisovellus tarjoaa kehittyneen kulutusanalyysin, jossa näet tarkat tiedot sähkönkäytöstäsi laitekohtaisesti. Sovellus antaa myös henkilökohtaisia säästövinkkejä ja ilmoittaa poikkeamista kulutuksessasi. Pörssisähköasiakkaat voivat seurata tuntihintoja ja optimoida kulutustaan reaaliaikaisesti.

Hehku tarjoaa sekä pörssisähköä että kiinteähintaisia sopimuksia. Hinnoittelu on kilpailukykyistä, ja erityisesti kuukausimaksut ovat edullisia. Yhtiö kasvaa nopeasti ja on saanut hyvää palautetta erityisesti nuoremmilta kuluttajilta, jotka arvostavat moderneja digitaalisia palveluita.`,
    type: 'challenger',
    customerServicePhone: '03 2310 500',
    pros: [
      'Erinomainen mobiilisovellus ja kulutusanalyysi',
      'Edulliset kuukausimaksut',
      'Moderni ja helppokäyttöinen palvelu',
      'Nopea ja helppo sopimusten hallinta',
    ],
    cons: [
      'Nuori yhtiö — lyhyempi historia',
      'Ei vihreän sähkön vaihtoehtoja vielä',
      'Rajallinen sopimusvalikoima',
      'Pienempi asiakaspalvelutiimi',
    ],
    specialFeatures: [
      'Kehittynyt kulutusanalyysi mobiilisovelluksessa',
      'Laitekohtainen kulutusseuranta',
      'Henkilökohtaiset energiansäästövinkit',
      'Modernit digitaaliset palvelut',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Mikä tekee Hehkun sovelluksesta erityisen?',
        answer: 'Hehkun sovellus tarjoaa laitekohtaisen kulutusseurannan, henkilökohtaiset säästövinkit ja reaaliaikaisen hintaseurannan. Se on markkinoiden kehittyneimpiä kuluttajasovelluksia.',
      },
      {
        question: 'Onko Hehku vain digitaalinen palvelu?',
        answer: 'Hehkun pääpaino on digitaalisissa palveluissa, mutta asiakaspalvelu on saatavilla myös puhelimitse ja sähköpostitse arkisin.',
      },
      {
        question: 'Tarjoaako Hehku vihreää sähköä?',
        answer: 'Tällä hetkellä Hehku ei tarjoa erillisiä vihreitä sopimuksia, mutta yhtiö on ilmoittanut kehittävänsä vihreitä vaihtoehtoja lähitulevaisuudessa.',
      },
    ],
  },

  'lumme-energia': {
    id: 'lumme-energia',
    longDescription: `Lumme Energia on Itä-Suomen suurin energiayhtiö ja osa Oomi-konsernia. Yhtiö on perustettu 2017, mutta sen juuret ulottuvat vuosikymmenien taakse useiden itäsuomalaisten energiayhtiöiden kautta. Lumme Energian pääkonttori sijaitsee Kuopiossa, ja yhtiö palvelee yli 100 000 asiakasta.

Lumme Energia yhdistää valtakunnallisen Oomi-konsernin resurssit paikalliseen palveluun Itä-Suomessa. Yhtiö tunnetaan luotettavuudestaan ja henkilökohtaisesta asiakaspalvelusta. Sähkösopimukset ovat hinnoiteltu kilpailukykyisesti, ja erityisesti perusmaksut ovat edullisia.

Paikallisena toimijana Lumme Energia tuntee alueensa asiakkaiden tarpeet ja olosuhteet hyvin. Yhtiö tarjoaa myös energianeuvontaa ja -palveluita, jotka auttavat asiakkaita säästämään sähköä. Oomi-konsernin tuki takaa toiminnan jatkuvuuden ja kehityksen.`,
    type: 'regional',
    revenue: 'n.150 milj. € (2025)',
    customerServicePhone: '020 690 090',
    pros: [
      'Erinomainen paikallinen palvelu Itä-Suomessa',
      'Edulliset perusmaksut',
      'Oomi-konsernin tuki ja resurssit',
      'Henkilökohtainen asiakaspalvelu',
    ],
    cons: [
      'Toimii pääasiassa Itä-Suomessa',
      'Rajallisempi sopimusvalikoima',
      'Digitaaliset palvelut eivät kehittyneimpiä',
      'Ei laajinta vihreän sähkön valikoimaa',
    ],
    specialFeatures: [
      'Itä-Suomen suurin energiayhtiö',
      'Osa Oomi-konsernia — vahva taloudellinen pohja',
      'Paikallinen energianeuvonta',
      'Henkilökohtainen yhteyshenkilö suurille asiakkaille',
    ],
    satisfactionRating: 4.2,
    faq: [
      {
        question: 'Onko Lumme Energia sama kuin Oomi?',
        answer: 'Lumme Energia on osa Oomi-konsernia, mutta toimii omana brändinään Itä-Suomessa. Lumme tarjoaa paikallista palvelua Oomi-konsernin resursseilla.',
      },
      {
        question: 'Voiko Lumme Energian valita muualta Suomesta?',
        answer: 'Kyllä, sähkönmyynti on vapaata koko Suomessa. Lumme Energia palvelee kuitenkin erityisesti Itä-Suomen asiakkaita.',
      },
      {
        question: 'Mikä on Lumme Energian etu verrattuna Oomiin?',
        answer: 'Lumme Energia tarjoaa paikallista palvelua ja tuntemusta Itä-Suomessa. Jos arvostat paikallista yhteyshenkilöä ja palvelua, Lumme on hyvä valinta.',
      },
    ],
  },

  'vaasan-sahko': {
    id: 'vaasan-sahko',
    longDescription: `Vaasan Sähkö on Pohjanmaan alueen perinteinen energiayhtiö, jonka juuret ulottuvat vuoteen 1892. Yli 130 vuoden historiallaan Vaasan Sähkö on yksi Suomen vanhimmista energiayhtiöistä. Yhtiö palvelee noin 80 000 asiakasta Pohjanmaan alueella ja valtakunnallisesti.

Vaasan Sähkö tunnetaan erityisesti luotettavuudestaan ja pitkistä asiakassuhteistaan. Yhtiö on kaupungin osaomistama, mikä tuo vakautta ja pitkäjänteisyyttä toimintaan. Sähkönmyynti kattaa pörssisähkön ja kiinteähintaiset sopimukset, ja vihreät vaihtoehdot ovat myös saatavilla.

Vaasan Sähkö panostaa alueensa energiatehokkuuteen ja uusiutuvaan energiaan. Yhtiöllä on omaa tuulivoimatuotantoa ja se investoi aktiivisesti uusiin energiaratkaisuihin. Asiakaspalvelu on perinteisesti hyvällä tasolla ja henkilökohtaista palvelua arvostetaan.`,
    type: 'regional',
    revenue: 'n.200 milj. € (2025)',
    customerServicePhone: '06 324 7111',
    pros: [
      'Yli 130 vuoden kokemus — erittäin luotettava',
      'Hyvä paikallinen palvelu Pohjanmaalla',
      'Kaupungin osaomistama — vakaa toimija',
      'Omaa tuulivoimatuotantoa',
    ],
    cons: [
      'Hinnat hieman keskiarvoa korkeammat',
      'Digitaaliset palvelut eivät modernimpia',
      'Pääpaino Pohjanmaan alueella',
      'Rajallinen sopimusvalikoima',
    ],
    specialFeatures: [
      'Yksi Suomen vanhimmista energiayhtiöistä (1892)',
      'Omaa tuulivoimatuotantoa Pohjanmaalla',
      'Kaupungin osaomistama — pitkäjänteinen toimija',
      'Alueellinen energianeuvonta',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Onko Vaasan Sähkö vain Vaasan alueen yhtiö?',
        answer: 'Vaasan Sähkö palvelee sähkönmyynnissä koko Suomea, mutta yhtiön juuret ja pääpaino ovat Pohjanmaalla.',
      },
      {
        question: 'Onko Vaasan Sähköllä omaa energiantuotantoa?',
        answer: 'Kyllä. Vaasan Sähkö omistaa tuulivoimaloita ja on osaomistajana useissa voimalaitoksissa.',
      },
      {
        question: 'Miten Vaasan Sähkön hinnat vertautuvat kilpailijoihin?',
        answer: 'Vaasan Sähkön hinnat ovat kohtuullisia, mutta eivät markkinoiden halvimpia. Yhtiön vahvuudet ovat luotettavuudessa ja paikallisessa palvelussa.',
      },
    ],
  },

  'turku-energia': {
    id: 'turku-energia',
    longDescription: `Turku Energia on Turun kaupungin omistama energiayhtiö, jonka historia ulottuu vuoteen 1908. Yhtiö on Varsinais-Suomen suurin energiatoimija ja palvelee yli 120 000 asiakasta sähkönmyynnissä, kaukolämmössä ja muissa energiapalveluissa.

Turku Energia tunnetaan vahvasta paikallisesta läsnäolostaan ja monipuolisista energiapalveluistaan. Yhtiö tarjoaa sähkönmyynnin lisäksi kaukolämpöä, kaukojäähdytystä ja energiatehokkuuspalveluita. Sähkösopimusten valikoima kattaa pörssisähkön, kiinteähintaiset sopimukset ja vihreät vaihtoehdot.

Turku Energia on sitoutunut hiilineutraaliuteen ja investoi voimakkaasti uusiutuvaan energiaan. Yhtiö on yksi Suomen edistyksellisimmistä kunnallisista energiayhtiöistä, ja se on saanut tunnustusta ilmasto- ja ympäristötyöstään. Asiakaspalvelu on hyvällä tasolla ja palvelupisteet löytyvät Turun keskustasta.`,
    type: 'regional',
    revenue: 'n.350 milj. € (2025)',
    customerServicePhone: '02 2638 200',
    pros: [
      'Vahva paikallinen läsnäolo Varsinais-Suomessa',
      'Monipuoliset energiapalvelut (sähkö + kaukolämpö)',
      'Sitoutunut hiilineutraaliuteen',
      'Hyvä asiakaspalvelu palvelupisteineen',
    ],
    cons: [
      'Hinnat eivät markkinoiden halvimpia',
      'Pääpaino Varsinais-Suomen alueella',
      'Digitaaliset palvelut kehittyvät hitaammin',
      'Pörssisähkön marginaali keskitasoa',
    ],
    specialFeatures: [
      'Turun kaupungin omistama — pitkäjänteinen ja luotettava',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
      'Palvelupiste Turun keskustassa',
      'Aktiivinen ilmastotyö ja uusiutuvan energian kehitys',
    ],
    satisfactionRating: 4.1,
    faq: [
      {
        question: 'Voiko Turku Energian valita muualta Suomesta?',
        answer: 'Kyllä, sähkönmyynti on vapaata koko Suomessa. Turku Energian erityispalvelut kuten kaukolämpö ovat kuitenkin alueellisia.',
      },
      {
        question: 'Tarjoaako Turku Energia vihreää sähköä?',
        answer: 'Kyllä. Turku Energia Vihreä -sopimuksessa sähkö on 100% uusiutuvaa ja varmennettu alkuperätakuilla.',
      },
      {
        question: 'Miten Turku Energia edistää hiilineutraaliutta?',
        answer: 'Turku Energia investoi tuulivoimaan, aurinkoenergiaan ja bioenergiaan. Yhtiön tavoitteena on olla hiilineutraali vuoteen 2029 mennessä.',
      },
    ],
  },

  'tampereen-sahko': {
    id: 'tampereen-sahko',
    longDescription: `Tampereen Sähkö on Tampereen kaupungin omistama energiayhtiö, jonka historia ulottuu vuoteen 1888. Yli 135 vuoden kokemuksellaan yhtiö on yksi Suomen vanhimmista ja arvostetuimmista energiatoimijoista. Tampereen Sähkö palvelee yli 130 000 asiakasta Pirkanmaan alueella ja valtakunnallisesti.

Tampereen Sähkö tarjoaa kattavan valikoiman sähkösopimuksia kotitalouksille ja yrityksille. Pörssisähkö, kiinteähintaiset sopimukset (12 kk ja 24 kk) sekä vihreät vaihtoehdot kattavat kaikkien asiakkaiden tarpeet. Yhtiö panostaa myös energiatehokkuusneuvontaan ja älykkäisiin energiaratkaisuihin.

Pirkanmaan alueella Tampereen Sähkö on ylivoimaisesti tunnetuin energiayhtiö. Yhtiön palvelupisteet, paikallistuntemus ja henkilökohtainen asiakaspalvelu erottavat sen valtakunnallisista kilpailijoista. Tampereen Sähkö investoi voimakkaasti tulevaisuuden energiaratkaisuihin ja puhtaaseen energiantuotantoon.`,
    type: 'regional',
    revenue: 'n.400 milj. € (2025)',
    customerServicePhone: '03 2316 5005',
    pros: [
      'Yli 135 vuoden kokemus — äärimmäinen luotettavuus',
      'Vahva paikallinen palvelu Pirkanmaalla',
      'Kattava sopimusvalikoima',
      'Aktiivinen investointi puhtaaseen energiaan',
    ],
    cons: [
      'Hinnat hieman alueellisten keskiarvon yläpuolella',
      'Digitaaliset palvelut perinteisemmät',
      'Pääpaino Pirkanmaan alueella',
      'Suurempi kuukausimaksu kuin haastajilla',
    ],
    specialFeatures: [
      'Yksi Suomen vanhimmista energiayhtiöistä (1888)',
      'Tampereen kaupungin omistama — vakaa ja pitkäjänteinen',
      'Palvelupisteet Tampereen keskustassa',
      'Laaja energianeuvonta kotitalouksille',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Onko Tampereen Sähkö vain Pirkanmaan yhtiö?',
        answer: 'Tampereen Sähkö myy sähköä koko Suomeen. Paikallispalvelut keskittyvät Pirkanmaalle, mutta sähkösopimuksen voi tehdä mistä päin Suomea tahansa.',
      },
      {
        question: 'Millaisia vihreitä vaihtoehtoja Tampereen Sähkö tarjoaa?',
        answer: 'Tampereen Sähkö tarjoaa uusiutuvalla energialla tuotettuja sopimuksia alkuperätakuilla varmennettuina.',
      },
      {
        question: 'Miten Tampereen Sähkön hinnat vertautuvat kilpailijoihin?',
        answer: 'Hinnat ovat kohtuullisia mutta eivät halvimpia. Yhtiön lisäarvo tulee luotettavuudesta, paikallisesta palvelusta ja pitkästä historiasta.',
      },
    ],
  },

  'kuopion-energia': {
    id: 'kuopion-energia',
    longDescription: `Kuopion Energia on Kuopion kaupungin omistama energiayhtiö, joka on palvellut Pohjois-Savon aluetta vuodesta 1902. Yli 120 vuoden historiallaan yhtiö on vakiinnuttanut asemansa luotettavana ja paikallisesti arvostettuna energiatoimijana. Kuopion Energia palvelee noin 45 000 sähköasiakasta.

Kuopion Energia tarjoaa sähkönmyynnin lisäksi kaukolämpöä ja energiapalveluita. Sähkösopimusvalikoima kattaa pörssisähkön ja kiinteähintaiset sopimukset. Hinnoittelu on alueellisesti kilpailukykyistä, ja paikallinen asiakaspalvelu on henkilökohtaista ja helposti saatavilla.

Kuopion Energian vahvuus on sen syvä paikallistuntemus ja henkilökohtainen palvelu. Yhtiö tuntee alueensa olosuhteet, sähkönkulutuksen kausivaihtelut ja asiakkaiden tarpeet. Kaupungin omistus takaa toiminnan pitkäjänteisyyden ja vakauden.`,
    type: 'regional',
    revenue: 'n.100 milj. € (2025)',
    customerServicePhone: '017 226 100',
    pros: [
      'Henkilökohtainen paikallinen palvelu',
      'Yli 120 vuoden kokemus energiasektorilta',
      'Kaupungin omistama — vakaa toimija',
      'Kohtuulliset ja ennustettavat hinnat',
    ],
    cons: [
      'Rajallinen sopimusvalikoima',
      'Ei laajoja vihreitä vaihtoehtoja',
      'Digitaaliset palvelut perusluokassa',
      'Hinnat eivät markkinoiden edullisimpia',
    ],
    specialFeatures: [
      'Yli 120 vuoden paikallinen kokemus',
      'Kuopion kaupungin omistama',
      'Henkilökohtainen energianeuvonta',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Palveleeko Kuopion Energia vain Kuopion aluetta?',
        answer: 'Sähkönmyynti on valtakunnallista, mutta Kuopion Energian erityispalvelut ja palvelupisteet sijaitsevat Kuopiossa.',
      },
      {
        question: 'Onko Kuopion Energialla vihreitä sähkövaihtoehtoja?',
        answer: 'Tällä hetkellä Kuopion Energian vihreiden vaihtoehtojen tarjonta on rajallinen, mutta yhtiö kehittää uusiutuvan energian palveluita.',
      },
      {
        question: 'Miten Kuopion Energian hinnat muodostuvat?',
        answer: 'Hinnat koostuvat energiamaksusta (c/kWh) ja kuukausittaisesta perusmaksusta. Pörssisähkössä hinta seuraa Nord Pool -hintaa marginaalilla.',
      },
    ],
  },

  'jyvaskylan-energia': {
    id: 'jyvaskylan-energia',
    longDescription: `Jyväskylän Energia on Jyväskylän kaupungin omistama energiayhtiö, joka on palvellut Keski-Suomen aluetta vuodesta 1902. Yhtiö on alueen suurin energiatoimija ja palvelee noin 70 000 sähköasiakasta. Jyväskylän Energia tunnetaan luotettavuudestaan ja monipuolisista energiapalveluistaan.

Jyväskylän Energia tarjoaa kattavan valikoiman sähkösopimuksia: pörssisähköä, kiinteähintaisia sopimuksia ja vihreitä vaihtoehtoja. Erityisesti vihreän sähkön valikoima on hyvä, ja yhtiö on panostanut uusiutuvan energian tuotantoon alueellaan. Hinnoittelu on kohtuullista ja läpinäkyvää.

Paikallisena toimijana Jyväskylän Energia tarjoaa henkilökohtaista palvelua ja energianeuvontaa. Yhtiön sähköiset palvelut ovat kehittyneet viime vuosina, ja asiakkaiden on helppo hallita sopimuksiaan verkossa. Jyväskylän Energia on myös aktiivinen toimija alueensa energiamurroksessa ja investoi puhtaaseen energiantuotantoon.`,
    type: 'regional',
    revenue: 'n.250 milj. € (2025)',
    customerServicePhone: '014 266 1550',
    pros: [
      'Hyvä paikallinen palvelu Keski-Suomessa',
      'Monipuolinen sopimusvalikoima vihreillä vaihtoehdoilla',
      'Kaupungin omistama — luotettava',
      'Aktiivinen uusiutuvan energian kehittäjä',
    ],
    cons: [
      'Hinnat keskitasoa tai hieman yli',
      'Digitaaliset palvelut kehittymässä',
      'Pääpaino Keski-Suomen alueella',
      'Pörssisähkön marginaali ei halvimpia',
    ],
    specialFeatures: [
      'Keski-Suomen suurin energiatoimija',
      'Jyväskylän kaupungin omistama',
      'Vihreän sähkön valikoima mukaan lukien paikallista tuotantoa',
      'Alueellinen energianeuvonta ja -tehokkuuspalvelut',
    ],
    satisfactionRating: 4.1,
    faq: [
      {
        question: 'Tarjoaako Jyväskylän Energia vihreitä sopimuksia?',
        answer: 'Kyllä. JE Vihreä -sopimuksessa sähkö on 100% uusiutuvista lähteistä ja varmennettu alkuperätakuilla.',
      },
      {
        question: 'Voiko Jyväskylän Energiaan vaihtaa muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa, joten voit valita Jyväskylän Energian riippumatta asuinpaikastasi.',
      },
      {
        question: 'Miten Jyväskylän Energia tukee uusiutuvaa energiaa?',
        answer: 'Yhtiö investoi tuulivoimaan, aurinkoenergiaan ja bioenergiaan. Se osallistuu myös paikallisiin energiatehokkuushankkeisiin.',
      },
    ],
  },

  'oulun-energia': {
    id: 'oulun-energia',
    longDescription: `Oulun Energia on Oulun kaupungin omistama energiayhtiö ja Pohjois-Suomen suurin energiatoimija. Yhtiön historia ulottuu vuoteen 1889, ja se on palvellut aluettaan yli 135 vuoden ajan. Oulun Energia palvelee noin 90 000 sähköasiakasta ja on merkittävä työllistäjä alueellaan.

Oulun Energia tarjoaa monipuolisia sähkösopimuksia: pörssisähköä, kiinteähintaisia sopimuksia 12 ja 24 kuukauden pituuksina sekä vihreitä vaihtoehtoja. Yhtiö tunnetaan erityisesti laadukkaasta asiakaspalvelustaan ja paikallisesta läsnäolostaan. Oulun Energian palvelupisteet ovat helposti saavutettavissa.

Pohjois-Suomen suurimpana energiatoimijana Oulun Energialla on laaja kokemus alueen erityisolosuhteista, kuten kylmistä talvista ja sähkönkulutuksen kausivaihteluista. Yhtiö investoi aktiivisesti uusiutuvaan energiaan ja älykkäisiin energiaratkaisuihin tulevaisuutta varten.`,
    type: 'regional',
    revenue: 'n.300 milj. € (2025)',
    customerServicePhone: '08 558 44 000',
    pros: [
      'Pohjois-Suomen suurin energiatoimija',
      'Yli 135 vuoden kokemus ja luotettavuus',
      'Hyvä sopimusvalikoima kaikille tarpeille',
      'Laadukas paikallinen asiakaspalvelu',
    ],
    cons: [
      'Hinnat eivät edullisimpia markkinoilla',
      'Pääpaino Pohjois-Suomessa',
      'Digitaaliset palvelut kehittyvässä vaiheessa',
      'Suuremmat kuukausimaksut kuin haastajilla',
    ],
    specialFeatures: [
      'Pohjois-Suomen suurin energiayhtiö',
      'Oulun kaupungin omistama — erittäin vakaa',
      'Palvelupisteet Oulun keskustassa',
      'Laaja energianeuvonta pohjoisiin olosuhteisiin',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Onko Oulun Energia vain Oulun alueella?',
        answer: 'Oulun Energia myy sähköä koko Suomeen. Paikallispalvelut ja energianeuvonta keskittyvät Pohjois-Suomeen.',
      },
      {
        question: 'Miten Oulun Energia huomioi pohjoisen erityisolosuhteet?',
        answer: 'Yhtiöllä on yli 135 vuoden kokemus pohjoisen olosuhteista. Energianeuvonnassa huomioidaan kylmien talvien tuomat haasteet ja energiansäästömahdollisuudet.',
      },
      {
        question: 'Tarjoaako Oulun Energia vihreitä vaihtoehtoja?',
        answer: 'Kyllä. Oulun Energia tarjoaa uusiutuvalla energialla tuotettuja sopimuksia ja investoi aktiivisesti tuulivoimaan.',
      },
    ],
  },

  'lahti-energia': {
    id: 'lahti-energia',
    longDescription: `Lahti Energia on Lahden kaupungin omistama energiayhtiö ja Päijät-Hämeen merkittävin energiatoimija. Yhtiö on perustettu 1907 ja palvelee noin 55 000 sähköasiakasta. Lahti Energia tunnetaan erityisesti innovatiivisuudestaan ja sitoutumisestaan ympäristövastuuseen.

Lahti Energia tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kilpailukykyiseen hintaan. Yhtiö on investoinut merkittävästi kiertotalouteen ja jätteenpolttoon perustuvaan energiantuotantoon, mikä tekee siitä kiinnostavan vaihtoehdon ympäristötietoisille kuluttajille.

Lahden kaupunki on valittu Euroopan ympäristöpääkaupungiksi, ja Lahti Energia on ollut keskeisessä roolissa tämän saavutuksen taustalla. Yhtiö jatkaa investointeja puhtaaseen energiantuotantoon ja tarjoaa asiakkailleen energianeuvontaa sekä -tehokkuuspalveluita.`,
    type: 'regional',
    revenue: 'n.180 milj. € (2025)',
    customerServicePhone: '03 823 3600',
    pros: [
      'Innovatiivinen ja ympäristövastuullinen yhtiö',
      'Kilpailukykyinen hinnoittelu alueellisesti',
      'Lahden kaupungin omistama — luotettava',
      'Euroopan ympäristöpääkaupungin energiayhtiö',
    ],
    cons: [
      'Rajallinen sopimusvalikoima',
      'Ei laajoja vihreitä sähkövaihtoehtoja toistaiseksi',
      'Pääpaino Päijät-Hämeen alueella',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Euroopan ympäristöpääkaupungin energiayhtiö',
      'Kiertotalouteen perustuva energiantuotanto',
      'Lahden kaupungin omistama — pitkäjänteinen toimija',
      'Paikallinen energianeuvonta Päijät-Hämeessä',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Mikä tekee Lahti Energiasta ympäristöystävällisen?',
        answer: 'Lahti Energia on investoinut voimakkaasti kiertotalouteen ja jätteenpolttoon perustuvaan energiantuotantoon. Yhtiö on keskeisessä roolissa Lahden ympäristöpääkaupunki-statuksen taustalla.',
      },
      {
        question: 'Palveleeko Lahti Energia vain Lahden aluetta?',
        answer: 'Sähkönmyynti on valtakunnallista. Lahti Energian erityispalvelut ja energianeuvonta keskittyvät Päijät-Hämeeseen.',
      },
      {
        question: 'Miten Lahti Energian hinnat vertautuvat kilpailijoihin?',
        answer: 'Lahti Energian hinnat ovat alueellisesti kilpailukykyiset. Pörssisähkön marginaali ja kuukausimaksut ovat kohtuullisia.',
      },
    ],
  },

  'savon-voima': {
    id: 'savon-voima',
    longDescription: `Savon Voima on Savon alueen perinteinen energiayhtiö, joka on palvellut Itä-Suomea vuodesta 1947. Yhtiö on yksi Suomen suurimmista alueellisista energiayhtiöistä ja palvelee yli 110 000 asiakasta laajalla alueella Itä-Suomessa.

Savon Voima erottuu monipuolisella sopimusvalikoimallaan, johon kuuluu pörssisähkö, kiinteähintaiset sopimukset ja toistaiseksi voimassa olevat sopimukset. Erityisesti toistaiseksi voimassa oleva sopimus on harvinainen tuote markkinoilla ja sopii asiakkaille, jotka eivät halua sitoutua määräaikaan.

Yhtiö palvelee laajaa maantieteellistä aluetta Itä-Suomessa, mikä tarkoittaa sekä kaupunki- että maaseutuasiakkaita. Savon Voimalla on pitkä kokemus alueen erityisolosuhteista ja asiakkaiden tarpeista. Hinnoittelu on kohtuullista, joskin syrjäisten alueiden palvelukustannukset näkyvät jossain määrin hinnoissa.`,
    type: 'regional',
    revenue: 'n.250 milj. € (2025)',
    customerServicePhone: '017 224 9111',
    pros: [
      'Laaja palvelualue Itä-Suomessa',
      'Monipuolinen sopimusvalikoima toistaiseksi-sopimuksineen',
      'Pitkä kokemus alueelta (vuodesta 1947)',
      'Hyvä paikallinen palvelu',
    ],
    cons: [
      'Hinnat hieman korkeammat kuin valtakunnallisilla kilpailijoilla',
      'Digitaaliset palvelut perinteiset',
      'Ei laajoja vihreitä vaihtoehtoja',
      'Pörssisähkön marginaali markkinoiden keskiarvon yläpuolella',
    ],
    specialFeatures: [
      'Toistaiseksi voimassa oleva sopimus ilman sitovuutta',
      'Laajin palvelualue Itä-Suomessa',
      'Paikallinen energianeuvonta maaseudulle ja kaupunkeihin',
      'Pitkä kokemus haja-asutusalueiden energiapalveluista',
    ],
    satisfactionRating: 3.7,
    faq: [
      {
        question: 'Mikä on toistaiseksi voimassa oleva sopimus?',
        answer: 'Toistaiseksi voimassa oleva sopimus ei ole määräaikainen. Voit irtisanoa sen koska tahansa ilman lisäkuluja. Hinta on tyypillisesti hieman korkeampi kuin määräaikaisissa sopimuksissa.',
      },
      {
        question: 'Palveleeko Savon Voima vain maaseutua?',
        answer: 'Ei. Savon Voima palvelee sekä kaupunki- että maaseutuasiakkaita laajalla alueella Itä-Suomessa. Sähkönmyynti on valtakunnallista.',
      },
      {
        question: 'Miten Savon Voiman hinnat muodostuvat?',
        answer: 'Hinnat koostuvat energiamaksusta ja kuukausittaisesta perusmaksusta. Pörssisähkössä energiamaksu seuraa Nord Pool -hintaa marginaalilla lisättynä.',
      },
    ],
  },

  'pori-energia': {
    id: 'pori-energia',
    longDescription: `Pori Energia on Porin kaupungin omistama energiayhtiö ja Satakunnan alueen merkittävin energiatoimija. Yhtiö on perustettu 1909 ja palvelee noin 50 000 sähköasiakasta. Pori Energia tunnetaan monipuolisista energiapalveluistaan ja sitoutumisestaan alueensa kehittämiseen.

Pori Energia tarjoaa kattavan valikoiman sähkösopimuksia: pörssisähköä, kiinteähintaisia sopimuksia ja vihreitä vaihtoehtoja. Erityisesti vihreä kiinteähintainen sähkö on suosittu tuote ympäristötietoisten asiakkaiden keskuudessa. Yhtiö investoi aktiivisesti tuulivoimaan ja muihin uusiutuvan energian muotoihin.

Satakunnan alueella Pori Energia on tunnetuin ja luotetuin energiatoimija. Yhtiön paikallinen läsnäolo, palvelupisteet ja henkilökohtainen asiakaspalvelu tuovat lisäarvoa verrattuna valtakunnallisiin kilpailijoihin. Pori Energia osallistuu aktiivisesti alueensa energiamurrokseen ja tarjoaa energianeuvontaa kotitalouksille.`,
    type: 'regional',
    revenue: 'n.130 milj. € (2025)',
    customerServicePhone: '02 621 3100',
    pros: [
      'Hyvä paikallinen palvelu Satakunnassa',
      'Monipuolinen sopimusvalikoima vihreillä vaihtoehdoilla',
      'Aktiivinen investointi tuulivoimaan',
      'Kaupungin omistama — luotettava ja vakaa',
    ],
    cons: [
      'Hinnat eivät markkinoiden edullisimpia',
      'Pääpaino Satakunnan alueella',
      'Digitaaliset palvelut kehittyvät',
      'Ei laajimpia lisäpalveluita',
    ],
    specialFeatures: [
      'Satakunnan suurin energiatoimija',
      'Porin kaupungin omistama — yli 115 vuoden historia',
      'Vihreän sähkön vaihtoehdot tuulivoimasta',
      'Paikallinen energianeuvonta ja palvelupisteet',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Tarjoaako Pori Energia vihreää sähköä?',
        answer: 'Kyllä. Pori Energia Vihreä -sopimuksessa sähkö on 100% uusiutuvaa, pääosin tuulivoimaa, ja varmennettu alkuperätakuilla.',
      },
      {
        question: 'Voiko Pori Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Pori Energian palvelupisteet ja paikallispalvelut sijaitsevat Satakunnassa.',
      },
      {
        question: 'Miten Pori Energia tukee uusiutuvaa energiaa?',
        answer: 'Pori Energia investoi aktiivisesti tuulivoimaan ja muihin uusiutuvan energian muotoihin Satakunnan alueella ja laajemmin.',
      },
    ],
  },

  ilmatar: {
    id: 'ilmatar',
    longDescription: `Ilmatar Energia on vuonna 2012 perustettu suomalainen tuulivoimayhtiö, joka on noussut yhdeksi Suomen merkittävimmistä tuulienergiaan erikoistuneista toimijoista. Yhtiön pääkonttori sijaitsee Helsingissä, ja se omistaa ja operoi omia tuulivoimapuistoja eri puolilla Suomea. Ilmatar on kerännyt yli 500 megawatin tuulivoimakapasiteetin ja jatkaa voimakasta kasvua.

Ilmatar erottuu kilpailijoistaan sillä, että kaikki myytävä sähkö tuotetaan yhtiön omissa tuulivoimaloissa. Tämä tarkoittaa täydellistä läpinäkyvyyttä: asiakas tietää tarkalleen, mistä hänen sähkönsä tulee. Pörssisähkö ja kiinteähintaiset sopimukset ovat molemmat saatavilla, ja kaikki sopimukset ovat automaattisesti 100% tuulivoimaa.

Ilmatar sopii erityisesti ympäristötietoisille kuluttajille, jotka haluavat tukea suomalaista tuulivoimatuotantoa suoraan. Yhtiön hinnoittelu on kilpailukykyistä ottaen huomioon, että kyseessä on aina puhdas tuulienergia. Asiakaspalvelu on henkilökohtaista ja yhtiö on saanut hyvää palautetta selkeydestään ja rehellisyydestään.`,
    type: 'challenger',
    revenue: 'n.50 milj. € (2025)',
    customerServicePhone: '010 524 4500',
    pros: [
      'Kaikki sähkö 100% omasta tuulivoimatuotannosta',
      'Täysin läpinäkyvä tuotantoketju',
      'Suomalainen tuulivoimapioneeeri — uskottava vihreä valinta',
      'Kilpailukykyinen hinnoittelu puhtaalle energialle',
    ],
    cons: [
      'Pienempi toimija — rajallisemmat resurssit',
      'Suppeampi sopimusvalikoima kuin suurilla yhtiöillä',
      'Ei tarjoa perinteistä (ei-vihreää) sähköä',
    ],
    specialFeatures: [
      'Omaa tuulivoimatuotantoa yli 500 MW',
      'Täysi läpinäkyvyys: asiakas tietää mistä sähkö tulee',
      'Suomen suurimpia yksityisiä tuulivoimatoimijoita',
    ],
    satisfactionRating: 4.1,
    faq: [
      {
        question: 'Tuottaako Ilmatar oikeasti itse kaiken myymänsä sähkön?',
        answer: 'Kyllä. Ilmatar omistaa ja operoi omia tuulivoimapuistoja Suomessa, ja kaikki myytävä sähkö tuotetaan näissä voimaloissa. Tuotanto varmennetaan alkuperätakuilla.',
      },
      {
        question: 'Miten Ilmatarin hinnat vertautuvat tavallisiin sähköyhtiöihin?',
        answer: 'Ilmatarin hinnat ovat kilpailukykyisiä muihin vihreitä sopimuksia tarjoaviin yhtiöihin verrattuna. Omasta tuotannosta johtuen hinnoittelu on usein jopa edullisempaa kuin kilpailijoiden vihreät vaihtoehdot.',
      },
      {
        question: 'Voiko Ilmatarin valita koko Suomessa?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Voit tehdä sopimuksen Ilmatarin kanssa riippumatta asuinpaikastasi.',
      },
    ],
  },

  nivos: {
    id: 'nivos',
    longDescription: `Nivos (aiemmin Keravan Energia ja Lämpö) on keravalainen kunnallinen energiayhtiö, joka uudisti brändinsä vuonna 2020. Yhtiön juuret ulottuvat vuosikymmenten taakse, ja se on kehittynyt perinteisestä paikallisesta energiayhtiöstä moderniksi, innovatiiviseksi palveluntarjoajaksi. Nivos palvelee noin 40 000 asiakasta Keravan ja lähialueiden lisäksi yhä laajemmin koko Suomessa.

Nivoksen vahvuus on erinomainen paikallinen asiakaspalvelu yhdistettynä moderneihin digitaalisiin palveluihin. Nivos Hub -älykotipalvelu on yhtiön lippulaivatuote, joka mahdollistaa kodin energiankäytön älykkään ohjauksen. Pörssisähkö on hinnoiteltu kilpailukykyisesti, ja kiinteähintaisia sopimuksia on tarjolla useissa pituuksissa.

Nivos erottuu monista kunnallisista energiayhtiöistä panostamalla voimakkaasti tuotekehitykseen ja digitalisaatioon. Yhtiö on osoittanut, että paikallinen kunnallinen energiayhtiö voi olla samalla innovatiivinen ja moderni. Asiakastyytyväisyys on erinomainen, mikä kertoo palvelun laadusta ja henkilökohtaisesta otteesta.`,
    type: 'regional',
    revenue: 'n.80 milj. € (2025)',
    customerServicePhone: '020 760 0600',
    pros: [
      'Erinomainen ja henkilökohtainen asiakaspalvelu',
      'Nivos Hub -älykotipalvelu energian hallintaan',
      'Kilpailukykyiset hinnat kunnalliseksi yhtiöksi',
      'Moderni ja innovatiivinen toimintamalli',
    ],
    cons: [
      'Paikallinen palvelu keskittyy Keravan seudulle',
      'Pienempi toimija — rajallisempi näkyvyys',
      'Sopimusvalikoima kapeampi kuin suurimmilla yhtiöillä',
    ],
    specialFeatures: [
      'Nivos Hub — älykäs kodin energianhallintajärjestelmä',
      'Kunnallinen omistus yhdistettynä startup-henkiseen kehitykseen',
      'Paikallista, kasvollista asiakaspalvelua',
    ],
    satisfactionRating: 4.3,
    faq: [
      {
        question: 'Mikä on Nivos Hub?',
        answer: 'Nivos Hub on älykotipalvelu, joka mahdollistaa kodin energiankäytön seurannan ja ohjauksen. Sen avulla voit optimoida esimerkiksi lämmitystä ja sähkön käyttöä pörssisähkön hintojen mukaan.',
      },
      {
        question: 'Onko Nivos sama kuin Keravan Energia?',
        answer: 'Kyllä. Nivos on Keravan Energia ja Lämpö Oy:n uusi brändinimi, joka otettiin käyttöön vuonna 2020 yhtiön uudistumisen yhteydessä.',
      },
      {
        question: 'Voiko Nivoksen valita muualtakin kuin Keravalta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa, joten voit valita Nivoksen sähköyhtiöksesi riippumatta asuinpaikastasi.',
      },
    ],
  },

  'vantaan-energia': {
    id: 'vantaan-energia',
    longDescription: `Vantaan Energia on Vantaan kaupungin omistama energiayhtiö ja yksi Suomen suurimmista kunnallisista energiatoimijoista. Yhtiö tuottaa sähköä, kaukolämpöä ja kaukojäähdytystä yli 200 000 vantaalaiselle ja myy sähköä myös valtakunnallisesti. Vantaan Energia on tunnettu erityisesti jätevoimalaistaan, joka muuttaa kotitalouksien jätteet energiaksi.

Vantaan Energian jätevoimala on yksi Suomen suurimmista ja innovatiivisimmista. Se tuottaa sähköä ja lämpöä polttamalla kotitalousjätettä, mikä vähentää kaatopaikalle päätyvän jätteen määrää merkittävästi. Tämä kiertotalouteen perustuva malli on saanut kansainvälistäkin huomiota. Sähkönmyynnissä yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kilpailukykyisin hinnoin.

Vantaan Energia on vahva ja vakaa toimija, jonka kaupunkiomistus takaa pitkäjänteisen toiminnan. Asiakaspalvelu on laadukasta ja palvelupisteet helposti saavutettavissa. Yhtiö investoi jatkuvasti uusiutuvaan energiaan ja älykkäisiin energiaratkaisuihin, mikä tekee siitä kiinnostavan vaihtoehdon myös tulevaisuuteen katsovalle kuluttajalle.`,
    type: 'regional',
    revenue: 'n.300 milj. € (2025)',
    customerServicePhone: '09 829 01',
    pros: [
      'Yksi Suomen suurimmista kunnallisista energiayhtiöistä',
      'Innovatiivinen jätevoimala — kiertotalouden edelläkävijä',
      'Luotettava kaupungin omistama toimija',
      'Laaja palveluverkosto pääkaupunkiseudulla',
    ],
    cons: [
      'Hinnat eivät markkinoiden edullisimpia',
      'Pääpaino Vantaan ja pääkaupunkiseudun alueella',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Jätevoimala — jätteestä energiaa kiertotalousperiaatteella',
      'Vantaan kaupungin kokonaan omistama',
      'Kaukolämmön, kaukojäähdytyksen ja sähkön yhdistelmäpalvelut',
    ],
    satisfactionRating: 4.2,
    faq: [
      {
        question: 'Miten Vantaan Energian jätevoimala toimii?',
        answer: 'Jätevoimala polttaa kotitalousjätettä, jota ei voi kierrättää muuten. Poltosta syntyy lämpöä kaukolämpöverkkkoon ja sähköä sähköverkkoon. Prosessi on tehokas ja vähentää kaatopaikalle päätyvän jätteen määrää.',
      },
      {
        question: 'Palveleeko Vantaan Energia vain vantaalaisia?',
        answer: 'Ei. Sähkönmyynti on vapaata koko Suomessa. Voit valita Vantaan Energian sähköyhtiöksesi asuinpaikastasi riippumatta.',
      },
      {
        question: 'Millaisia sähkösopimuksia Vantaan Energia tarjoaa?',
        answer: 'Vantaan Energia tarjoaa pörssisähköä kilpailukykyisellä marginaalilla sekä kiinteähintaisia sopimuksia eri pituuksilla. Vihreät vaihtoehdot ovat myös saatavilla.',
      },
    ],
  },

  'lappeenrannan-energia': {
    id: 'lappeenrannan-energia',
    longDescription: `Lappeenrannan Energia on Lappeenrannan kaupungin omistama energiayhtiö, joka on palvellut Etelä-Karjalan aluetta vuosikymmeniä. Yhtiö tarjoaa sähkön lisäksi kaukolämpöä ja muita energiapalveluita. Lappeenrannan Energia tunnetaan luotettavuudestaan ja vahvasta sitoutumisestaan puhtaaseen energiaan.

Lappeenrannan kaupunki on kansainvälisesti tunnettu puhtaan energian edelläkävijänä — LUT-yliopiston tutkimus ja Lappeenrannan kunnianhimoiset ilmastotavoitteet näkyvät myös Lappeenrannan Energian toiminnassa. Yhtiö on investoinut merkittävästi uusiutuvaan energiaan ja pyrkii kohti hiilineutraalia energiantuotantoa.

Asiakaspalvelu on henkilökohtaista ja helposti saavutettavissa. Paikallisena toimijana Lappeenrannan Energia tuntee alueensa olosuhteet ja asiakkaiden tarpeet hyvin. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset vaihtoehdot, ja hinnoittelu on alueellisesti kilpailukykyistä.`,
    type: 'regional',
    revenue: 'n.60 milj. € (2025)',
    customerServicePhone: '05 6782 111',
    pros: [
      'Puhtaan energian edelläkävijäkaupungin energiayhtiö',
      'Hyvä paikallinen palvelu Etelä-Karjalassa',
      'Vahva sitoutuminen uusiutuvaan energiaan',
      'Kaupungin omistama — luotettava ja vakaa',
    ],
    cons: [
      'Pieni toimija — rajallinen sopimusvalikoima',
      'Pääpaino Etelä-Karjalan alueella',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Puhtaan energian edelläkävijäkaupungin oma energiayhtiö',
      'Vahva yhteys LUT-yliopiston energiatutkimukseen',
      'Paikallista ja henkilökohtaista asiakaspalvelua',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Miten Lappeenrannan Energia liittyy kaupungin ilmastotavoitteisiin?',
        answer: 'Lappeenrannan kaupunki on asettanut kunnianhimoiset ilmastotavoitteet, ja Lappeenrannan Energia on keskeisessä roolissa niiden toteuttamisessa investoimalla uusiutuvaan energiaan ja vähentämällä päästöjä.',
      },
      {
        question: 'Voiko Lappeenrannan Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Kaukolämpö ja muut paikalliset palvelut ovat kuitenkin alueellisia.',
      },
    ],
  },

  'kokkolan-energia': {
    id: 'kokkolan-energia',
    longDescription: `Kokkolan Energia on Kokkolan kaupungin omistama energiayhtiö, joka palvelee Keski-Pohjanmaan aluetta. Yhtiö tarjoaa sähkönmyynnin ohella kaukolämpöä ja muita energiapalveluita. Kokkolan Energialla on pitkä historia alueen energiahuollon varmistajana, ja se tunnetaan vakaasta ja luotettavasta toiminnastaan.

Keski-Pohjanmaan alueella Kokkolan Energia on keskeinen energiatoimija, joka tuntee paikallisten asiakkaiden tarpeet ja alueen erityisolosuhteet. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kohtuulliseen hintaan. Asiakaspalvelu on paikallista ja henkilökohtaista — asiointi on helppoa ja nopeaa.

Kokkolan Energia investoi uusiutuvaan energiaan ja pyrkii vähentämään toimintansa ympäristövaikutuksia. Kaupungin omistus takaa toiminnan jatkuvuuden ja pitkäjänteisyyden, ja yhtiö on tärkeä osa alueen elinvoimaisuutta.`,
    type: 'regional',
    revenue: 'n.40 milj. € (2025)',
    customerServicePhone: '06 828 9111',
    pros: [
      'Luotettava kunnallinen toimija Keski-Pohjanmaalla',
      'Henkilökohtainen ja helposti saavutettava asiakaspalvelu',
      'Kohtuulliset ja ennustettavat hinnat',
      'Kaupungin omistama — vakaa toiminta',
    ],
    cons: [
      'Pieni toimija — rajallinen sopimusvalikoima',
      'Toiminta keskittyy Keski-Pohjanmaalle',
      'Digitaaliset palvelut eivät kehittyneimpiä',
    ],
    specialFeatures: [
      'Keski-Pohjanmaan alueen keskeinen energiatoimija',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
      'Paikallista energianeuvontaa ja asiakaspalvelua',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Palveleeko Kokkolan Energia vain Kokkolan aluetta?',
        answer: 'Sähkönmyynti on vapaata koko Suomessa, joten voit valita Kokkolan Energian myös muualta. Kaukolämpö ja paikallispalvelut keskittyvät Keski-Pohjanmaalle.',
      },
      {
        question: 'Millaisia sopimuksia Kokkolan Energia tarjoaa?',
        answer: 'Kokkolan Energia tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia. Sopimusvalikoima kattaa perustarpeet kotitalouksille ja yrityksille.',
      },
    ],
  },

  'seinajoen-energia': {
    id: 'seinajoen-energia',
    longDescription: `Seinäjoen Energia on Seinäjoen kaupungin omistama energiayhtiö ja Etelä-Pohjanmaan alueen merkittävin energiatoimija. Yhtiö tarjoaa sähkönmyynnin lisäksi kaukolämpöä ja muita energiapalveluita. Seinäjoen Energia tunnetaan luotettavuudestaan ja vahvasta sitoutumisestaan alueensa energiahuoltoon.

Etelä-Pohjanmaa on maatalous- ja yritystoimintavaltaista aluetta, ja Seinäjoen Energia tuntee alueen erityistarpeet hyvin. Yhtiö palvelee sekä kotitalouksia että yrityksiä ja tarjoaa pörssisähköä sekä kiinteähintaisia sopimuksia. Hinnoittelu on kilpailukykyistä alueellisella tasolla.

Seinäjoen Energia investoi aktiivisesti energiantuotannon uudistamiseen ja pyrkii lisäämään uusiutuvan energian osuutta. Kaupungin omistus takaa pitkäjänteisen ja vakaan toiminnan. Asiakaspalvelu on henkilökohtaista ja paikallista — asiat hoituvat nopeasti ja luotettavasti.`,
    type: 'regional',
    revenue: 'n.50 milj. € (2025)',
    customerServicePhone: '06 421 5111',
    pros: [
      'Etelä-Pohjanmaan alueen vahvin energiatoimija',
      'Hyvä paikallinen asiakaspalvelu',
      'Kaupungin omistama — vakaa ja luotettava',
      'Kohtuullinen hinnoittelu alueellisesti',
    ],
    cons: [
      'Toiminta keskittyy Etelä-Pohjanmaalle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Etelä-Pohjanmaan suurin energiatoimija',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
      'Vahva paikallistuntemus maatalous- ja yritysalueen tarpeisiin',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Voiko Seinäjoen Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Seinäjoen Energian paikallispalvelut ja kaukolämpö keskittyvät Etelä-Pohjanmaalle.',
      },
      {
        question: 'Tarjoaako Seinäjoen Energia vihreää sähköä?',
        answer: 'Seinäjoen Energia kehittää uusiutuvan energian tarjontaansa. Vihreitä vaihtoehtoja on saatavilla alkuperätakuilla varmennettuina.',
      },
    ],
  },

  'kotkan-energia': {
    id: 'kotkan-energia',
    longDescription: `Kotkan Energia on Kotkan kaupungin omistama energiayhtiö, joka palvelee Kymenlaakson rannikkoseutua. Yhtiö tarjoaa sähkönmyynnin ohella kaukolämpöä ja energiapalveluita. Kotkan Energialla on pitkä historia satama- ja teollisuuskaupungin energiahuollon turvaajana.

Kymenlaakson rannikkoseudulla Kotkan Energia on keskeinen toimija, joka tuntee alueen teollisuus- ja kotitalousasiakkaiden tarpeet. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia. Satamakaupungin energiatoimijana Kotkan Energialla on kokemusta myös suurkuluttajien palvelusta.

Kotkan Energia investoi energiantuotannon uudistamiseen ja puhtaampiin ratkaisuihin. Kaupungin omistus takaa toiminnan vakauden ja pitkäjänteisyyden. Asiakaspalvelu on henkilökohtaista ja paikallista, mikä on yhtiön selkeä vahvuus verrattuna valtakunnallisiin kilpailijoihin.`,
    type: 'regional',
    revenue: 'n.45 milj. € (2025)',
    customerServicePhone: '05 234 5100',
    pros: [
      'Vahva paikallinen toimija Kymenlaakson rannikolla',
      'Henkilökohtainen asiakaspalvelu',
      'Kaupungin omistama — luotettava ja vakaa',
      'Kokemus sekä kotitalous- että teollisuusasiakkaista',
    ],
    cons: [
      'Pieni toimija — rajallinen sopimusvalikoima',
      'Toiminta keskittyy Kymenlaakson rannikolle',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Kymenlaakson rannikkoseudun keskeinen energiatoimija',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
      'Pitkä kokemus teollisuus- ja satamakaupungin energiahuollosta',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Palveleeko Kotkan Energia vain Kotkaa?',
        answer: 'Sähkönmyynti on vapaata koko Suomessa. Kotkan Energian kaukolämpö ja paikallispalvelut keskittyvät Kotkan ja Kymenlaakson alueelle.',
      },
      {
        question: 'Millaisia sopimustyyppejä Kotkan Energia tarjoaa?',
        answer: 'Kotkan Energia tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kotitalouksille ja yrityksille. Hinnoittelu on alueellisesti kilpailukykyistä.',
      },
    ],
  },

  'rauman-energia': {
    id: 'rauman-energia',
    longDescription: `Rauman Energia on Rauman kaupungin omistama energiayhtiö, joka palvelee Satakunnan rannikkoseutua. Yhtiö on pitkäaikainen ja luotettava energiatoimija, joka tarjoaa sähkönmyynnin lisäksi kaukolämpöä ja muita energiapalveluita. Rauman Energia tunnetaan alueellaan vakaasta ja laadukkaasta palvelustaan.

Rauma on UNESCO:n maailmanperintökaupunki ja merkittävä satama- ja teollisuuskaupunki, mikä heijastuu myös Rauman Energian toimintaan. Yhtiö palvelee monipuolista asiakaskuntaa kotitalouksista teollisuusyrityksiin. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset sopimukset kohtuulliseen hintaan.

Rauman Energia panostaa energiantuotannon vastuullisuuteen ja investoi uusiutuvan energian ratkaisuihin. Paikallisena toimijana yhtiö tarjoaa henkilökohtaista ja helposti saavutettavaa asiakaspalvelua. Kaupungin omistus takaa toiminnan jatkuvuuden ja pitkäjänteisyyden.`,
    type: 'regional',
    revenue: 'n.35 milj. € (2025)',
    customerServicePhone: '02 834 4511',
    pros: [
      'Luotettava paikallinen toimija Satakunnan rannikolla',
      'Henkilökohtainen ja helppo asiakaspalvelu',
      'Kohtuullinen hinnoittelu',
      'Kaupungin omistama — vakaa toiminta',
    ],
    cons: [
      'Pieni toimija — suppea sopimusvalikoima',
      'Toiminta keskittyy Rauman ja Satakunnan alueelle',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Satakunnan rannikkoseudun keskeinen energiatoimija',
      'Pitkäaikainen kokemus teollisuus- ja satamakaupungin palvelusta',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Voiko Rauman Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Rauman Energian kaukolämpö ja paikallispalvelut keskittyvät Rauman seudulle.',
      },
      {
        question: 'Millaisia sähkösopimuksia Rauman Energia tarjoaa?',
        answer: 'Rauman Energia tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kotitalouksille ja yrityksille kilpailukykyiseen hintaan.',
      },
    ],
  },

  'napapiirin-energia': {
    id: 'napapiirin-energia',
    longDescription: `Napapiirin Energia ja Vesi (NEVE) on Rovaniemen kaupungin omistama energiayhtiö ja Lapin suurin energiatoimija. Yhtiö tuottaa ja myy sähköä, kaukolämpöä ja vesihuoltopalveluita. NEVE tunnetaan erityisesti kyvystään palvella asiakkaita Lapin vaativissa arktisissa olosuhteissa.

Lapin suurimpana energiayhtiönä NEVE ymmärtää arktisen alueen erityishaasteet: pitkät, kylmät talvet, suuret sähkönkulutuksen kausivaihtelut ja haja-asutusalueiden tarpeet. Yhtiö on investoinut energiantuotannon kestävyyteen ja varmuuteen, mikä on kriittistä ääriolosuhteissa. Pörssisähkö ja kiinteähintaiset sopimukset ovat molemmat saatavilla.

NEVE palvelee Rovaniemen lisäksi laajasti koko Lapin aluetta. Paikallinen asiakaspalvelu on yhtiön vahvuus, ja energia-asioiden hoitaminen on helppoa. Kaupungin omistus takaa toiminnan jatkuvuuden ja investoinnit tulevaisuuden energiaratkaisuihin myös arktisella alueella.`,
    type: 'regional',
    revenue: 'n.70 milj. € (2025)',
    customerServicePhone: '016 3301',
    pros: [
      'Lapin suurin energiatoimija — vahva paikallinen osaaminen',
      'Arktisten olosuhteiden erityisasiantuntemus',
      'Luotettava kaupungin omistama toimija',
      'Hyvä asiakaspalvelu haastavissa olosuhteissa',
    ],
    cons: [
      'Toiminta keskittyy Lapin alueelle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Lapin suurin energiayhtiö — arktisen alueen asiantuntija',
      'Energia- ja vesihuoltopalvelut samasta yhtiöstä',
      'Erityisosaaminen ääriolosuhteissa toimimiseen',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Mikä on NEVE?',
        answer: 'NEVE (Napapiirin Energia ja Vesi) on Rovaniemen kaupungin omistama yhtiö, joka tuottaa sähköä, kaukolämpöä ja vesihuoltopalveluita. Se on Lapin suurin energiatoimija.',
      },
      {
        question: 'Miten NEVE huomioi Lapin erityisolosuhteet?',
        answer: 'NEVE:llä on vuosikymmenten kokemus arktisissa olosuhteissa toimimisesta. Yhtiö varmistaa energian toimitusvarmuuden myös kovimpien pakkasten aikana ja neuvoo asiakkaita energiansäästössä pohjoisessa.',
      },
      {
        question: 'Voiko NEVEn valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. NEVEn paikalliset palvelut keskittyvät Lapin alueelle.',
      },
    ],
  },

  'porvoon-energia': {
    id: 'porvoon-energia',
    longDescription: `Porvoon Energia on Porvoon kaupungin omistama energiayhtiö, joka on palvellut Itä-Uudenmaan aluetta vuosikymmeniä. Yhtiö tarjoaa sähkönmyynnin lisäksi kaukolämpöä ja muita energiapalveluita. Porvoon Energia tunnetaan luotettavuudestaan ja hyvästä asiakaspalvelustaan historiallisessa kaksikielisessä kaupungissa.

Porvoon Energia palvelee sekä suomen- että ruotsinkielisiä asiakkaita sujuvasti, mikä on tärkeä lisäarvo kaksikielisellä Itä-Uudellamaalla. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kilpailukykyiseen hintaan. Paikallisena toimijana Porvoon Energia tuntee alueensa asiakkaiden tarpeet ja olosuhteet hyvin.

Porvoon Energia investoi uusiutuvaan energiaan ja energiatehokkuuteen. Yhtiö on aktiivinen toimija alueensa energiamurroksessa ja tarjoaa asiakkailleen energianeuvontaa. Kaupungin omistus takaa pitkäjänteisen toiminnan ja investoinnit tulevaisuuteen.`,
    type: 'regional',
    revenue: 'n.35 milj. € (2025)',
    customerServicePhone: '019 661 3311',
    pros: [
      'Kaksikielinen palvelu (suomi/ruotsi) — Itä-Uudenmaan vahvuus',
      'Henkilökohtainen ja laadukas asiakaspalvelu',
      'Kaupungin omistama — vakaa ja luotettava',
      'Kilpailukykyinen hinnoittelu alueellisesti',
    ],
    cons: [
      'Pieni toimija — rajallinen sopimusvalikoima',
      'Pääpaino Itä-Uudenmaan alueella',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Kaksikielinen palvelu suomeksi ja ruotsiksi',
      'Itä-Uudenmaan keskeinen energiatoimija',
      'Paikallista ja henkilökohtaista energianeuvontaa',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Palveleeko Porvoon Energia myös ruotsiksi?',
        answer: 'Kyllä. Porvoon Energia tarjoaa asiakaspalvelua sekä suomeksi että ruotsiksi, mikä on luonnollista kaksikielisessä Porvoossa.',
      },
      {
        question: 'Voiko Porvoon Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Porvoon Energian paikallispalvelut keskittyvät Itä-Uudellamaalle.',
      },
    ],
  },

  'tornion-energia': {
    id: 'tornion-energia',
    longDescription: `Tornion Energia on Tornion kaupungin omistama energiayhtiö, joka palvelee Meri-Lapin aluetta Suomen ja Ruotsin rajalla. Yhtiö tarjoaa sähkönmyynnin lisäksi kaukolämpöä ja muita energiapalveluita. Tornion Energian erityispiirre on sen sijainti raja-alueella, mikä tuo omat haasteensa ja mahdollisuutensa energiahuoltoon.

Meri-Lapin alueella Tornion Energia on keskeinen energiatoimija, joka palvelee sekä kotitalouksia että alueen merkittävää teollisuutta, kuten Outokummun terästehdasta. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia. Rajaseudun energiayhtiönä Tornion Energialla on ainutlaatuinen näkökulma pohjoismaiseen energiamarkkinaan.

Tornion Energia panostaa energiantuotannon luotettavuuteen ja investoi puhtaampiin ratkaisuihin. Kaupungin omistus takaa toiminnan jatkuvuuden. Paikallinen asiakaspalvelu on henkilökohtaista ja helposti saavutettavissa.`,
    type: 'regional',
    revenue: 'n.25 milj. € (2025)',
    customerServicePhone: '016 431 511',
    pros: [
      'Meri-Lapin alueen keskeinen energiatoimija',
      'Henkilökohtainen paikallinen asiakaspalvelu',
      'Kaupungin omistama — luotettava ja vakaa',
      'Ainutlaatuinen rajaseudun energiaosaaminen',
    ],
    cons: [
      'Pieni toimija — suppea sopimusvalikoima',
      'Toiminta keskittyy Meri-Lapin alueelle',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Meri-Lapin ja rajaseudun energiatoimija',
      'Kokemus teollisuuskaupungin energiahuollosta',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Voiko Tornion Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Tornion Energian paikallispalvelut keskittyvät Meri-Lapin alueelle.',
      },
      {
        question: 'Miten Tornion Energia eroaa muista Lapin energiayhtiöistä?',
        answer: 'Tornion Energia toimii Suomen ja Ruotsin rajalla Meri-Lapissa, mikä antaa sille ainutlaatuisen näkökulman pohjoismaiseen energiamarkkinaan. Yhtiöllä on myös kokemusta suurteollisuuden energiatarpeista.',
      },
    ],
  },

  'nurmijarven-sahko': {
    id: 'nurmijarven-sahko',
    longDescription: `Nurmijärven Sähkö on kunnallinen energiayhtiö, joka palvelee yhtä Suomen nopeimmin kasvavista kunnista Uudellamaalla. Yhtiö on toiminut vuosikymmeniä ja tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa alueellaan. Nurmijärven Sähkö tunnetaan luotettavuudestaan ja hyvästä paikallisesta palvelustaan kasvavassa kunnassa.

Nurmijärvi on pääkaupunkiseudun kupeessa sijaitseva kasvukunta, jossa asuu yli 45 000 asukasta. Nurmijärven Sähkö tuntee kasvavan kunnan energiatarpeet ja on investoinut verkon kapasiteettiin ja luotettavuuteen. Sähkönmyynnissä yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kilpailukykyiseen hintaan.

Paikallisena kunnallisena yhtiönä Nurmijärven Sähkö tarjoaa henkilökohtaista asiakaspalvelua. Asiakkaiden on helppo asioida yhtiön kanssa, ja paikallistuntemus näkyy palvelun laadussa. Yhtiö investoi jatkuvasti verkon kehitykseen ja energiapalveluiden parantamiseen kasvavan kunnan tarpeisiin.`,
    type: 'regional',
    revenue: 'n.30 milj. € (2025)',
    customerServicePhone: '09 250 0770',
    pros: [
      'Erinomainen paikallinen palvelu kasvavassa Uudenmaan kunnassa',
      'Kilpailukykyiset hinnat kunnalliseksi yhtiöksi',
      'Luotettava sähkönjakelu kasvavalla alueella',
      'Henkilökohtainen ja helppo asiointi',
    ],
    cons: [
      'Pieni toimija — rajallinen sopimusvalikoima',
      'Pääpaino Nurmijärven alueella',
      'Digitaaliset palvelut eivät kehittyneimpiä',
    ],
    specialFeatures: [
      'Kasvavan Uudenmaan kunnan oma energiayhtiö',
      'Sähkönmyynti ja sähkönsiirto samalta yhtiöltä',
      'Paikallista energianeuvontaa ja henkilökohtaista palvelua',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Voiko Nurmijärven Sähkön valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Sähkönsiirto on kuitenkin alueellista, joten siirtoyhtiösi määräytyy asuinpaikkasi mukaan.',
      },
      {
        question: 'Millaisia sopimuksia Nurmijärven Sähkö tarjoaa?',
        answer: 'Nurmijärven Sähkö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kotitalouksille. Hinnoittelu on kilpailukykyistä erityisesti paikallisille asiakkaille.',
      },
    ],
  },

  'kss-energia': {
    id: 'kss-energia',
    longDescription: `KSS Energia on kouvolalainen energiayhtiö, joka palvelee Kymenlaakson aluetta. Yhtiö tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa ja muita energiapalveluita. KSS Energia on vakiinnuttanut asemansa luotettavana alueellisena energiatoimijana, joka tuntee Kymenlaakson teollisuus- ja asuinalueiden tarpeet.

Kymenlaakso on perinteistä teollisuusaluetta, ja KSS Energialla on pitkä kokemus monipuolisen asiakaskunnan palvelusta. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia kohtuulliseen hintaan. Sähkönsiirto ja -myynti samalta yhtiöltä tuovat asiakkaalle helppoa kokonaispalvelua.

KSS Energia investoi sähköverkon uudistamiseen ja uusiutuvan energian ratkaisuihin. Yhtiö panostaa asiakaspalveluun ja pyrkii tarjoamaan henkilökohtaista palvelua alueensa asiakkaille. Paikallisena toimijana KSS Energia on tärkeä osa Kymenlaakson elinvoimaisuutta.`,
    type: 'regional',
    revenue: 'n.40 milj. € (2025)',
    customerServicePhone: '05 743 0200',
    pros: [
      'Vahva paikallinen toimija Kymenlaaksossa',
      'Sähkönsiirto ja -myynti samalta yhtiöltä — helppo asiointi',
      'Kohtuullinen ja ennustettava hinnoittelu',
      'Henkilökohtainen asiakaspalvelu',
    ],
    cons: [
      'Toiminta keskittyy Kymenlaakson alueelle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Kymenlaakson keskeinen energiatoimija',
      'Sähkönsiirto ja -myynti samasta yhtiöstä',
      'Pitkä kokemus teollisuusalueen energiapalveluista',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Mitä hyötyä on siitä, että sähkönsiirto ja -myynti ovat samassa yhtiössä?',
        answer: 'Kun sähkönsiirto ja -myynti tulevat samalta yhtiöltä, asiointisi on yksinkertaisempaa. Voit hoitaa kaikki sähköasiasi yhdessä paikassa, vaikka laskut tulevat edelleen erikseen.',
      },
      {
        question: 'Voiko KSS Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. KSS Energian sähkönsiirtopalvelu kattaa kuitenkin vain Kymenlaakson alueen.',
      },
    ],
  },

  pks: {
    id: 'pks',
    longDescription: `PKS Sähkönmyynti on joensuulainen energiayhtiö, joka palvelee erityisesti Pohjois-Karjalan aluetta. Yhtiö on osa Pohjois-Karjalan Sähkö -konsernia ja tarjoaa sähkönmyynnin lisäksi laajan valikoiman energiapalveluita. PKS tunnetaan alueellaan luotettavana ja pitkäaikaisena energiatoimijana.

Pohjois-Karjala on maantieteellisesti laaja ja vaihteleva alue, ja PKS Sähkönmyynti tuntee alueen erityisolosuhteet hyvin. Yhtiö palvelee sekä kaupunki- että maaseutuasiakkaita ja tarjoaa pörssisähköä sekä kiinteähintaisia sopimuksia. Hinnoittelu on alueellisesti kohtuullista.

PKS panostaa sähköverkon kehittämiseen ja energiapalveluiden modernisointiin Pohjois-Karjalassa. Asiakaspalvelu on paikallista ja henkilökohtaista, mikä on tärkeää laajalla ja harvaan asutulla alueella. Konsernin vahva paikallinen asema takaa pitkäjänteisen palvelun.`,
    type: 'regional',
    revenue: 'n.35 milj. € (2025)',
    customerServicePhone: '013 267 5111',
    pros: [
      'Pohjois-Karjalan alueen vahva paikallinen toimija',
      'Henkilökohtainen asiakaspalvelu myös haja-asutusalueilla',
      'Pitkä kokemus alueen energiahuollosta',
      'Kohtuullinen hinnoittelu',
    ],
    cons: [
      'Toiminta keskittyy Pohjois-Karjalaan',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Pohjois-Karjalan keskeinen energiatoimija',
      'Osa PKS-konsernia — laaja energiapalvelukokonaisuus',
      'Kokemus haja-asutusalueiden energiapalveluista',
    ],
    satisfactionRating: 3.7,
    faq: [
      {
        question: 'Mikä ero on PKS Sähkönmyynnillä ja Pohjois-Karjalan Sähköllä?',
        answer: 'PKS Sähkönmyynti hoitaa sähkön myyntiä ja Pohjois-Karjalan Sähkö sähkön siirtoa. Ne ovat saman konsernin yhtiöitä, mutta eri liiketoimintoja sähkömarkkinan vapautuksen mukaisesti.',
      },
      {
        question: 'Voiko PKS Sähkönmyynnin valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. PKS:n paikallispalvelut keskittyvät Pohjois-Karjalaan.',
      },
    ],
  },

  loiste: {
    id: 'loiste',
    longDescription: `Loiste on kajaanilainen energiayhtiö, joka palvelee erityisesti Kainuun aluetta. Yhtiö tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa ja energiapalveluita. Loiste tunnetaan alueellaan luotettavana toimijana, joka ymmärtää Kainuun harvaan asutun alueen erityistarpeita ja haasteita.

Kainuu on yksi Suomen harvimmin asutuista maakunnista, ja Loiste on sopeutunut palvelemaan asiakkaita pitkien etäisyyksien ja vaihtelevien olosuhteiden keskellä. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia sekä joitakin vihreitä vaihtoehtoja alkuperätakuilla. Hinnoittelu on kohtuullista alueen olosuhteisiin nähden.

Loiste investoi sähköverkon uudistamiseen ja toimitusvarmuuden parantamiseen Kainuussa. Yhtiö panostaa myös uusiutuvan energian ratkaisuihin ja energiatehokkuuteen. Asiakaspalvelu on henkilökohtaista ja paikallista, mikä on tärkeä arvo harvaan asutulla alueella.`,
    type: 'regional',
    revenue: 'n.45 milj. € (2025)',
    customerServicePhone: '020 764 4800',
    pros: [
      'Kainuun alueen vahvin energiatoimija',
      'Henkilökohtainen ja paikallinen asiakaspalvelu',
      'Vihreitä sähkövaihtoehtoja saatavilla',
      'Hyvä toimitusvarmuus harvaan asutulla alueella',
    ],
    cons: [
      'Toiminta keskittyy Kainuun alueelle',
      'Rajallinen sopimusvalikoima',
      'Hinnat voivat olla korkeampia kuin valtakunnallisilla kilpailijoilla',
    ],
    specialFeatures: [
      'Kainuun alueen keskeinen energiatoimija',
      'Erikoistunut harvaan asutun alueen energiahuoltoon',
      'Vihreitä vaihtoehtoja alkuperätakuilla',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Tarjoaako Loiste vihreää sähköä?',
        answer: 'Kyllä. Loiste tarjoaa vihreitä sähkövaihtoehtoja, joissa sähkö on varmennettu uusiutuvan energian alkuperätakuilla.',
      },
      {
        question: 'Voiko Loisteen valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Loisteen sähkönsiirto kattaa kuitenkin vain Kainuun alueen.',
      },
    ],
  },

  herrfors: {
    id: 'herrfors',
    longDescription: `Herrfors on pietarsaarelainen energiayhtiö, jolla on pitkä ja vahva historia Pohjanmaan kaksikielisellä alueella. Yhtiö on palvellut aluettaan vuosikymmeniä ja tunnetaan erityisesti erinomaisesta kaksikielisestä palvelustaan suomeksi ja ruotsiksi. Herrfors on osa Katternö-konsernia, joka on yksi Pohjanmaan merkittävimmistä energia-alan toimijoista.

Herrfors tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa Pohjanmaan alueella. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset sopimukset, ja hinnoittelu on kohtuullista. Yhtiö palvelee sekä suomen- että ruotsinkielistä asiakaskuntaa sujuvasti, mikä on merkittävä etu kaksikielisellä Pohjanmaalla.

Herrfors ja Katternö-konserni panostavat uusiutuvan energian kehittämiseen ja investoivat erityisesti tuulivoimaan Pohjanmaan alueella. Paikallisena toimijana Herrfors tuntee alueensa asiakkaiden tarpeet ja tarjoaa henkilökohtaista palvelua. Pitkä historia ja vakaa konsernipohja tekevät Herrforsista luotettavan valinnan.`,
    type: 'regional',
    revenue: 'n.40 milj. € (2025)',
    customerServicePhone: '06 781 9111',
    pros: [
      'Erinomainen kaksikielinen palvelu (suomi/ruotsi)',
      'Pitkä ja vahva historia Pohjanmaalla',
      'Osa Katternö-konsernia — vakaa taloudellinen pohja',
      'Henkilökohtainen ja paikallinen asiakaspalvelu',
    ],
    cons: [
      'Toiminta keskittyy Pohjanmaan alueelle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Kaksikielinen palvelu suomeksi ja ruotsiksi',
      'Osa Katternö-konsernia — investoinnit tuulivoimaan',
      'Pitkäaikainen paikallinen toimija Pohjanmaalla',
    ],
    satisfactionRating: 4.0,
    faq: [
      {
        question: 'Palveleeko Herrfors ruotsiksi?',
        answer: 'Kyllä. Herrfors tarjoaa täyden palvelun sekä suomeksi että ruotsiksi. Kaksikielisyys on yhtiön keskeinen vahvuus Pohjanmaalla.',
      },
      {
        question: 'Mikä on Katternö-konserni?',
        answer: 'Katternö on pohjanmaalainen energiakonserni, johon Herrfors kuuluu. Konserni kattaa sähkönmyynnin, sähkönsiirron ja energiantuotannon ja investoi merkittävästi tuulivoimaan.',
      },
      {
        question: 'Voiko Herrforsin valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Herrforsin sähkönsiirto kattaa kuitenkin vain Pohjanmaan alueen.',
      },
    ],
  },

  'leppakosken-sahko': {
    id: 'leppakosken-sahko',
    longDescription: `Leppäkosken Sähkö on ikaalislaislähtöinen energiayhtiö, joka palvelee Pirkanmaan ja Satakunnan raja-aluetta. Yhtiöllä on pitkä historia alueensa energiahuollon turvaajana, ja se tunnetaan luotettavuudestaan ja henkilökohtaisesta palvelustaan. Leppäkosken Sähkö tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa alueellaan.

Pirkanmaan ja Satakunnan raja-alue on maantieteellisesti vaihteleva, ja Leppäkosken Sähkö tuntee alueen erityisolosuhteet hyvin. Yhtiö palvelee sekä taajamien että haja-asutusalueiden asiakkaita. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset sopimukset kohtuulliseen hintaan.

Leppäkosken Sähkö panostaa sähköverkon luotettavuuteen ja uudistamiseen. Myrskyt ja luonnonilmiöt voivat haastaa sähkönjakelua harvaan asutuilla alueilla, ja yhtiö on investoinut verkon maakaapelointiin ja toimitusvarmuuteen. Paikallinen asiakaspalvelu on yhtiön vahvuus.`,
    type: 'regional',
    revenue: 'n.25 milj. € (2025)',
    customerServicePhone: '03 451 3111',
    pros: [
      'Luotettava paikallinen toimija Pirkanmaan ja Satakunnan rajalla',
      'Henkilökohtainen ja helposti saavutettava asiakaspalvelu',
      'Hyvä toimitusvarmuus myös haja-asutusalueilla',
      'Kohtuullinen hinnoittelu',
    ],
    cons: [
      'Pieni toimija — suppea sopimusvalikoima',
      'Toiminta keskittyy Pirkanmaan ja Satakunnan raja-alueelle',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Pirkanmaan ja Satakunnan raja-alueen energiatoimija',
      'Sähkönsiirto ja -myynti samalta yhtiöltä',
      'Investoinnit verkon maakaapelointiin ja toimitusvarmuuteen',
    ],
    satisfactionRating: 3.9,
    faq: [
      {
        question: 'Voiko Leppäkosken Sähkön valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Leppäkosken Sähkön siirtoverkko kattaa kuitenkin vain Pirkanmaan ja Satakunnan raja-alueen.',
      },
      {
        question: 'Miten Leppäkosken Sähkö varmistaa toimitusvarmuuden?',
        answer: 'Yhtiö on investoinut merkittävästi sähköverkon maakaapelointiin, mikä vähentää myrskyjen ja luonnonilmiöiden aiheuttamia sähkökatkoja.',
      },
    ],
  },

  'jarvi-suomen-energia': {
    id: 'jarvi-suomen-energia',
    longDescription: `Järvi-Suomen Energia on mikkeliläinen energiayhtiö, joka palvelee Suomen järvialueen laajaa maantieteellistä aluetta. Yhtiö on yksi Itä-Suomen merkittävimmistä energiatoimijoista ja tunnetaan erityisesti laajasta sähkönsiirtoverkostaan, joka kattaa monia kuntia järvialueella.

Järvi-Suomen Energia tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa laajalla alueella. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset sopimukset. Yhtiö tuntee järvialueen haasteet: pitkät etäisyydet, haja-asutus ja saaristo asettavat vaatimuksia sähkönjakelun luotettavuudelle.

Yhtiö investoi sähköverkon uudistamiseen ja toimitusvarmuuden parantamiseen. Järvialueen mökkiasutus tuo omat erityispiirteensä energiantarpeeseen, ja Järvi-Suomen Energia palvelee myös vapaa-ajan asuntoja. Paikallinen asiakaspalvelu on tärkeä osa yhtiön toimintaa.`,
    type: 'regional',
    revenue: 'n.25 milj. € (2025)',
    customerServicePhone: '015 7551',
    pros: [
      'Laaja palvelualue järvialueella ja Itä-Suomessa',
      'Kokemus haja-asutusalueiden ja mökkialueiden palvelusta',
      'Sähkönsiirto ja -myynti samalta yhtiöltä',
      'Paikallinen asiakaspalvelu',
    ],
    cons: [
      'Toiminta keskittyy järvialueelle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut eivät kehittyneimpiä',
    ],
    specialFeatures: [
      'Järvialueen laajin energiatoimija',
      'Erikoistunut haja-asutusalueiden ja mökkialueiden palveluun',
      'Sähkönsiirto ja -myynti samasta yhtiöstä',
    ],
    satisfactionRating: 3.7,
    faq: [
      {
        question: 'Palveleeko Järvi-Suomen Energia myös mökkejä?',
        answer: 'Kyllä. Järvi-Suomen Energia palvelee sekä vakituisia asuntoja että vapaa-ajan asuntoja laajalla järvialueella. Mökille on tarjolla sekä jatkuvia sopimuksia että kausiluonteisia ratkaisuja.',
      },
      {
        question: 'Voiko Järvi-Suomen Energian valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Yhtiön siirtoverkko kattaa kuitenkin vain järvialueen kuntia.',
      },
    ],
  },

  'etela-savon-energia': {
    id: 'etela-savon-energia',
    longDescription: `Etelä-Savon Energia (ESE) on mikkeliläinen energiayhtiö, joka palvelee Etelä-Savon maakuntaa. Yhtiö tarjoaa sähkönmyynnin lisäksi kaukolämpöä, höyryä ja muita energiapalveluita. ESE on vakiinnuttanut asemansa alueen keskeisenä energiatoimijana ja tunnetaan monipuolisista palveluistaan.

Etelä-Savo on viehättävä järvi- ja metsäalue, ja ESE tuntee alueen energiatarpeet — niin kotitalouksien kuin maa- ja metsätalouden osalta. Yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia. ESE hyödyntää alueen biopolttoaineita energiantuotannossaan, mikä tukee paikallista biotaloutta.

ESE panostaa paikalliseen energiantuotantoon ja investoi bioenergian sekä muiden uusiutuvien energialähteiden hyödyntämiseen. Asiakaspalvelu on henkilökohtaista ja paikallista. Yhtiö on tärkeä osa Etelä-Savon elinkeinoelämää ja energiainfrastruktuuria.`,
    type: 'regional',
    revenue: 'n.30 milj. € (2025)',
    customerServicePhone: '015 221 9100',
    pros: [
      'Etelä-Savon alueen monipuolinen energiatoimija',
      'Biopolttoaineisiin perustuva paikallinen energiantuotanto',
      'Henkilökohtainen ja paikallinen asiakaspalvelu',
      'Kaukolämmön ja sähkön yhdistelmäpalvelut',
    ],
    cons: [
      'Toiminta keskittyy Etelä-Savon alueelle',
      'Rajallinen sopimusvalikoima sähkönmyynnissä',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Etelä-Savon keskeinen energiatoimija',
      'Bioenergiaan perustuva paikallinen tuotanto',
      'Monipuolinen palveluvalikoima: sähkö, kaukolämpö, höyry',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Mitä tarkoittaa bioenergia ESE:n tuotannossa?',
        answer: 'ESE hyödyntää paikallisia biopolttoaineita, kuten haketta ja puuperäisiä polttoaineita, kaukolämmön ja sähkön tuotannossa. Tämä tukee alueen metsätaloutta ja vähentää fossiilisten polttoaineiden käyttöä.',
      },
      {
        question: 'Voiko ESE:n valita sähköyhtiöksi muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. ESE:n kaukolämpö ja muut paikallispalvelut ovat kuitenkin alueellisia.',
      },
    ],
  },

  kraftkom: {
    id: 'kraftkom',
    longDescription: `Kraftkom on kokkolalainen energiayhtiö, joka palvelee Pohjanmaan aluetta. Yhtiö on osa Herrfors/Katternö-konsernia ja tarjoaa sähkönmyynnin lisäksi tiedonsiirtopalveluita. Kraftkom tunnetaan erityisesti kaksikielisestä palvelustaan ja paikallisesta läsnäolostaan Pohjanmaalla.

Kraftkom on erikoistunut yhdistämään energia- ja tiedonsiirtopalvelut kokonaisuudeksi, mikä erottaa sen monista muista alueellisista energiayhtiöistä. Sähkönmyynnissä yhtiö tarjoaa pörssisähköä ja kiinteähintaisia sopimuksia. Hinnoittelu on kohtuullista, ja kaksikielinen palvelu toimii sujuvasti.

Paikallisena Pohjanmaan toimijana Kraftkom tuntee alueensa asiakkaat ja heidän tarpeensa. Yhtiö panostaa verkon kehittämiseen ja palvelun laatuun. Katternö-konsernin tuki takaa toiminnan vakauden ja mahdollisuudet investoida tulevaisuuteen.`,
    type: 'regional',
    revenue: 'n.20 milj. € (2025)',
    customerServicePhone: '06 828 8300',
    pros: [
      'Kaksikielinen palvelu (suomi/ruotsi)',
      'Energia- ja tiedonsiirtopalvelut samalta toimijalta',
      'Osa Katternö-konsernia — vakaa taloudellinen pohja',
      'Paikallinen ja henkilökohtainen asiakaspalvelu',
    ],
    cons: [
      'Pieni toimija — suppea sopimusvalikoima',
      'Toiminta keskittyy Pohjanmaan alueelle',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Energia- ja tiedonsiirtopalvelut samalta yhtiöltä',
      'Kaksikielinen palvelu suomeksi ja ruotsiksi',
      'Osa Katternö-konsernia',
    ],
    satisfactionRating: 3.7,
    faq: [
      {
        question: 'Mikä yhteys Kraftkomilla on Herrforsiin?',
        answer: 'Kraftkom ja Herrfors kuuluvat molemmat Katternö-konserniin. Ne toimivat hieman eri alueilla ja painotuksilla, mutta jakavat konsernin resurssit ja osaamisen.',
      },
      {
        question: 'Tarjoaako Kraftkom myös internet-palveluita?',
        answer: 'Kyllä. Kraftkom yhdistää energia- ja tiedonsiirtopalvelut, joten asiakkaalle on tarjolla kokonaispalvelu sähköstä ja tiedonsiirtoyhteydestä.',
      },
    ],
  },

  'kymenlaakson-sahko': {
    id: 'kymenlaakson-sahko',
    longDescription: `Kymenlaakson Sähkö on Kymenlaakson alueen perinteinen energiayhtiö, joka palvelee laajaa asiakaskuntaa Kaakkois-Suomessa. Yhtiö tarjoaa sähkönmyynnin lisäksi sähkönsiirtoa ja muita energiapalveluita. Kymenlaakson Sähkö on vakiinnuttanut asemansa luotettavana alueellisena toimijana, jolla on pitkä historia alueen energiahuollossa.

Kymenlaakso on monipuolinen maakunta, jossa yhdistyvät rannikkoseudun, teollisuuskaupunkien ja maaseutualueiden energiatarpeet. Kymenlaakson Sähkö tuntee nämä vaihtelevat olosuhteet ja palvelee asiakkaitaan monipuolisesti. Sähkösopimukset kattavat pörssisähkön ja kiinteähintaiset sopimukset.

Kymenlaakson Sähkö investoi sähköverkon uudistamiseen ja toimitusvarmuuden parantamiseen. Maakaapelointi ja verkon modernisointi ovat keskeisiä hankkeita. Asiakaspalvelu on paikallista ja henkilökohtaista, ja yhtiö on tärkeä osa Kymenlaakson infrastruktuuria.`,
    type: 'regional',
    revenue: 'n.35 milj. € (2025)',
    customerServicePhone: '05 230 1111',
    pros: [
      'Kymenlaakson alueen perinteinen ja luotettava toimija',
      'Sähkönsiirto ja -myynti samalta yhtiöltä',
      'Henkilökohtainen paikallinen asiakaspalvelu',
      'Investoinnit verkon uudistamiseen ja toimitusvarmuuteen',
    ],
    cons: [
      'Toiminta keskittyy Kymenlaakson alueelle',
      'Rajallinen sopimusvalikoima',
      'Digitaaliset palvelut perusluokassa',
    ],
    specialFeatures: [
      'Kymenlaakson alueen keskeinen energiatoimija',
      'Sähkönsiirto ja -myynti samasta yhtiöstä',
      'Investoinnit maakaapelointiin ja verkon modernisointiin',
    ],
    satisfactionRating: 3.8,
    faq: [
      {
        question: 'Voiko Kymenlaakson Sähkön valita muualta Suomesta?',
        answer: 'Kyllä. Sähkönmyynti on vapaata koko Suomessa. Kymenlaakson Sähkön siirtoverkko kattaa kuitenkin vain Kymenlaakson alueen.',
      },
      {
        question: 'Miten Kymenlaakson Sähkö parantaa toimitusvarmuutta?',
        answer: 'Yhtiö investoi merkittävästi sähköverkon maakaapelointiin ja modernisointiin. Tämä vähentää sääilmiöiden aiheuttamia sähkökatkoja ja parantaa palvelun laatua.',
      },
    ],
  },
};
