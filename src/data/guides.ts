import { Guide } from '@/types';

export const guides: Guide[] = [
  {
    slug: 'sahkosopimustyypit',
    title: 'Sähkösopimustyypit — Kiinteä, pörssi vai yhdistelmä?',
    description:
      'Vertaa sähkösopimustyyppejä: kiinteähintainen, pörssisähkö, yhdistelmäsopimus ja toistaiseksi voimassa oleva. Löydä sinulle sopivin vaihtoehto.',
    category: 'Perustiedot',
    publishedAt: '2025-09-15',
    updatedAt: '2026-03-01',
    readTime: 10,
    author: 'Energiavertailu-toimitus',
    tags: ['sähkösopimus', 'pörssisähkö', 'kiinteä hinta', 'sopimustyypit'],
    relatedGuides: ['sahkon-kilpailutus', 'porssisahko-opas', 'sahkon-hinnan-muodostuminen'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'kiintea-hintainen', title: 'Kiinteähintainen sähkösopimus', level: 2 },
      { id: 'porssisahko', title: 'Pörssisähkösopimus (spot)', level: 2 },
      { id: 'yhdistelma', title: 'Yhdistelmäsopimus (hybridi)', level: 2 },
      { id: 'toistaiseksi', title: 'Toistaiseksi voimassa oleva sopimus', level: 2 },
      { id: 'vertailutaulukko', title: 'Vertailutaulukko', level: 2 },
      { id: 'kenelle-mikä-sopii', title: 'Kenelle mikä sopii?', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Sähkösopimuksen valinta on yksi tärkeimmistä päätöksistä, joka vaikuttaa suoraan kotitaloutesi kuukausittaisiin menoihin. Suomen sähkömarkkinoilla on tarjolla neljä pääasiallista sopimustyyppiä, ja jokaisella on omat vahvuutensa ja heikkoutensa. Tässä oppaassa käymme läpi kaikki vaihtoehdot, jotta voit tehdä tietoisen päätöksen.

Sähkösopimuksen kokonaiskustannus koostuu aina kahdesta osasta: **energiamaksusta** (c/kWh) ja **kuukausittaisesta perusmaksusta** (€/kk). Lisäksi sähkölaskuun tulee aina sähkön siirtomaksu ja verot, jotka eivät riipu sähkönmyyjästäsi.

## Kiinteähintainen sähkösopimus {#kiintea-hintainen}

Kiinteähintaisessa sopimuksessa sähkön energiamaksu pysyy samana koko sopimuskauden ajan. Tyypilliset sopimuspituudet ovat **12 kuukautta** ja **24 kuukautta**.

### Miten se toimii?

Kun teet kiinteähintaisen sopimuksen, sovit sähköyhtiön kanssa tietyn c/kWh-hinnan, joka ei muutu sopimuskauden aikana. Riippumatta siitä, nousevatko vai laskevatko sähkön markkinahinnat, sinun hintasi pysyy samana.

### Edut

- **Ennustettavuus**: Tiedät tarkalleen, paljonko maksat sähköstä. Budjettisi on helppo suunnitella.
- **Suoja hinnannousuilta**: Jos markkinahinnat nousevat, sinä maksat edelleen sovitun hinnan.
- **Yksinkertaisuus**: Ei tarvitse seurata sähkön tuntikohtaisia hintoja.
- **Mielenrauha**: Erityisesti talvikuukausina, kun sähkön hinta voi nousta merkittävästi.

### Haitat

- **Ei hyötyä halvoista ajanjaksoista**: Jos markkinahinnat laskevat merkittävästi, maksat silti sovitun korkeamman hinnan.
- **Irtisanomismaksu**: Määräaikaisen sopimuksen ennenaikainen päättäminen voi aiheuttaa lisäkuluja.
- **Riskipreemio**: Kiinteä hinta on yleensä markkinoiden keskihintaa korkeampi, koska sähköyhtiö ottaa hintariskin kantaakseen.

### Tyypillinen hintataso (2026)

Kiinteähintaisten sopimusten energiamaksu vaihtelee tyypillisesti **7,49–8,89 c/kWh** välillä 12 kuukauden sopimuksissa. 24 kuukauden sopimukset ovat yleensä 0,5–1,0 c/kWh kalliimpia.

## Pörssisähkösopimus (spot) {#porssisahko}

Pörssisähkössä sähkön hinta määräytyy tunneittain pohjoismaisen sähköpörssin **Nord Poolin** mukaan. Maksat sähkönmyyjälle pörssihinnan päälle **marginaalin** (tyypillisesti 0,29–0,49 c/kWh) sekä **kuukausimaksun** (1,99–3,99 €/kk).

### Miten se toimii?

Nord Pool -sähköpörssissä sähkön hinta määräytyy joka tunti kysynnän ja tarjonnan perusteella. Seuraavan päivän hinnat julkaistaan iltapäivällä klo 13 jälkeen. Pörssisähköasiakkaana maksat jokaisen tunnin kulutuksestasi sen tunnin pörssihinnan + myyjän marginaalin.

### Edut

- **Pitkällä aikavälillä edullisin**: Historiallisesti pörssisähkö on ollut halvempi vaihtoehto kuin kiinteähintainen sähkö.
- **Läpinäkyvä hinnoittelu**: Näet tarkalleen, mistä hintasi koostuu.
- **Ei sitovuutta**: Useimmat pörssisähkösopimukset eivät ole määräaikaisia.
- **Mahdollisuus optimoida**: Voit ajoittaa suuret kulutukset halvimpiin tunteihin.

### Haitat

- **Hintavaihtelut**: Sähkön hinta voi vaihdella merkittävästi tunnista ja päivästä toiseen.
- **Hintapiikit**: Äärimmäisissä tilanteissa (kylmä talvi, tuulettomuus) hinta voi nousta hyvin korkeaksi.
- **Vaatii aktiivisuutta**: Hyötyäkseen täysin pörssisähköstä on hyvä seurata hintoja ja ajoittaa kulutusta.

### Tyypillinen hintataso (2026)

Marginaali: **0,29–0,49 c/kWh**, kuukausimaksu: **1,99–3,99 €/kk**. Pörssisähkön kokonaiskustannus riippuu markkinahinnoista.

## Yhdistelmäsopimus (hybridi) {#yhdistelma}

Yhdistelmä- eli hybridisopimuksessa osa sähkön hinnasta on kiinteä ja osa seuraa pörssihintaa. Tämä tarjoaa kompromissin ennustettavuuden ja edullisuuden välillä.

### Miten se toimii?

Tyypillisessä yhdistelmäsopimuksessa esimerkiksi 50% hinnasta on kiinteää ja 50% pörssihintaa. Toiset yhtiöt tarjoavat sopimuksia, joissa on hintakatto: sähkön hinta seuraa pörssihintaa, mutta ei voi ylittää sovittua kattohintaa.

### Edut

- **Osa pörssisähkön edullisuudesta**: Hyödyt halvista markkinahinnoista osittain.
- **Rajoitettu riski**: Kiinteä osa tai hintakatto suojaa pahimmilta hintapiikeiltä.
- **Tasainen laskutus**: Lasku on ennustettavampi kuin puhtaassa pörssisähkössä.

### Haitat

- **Monimutkaisempi rakenne**: Vaikeampi ymmärtää kuin puhdas kiinteä tai pörssisähkö.
- **Ei halvimpia pörssisähkön hyötyjä**: Et saa täyttä hyötyä halvimmista ajanjaksoista.
- **Rajallinen tarjonta**: Harva sähköyhtiö tarjoaa todellista yhdistelmäsopimusta.

## Toistaiseksi voimassa oleva sopimus {#toistaiseksi}

Toistaiseksi voimassa oleva sopimus ei ole määräaikainen. Se jatkuu automaattisesti, kunnes irtisanot sen. Hinta voi muuttua sähköyhtiön ilmoituksella.

### Miten se toimii?

Sopimus on voimassa kunnes jompikumpi osapuoli irtisanoo sen. Sähköyhtiö voi muuttaa hintaa ilmoittamalla siitä etukäteen (yleensä 30 päivää). Tämä sopimustyyppi on yleensä kalliimpi kuin muut vaihtoehdot.

### Edut

- **Täysi joustavuus**: Voit vaihtaa sähköyhtiötä milloin tahansa ilman irtisanomismaksua.
- **Yksinkertaisuus**: Ei tarvitse miettiä sopimuskausia tai uusimista.

### Haitat

- **Kalliimpi**: Tyypillisesti 1–2 c/kWh kalliimpi kuin kiinteähintaiset tai pörssisähkösopimukset.
- **Epävarma hinta**: Sähköyhtiö voi nostaa hintaa ilmoittamalla siitä etukäteen.
- **Ei parasta arvoa rahalle**: Useimmille kuluttajille muut sopimustyypit ovat edullisempia.

## Vertailutaulukko {#vertailutaulukko}

| Ominaisuus | Kiinteä | Pörssi | Yhdistelmä | Toistaiseksi |
|---|---|---|---|---|
| **Hintaennustettavuus** | Erinomainen | Heikko | Hyvä | Kohtalainen |
| **Pitkän aikavälin edullisuus** | Kohtalainen | Erinomainen | Hyvä | Heikko |
| **Joustavuus** | Heikko | Erinomainen | Kohtalainen | Erinomainen |
| **Riskitaso** | Matala | Korkea | Kohtalainen | Kohtalainen |
| **Sopimuspituus** | 12–24 kk | Ei määräaikaa | 12–24 kk | Toistaiseksi |
| **Vaatii aktiivisuutta** | Ei | Kyllä | Jonkin verran | Ei |
| **Tyypillinen hinta (c/kWh)** | 7,5–8,9 | Pörssi + 0,3–0,5 | 6,5–8,0 | 9,0–10,0 |

## Kenelle mikä sopii? {#kenelle-mikä-sopii}

### Kiinteä hinta sopii sinulle, jos...
- Haluat ennustettavat sähkökulut
- Et halua seurata sähkön hintoja aktiivisesti
- Olet suurkuluttaja (sähkölämmitys) ja haluat suojautua talvien hintapiikeiltä
- Arvostat mielenrauhaa ja budjettikuria

### Pörssisähkö sopii sinulle, jos...
- Olet valmis seuraamaan sähkön hintoja ja ajoittamaan kulutusta
- Haluat pitkällä aikavälillä mahdollisimman edullisen sähkön
- Pystyt joustamaan kulutuksessasi (pesukoneen, saunan, latauksen ajoitus)
- Sinulla on älykotijärjestelmiä, jotka voivat optimoida kulutusta

### Yhdistelmäsopimus sopii sinulle, jos...
- Haluat pörssisähkön etuja mutta pienemmällä riskillä
- Arvostat kohtuullista ennustettavuutta ja edullisuutta
- Et halua täysin altistua hintapiikeille

### Toistaiseksi voimassa oleva sopimus sopii sinulle, jos...
- Tarvitset tilapäisen ratkaisun (esim. muutto)
- Et halua sitoutua mihinkään
- Olet valmis maksamaan joustavuudesta lisähintaa

## Yhteenveto {#yhteenveto}

Sähkösopimuksen valinta riippuu henkilökohtaisista tarpeistasi ja riskinsietokyvystäsi. **Pörssisähkö** on historiallisesti edullisin vaihtoehto aktiivisille kuluttajille. **Kiinteähintainen sopimus** tarjoaa mielenrauhaa ja ennustettavuutta. **Yhdistelmäsopimus** on kompromissi näiden väliltä, ja **toistaiseksi voimassa oleva** sopimus sopii lähinnä väliaikaisiin tilanteisiin.

Suosittelemme vertailemaan sopimuksia säännöllisesti ja vaihtamaan aina, kun löydät paremman vaihtoehdon. Sähkönmyyjän vaihto on ilmaista, eikä se aiheuta katkoksia sähkön toimitukseen.`,
  },

  {
    slug: 'sahkon-kilpailutus',
    title: 'Sähkön kilpailutus — Askel askeleelta -opas',
    description:
      'Täydellinen opas sähkösopimuksen kilpailuttamiseen. Opi vaihtamaan sähköyhtiötä helposti ja turvallisesti ilman katkoksia.',
    category: 'Käytännön oppaat',
    publishedAt: '2025-10-01',
    updatedAt: '2026-03-10',
    readTime: 8,
    author: 'Energiavertailu-toimitus',
    tags: ['kilpailutus', 'sähkönvaihto', 'sähkösopimus', 'säästäminen'],
    relatedGuides: ['sahkosopimustyypit', 'sahkon-hinnan-muodostuminen', 'energiansaastovinkit'],
    tableOfContents: [
      { id: 'miksi-kilpailuttaa', title: 'Miksi kilpailuttaa sähkö?', level: 2 },
      { id: 'ennen-vaihtoa', title: 'Ennen vaihtoa — tarkista nämä', level: 2 },
      { id: 'vaihe-1', title: 'Vaihe 1: Selvitä nykyinen sopimuksesi', level: 2 },
      { id: 'vaihe-2', title: 'Vaihe 2: Vertaa vaihtoehtoja', level: 2 },
      { id: 'vaihe-3', title: 'Vaihe 3: Valitse ja tee sopimus', level: 2 },
      { id: 'vaihe-4', title: 'Vaihe 4: Vaihto tapahtuu automaattisesti', level: 2 },
      { id: 'aikataulu', title: 'Aikataulu ja käytännön asiat', level: 2 },
      { id: 'vinkit', title: 'Vinkit onnistuneeseen kilpailutukseen', level: 2 },
      { id: 'usein-kysytyt', title: 'Usein kysytyt kysymykset', level: 2 },
    ],
    content: `## Miksi kilpailuttaa sähkö? {#miksi-kilpailuttaa}

Sähkön kilpailuttaminen on yksi helpoimmista tavoista säästää kotitalouden kuluissa. Suomalaiset maksavat vuosittain satoja euroja liikaa sähköstään, koska eivät vertaile sopimuksia säännöllisesti. Kilpailutus on **ilmaista**, **helppoa** ja **riskitöntä** — sähkö ei katkea hetkeksikään.

### Paljonko voi säästää?

Tyypillinen suomalainen kotitalous voi säästää **50–300 euroa vuodessa** vaihtamalla edullisempaan sähkösopimukseen. Sähkölämmitteisissä omakotitaloissa säästö voi olla jopa **500 euroa tai enemmän**.

## Ennen vaihtoa — tarkista nämä {#ennen-vaihtoa}

Ennen kuin aloitat kilpailutuksen, tarkista seuraavat asiat:

1. **Nykyinen sopimuksesi tyyppi ja hinta** — löydät tiedot sähkölaskustasi tai sähköyhtiösi verkkopalvelusta
2. **Sopimuskauden päättyminen** — määräaikaisen sopimuksen ennenaikainen päättäminen voi aiheuttaa irtisanomismaksun
3. **Vuosikulutuksesi** — tarvitset tämän tarjousten vertailuun (löytyy sähkölaskusta, yksikkö kWh)
4. **Sähkönsiirtäjäsi** — siirtosopimus pysyy samana, se ei vaihdu sähkönmyyjän vaihdon yhteydessä

## Vaihe 1: Selvitä nykyinen sopimuksesi {#vaihe-1}

Ensimmäinen askel on tietää, mitä maksat nykyisestä sähköstäsi. Tarkista sähkölaskustasi tai verkkopalvelustasi:

- **Energiamaksu** (c/kWh) — tämä on se osa, jonka sähkönmyyjä perii
- **Perusmaksu** (€/kk) — kuukausittainen kiinteä maksu sähkönmyyjälle
- **Sopimustyyppi** — kiinteä, pörssi vai toistaiseksi voimassa oleva
- **Sopimuskauden päättyminen** — milloin sopimuksesi päättyy

Jos sinulla on määräaikainen sopimus, tarkista myös **irtisanomisehdot**. Useimmat sopimukset voi irtisanoa ilman lisäkuluja sopimuksen päättyessä. Ennenaikainen päättäminen voi aiheuttaa kohtuullisen korvauksen.

### Vuosikulutuksen selvittäminen

Vuosikulutus on tärkein luku vertailussa. Löydät sen:
- Viimeisestä vuosilaskelmasta
- Sähkönsiirtäjäsi verkkopalvelusta
- Datahubista (kantaverkkotoimija Fingridin palvelu)

## Vaihe 2: Vertaa vaihtoehtoja {#vaihe-2}

Kun tiedät nykyisen sopimuksesi tiedot ja vuosikulutuksesi, voit aloittaa vertailun:

1. **Käytä vertailupalvelua** — esimerkiksi Energiavertailu.fi:n vertailulaskuria
2. **Syötä vuosikulutuksesi** — näin saat vertailukelpoisia vuosikustannuksia
3. **Vertaile kokonaiskustannusta** — älä katso pelkkää c/kWh-hintaa, vaan huomioi myös kuukausimaksu
4. **Huomioi sopimustyyppi** — päätä haluatko kiinteän, pörssin vai yhdistelmän

### Mitä vertailussa kannattaa huomioida?

- **Kokonaiskustannus vuodessa** — tämä on tärkein luku
- **Sopimustyyppi** — kiinteä vs. pörssi sopivat eri tilanteisiin
- **Vihreä sähkö** — haluatko uusiutuvaa energiaa?
- **Lisäpalvelut** — sovellus, hintahälytykset, kulutusseuranta
- **Yhtiön luotettavuus** — asiakasarviot ja historia

## Vaihe 3: Valitse ja tee sopimus {#vaihe-3}

Kun olet löytänyt parhaan vaihtoehdon:

1. **Siirry sähköyhtiön verkkosivuille** tai tee sopimus suoraan vertailupalvelun kautta
2. **Täytä tilauslomake** — tarvitset nimen, osoitteen, henkilötunnuksen ja käyttöpaikan tiedot
3. **Vahvista sopimus** — saat vahvistuksen sähköpostiin
4. **Uusi yhtiö hoitaa loput** — vanhan sopimuksen irtisanominen ja vaihdon koordinointi

### Huomioitavaa sopimuksen teossa

- Lue sopimusehdot huolellisesti
- Tarkista perusmaksu ja mahdolliset lisämaksut
- Varmista sopimuskauden pituus
- Tarkista irtisanomisehdot

## Vaihe 4: Vaihto tapahtuu automaattisesti {#vaihe-4}

Kun olet tehnyt uuden sopimuksen, **kaikki tapahtuu automaattisesti**:

1. Uusi sähköyhtiö ilmoittaa vanhalle yhtiölle vaihdosta
2. Vanha sopimus päättyy ja uusi alkaa sovittuna ajankohtana
3. Sähkö ei katkea hetkeksikään
4. Sähkönsiirto jatkuu normaalisti — vain sähkönmyyjä vaihtuu

**Sinun ei tarvitse tehdä mitään** vanhan sopimuksen irtisanomiseksi. Uusi sähköyhtiö hoitaa kaiken puolestasi.

## Aikataulu ja käytännön asiat {#aikataulu}

### Vaihdon kesto
- **Toistaiseksi voimassa oleva → uusi**: 2–4 viikkoa
- **Päättyvä määräaikainen → uusi**: alkaa sopimuskauden päättyessä
- **Ennenaikainen vaihto**: 2–4 viikkoa + mahdollinen irtisanomismaksu

### Sähkö ei katkea
Sähkönmyyjän vaihto **ei koskaan aiheuta katkoksia**. Sähkön fyysinen toimitus ja siirto ovat täysin erillisiä sähkönmyynnistä. Johtoihisi tulee täsmälleen sama sähkö riippumatta myyjästäsi.

### Sähkönsiirto pysyy samana
Sähkönsiirtäjäsi (jakeluverkkoyhtiö) **ei vaihdu**. Siirtoyhtiö on alueellinen monopoli, eikä sitä voi kilpailuttaa. Sähkönsiirron hinta pysyy samana riippumatta sähkönmyyjästä.

## Vinkit onnistuneeseen kilpailutukseen {#vinkit}

1. **Kilpailuta säännöllisesti** — tee vertailu vähintään kerran vuodessa
2. **Huomioi kokonaisuus** — ei pelkkää c/kWh-hintaa vaan kokonaiskustannus
3. **Harkitse pörssisähköä** — pitkällä aikavälillä usein edullisin vaihtoehto
4. **Älä pelkää vaihtaa** — vaihto on ilmaista ja riskitöntä
5. **Vaihda ennen talvea** — kiinteähintaiset sopimukset ovat yleensä edullisimpia kesällä
6. **Seuraa markkinaa** — sähkön hinta vaihtelee vuodenajan ja markkinatilanteen mukaan
7. **Kysy tarjouksia** — jotkut yhtiöt antavat erikoistarjouksia aktiivisille kilpailuttajille

## Usein kysytyt kysymykset {#usein-kysytyt}

### Voiko sähkönmyyjän vaihto aiheuttaa sähkökatkoksen?
**Ei.** Sähkönmyyjän vaihto ei koskaan aiheuta katkoksia. Sähkö tulee samoista johdoista riippumatta myyjästä.

### Maksaako sähkönmyyjän vaihto jotain?
**Ei.** Sähkönmyyjän vaihto on aina ilmaista. Ainoastaan määräaikaisen sopimuksen ennenaikainen päättäminen voi aiheuttaa kohtuullisen korvauksen.

### Kuinka usein kannattaa kilpailuttaa?
Suosittelemme vertailua **vähintään kerran vuodessa** ja aina kun sopimuksesi on päättymässä.

### Tarvitseeko minun irtisanoa vanha sopimukseni?
**Ei.** Uusi sähköyhtiö hoitaa vanhan sopimuksen irtisanomisen puolestasi.

### Mitä tapahtuu, jos uusi sähköyhtiö menee konkurssiin?
Sähkösi ei katkea. Sähkönsiirtäjäsi toimittaa sähkön toimitusvelvollisuuden perusteella, kunnes löydät uuden myyjän.`,
  },

  {
    slug: 'energiansaastovinkit',
    title: 'Energiansäästövinkit kotiin — Kattava opas',
    description:
      'Käytännölliset vinkit kotitalouden sähkönkulutuksen vähentämiseen. Huonekohtaiset ohjeet, laitevinkit ja älykodin ratkaisut.',
    category: 'Säästäminen',
    publishedAt: '2025-11-01',
    updatedAt: '2026-03-15',
    readTime: 12,
    author: 'Energiavertailu-toimitus',
    tags: ['energiansäästö', 'sähkönkulutus', 'vinkit', 'älykoti'],
    relatedGuides: ['porssisahko-opas', 'sahkosopimustyypit', 'aurinkopaneeli-opas'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'keittio', title: 'Keittiö', level: 2 },
      { id: 'sauna-ja-kylpyhuone', title: 'Sauna ja kylpyhuone', level: 2 },
      { id: 'lammitys', title: 'Lämmitys', level: 2 },
      { id: 'valaistus', title: 'Valaistus', level: 2 },
      { id: 'pyykinpesu-ja-kuivaus', title: 'Pyykinpesu ja kuivaus', level: 2 },
      { id: 'elektroniikka', title: 'Elektroniikka ja kodinkoneet', level: 2 },
      { id: 'alykoti', title: 'Älykodin ratkaisut', level: 2 },
      { id: 'vuodenaikojen-strategiat', title: 'Vuodenaikojen strategiat', level: 2 },
      { id: 'investoinnit', title: 'Kustannus-hyötyanalyysi investoinneista', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Suomalainen kotitalous kuluttaa keskimäärin 2 000–25 000 kWh sähköä vuodessa riippuen asumismuodosta ja lämmitystavasta. Pienilläkin muutoksilla arjen rutiineissa voit säästää **100–500 euroa vuodessa** sähkölaskuissa. Tässä oppaassa käymme läpi konkreettiset säästövinkit huonekohtaisesti ja laitteittain.

Energiansäästö ei tarkoita mukavuudesta tinkimistä. Useimmat säästöt syntyvät **paremmista tavoista**, **oikeista asetuksista** ja **älykkäästä ajoituksesta** — erityisesti pörssisähköasiakkaille ajoitus on avainasemassa.

## Keittiö {#keittio}

Keittiö on kodin yksi suurimmista sähkön kuluttajista. Jääkaappi, pakastin, uuni, liesi ja astianpesukone ovat kaikki merkittäviä energiankäyttäjiä.

### Jääkaappi ja pakastin
- **Oikea lämpötila**: Jääkaappi +5°C, pakastin -18°C. Jokainen ylimääräinen aste vie 5-10% enemmän energiaa.
- **Sulata pakastin säännöllisesti**: Jääkerros huonontaa tehokkuutta merkittävästi.
- **Älä laita kuumia ruokia suoraan jääkaappiin**: Anna ruoan jäähtyä ensin huoneenlämpöiseksi.
- **Pidä ovet kiinni**: Vähennä oven avaamiskertoja ja -aikaa.
- **Tarkista tiivisteet**: Vuotavat tiivisteet lisäävät kulutusta huomattavasti.

### Uuni ja liesi
- **Käytä kiertoilmaa**: Kiertoilma on 20% energiatehokkaampaa kuin ylä-/alalämpö ja mahdollistaa alemman lämpötilan.
- **Älä esilämmitä turhaan**: Useimmat ruoat eivät vaadi esilämmitystä.
- **Hyödynnä jälkilämpö**: Sammuta uuni 10 minuuttia ennen valmistumista.
- **Käytä kansia**: Kattilassa kannen käyttö säästää jopa 30% energiaa.
- **Oikea keittolevyn koko**: Käytä keittolevyä, joka vastaa kattilan kokoa.

### Astianpesukone
- **Täytä koneellinen**: Puolityhjä kone kuluttaa saman verran kuin täysi.
- **Käytä eco-ohjelmaa**: Eco-ohjelma säästää 30-50% energiaa normaalihuuhtelun sijaan.
- **Ajoita halpoihin tunteihin**: Pörssisähköasiakkaat voivat säästää ajastamalla pesun yöhön.

## Sauna ja kylpyhuone {#sauna-ja-kylpyhuone}

Suomalainen sähkösauna on merkittävä sähkönkuluttaja. Yksi saunomiskerta kuluttaa tyypillisesti **5–15 kWh** kiukaan tehosta ja saunomisajasta riippuen.

### Sauna
- **Lyhennä esilämmitysaikaa**: Useimmat kiukaat lämpiävät 30-45 minuutissa.
- **Käytä kiuasta vain tarvittavan ajan**: Sammuta kiuas saunomisen päätyttyä.
- **Harkitse puukiuasta**: Puukiuas ei kuluta sähköä ja on monien mielestä tunnelmallisempi.
- **Ajoita saunominen**: Pörssisähköasiakkaat voivat säästää merkittävästi saunomalla halvimpina tunteina.
- **Tarkista kiukaan kunto**: Vanha tai huonosti toimiva kiuas kuluttaa enemmän.

### Kylpyhuone
- **Suosi suihkua kylvyn sijaan**: Suihku kuluttaa 50-70% vähemmän lämmintä vettä.
- **Lyhennä suihkuaikaa**: 5 minuutin suihku riittää puhtauteen.
- **Lattialämmityksen termostaatti**: Aseta kylpyhuoneen lattialämmitys 25-27°C:seen.

## Lämmitys {#lammitys}

Lämmitys on sähkölämmitteisissä taloissa ylivoimaisesti suurin sähkönkuluttaja. Oikeilla toimenpiteillä voit säästää merkittävästi.

### Sisälämpötila
- **Laske asteen verran**: Jokainen aste alaspäin säästää noin 5% lämmityskuluista.
- **Eri lämpötilat eri huoneisiin**: Makuuhuone 18-20°C, olohuone 21°C, kylpyhuone 23°C.
- **Pudota lämpötilaa yöllä**: 1-2 asteen pudotus yöajaksi säästää selvästi.
- **Pudota lämpötilaa poissa ollessa**: Lomamatkojen ajaksi laske sisälämpötila 15-17°C:seen.

### Ilmalämpöpumppu
- **Investoi ilmalämpöpumppuun**: Säästää 30-50% suoran sähkölämmityksen kustannuksista.
- **Pidä suodattimet puhtaina**: Likainen suodatin heikentää tehokkuutta 10-15%.
- **Aseta oikea lämpötila**: 20-22°C on optimaalinen.
- **Älä sammuta kokonaan**: Tasainen käyttö on energiatehokkaampaa kuin päälle/pois-syklaus.

### Eristys ja tiivistys
- **Tiivistä ikkunat ja ovet**: Vuotavat rakenteet lisäävät lämmityskustannuksia 10-30%.
- **Lisäeristys ullakko**: Yksi kustannustehokkaimmista investoinneista.
- **Tuuletusluukut**: Käytä lyhyttä, tehokasta tuuletusta pitkän rakotuuletuksen sijaan.

## Valaistus {#valaistus}

- **Vaihda LED-valoihin**: LED kuluttaa 80% vähemmän kuin hehkulamppu ja 50% vähemmän kuin energiansäästölamppu.
- **Käytä liiketunnistimia**: Eteisessä, käytävissä ja pihavalaisinmisessa.
- **Hyödynnä päivänvaloa**: Pidä verhot auki päivällä.
- **Sammuta valot**: Yksinkertaisin ja tehokkain tapa — sammuta valot huoneista, joissa et ole.
- **Himmentimet**: Himmennä valoja, kun täysi teho ei ole tarpeen.

## Pyykinpesu ja kuivaus {#pyykinpesu-ja-kuivaus}

- **Täytä kone**: Puolityhjä kone kuluttaa lähes saman verran kuin täysi.
- **Pese matalammassa lämpötilassa**: 30°C riittää useimmille vaatteille. 40°C vain tarvittaessa.
- **Vältä kuivausrumpua**: Kuivausrumpu kuluttaa paljon sähköä. Kuivaa pyykit narulla.
- **Käytä korkeaa linkousnopeutta**: Vähentää kuivausaikaa merkittävästi.
- **Ajoita halvimpiin tunteihin**: Pörssisähköasiakkaille yöpesu on usein edullisinta.

## Elektroniikka ja kodinkoneet {#elektroniikka}

- **Sammuta lepotilasta**: TV, tietokone ja muut laitteet kuluttavat stand-by-tilassa 5-10% energiastaan. Käytä pistokeryhmissä pääkatkaisinta.
- **Valitse energiatehokkaita laitteita**: Kiinnitä huomiota energialuokkaan (A-G).
- **Päivitä vanhat laitteet**: Yli 10 vuotta vanha jääkaappi kuluttaa usein kaksinkertaisesti uuteen verrattuna.
- **Tietokoneen virransäästö**: Käytä lepotilaa ja ajoitettua sammutusta.

## Älykodin ratkaisut {#alykoti}

Älykodin teknologia voi tuoda merkittäviä säästöjä erityisesti pörssisähköasiakkaille:

### Älytermostaatit
- Ohjelmoitava lämmityksen ajastus huonekohtaisesti
- Automaattinen lämpötilan pudotus poissa ollessa
- Etähallinta puhelinsovelluksella

### Älypistorasiat
- Sammuta laitteet automaattisesti aikataululla
- Ohjaa sähkönkäyttöä halvimpiin tunteihin pörssisähkön hintasignaalien perusteella
- Seuraa laitekohtaista kulutusta

### Home Assistant tai vastaava järjestelmä
- Automatisoi koko kodin energianhallinta
- Yhdistä pörssisähkön hinta automaatioihin: lämmitys, lataus, lämminvesivaraaja
- Tyypillinen säästö: **10-20%** pörssisähkön energiakustannuksista

## Vuodenaikojen strategiat {#vuodenaikojen-strategiat}

### Talvi (joulu-helmikuu)
- Lämmitys on suurin kuluerä — keskity eristykseen ja termostaatteihin
- Pörssisähkön hinnat korkeimmillaan — vältä kulutuspiikkejä
- Hyödynnä yöajan halvempia hintoja

### Kevät (maalis-toukokuu)
- Vähennä lämmitystä asteittain
- Hyödynnä kasvava päivänvalo
- Hyvä aika vertailla sähkösopimuksia

### Kesä (kesä-elokuu)
- Vähiten sähkönkulutusta — sähkön hinta usein edullisin
- Kiinteähintaiset sopimukset usein edullisimpia nyt
- Aurinkopaneelien tuottohuippu

### Syksy (syys-marraskuu)
- Valmistaudu talveen: tarkista eristykset ja tiivisteet
- Huolla ilmalämpöpumppu ennen kylmiä
- Tee sähkösopimus ennen talvihintojen nousua

## Kustannus-hyötyanalyysi investoinneista {#investoinnit}

| Investointi | Kustannus | Säästö/vuosi | Takaisinmaksuaika |
|---|---|---|---|
| LED-valaistus (koko koti) | 100–300 € | 50–150 € | 1–3 vuotta |
| Ilmalämpöpumppu | 1 500–3 000 € | 300–800 € | 2–5 vuotta |
| Älytermostaatit | 200–500 € | 100–300 € | 1–3 vuotta |
| Lisäeristys (ullakko) | 1 000–3 000 € | 200–600 € | 3–5 vuotta |
| Ikkunoiden tiivistys | 50–200 € | 50–200 € | 0,5–1 vuosi |
| Aurinkopaneelit | 5 000–12 000 € | 500–1 500 € | 5–10 vuotta |

Investointien kannattavuus riippuu asunnon koosta, nykyisestä kunnosta ja sähkön hinnasta. Suurimmat säästöt saavutetaan tyypillisesti lämmitykseen liittyvillä investoinneilla sähkölämmitteisissä taloissa.`,
  },

  {
    slug: 'porssisahko-opas',
    title: 'Pörssisähkö-opas — Kaikki mitä sinun tarvitsee tietää',
    description:
      'Kattava opas pörssisähköön: miten Nord Pool toimii, milloin pörssisähkö kannattaa, vinkit kulutuksen optimointiin ja kausivaihtelut.',
    category: 'Pörssisähkö',
    publishedAt: '2025-08-15',
    updatedAt: '2026-03-20',
    readTime: 11,
    author: 'Energiavertailu-toimitus',
    tags: ['pörssisähkö', 'Nord Pool', 'spot-hinta', 'sähköpörssi'],
    relatedGuides: ['sahkosopimustyypit', 'sahkon-hinnan-muodostuminen', 'energiansaastovinkit'],
    tableOfContents: [
      { id: 'mita-porssisahko-on', title: 'Mitä pörssisähkö on?', level: 2 },
      { id: 'nord-pool', title: 'Miten Nord Pool toimii?', level: 2 },
      { id: 'hinnan-muodostuminen', title: 'Pörssisähkön hinnan muodostuminen', level: 2 },
      { id: 'milloin-kannattaa', title: 'Milloin pörssisähkö kannattaa?', level: 2 },
      { id: 'milloin-ei-kannata', title: 'Milloin pörssisähkö ei kannata?', level: 2 },
      { id: 'vinkit', title: 'Vinkit pörssisähkön käyttäjälle', level: 2 },
      { id: 'kausivaihtelut', title: 'Kuukausi- ja kausivaihtelut', level: 2 },
      { id: 'tyokalut', title: 'Hyödylliset työkalut ja sovellukset', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Mitä pörssisähkö on? {#mita-porssisahko-on}

Pörssisähkö on sähkösopimus, jossa sähkön energiahinta vaihtelee tunneittain pohjoismaisen sähköpörssin **Nord Poolin** hintojen mukaan. Toisin kuin kiinteähintaisessa sopimuksessa, pörssisähkön hinta on eri joka tunti joka päivä. Asiakas maksaa tuntikohtaisen pörssihinnan lisäksi sähkönmyyjälle **marginaalin** (tyypillisesti 0,29–0,49 c/kWh) ja **kuukausimaksun** (1,99–3,99 €/kk).

Pörssisähkö on Suomessa yleisin sähkösopimuksen muoto, ja sen suosio on kasvanut merkittävästi viime vuosina. Historiallisesti pörssisähkö on ollut pitkällä aikavälillä **edullisin** sähkösopimuksen muoto, mutta se vaatii kuluttajalta aktiivisuutta ja joustoa kulutuksen ajoittamisessa.

## Miten Nord Pool toimii? {#nord-pool}

**Nord Pool** on pohjoismainen sähköpörssi, jossa sähkön tukkuhinta määräytyy päivittäin. Se on Euroopan suurin sähkön spot-markkina ja kattaa Pohjoismaat, Baltian maat ja osan Keski-Euroopasta.

### Hinnan määräytyminen

1. **Tuottajat** (voimalaitos, tuulipuisto, aurinkovoimala) tarjoavat sähköä tiettyyn hintaan
2. **Ostajat** (sähkönmyyjät, teollisuus) ilmoittavat, paljonko haluavat ostaa ja mihin hintaan
3. **Nord Pool** laskee kysynnän ja tarjonnan kohtaamisen joka tunti
4. **Hinta muodostuu** pisteessä, jossa tarjonta ja kysyntä kohtaavat

Seuraavan päivän tuntihinnat julkaistaan joka päivä noin **klo 13:00** (CET), eli Suomen aikaa noin **klo 14:00**. Tämä tarkoittaa, että tiedät aina edellisenä iltapäivänä seuraavan päivän sähkön hinnat tunneittain.

### Suomen hinta-alue

Suomi kuuluu Nord Poolin **FI-hinta-alueeseen**. Suomen hinta voi poiketa muista Pohjoismaisista alueista johtuen:
- Siirtokapasiteetista maiden välillä
- Suomen omasta tuotannosta ja kysynnästä
- Tuulivoiman tuotannosta Pohjoismaissa
- Tuonnista Ruotsista, Virosta ja Norjasta

## Pörssisähkön hinnan muodostuminen {#hinnan-muodostuminen}

Pörssisähkön kokonaiskustannus koostuu seuraavista osista:

### 1. Nord Pool -tuntihinta
Vaihtelee tunnista toiseen. Voi olla negatiivinen (runsas tuotanto), nolla tai hyvin korkea (kylmä, tuuleton talvipäivä).

### 2. Sähkönmyyjän marginaali
Tyypillisesti 0,29–0,49 c/kWh. Tämä on sähkönmyyjän lisäämä osa, joka kattaa yhtiön kulut ja katteen.

### 3. Kuukausimaksu
1,99–3,99 €/kk. Kiinteä kuukausittainen maksu riippumatta kulutuksesta.

### 4. ALV (25,5%)
Lisätään kaikkiin yllä oleviin komponentteihin.

### Esimerkkilaskelma
Jos Nord Pool -hinta on tunnilla 5,0 c/kWh (ALV 0%) ja myyjän marginaali 0,35 c/kWh:
- Hinta ennen ALV:ia: 5,0 + 0,35 = **5,35 c/kWh**
- Hinta ALV:n kanssa: 5,35 × 1,255 = **6,71 c/kWh**

## Milloin pörssisähkö kannattaa? {#milloin-kannattaa}

Pörssisähkö on todennäköisesti hyvä valinta sinulle, jos:

- **Voit joustaa kulutuksessasi**: Pesukoneen, saunan ja muun suuren kulutuksen ajoittaminen halvimpiin tunteihin tuo merkittäviä säästöjä.
- **Sinulla on älykotijärjestelmä**: Automaattinen kulutuksen ohjaus halvimpiin tunteihin optimoi kustannukset.
- **Sähkölämmitys varaajalla**: Lämminvesivaraajan ja lattialämmityksen lämmitys voidaan ajoittaa halvimpiin tunteihin.
- **Sähköauto**: Latauksen ajoittaminen yöhön, kun sähkö on halvinta.
- **Pitkällä aikavälillä**: Historiallisesti pörssisähkö on ollut edullisin vaihtoehto 7 vuodesta 10:stä.

## Milloin pörssisähkö ei kannata? {#milloin-ei-kannata}

Pörssisähkö ei välttämättä sovi sinulle, jos:

- **Et voi joustaa kulutuksessasi**: Jos kaikki kulutus tapahtuu kalliimpina tunteina (arkiaamut ja -illat), hyöty jää pieneksi.
- **Haluat ennustettavat kulut**: Pörssisähkön lasku vaihtelee kuukausittain.
- **Olet suurkuluttaja ilman joustoa**: Suuren kulutuksen ja hintapiikin yhdistelmä voi olla kallis.
- **Et seuraa sähkön hintoja**: Aktiivinen seuranta on tarpeen optimaaliseen hyötyyn.
- **Stressaat hintavaihteluista**: Jos vaihteleva sähkölasku aiheuttaa huolta, kiinteä hinta tuo mielenrauhaa.

## Vinkit pörssisähkön käyttäjälle {#vinkit}

### 1. Siirrä kulutusta halvimpiin tunteihin
- **Halvin aika**: Yleensä yöllä klo 00–06 ja keskipäivällä klo 10–14
- **Kallein aika**: Aamuisin klo 07–09 ja iltaisin klo 17–20
- **Viikonloput**: Usein halvempia kuin arkipäivät

### 2. Käytä ajastimia ja automaatiota
- Pyykinpesu- ja astianpesukoneen ajastustoiminto yöaikaan
- Sähkösaunan ajastus halvimpaan tuntiin
- Sähköauton latauksen ajastus yöhön
- Lämminvesivaraajan ohjaus halvimpiin tunteihin

### 3. Seuraa seuraavan päivän hintoja
- Tarkista seuraavan päivän hinnat iltapäivällä (julkaistaan n. klo 14)
- Suunnittele seuraavan päivän suuret kulutukset halvimpien tuntien mukaan
- Käytä hintahälytyksiä sähköyhtiön sovelluksessa

### 4. Vältä kulutuspiikkejä
- Älä käytä monta suuritehoista laitetta samanaikaisesti kalliina tunteina
- Esilämmitä talo ennen kalliita tunteja
- Käytä lämminvesivaraajaa lämpövarastona

### 5. Hyödynnä negatiiviset hinnat
- Joskus sähkön hinta on nolla tai jopa negatiivinen
- Nämä tunnit ovat täydellisiä suurille kulutuksille
- Erityisesti tuulisina ja lämpöisinä päivinä

## Kuukausi- ja kausivaihtelut {#kausivaihtelut}

### Talvi (joulu-helmikuu)
- **Kalleinta aikaa**: Kylmyys lisää sähkönkulutusta, ja tuotanto ei aina riitä
- **Keskihinta**: 8–15 c/kWh (voi olla huomattavasti korkeampikin)
- **Vinkki**: Minimoi kulutus kalliina tunteina, hyödynnä yöajan halvempia hintoja

### Kevät (maalis-toukokuu)
- **Laskeva trendi**: Lämmityksen tarve vähenee, lumien sulaminen lisää vesivoimaa
- **Keskihinta**: 4–8 c/kWh
- **Vinkki**: Hyödynnä halveneva sähkö suurempiin toimenpiteisiin

### Kesä (kesä-elokuu)
- **Halvinta aikaa**: Vähäinen kulutus, paljon tuuli- ja aurinkovoimaa
- **Keskihinta**: 2–5 c/kWh
- **Vinkki**: Negatiiviset hinnat mahdollisia — hyödynnä ne

### Syksy (syys-marraskuu)
- **Nouseva trendi**: Lämmityskausi alkaa, päivät lyhenevät
- **Keskihinta**: 5–10 c/kWh
- **Vinkki**: Valmistaudu talveen optimoimalla lämmityksen ohjaus

### Viikonpäivävaihtelut
- **Maanantai-perjantai**: Kalliimpaa aamuisin ja iltaisin (työajan kulutus)
- **Lauantai-sunnuntai**: Halvempaa, koska teollisuuden kulutus on vähäisempää
- **Pyhäpäivät**: Usein hyvin edullisia

## Hyödylliset työkalut ja sovellukset {#tyokalut}

### Sähköyhtiöiden sovellukset
Useimmat sähköyhtiöt tarjoavat sovelluksen, jossa näet:
- Reaaliaikaiset ja tulevat tuntihinnat
- Oman kulutuksesi tunneittain
- Hintahälytyksiä
- Kulutusennakoita

### Energiavertailu.fi
Meidän oma palvelumme tarjoaa:
- Reaaliaikaisen pörssisähkön hinnan
- Seuraavan päivän tuntihinnat
- Hintahistorian ja tilastot
- Vertailulaskurin pörssisähkön ja kiinteän hinnan välillä

### Älykodin järjestelmät
- **Home Assistant**: Avoimen lähdekoodin kotiautomaatioalusta, joka voi ohjata sähkönkäyttöä pörssihinnan perusteella
- **Sähköyhtiöiden API-rajapinnat**: Mahdollistavat automaattisen ohjauksen

## Yhteenveto {#yhteenveto}

Pörssisähkö on erinomainen vaihtoehto aktiivisille kuluttajille, jotka voivat joustaa sähkönkäytössään. Pitkällä aikavälillä pörssisähkö on historiallisesti ollut edullisin vaihtoehto. Suurimmat säästöt syntyvät kulutuksen ajoittamisesta halvimpiin tunteihin ja automaatiosta.

Tärkeimmät muistisäännöt:
1. **Seuraa hintoja** päivittäin
2. **Ajoita suuri kulutus** halvimpiin tunteihin
3. **Hyödynnä automaatiota** — älykodin ohjaus maksaa itsensä takaisin
4. **Varaudu talviin** — hintapiikit ovat mahdollisia
5. **Pitkällä aikavälillä** pörssisähkö on edullisin`,
  },

  {
    slug: 'sahkon-hinnan-muodostuminen',
    title: 'Sähkön hinnan muodostuminen Suomessa',
    description:
      'Ymmärrä mistä sähkösi hinta koostuu: energiamaksu, siirtomaksu, verot ja veroluonteiset maksut. Miksi hinta vaihtelee alueittain?',
    category: 'Perustiedot',
    publishedAt: '2025-09-01',
    updatedAt: '2026-02-15',
    readTime: 9,
    author: 'Energiavertailu-toimitus',
    tags: ['sähkön hinta', 'siirtomaksu', 'sähkövero', 'ALV', 'jakeluverkko'],
    relatedGuides: ['sahkosopimustyypit', 'porssisahko-opas', 'sahkon-kilpailutus'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'kokonaishinnan-osat', title: 'Sähkön kokonaishinnan osat', level: 2 },
      { id: 'energiamaksu', title: 'Energiamaksu (sähkönmyyjä)', level: 2 },
      { id: 'siirtomaksu', title: 'Sähkön siirtomaksu (jakeluverkko)', level: 2 },
      { id: 'verot', title: 'Verot ja veroluonteiset maksut', level: 2 },
      { id: 'alueelliset-erot', title: 'Miksi hinta vaihtelee alueittain?', level: 2 },
      { id: 'hintahistoria', title: 'Sähkön hintakehitys Suomessa', level: 2 },
      { id: 'miten-saastaa', title: 'Miten säästää sähkölaskussa?', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Sähkölasku koostuu useista eri komponenteista, ja on tärkeää ymmärtää, mistä todellinen kokonaishintasi muodostuu. Monet kuluttajat keskittyvät pelkästään sähkönmyyjän energiamaksuun (c/kWh), mutta todellisuudessa se muodostaa vain osan kokonaislaskusta. Tässä oppaassa puramme sähkön hinnan osatekijöihin.

Suomessa sähkömarkkinat on jaettu kahteen osaan: **sähkönmyynti** (kilpailutettu, voit valita myyjän) ja **sähkönsiirto** (monopoli, määräytyy asuinpaikan mukaan). Tämän lisäksi hintaan lisätään verot.

## Sähkön kokonaishinnan osat {#kokonaishinnan-osat}

Sähkön kokonaishinta muodostuu kolmesta pääkomponentista:

1. **Sähköenergia** (sähkönmyyjän osuus): ~30-40% kokonaishinnasta
2. **Sähkönsiirto** (jakeluverkkoyhtiön osuus): ~30-35% kokonaishinnasta
3. **Verot** (ALV + sähkövero): ~25-35% kokonaishinnasta

### Esimerkkilaskelma: Omakotitalo, 18 000 kWh/vuosi

| Komponentti | Hinta | Vuosikustannus |
|---|---|---|
| Sähköenergia (8 c/kWh) | 8,00 c/kWh | 1 440 € |
| Energian perusmaksu | 3,50 €/kk | 42 € |
| Sähkönsiirto | 4,50 c/kWh | 810 € |
| Siirron perusmaksu | 8,00 €/kk | 96 € |
| Sähkövero | 2,79 c/kWh | 503 € |
| ALV 25,5% | (kaikesta) | 737 € |
| **YHTEENSÄ** | | **3 628 €** |

Kuten näet, pelkkä energiamaksu on vain noin 40% kokonaislaskusta.

## Energiamaksu (sähkönmyyjä) {#energiamaksu}

Energiamaksu on se osa sähkölaskua, jonka voit **kilpailuttaa**. Se koostuu:

### Energiamaksu (c/kWh)
- **Kiinteähintainen**: Sovittu hinta koko sopimuskauden ajan (tyypillisesti 7,5–9,0 c/kWh vuonna 2026)
- **Pörssisähkö**: Nord Pool -tuntihinta + myyjän marginaali (marginaali tyypillisesti 0,29–0,49 c/kWh)

### Perusmaksu (€/kk)
Kuukausittainen kiinteä maksu sähkönmyyjälle. Vaihtelee 1,99–3,99 €/kk välillä. Sisältää mittauksen, laskutuksen ja asiakaspalvelun.

### ALV
Kaikki energiamaksun komponentit sisältävät ALV:n (25,5%).

## Sähkön siirtomaksu (jakeluverkko) {#siirtomaksu}

Sähkön siirtomaksu on maksu sähkön fyysisestä toimittamisesta kotiin asti. Tätä **et voi kilpailuttaa** — jakeluverkkoyhtiö on alueellinen monopoli, joka määräytyy asuinpaikkasi mukaan.

### Siirtomaksun rakenne

**Energiamaksu (c/kWh)**: Kulutuksen mukainen maksu. Vaihtelee 2,5–6,0 c/kWh välillä riippuen alueesta.

**Perusmaksu (€/kk)**: Kiinteä kuukausimaksu, joka riippuu sulakekoosta:
- 1×25A (kerrostalo): ~3,50–6,00 €/kk
- 3×25A (rivitalo): ~7,00–12,00 €/kk
- 3×35A (omakotitalo): ~9,00–15,00 €/kk
- 3×63A (suurkuluttaja): ~20,00–35,00 €/kk

### Miksi siirtomaksut vaihtelevat?

Jakeluverkkoyhtiöiden kustannukset vaihtelevat merkittävästi:
- **Tiiviisti asutuilla alueilla** (Helsinki, Turku) verkko on lyhyempi ja tehokkaampi → halvempi
- **Harvaan asutuilla alueilla** (Lappi, Itä-Suomi) verkkoa on enemmän per asiakas → kalliimpi
- **Verkon ikä ja kunto** vaikuttavat investointitarpeisiin

Energiavirasto valvoo jakeluverkkoyhtiöiden hinnoittelua ja varmistaa, etteivät hinnat ole kohtuuttomia.

## Verot ja veroluonteiset maksut {#verot}

### Sähkövero
Sähkövero on valtionvero, joka peritään kaikilta sähkönkäyttäjiltä. Vuonna 2026 sähkövero on:
- **Veroluokka I** (kotitaloudet, palvelut): 2,79372 c/kWh (sis. huoltovarmuusmaksu)
- **Veroluokka II** (teollisuus, kasvihuoneet, konesalit): 0,05 c/kWh

### Arvonlisävero (ALV)
ALV 25,5% lisätään **kaikkiin** sähkölaskun komponentteihin: energiamaksuun, siirtomaksuun ja sähköveroon. Vuonna 2025 ALV laski tilapäisesti 10%:iin sähkön osalta, mutta palautui sittemmin normaalitasolle.

### Huoltovarmuusmaksu
Sisältyy sähköveroon. Tarkoitettu Suomen sähköjärjestelmän häiriötilanteisiin varautumiseen.

## Miksi hinta vaihtelee alueittain? {#alueelliset-erot}

Sähkön kokonaishinta vaihtelee Suomessa merkittävästi asuinpaikan mukaan. Tämä johtuu pääasiassa **sähkönsiirtomaksujen** eroista:

### Halvimmat alueet (siirtomaksu ~3,5–4,2 c/kWh)
- **Helsinki** (Helen Sähköverkko): Tiivis kaupunkirakenne, lyhyet etäisyydet
- **Turku** (Turku Energia Sähköverkot): Hyvä verkkorakenne
- **Etelä-Karjala** (Lappeenrannan Energiaverkot): Tehokas verkko

### Kalleimmat alueet (siirtomaksu ~5,0–5,5 c/kWh)
- **Lappi** (Rovakaira): Pitkät etäisyydet, harva asutus
- **Kainuu** (Loiste Sähköverkko): Laajat verkot harvalla alueella
- **Pohjois-Karjala** (PKS Sähkönsiirto): Haja-asutus

### Ero käytännössä
Kahdelle samanlaiselle omakotitalolle (18 000 kWh/v) ero halvimman ja kalleimman alueen välillä voi olla **200–400 euroa vuodessa** pelkästään siirtomaksuissa.

## Sähkön hintakehitys Suomessa {#hintahistoria}

### 2020–2021: Matalat hinnat
COVID-19-pandemian aikana sähkön kysyntä laski ja hinnat olivat historiallisen matalia. Pörssisähkön keskihinta oli 2–4 c/kWh.

### 2022: Energiakriisi
Venäjän hyökkäys Ukrainaan johti eurooppalaiseen energiakriisiin. Sähkön hinnat nousivat ennätystasolle: pörssisähkön keskihinta oli ajoittain yli 20 c/kWh.

### 2023–2024: Normalisoituminen
Markkinat alkoivat normalisoitua. Uusi tuulivoima- ja aurinkokapasiteetti Pohjoismaissa painoi hintoja alaspäin. Pörssisähkön keskihinta laski 5–8 c/kWh:n tasolle.

### 2025–2026: Uusi normaali
Sähkön hinta on asettunut kohtuulliselle tasolle. Runsas uusiutuva tuotanto pitää hinnat maltillisina, mutta kylmät talvijaksot voivat nostaa hintoja tilapäisesti. Pitkän aikavälin trendi on maltillinen kiitos kasvavan uusiutuvan energian tuotannon.

## Miten säästää sähkölaskussa? {#miten-saastaa}

Koska et voi kilpailuttaa siirtomaksua tai veroja, säästäminen keskittyy kahteen asiaan:

### 1. Kilpailuta sähkönmyyjä
- Vertaile sopimuksia säännöllisesti
- Huomioi kokonaiskustannus, ei pelkkää c/kWh-hintaa
- Harkitse pörssisähköä pitkän aikavälin edullisimpana vaihtoehtona

### 2. Vähennä kulutusta
- Jokainen säästetty kWh pienentää kaikkia komponentteja
- Suurimmat säästöt lämmityksessä (sähkölämmitys)
- Energiatehokkuusinvestoinnit (LED, ilmalämpöpumppu, eristys)

### 3. Optimoi kulutuksen ajoitus (pörssisähkö)
- Siirrä kulutusta halvimpiin tunteihin
- Hyödynnä yöajan alhaisempia hintoja
- Käytä älykodin automaatiota

## Yhteenveto {#yhteenveto}

Sähkön hinta Suomessa koostuu energiamaksusta (~35%), siirtomaksusta (~30%) ja veroista (~35%). Ainoastaan energiamaksun voit kilpailuttaa, mutta kulutuksen vähentäminen ja ajoittaminen pienentävät kaikkia komponentteja. Alueelliset erot johtuvat sähkönsiirron kustannusrakenteesta — harvaan asutuilla alueilla siirto on kalliimpaa kuin kaupungeissa.`,
  },

  {
    slug: 'aurinkopaneeli-opas',
    title: 'Aurinkoenergia ja sähkösopimus — Prosumer-opas',
    description:
      'Opas aurinkopaneelien omistajille: paras sähkösopimus, ylijäämäsähkön myynti, nettolaskutus, investoinnin kannattavuus ja akkuvarastointi.',
    category: 'Uusiutuva energia',
    publishedAt: '2025-12-01',
    updatedAt: '2026-03-20',
    readTime: 11,
    author: 'Energiavertailu-toimitus',
    tags: ['aurinkopaneelit', 'prosumer', 'uusiutuva energia', 'nettolaskutus', 'akkuvarastointi'],
    relatedGuides: ['sahkosopimustyypit', 'porssisahko-opas', 'sahkon-hinnan-muodostuminen'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'miten-aurinkopaneelit-toimivat', title: 'Miten aurinkopaneelit toimivat?', level: 2 },
      { id: 'sahkosopimus-prosumerille', title: 'Paras sähkösopimus prosumerille', level: 2 },
      { id: 'ylijaamasahko', title: 'Ylijäämäsähkön myynti', level: 2 },
      { id: 'nettolaskutus', title: 'Nettolaskutus Suomessa', level: 2 },
      { id: 'kannattavuus', title: 'Investoinnin kannattavuus', level: 2 },
      { id: 'akkuvarastointi', title: 'Akkuvarastointi', level: 2 },
      { id: 'vinkit', title: 'Vinkit aurinkosähkön hyödyntämiseen', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Aurinkopaneelien suosio Suomessa kasvaa vuosi vuodelta. Yhä useampi kotitalous tuottaa osan sähköstään itse ja on samalla sekä sähkön kuluttaja että tuottaja — eli **prosumer** (producer + consumer). Tämä opas kattaa kaiken, mitä aurinkopaneelien omistajan tai niitä harkitsevan tarvitsee tietää sähkösopimuksista, ylijäämäsähkön myynnistä ja investoinnin kannattavuudesta.

Suomessa on asennettuna jo yli 100 000 aurinkosähköjärjestelmää, ja määrä kasvaa nopeasti. Tekniikan hinnat ovat laskeneet merkittävästi, ja investoinnin takaisinmaksuaika on lyhentynyt. Samaan aikaan sähkösopimukset ovat kehittyneet paremmin prosumereita palveleviksi.

## Miten aurinkopaneelit toimivat? {#miten-aurinkopaneelit-toimivat}

Aurinkopaneelit muuntavat auringon säteilyenergian sähköksi. Tyypillinen kotitalouden järjestelmä koostuu:

### Järjestelmän komponentit
- **Aurinkopaneelit** (4–20 kpl): Tuottavat tasavirtaa (DC) auringonvalosta
- **Invertteri**: Muuntaa tasavirran vaihtovirraksi (AC) kodin käyttöön
- **Sähkömittari**: Kaksisuuntainen mittari, joka mittaa sekä kulutuksen että verkkoon syötön
- **Mahdollinen akkuvarasto**: Varastoi ylijäämäsähköä omaan käyttöön

### Tuotanto Suomessa
- **Vuosituotanto**: Tyypillisesti 800–1 000 kWh per kWp asennettua tehoa
- **Huipputuotanto**: Touko-heinäkuu (auringon säteilyn huippu)
- **Vähäinen tuotanto**: Marras-tammikuu (lyhyet päivät, vähäinen säteily)
- **Tyypillinen järjestelmä**: 5–10 kWp, tuottaa 4 000–10 000 kWh/vuosi

### Omakäyttö vs. verkkoon syöttö
- **Omakäyttö**: Paneelit tuottavat sähköä, jota käytät suoraan → säästö energiamaksussa + siirtomaksussa + veroissa
- **Verkkoon syöttö**: Ylijäämä, jota et itse käytä, syötetään verkkoon → saat korvauksen sähkönmyyjältä

## Paras sähkösopimus prosumerille {#sahkosopimus-prosumerille}

Aurinkopaneelien omistajalle sähkösopimuksen valinta on erityisen tärkeää. Paras sopimus riippuu kulutusprofiilista ja järjestelmän koosta.

### Pörssisähkö — usein paras vaihtoehto
**Miksi?**
- Aurinkopaneelit tuottavat eniten päivällä, kun pörssisähkön hinta on usein kohtuullinen
- Illalla ja yöllä, kun paneelit eivät tuota, pörssisähkö on usein halvinta
- Ylijäämäsähkön korvaus perustuu yleensä pörssihintaan → hyödyt korkeammista päivähinnoista

### Kiinteä hinta — jos haluat ennustettavuutta
- Hyvä valinta, jos järjestelmäsi kattaa suuren osan kulutuksestasi
- Kiinteä hinta ostetulle sähkölle → ennustettavat kulut
- Ylijäämäkorvaus voi olla kiinteä tai pörssipohjainen — tarkista ehdot

### Tärkeimmät sopimuskriteerit prosumerille
1. **Ylijäämäsähkön korvaus**: Miten ja paljonko sähköyhtiö maksaa verkkoon syötetystä sähköstä?
2. **Nettolaskutus vai erillinen korvaus**: Vähennetäänkö ylijäämä suoraan laskusta?
3. **Sopimuksen joustavuus**: Voitko vaihtaa sopimusta tuotannon muuttuessa?

## Ylijäämäsähkön myynti {#ylijaamasahko}

Kun aurinkopaneelisi tuottavat enemmän sähköä kuin kulutat, ylijäämä syötetään sähköverkkoon. Tästä saat korvauksen sähkönmyyjältäsi.

### Korvauksen tyypit

**Pörssihintapohjainen**: Saat Nord Pool -tuntihinnan mukaisen korvauksen, josta myyjä vähentää marginaalin. Tyypillisesti korvaus on pörssihinta miinus 0,2–0,5 c/kWh.

**Kiinteähintainen**: Jotkut yhtiöt tarjoavat kiinteän korvaushinnan verkkoon syötetystä sähköstä, esim. 3–6 c/kWh.

**Vuodenaikavaihtelu**: Korvaus vaihtelee vuodenajan mukaan — kesällä, kun tuotanto on suurinta, pörssihinta on usein alhaisempi.

### Mihin korvaus ei kata?

On tärkeää ymmärtää, että ylijäämäsähköstä saamasi korvaus on huomattavasti pienempi kuin mitä maksat ostosähköstä:
- Korvaus kattaa vain energiaosuuden
- Et saa siirtomaksua takaisin
- Et saa sähköveroa takaisin
- **Oman kulutuksen säästö on aina arvokkaampaa kuin verkkoon myynti**

## Nettolaskutus Suomessa {#nettolaskutus}

Nettolaskutuksessa aurinkopaneelien tuottama sähkö vähennetään suoraan sähkölaskustasi. Suomessa nettolaskutus toimii tuntikohtaisesti.

### Tuntikohtainen nettolaskutus
- Tunnin sisällä tuotettu ja kulutettu sähkö nettoutetaan
- Jos kulutat tunnissa 2 kWh ja tuotat 3 kWh, laskutetaan 0 kWh ja ylijäämä 1 kWh korvataan
- Jos kulutat 3 kWh ja tuotat 2 kWh, laskutetaan 1 kWh

### EU:n energiayhteisöt ja nettolaskutuksen kehitys
EU-lainsäädäntö edistää energiayhteisöjä, joissa useat kotitaloudet voivat jakaa aurinkosähköä keskenään. Tämä kehitys parantaa aurinkopaneelien kannattavuutta erityisesti kerros- ja rivitaloissa.

## Investoinnin kannattavuus {#kannattavuus}

### Tyypilliset kustannukset (2026)

| Järjestelmän koko | Hinta (asennettu) | Vuosituotanto | Arvioitu säästö/v |
|---|---|---|---|
| 3 kWp (pieni) | 4 000–6 000 € | 2 500–3 000 kWh | 300–500 € |
| 5 kWp (keskikokoinen) | 6 000–8 000 € | 4 000–5 000 kWh | 500–800 € |
| 8 kWp (suuri) | 8 000–11 000 € | 6 500–8 000 kWh | 700–1 200 € |
| 10 kWp (iso omakotitalo) | 10 000–14 000 € | 8 000–10 000 kWh | 900–1 500 € |

### Takaisinmaksuaika
- **Ilman tukia**: 8–12 vuotta
- **Kotitalousvähennyksen kanssa**: 6–10 vuotta
- **Paneelien elinikä**: 25–30+ vuotta
- **Investoinnin kokonaistuotto**: Noin 2–3-kertainen alkuinvestointiin nähden

### Kannattavuuteen vaikuttavat tekijät
1. **Sähkön hinta**: Mitä kalliimpaa sähkö, sitä nopeampi takaisinmaksu
2. **Omakäyttöaste**: Mitä enemmän käytät itse, sitä kannattavampaa
3. **Katon suuntaus**: Etelä-lounas on optimaali
4. **Varjostukset**: Puut ja rakennukset heikentävät tuotantoa
5. **Järjestelmän koko suhteessa kulutukseen**: Ylimitoitus lisää verkkoon myyntiä, mikä on vähemmän arvokasta

## Akkuvarastointi {#akkuvarastointi}

Akkuvarasto mahdollistaa aurinkosähkön varastoinnin omaan käyttöön silloin, kun paneelit eivät tuota (illalla, yöllä, pilvisellä säällä).

### Akkuvarastoinnin hyödyt
- **Kasvattaa omakäyttöastetta**: Tyypillisesti 30-50% → 60-80%
- **Pörssisähkön optimointi**: Varaa sähköä halvimpina tunteina, käytä kalliimpina
- **Varavoima**: Toimii varavoimana sähkökatkon aikana (jos UPS-ominaisuus)

### Kustannukset (2026)
- **5 kWh akku**: 3 000–5 000 €
- **10 kWh akku**: 5 000–8 000 €
- **15 kWh akku**: 8 000–12 000 €

### Kannattavuus
Akkuvarastoinnin takaisinmaksuaika on toistaiseksi pidempi kuin pelkkien aurinkopaneelien (10–15 vuotta). Kannattavuus paranee, kun:
- Akkujen hinnat laskevat (trendi on laskeva)
- Sähkön hintavaihtelut kasvavat
- Uusia palvelumalleja syntyy (virtuaalivoimalaitokset)

### Vinkkejä akun hankintaan
1. **Oikea mitoitus**: Yleensä 50-100% päivätuotannosta
2. **Laatu edellä**: Valitse tunnettu valmistaja hyvällä takuulla (10+ vuotta)
3. **Yhteensopivuus**: Varmista yhteensopivuus invertterisi kanssa
4. **Tulevaisuudenkestävyys**: Valitse järjestelmä, jota voi laajentaa myöhemmin

## Vinkit aurinkosähkön hyödyntämiseen {#vinkit}

1. **Maksimoi omakäyttö**: Ajoita pesukone, kuivausrumpu ja muu suuri kulutus päiväaikaan, kun paneelit tuottavat
2. **Pörssisähkösopimus**: Yleensä paras vaihtoehto prosumerille — hyödy korkeammista päivähinnoista ylijäämäkorvauksessa
3. **Seuraa tuotantoa**: Asenna seurantajärjestelmä, jotta näet tuotannon ja kulutuksen reaaliajassa
4. **Pidä paneelit puhtaina**: Lumi, pöly ja lehdet heikentävät tuotantoa. Puhdista tarvittaessa keväisin.
5. **Harkitse akkuvarastoa**: Erityisesti jos omakäyttöasteesi on matala
6. **Hyödynnä lämminvesivaraaja**: Lämmitä vettä aurinkosähköllä päivällä — toimii edullisena "akkuna"
7. **Tarkista sopimus vuosittain**: Ylijäämäsähkön korvaushinnat vaihtelevat — kilpailuta myös prosumer-sopimus

## Yhteenveto {#yhteenveto}

Aurinkopaneelien omistajille paras sähkösopimus on useimmiten **pörssisähkö**, joka tarjoaa sekä edullisen ostohinnan yöllä että parhaan korvauksen ylijäämäsähköstä. Tärkeintä on maksimoida **omakäyttöaste** — jokainen itse käytetty kilowattitunti säästää energiamaksun, siirtomaksun ja verot.

Investoinnin kannattavuus on parantunut merkittävästi: tyypillinen takaisinmaksuaika on 6–12 vuotta, ja paneelien elinikä on 25–30+ vuotta. Akkuvarastointi parantaa omakäyttöastetta, mutta sen takaisinmaksuaika on toistaiseksi pidempi. Tulevaisuudessa akkujen hintojen laskiessa ja palvelumallien kehittyessä kokonaisratkaisut tulevat entistä kannattavammiksi.`,
  },

  {
    slug: 'lampopumppuopas',
    title: 'Lämpöpumppuopas — kaikki mitä tarvitset tietää',
    description:
      'Kattava opas lämpöpumppuihin: ilmalämpöpumppu, maalämpö, ilma-vesilämpöpumppu. COP-arvot, investointikustannukset, säästölaskelmat ja Suomen ilmasto-olosuhteet.',
    category: 'Lämmitys',
    publishedAt: '2026-02-10',
    updatedAt: '2026-03-18',
    readTime: 18,
    author: 'Energiavertailu-toimitus',
    tags: ['lämpöpumppu', 'ilmalämpöpumppu', 'maalämpö', 'lämmitys', 'energiansäästö', 'COP'],
    relatedGuides: ['energiansaastovinkit', 'sahkon-hinnan-muodostuminen', 'aurinkopaneeli-opas'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'lampopumpun-toimintaperiaate', title: 'Lämpöpumpun toimintaperiaate', level: 2 },
      { id: 'ilmalampopumppu', title: 'Ilmalämpöpumppu (ILP)', level: 2 },
      { id: 'ilma-vesilampopumppu', title: 'Ilma-vesilämpöpumppu (IVLP)', level: 2 },
      { id: 'maalampopumppu', title: 'Maalämpöpumppu (MLP)', level: 2 },
      { id: 'cop-ja-scop', title: 'COP- ja SCOP-arvot', level: 2 },
      { id: 'vertailutaulukko', title: 'Lämpöpumpputyyppien vertailu', level: 2 },
      { id: 'kustannukset-ja-saastot', title: 'Kustannukset ja säästölaskelmat', level: 2 },
      { id: 'suomen-ilmasto', title: 'Suomen ilmasto ja lämpöpumput', level: 2 },
      { id: 'oikea-valinta', title: 'Oikea lämpöpumppu kotiisi', level: 2 },
      { id: 'asennus-ja-huolto', title: 'Asennus ja huolto', level: 2 },
      { id: 'tuet-ja-rahoitus', title: 'Tuet ja rahoitus', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Lämpöpumppu on yksi tehokkaimmista tavoista vähentää kodin lämmityskustannuksia Suomessa. Lämpöpumppujen myynti on kasvanut räjähdysmäisesti viime vuosina, ja yhä useampi suomalainen investoi lämpöpumppuun säästääkseen sähkölaskuissa. Tässä kattavassa oppaassa käymme läpi kaikki lämpöpumpputyypit, niiden toimintaperiaatteen, kustannukset ja kannattavuuden Suomen olosuhteissa.

Suomessa on tällä hetkellä yli miljoona lämpöpumppua, ja vuosittain asennetaan noin 100 000 uutta laitetta. Lämpöpumppu ei ole enää ylellisyys — se on energiatehokkuusinvestointi, joka maksaa itsensä takaisin muutamassa vuodessa. Lämpöpumpun avulla voit tuottaa **2–5 kertaa** enemmän lämpöenergiaa kuin kulutat sähköä.

## Lämpöpumpun toimintaperiaate {#lampopumpun-toimintaperiaate}

Lämpöpumppu ei tuota lämpöä suoraan sähköstä, vaan **siirtää** lämpöenergiaa ulkoilmasta, maasta tai vedestä sisätiloihin. Tämä tekee siitä huomattavasti energiatehokkaampaa kuin suora sähkölämmitys.

### Toimintasykli

1. **Höyrystyminen**: Kylmäaine höyrystyy ulkoyksikössä, sitoen lämpöenergiaa ympäristöstä (ilmasta tai maaperästä)
2. **Puristus**: Kompressori puristaa kylmäainehöyryn kokoon, jolloin sen lämpötila nousee merkittävästi
3. **Lauhtuminen**: Kuuma kylmäaine luovuttaa lämpönsä sisätiloihin (ilmaan tai vesikiertoiseen lämmitysjärjestelmään)
4. **Paisunta**: Paisuntaventtiili alentaa paineen, ja sykli alkaa alusta

### Hyötysuhde eli COP

**COP (Coefficient of Performance)** kertoo, kuinka paljon lämpöenergiaa pumppu tuottaa suhteessa kulutettuun sähköön. Jos COP on 3, pumppu tuottaa 3 kWh lämpöä yhdellä 1 kWh sähköä. Toisin sanoen 67 % lämmöstä tulee "ilmaiseksi" ympäristöstä.

## Ilmalämpöpumppu (ILP) {#ilmalampopumppu}

Ilmalämpöpumppu on Suomen suosituin ja edullisin lämpöpumpputyyppi. Se ottaa lämpöenergiaa ulkoilmasta ja siirtää sen sisäilmaan.

### Miten ILP toimii?

Ulkoyksikkö imee ulkoilman lämpöenergiaa ja siirtää sen sisäyksikköön, joka puhaltaa lämmitettyä ilmaa huoneeseen. Sama laite toimii kesällä jäähdyttimenä kääntämällä prosessin päinvastaiseksi.

### ILP:n edut

- **Edullinen investointi**: 1 500–3 500 € asennettuna
- **Nopea takaisinmaksu**: 2–4 vuotta sähkölämmitteisessä talossa
- **Jäähdytys kesällä**: Toimii ilmastointina kuumina päivinä
- **Helppo asennus**: Ei vaadi suuria rakenteellisia muutoksia
- **Vähentää sähkönkulutusta**: Tyypillisesti 30–50 % lämmityssähkön säästö

### ILP:n haitat

- **Teho laskee pakkasella**: COP heikkenee merkittävästi alle -15 °C:ssa
- **Ei korvaa koko lämmitystä**: Lisälämmitys tarpeen kovilla pakkasilla
- **Lämmön jakautuminen**: Lämmittää tehokkaasti vain sen huoneen, johon on asennettu
- **Ääni**: Ulkoyksikkö tuottaa jonkin verran ääntä
- **Ei sovellu vesikiertoiseen**: Ei voi yhdistää patterijärjestelmään

### Tyypilliset COP-arvot

- **+7 °C ulkolämpötila**: COP 4,0–5,0
- **-7 °C ulkolämpötila**: COP 2,5–3,5
- **-15 °C ulkolämpötila**: COP 1,8–2,5
- **-25 °C ulkolämpötila**: COP 1,2–1,8

### Suositellut käyttökohteet

- Sähkölämmitteiset omakotitalot (lisälämmitys)
- Vapaa-ajan asunnot ja mökit
- Kerrostaloasunnot (taloyhtiön luvalla)
- Rivitaloasunnot

## Ilma-vesilämpöpumppu (IVLP) {#ilma-vesilampopumppu}

Ilma-vesilämpöpumppu ottaa lämpöenergiaa ulkoilmasta, mutta siirtää sen vesikiertoiseen lämmitysjärjestelmään (patterit, lattialämmitys) ja käyttöveteen. Se on maalämpöä edullisempi vaihtoehto vesikiertoisiin lämmitysjärjestelmiin.

### IVLP:n edut

- **Edullisempi kuin maalämpö**: 8 000–15 000 € asennettuna
- **Ei vaadi maaporausta**: Helpompi asennus kuin maalämpö
- **Vesikiertoon liitettävä**: Toimii pattereilla ja lattialämmityksellä
- **Käyttöveden lämmitys**: Lämmittää myös talousveden
- **Jäähdytys mahdollista**: Jotkut mallit tarjoavat viilennyksen

### IVLP:n haitat

- **Teho laskee pakkasella**: Kuten ILP, teho heikkenee kylmällä
- **Lisälämmitys tarpeen**: Sähkövastus täydentää kovilla pakkasilla (-15 °C ja alle)
- **Korkeampi investointi kuin ILP**: Merkittävästi kalliimpi kuin ilmalämpöpumppu
- **Vaatii vesikiertoisen järjestelmän**: Ei sovellu suoraan sähkölämmitykseen ilman järjestelmämuutosta

### Tyypilliset COP-arvot

- **+7 °C ulkolämpötila**: COP 3,5–4,5
- **-7 °C ulkolämpötila**: COP 2,2–3,0
- **-15 °C ulkolämpötila**: COP 1,5–2,2
- **-20 °C ulkolämpötila**: COP 1,2–1,8

## Maalämpöpumppu (MLP) {#maalampopumppu}

Maalämpöpumppu ottaa lämpöenergiaa maaperästä tai kalliosta porakaivon kautta. Se on tehokkain lämpöpumpputyyppi Suomen olosuhteissa, koska maaperän lämpötila pysyy vakaana ympäri vuoden.

### Miten maalämpö toimii?

Porakaivoon (tyypillisesti 150–300 metriä syvä) asennetaan keruuputkisto, jossa kiertää lämmönsiirtoneste. Maaperän lämpötila 200 metrin syvyydessä on Suomessa noin +6–8 °C ympäri vuoden. Lämpöpumppu nostaa tämän lämpötilan lämmitykseen sopivaksi.

### Vaihtoehtoiset keruupiirit

- **Porakaivo**: Yleisin Suomessa. Porausreikä 150–300 m syvään kallioon. Sopii pienille tonteille.
- **Vaakaputkisto**: Keruuputkisto asennetaan 1–1,5 m syvyyteen vaakatasoon. Vaatii suuren tontin (noin 1,5-kertainen taloala).
- **Vesistökeruupiiri**: Keruuputkisto upotetaan järveen tai mereen. Vaatii vesistön läheisyyden ja luvan.

### MLP:n edut

- **Paras hyötysuhde**: COP 3,5–5,0 ympäri vuoden
- **Vakaa teho**: Maaperän lämpötila ei vaihtele kuin ulkoilma — toimii tehokkaasti myös -30 °C:ssa
- **Pitkä käyttöikä**: 20–30 vuotta (porakaivo käytännössä ikuinen)
- **Korvaa täysin vanhan lämmityksen**: Hoitaa koko talon lämmityksen ja käyttöveden
- **Viilennys**: Kesällä voi viilentää taloa ilmaisella geocoolingilla
- **Hiljainen**: Ei ulkoyksikköä, ei ulkoista melua

### MLP:n haitat

- **Korkea alkuinvestointi**: 15 000–25 000 € porakaivoineen
- **Vaatii porakaivon tai suuren tontin**: Porauslupa tarvitaan
- **Pitkä takaisinmaksu**: 5–10 vuotta riippuen korvattavasta lämmitysmuodosta
- **Ei sovellu kerrostaloihin**: Vaatii oman tontin ja tilan laitteistolle

### Tyypilliset COP-arvot

- **Koko vuoden SCOP**: 3,5–4,5
- **Talvella**: COP 3,0–4,0
- **Keväällä ja syksyllä**: COP 4,0–5,0
- **Kesällä**: COP 4,5–5,5

## COP- ja SCOP-arvot {#cop-ja-scop}

### Mikä on COP?

**COP (Coefficient of Performance)** on lämpöpumpun hetkellinen hyötysuhde tietyissä olosuhteissa. COP 3 tarkoittaa, että 1 kWh sähkö tuottaa 3 kWh lämpöä. Mitä korkeampi COP, sitä parempi.

### Mikä on SCOP?

**SCOP (Seasonal Coefficient of Performance)** on koko lämmityskauden keskimääräinen hyötysuhde. Tämä on realistisempi mittari todellisista säästöistä, koska se huomioi koko kauden vaihtelevat olosuhteet.

### COP-arvot käytännössä

On tärkeää ymmärtää, että valmistajien ilmoittamat COP-arvot mitataan usein ihanteellisissa olosuhteissa (+7 °C ulkolämpötila). Suomen oloissa, erityisesti talvella, todelliset arvot ovat alhaisempia. Siksi SCOP on merkityksellisempi luku.

### Lämpöpumppujen vertailu COP-arvoilla

| Lämpöpumpputyyppi | COP +7 °C | COP -7 °C | COP -15 °C | SCOP (Suomi) |
|---|---|---|---|---|
| Ilmalämpöpumppu | 4,0–5,0 | 2,5–3,5 | 1,8–2,5 | 2,5–3,5 |
| Ilma-vesilämpöpumppu | 3,5–4,5 | 2,2–3,0 | 1,5–2,2 | 2,2–3,0 |
| Maalämpöpumppu | 4,5–5,5 | 3,5–4,5 | 3,5–4,5 | 3,5–4,5 |

## Lämpöpumpputyyppien vertailu {#vertailutaulukko}

| Ominaisuus | ILP | IVLP | MLP |
|---|---|---|---|
| **Investointi** | 1 500–3 500 € | 8 000–15 000 € | 15 000–25 000 € |
| **Takaisinmaksu** | 2–4 vuotta | 5–8 vuotta | 5–10 vuotta |
| **SCOP Suomessa** | 2,5–3,5 | 2,2–3,0 | 3,5–4,5 |
| **Lämmitystapa** | Puhallinkonvektori | Vesikiertoinen | Vesikiertoinen |
| **Käyttövesi** | Ei | Kyllä | Kyllä |
| **Jäähdytys** | Kyllä | Osittain | Kyllä (geocooling) |
| **Toiminta -25 °C** | Rajoittunut | Rajoittunut | Täysi teho |
| **Asennus** | Helppo | Keskivaikea | Vaatii porauksen |
| **Käyttöikä** | 10–15 vuotta | 15–20 vuotta | 20–30 vuotta |
| **Parhaiten sopii** | Lisälämmitys | Öljy-/kaasukorvaus | Päälämmitysjärjestelmä |

## Kustannukset ja säästölaskelmat {#kustannukset-ja-saastot}

### Esimerkki 1: ILP sähkölämmitteiseen omakotitaloon

**Lähtötilanne**: 150 m² omakotitalo, suora sähkölämmitys, kulutus 20 000 kWh/v, sähkön hinta 10 c/kWh (kokonaishinta sis. siirto ja verot)

- **Lämmityskustannus ilman ILP:tä**: 20 000 × 0,10 = **2 000 €/v**
- **ILP:n säästöprosentti**: ~35 % (realistinen arvio Suomessa)
- **Lämmityskustannus ILP:llä**: 2 000 × 0,65 = **1 300 €/v**
- **Säästö vuodessa**: **700 €/v**
- **Investointi**: 2 500 €
- **Takaisinmaksuaika**: 2 500 / 700 = **3,6 vuotta**

### Esimerkki 2: Maalämpö öljylämmitteiseen taloon

**Lähtötilanne**: 180 m² omakotitalo, öljylämmitys, öljynkulutus 2 500 litraa/v, öljyn hinta 1,20 €/l

- **Öljylämmityskustannus**: 2 500 × 1,20 = **3 000 €/v**
- **Maalämmön sähkönkulutus**: ~5 500 kWh/v (SCOP 4,0)
- **Maalämmön kustannus**: 5 500 × 0,10 = **550 €/v**
- **Säästö vuodessa**: **2 450 €/v**
- **Investointi**: 18 000 € (sis. poraus ja asennus)
- **Takaisinmaksuaika**: 18 000 / 2 450 = **7,3 vuotta**

### Esimerkki 3: IVLP korvaamaan öljylämmitys

**Lähtötilanne**: 160 m² omakotitalo, öljylämmitys, lämmitystarve 22 000 kWh/v

- **Öljylämmityskustannus**: ~2 800 €/v
- **IVLP:n sähkönkulutus**: ~8 500 kWh/v (SCOP 2,6, sis. lisävastus talvella)
- **IVLP:n kustannus**: 8 500 × 0,10 = **850 €/v**
- **Säästö vuodessa**: **1 950 €/v**
- **Investointi**: 12 000 €
- **Takaisinmaksuaika**: 12 000 / 1 950 = **6,2 vuotta**

## Suomen ilmasto ja lämpöpumput {#suomen-ilmasto}

Suomen ilmasto asettaa erityisvaatimuksia lämpöpumpuille. Pitkät, kylmät talvet ovat haaste erityisesti ilmalämpöpumpuille.

### Ilmastovyöhykkeet

**Etelä-Suomi (vyöhyke I–II)**: Mitoitusulkolämpötila -26 °C. Talven keskilämpötila noin -5 °C. Ilmalämpöpumput toimivat kohtuullisesti suurimman osan talvesta.

**Keski-Suomi (vyöhyke III)**: Mitoitusulkolämpötila -29 °C. Talven keskilämpötila noin -8 °C. IVLP ja maalämpö suositeltavia päälämmitykseksi.

**Pohjois-Suomi (vyöhyke IV)**: Mitoitusulkolämpötila -32 °C tai kylmempi. Talven keskilämpötila noin -12 °C. Maalämpö selkeästi paras valinta, koska maaperän lämpötila on vakaa.

### Talvihaasteet ilmalämpöpumpuille

- **COP laskee kylmällä**: Alle -15 °C:ssa ILP:n COP laskee alle 2,0:n
- **Huurtuminen**: Ulkoyksikön kenno huurtuu → automaattinen sulatus kuluttaa energiaa
- **Sulatussyklit lisääntyvät**: Kosteassa pakkasessa sulatus vie enemmän energiaa
- **Kompressorin rasitus**: Erittäin kylmässä kompressori joutuu työskentelemään kovemmin

### Miksi maalämpö on ylivertainen Suomessa?

- Maaperän lämpötila on +6–8 °C ympäri vuoden porakaivon syvyydessä
- Ei tehokkuushäviötä kovallakaan pakkasella
- SCOP pysyy 3,5–4,5:n tasolla koko vuoden
- Ei sulatussyklejä eikä huurtumisongelmia

## Oikea lämpöpumppu kotiisi {#oikea-valinta}

### Kerrostaloasunto

**Suositus: Ilmalämpöpumppu (ILP)**
- Investointi: 1 500–2 500 €
- Vaatii taloyhtiön luvan
- Parhaiten etelä-/lounaispuolen huoneistoon
- Tyypillinen säästö: 200–500 €/v

### Rivitalo

**Suositus: ILP tai IVLP**
- ILP kustannustehokkaana lisälämmityksenä
- IVLP jos vesikiertoinen lämmitys ja halutaan korvata vanha kattila
- Vaatii taloyhtiön luvan

### Omakotitalo, suora sähkölämmitys

**Suositus: ILP (nopea säästö) tai maalämpö (pitkän aikavälin ratkaisu)**
- ILP: Pienellä investoinnilla nopeaa säästöä, mutta ei korvaa koko lämmitystä
- Maalämpö: Vaatii lämmitysjärjestelmän muutoksen vesikiertoiseksi, mutta korvaa koko lämmityksen

### Omakotitalo, vesikiertoinen lämmitys (öljy, kaasu, pelletti)

**Suositus: Maalämpö tai IVLP**
- Maalämpö on pitkällä aikavälillä paras investointi
- IVLP on edullisempi vaihtoehto, jos budjetti on rajallinen
- Molemmat kytketään suoraan olemassa olevaan vesikiertoon

### Omakotitalo, uudisrakennus

**Suositus: Maalämpö**
- Rakennusvaiheessa asennus on edullisempaa
- Energiatehokkuusvaatimukset ohjaaavat lämpöpumppuihin
- Maalämpö + lattialämmitys = optimaalinen yhdistelmä

## Asennus ja huolto {#asennus-ja-huolto}

### Asennuksen vaiheet

**ILP-asennus (1 päivä)**:
1. Asennuspaikan kartoitus
2. Ulkoyksikön asennus seinätelineeseen tai maatelineelle
3. Seinäläpivienti ja putkitus
4. Sisäyksikön asennus ja kytkentä
5. Kylmäaineen lisäys ja tiiveyskoe
6. Käyttöönotto ja säätö

**Maalämpöasennus (1–3 viikkoa)**:
1. Porausluvan hakeminen kunnalta
2. Porakaivon poraus (1–2 päivää)
3. Keruuputkiston asennus
4. Lämpöpumppuyksikön asennus tekniseen tilaan
5. Kytkentä vesikiertoiseen lämmitysjärjestelmään
6. Käyttöönotto, säätö ja optimointi

### Huoltovinkit

- **ILP**: Suodattimien puhdistus 2–4 kertaa vuodessa, ammattilaisen huolto 2–3 vuoden välein
- **IVLP**: Suodattimien puhdistus, paineen tarkistus, ammattilaisen vuosihuolto suositeltava
- **MLP**: Vähäinen huoltotarve, paineen ja nestemäärän tarkistus vuosittain, ammattilaisen huolto 2–3 vuoden välein
- **Kaikki**: Ulkoyksikön ympäristön pitäminen puhtaana lumesta, lehdistä ja roskista

## Tuet ja rahoitus {#tuet-ja-rahoitus}

### Kotitalousvähennys

Lämpöpumpun asennustyö oikeuttaa kotitalousvähennykseen. Vuonna 2026 vähennys on **40 %** työosuudesta (sis. ALV). Enimmäismäärä on **2 250 €** per henkilö vuodessa, ja omavastuu on **100 €**.

**Esimerkki**: Maalämpöasennus, jossa asennustyön osuus on 5 000 € (sis. ALV):
- Vähennys: 5 000 × 0,40 = 2 000 €
- Omavastuu: 100 €
- **Nettovähennys: 1 900 €**

### ARA-energia-avustus

Pientaloille myönnetään avustusta lämmitystapamuutokseen fossiilisesta uusiutuvaan. Avustus kattaa osan kustannuksista ja sitä haetaan ARA:lta (Asumisen rahoitus- ja kehittämiskeskus).

### Rahoitusvaihtoehdot

- **Pankin energiaremonttilaina**: Usein edullisempi korko kuin tavallinen kulutusluotto
- **Lämpöpumppuyhtiöiden osamaksu**: 0 % rahoitus 12–60 kk:lle
- **Kotitalousvähennyksen hyödyntäminen**: Pienentää todellista investointia merkittävästi

## Yhteenveto {#yhteenveto}

Lämpöpumppu on yksi kannattavimmista energiainvestoinneista suomalaiselle kotitaloudelle. Valitse lämpöpumpputyyppi kodin, lämmitysjärjestelmän ja budjetin mukaan:

- **Ilmalämpöpumppu**: Pieni investointi (1 500–3 500 €), nopea takaisinmaksu, hyvä lisälämmitys
- **Ilma-vesilämpöpumppu**: Keskihintainen (8 000–15 000 €), korvaa öljy-/kaasulämmityksen vesikiertoisessa talossa
- **Maalämpöpumppu**: Suurin investointi (15 000–25 000 €), paras hyötysuhde, toimii kaikissa olosuhteissa

Suomen olosuhteissa maalämpö on tehokkain vaihtoehto, mutta ilmalämpöpumppu tarjoaa parhaan hinta-hyötysuhteen nopeana lisälämmityksenä. Hyödynnä kotitalousvähennys ja mahdolliset tuet — ne lyhentävät takaisinmaksuaikaa merkittävästi.`,
  },

  {
    slug: 'aurinkopaneelit-opas',
    title: 'Aurinkopaneelit kotiin — täydellinen opas',
    description:
      'Kattava opas aurinkopaneelien hankintaan: paneelityypit, mitoitus Suomen olosuhteisiin, ROI-laskelma, asennusprosessi, luvat, verkkoon liityntä ja akkuvarastointi.',
    category: 'Uusiutuva energia',
    publishedAt: '2026-02-20',
    updatedAt: '2026-03-15',
    readTime: 20,
    author: 'Energiavertailu-toimitus',
    tags: ['aurinkopaneelit', 'aurinkoenergia', 'uusiutuva energia', 'investointi', 'akkuvarasto', 'mitoitus'],
    relatedGuides: ['aurinkopaneeli-opas', 'energiansaastovinkit', 'sahkon-hinnan-muodostuminen'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'paneelityypit', title: 'Aurinkopaneeliien tyypit', level: 2 },
      { id: 'mitoitus', title: 'Järjestelmän mitoitus Suomessa', level: 2 },
      { id: 'tuotanto-suomessa', title: 'Aurinkosähkön tuotanto Suomen olosuhteissa', level: 2 },
      { id: 'roi-laskelma', title: 'ROI ja kannattavuuslaskelma', level: 2 },
      { id: 'asennusprosessi', title: 'Asennusprosessi vaihe vaiheelta', level: 2 },
      { id: 'luvat-ja-ilmoitukset', title: 'Luvat ja ilmoitukset', level: 2 },
      { id: 'verkkoon-liittaminen', title: 'Verkkoon liittäminen ja mittarit', level: 2 },
      { id: 'ylijaamasahkon-myynti', title: 'Ylijäämäsähkön myynti', level: 2 },
      { id: 'akkuvarastointi', title: 'Akkuvarastointi ja omavaraisuus', level: 2 },
      { id: 'yllapito-ja-huolto', title: 'Ylläpito ja huolto', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Aurinkopaneelit ovat nousseet yhdeksi suosituimmista kotitalouden energiainvestoinneista Suomessa. Vaikka Suomi sijaitsee pohjoisessa, auringon säteilyenergia riittää hyvin aurinkosähkön tuotantoon — erityisesti maaliskuusta syyskuuhun. Tässä oppaassa käymme läpi kaiken, mitä tarvitset tietää aurinkopaneelien hankinnasta, mitoituksesta, kannattavuudesta ja käytännön asioista.

Suomessa aurinkopaneelien hinnat ovat laskeneet yli 60 % viimeisen kymmenen vuoden aikana, ja takaisinmaksuajat ovat lyhentyneet merkittävästi. Vuonna 2026 tyypillinen kotitalouden aurinkosähköjärjestelmä maksaa itsensä takaisin **6–10 vuodessa**, ja paneelien elinikä on vähintään **25–30 vuotta**. Tämä tarkoittaa, että investoinnin jälkeen saat 15–20 vuotta käytännössä ilmaista sähköä.

## Aurinkopaneeliien tyypit {#paneelityypit}

### Monikidepaneelit (polycrystalline)

Monikidepaneelit ovat perinteinen ja edullinen vaihtoehto. Niiden hyötysuhde on tyypillisesti **15–18 %**, ja ne tunnistaa sinertävästä, hieman epätasaisesta pinnasta.

- **Edut**: Edullinen hinta, hyvä hinta-laatusuhde
- **Haitat**: Alhaisempi hyötysuhde, vaatii enemmän pinta-alaa
- **Hinta**: ~0,25–0,35 €/Wp

### Yksikidepaneelit (monocrystalline)

Yksikidepaneelit ovat nykyisin suosituin tyyppi kotitalouksissa. Hyötysuhde on **19–22 %**, ja ne ovat monikidepaneeleita tehokkaampia erityisesti heikossa valossa.

- **Edut**: Korkea hyötysuhde, kompakti koko, hyvä suorituskyky heikossa valossa
- **Haitat**: Hieman kalliimpi kuin monikide
- **Hinta**: ~0,30–0,45 €/Wp

### TOPCon- ja heterojunction-paneelit

Uusimman sukupolven paneelit tarjoavat huippuhyötysuhdetta **21–24 %**. Nämä ovat parasta teknologiaa vuonna 2026.

- **Edut**: Paras hyötysuhde, erinomainen suorituskyky korkeissa lämpötiloissa, alhaisempi tehoalenema vuosien myötä
- **Haitat**: Kalliimpi alkuinvestointi
- **Hinta**: ~0,35–0,55 €/Wp

### Mikä paneelityyppi kannattaa valita?

Useimmille kotitalouksille **yksikidepaneelit** ovat paras valinta hinta-hyötysuhteen perusteella. Jos kattopinta-ala on rajallinen, TOPCon-paneelit tuottavat eniten sähköä per neliömetri. Monikidepaneelit ovat taloudellinen vaihtoehto suurille katoille, joissa tilaa on runsaasti.

## Järjestelmän mitoitus Suomessa {#mitoitus}

### Kulutuksen kartoitus

Oikean mitoituksen perusta on oman sähkönkulutuksen tunteminen:

- **Kerrostaloasunto**: 2 000–4 000 kWh/v → pieni järjestelmä harvoin mahdollinen
- **Rivitalo**: 4 000–8 000 kWh/v → 3–5 kWp
- **Omakotitalo (ei sähkölämmitystä)**: 5 000–10 000 kWh/v → 4–8 kWp
- **Omakotitalo (sähkölämmitys)**: 15 000–25 000 kWh/v → 8–15 kWp
- **Omakotitalo + sähköauto**: 10 000–30 000 kWh/v → 8–15 kWp

### Kattopinta-ala

Yksi nykyaikainen paneeli (400–450 Wp) vie noin **2 m²** kattopinta-alaa. Mitoitusesimerkki:

| Järjestelmän koko | Paneelien määrä | Kattopinta-ala | Vuosituotanto |
|---|---|---|---|
| 3 kWp | 7–8 kpl | 14–16 m² | 2 400–3 000 kWh |
| 5 kWp | 11–13 kpl | 22–26 m² | 4 000–5 000 kWh |
| 8 kWp | 18–20 kpl | 36–40 m² | 6 400–8 000 kWh |
| 10 kWp | 22–25 kpl | 44–50 m² | 8 000–10 000 kWh |
| 15 kWp | 33–38 kpl | 66–76 m² | 12 000–15 000 kWh |

### Katon suuntaus ja kallistus

- **Optimaalinen**: Etelään, 30–45° kallistus → 100 % tuotanto
- **Etelä-lounas tai etelä-kaakko**: 95–98 % tuotanto
- **Itä tai länsi**: 80–85 % tuotanto
- **Itä + länsi -yhdistelmä**: 85–90 % tuotanto, tasaisempi tuotantoprofiili päivän aikana
- **Pohjoinen**: Ei suositella — tuotanto vain 50–60 %
- **Tasakatto**: Telineet optimaaliseen kulmaan → lähes täysi tuotanto

### Varjostusten vaikutus

Varjostukset ovat aurinkopaneelien pahin vihollinen. Jo pieni varjostus voi laskea koko ketjun tuotantoa merkittävästi:

- **Puut**: Kartoita puiden varjot eri vuodenaikoina
- **Savupiippu, antennit**: Aiheuttavat paikallisia varjoja
- **Naapurirakennukset**: Erityisesti matalilla auringon kulmilla (talvi)
- **Ratkaisu**: Mikroinvertterit tai teho-optimoijat minimoivat varjostuksen vaikutuksen

## Aurinkosähkön tuotanto Suomen olosuhteissa {#tuotanto-suomessa}

### Kuukausittainen tuotanto (5 kWp, Etelä-Suomi)

| Kuukausi | Tuotanto (kWh) | Osuus vuodesta |
|---|---|---|
| Tammikuu | 30–60 | 1 % |
| Helmikuu | 100–160 | 3 % |
| Maaliskuu | 350–450 | 8 % |
| Huhtikuu | 550–650 | 13 % |
| Toukokuu | 650–750 | 15 % |
| Kesäkuu | 650–750 | 15 % |
| Heinäkuu | 600–700 | 14 % |
| Elokuu | 500–600 | 11 % |
| Syyskuu | 300–400 | 7 % |
| Lokakuu | 130–200 | 4 % |
| Marraskuu | 40–80 | 2 % |
| Joulukuu | 10–30 | 1 % |
| **Yhteensä** | **3 900–4 800** | **100 %** |

### Suomen aurinko-olosuhteet

Suomi saa yllättävän paljon auringonsäteilyä — Etelä-Suomessa **900–1 050 kWh/m²/v**, mikä vastaa Pohjois-Saksan tasoa. Pitkät kesäpäivät kompensoivat lyhyitä talvipäiviä:

- **Kesäkuussa** aurinko paistaa jopa 19 tuntia → erittäin pitkä tuotantojakso
- **Valoisuus**: Suomen vaalea ilmasto heijastaa valoa tehokkaasti (erityisesti lumipeite keväällä)
- **Viileys**: Paneelit toimivat tehokkaammin viileässä — Suomen kesälämpötilat ovat lähellä optimia

### Erot Etelä- ja Pohjois-Suomen välillä

- **Etelä-Suomi**: ~950 kWh/kWp vuodessa
- **Keski-Suomi**: ~850 kWh/kWp vuodessa
- **Pohjois-Suomi (Oulu)**: ~800 kWh/kWp vuodessa
- **Lappi**: ~700–750 kWh/kWp vuodessa (mutta pitkät kesäpäivät tuottavat hyvin kesäkuukausina)

## ROI ja kannattavuuslaskelma {#roi-laskelma}

### Laskelma: 8 kWp järjestelmä, omakotitalo Etelä-Suomessa

**Investointi**:
- Paneelit + invertteri + asennus: **9 500 €**
- Kotitalousvähennys (asennustyöstä): **-1 500 €**
- **Nettoinvestointi: 8 000 €**

**Vuosituotanto**: 7 200 kWh

**Omakäyttö (60 %)**: 4 320 kWh × 12 c/kWh (kokonaishinta) = **518 €** säästö

**Verkkoon myynti (40 %)**: 2 880 kWh × 5 c/kWh (korvaus) = **144 €** tuloa

**Vuosittainen hyöty yhteensä**: 518 + 144 = **662 €/v**

**Takaisinmaksuaika**: 8 000 / 662 = **12,1 vuotta**

**25 vuoden nettohyöty**: (662 × 25) - 8 000 = **8 550 €**

### Miten parantaa kannattavuutta?

1. **Nosta omakäyttöaste**: Ajoita kulutus päiväaikaan → jopa 70–80 % omakäyttö
2. **Akkuvarasto**: Nostaa omakäyttöasteen 60 % → 80 % tai enemmän
3. **Sähköauto**: Lataa autoa päivällä aurinkosähköllä → suuri omakäyttö
4. **Pörssisähkösopimus**: Parempi korvaus ylijäämästä korkeiden päivähintojen aikaan
5. **Optimaalinen mitoitus**: Älä ylimitoita — ylimääräinen verkkoon myynti on vähemmän arvokasta

## Asennusprosessi vaihe vaiheelta {#asennusprosessi}

### Vaihe 1: Kartoitus ja tarjous (1–2 viikkoa)

- Pyydä tarjous 2–3 asentajalta
- Asentaja arvioi katon soveltuvuuden, suuntauksen ja varjostukset
- Saat mitoitusehdotuksen ja tuotantoarvion
- Vertaa kokonaishintoja ja takuuehtoja

### Vaihe 2: Sopimus ja tilaus (1–2 viikkoa)

- Hyväksy tarjous ja allekirjoita sopimus
- Asentaja tilaa paneelit ja invertterit
- Sovitaan asennusaikataulu

### Vaihe 3: Asennus (1–3 päivää)

- Kattokiinnikkeiden asennus
- Paneelien asennus ja kaapelointi
- Invertterien asennus ja kytkentä sähkötauluun
- Sähkötöiden suoritus valtuutetun sähköasentajan toimesta

### Vaihe 4: Käyttöönotto (1–2 viikkoa)

- Sähköverkkoyhtiölle ilmoitus tuotantolaitteistosta
- Kaksisuuntainen mittari (yleensä jo valmiiksi asennettu etäluettava mittari)
- Järjestelmän käyttöönotto ja testaus
- Tuotannon seurantajärjestelmän aktivointi

### Vaihe 5: Sähkösopimus ja ylijäämä

- Sovi sähkönmyyjän kanssa ylijäämäsähkön korvauksesta
- Tarkista, onko nykyisessä sopimuksessasi prosumer-ehdot
- Harkitse sähkönmyyjän vaihtoa, jos ylijäämäkorvaus ei ole kilpailukykyinen

## Luvat ja ilmoitukset {#luvat-ja-ilmoitukset}

### Rakennuslupa

- **Omakotitalo**: Yleensä **ei tarvita rakennuslupaa** kattoasennukselle, riittää **toimenpideilmoitus** tai ei edes sitä (kuntakohtaisia eroja)
- **Asemakaava-alue**: Tarkista kunnan rakennusjärjestys — joissakin tapauksissa tarvitaan toimenpidelupa
- **Suojeltu rakennus**: Aina erillinen lupa
- **Maahan asennettu**: Yleensä tarvitaan toimenpidelupa

### Sähköverkkoilmoitus

- **Alle 100 kVA** (käytännössä kaikki kotitaloudet): Ilmoitus jakeluverkkoyhtiölle riittää
- Verkkoyhtiö varmistaa, että verkkoon syöttö on turvallista
- Kaksisuuntainen mittari asennetaan tarvittaessa (useimmissa kodeissa jo valmiina)

### Verotus

- Alle 100 kVA:n pientuottaja on vapautettu sähköveronmaksuvelvollisuudesta omaan käyttöön tuotetusta sähköstä
- Verkkoon myydystä sähköstä saat korvauksen, joka on veronalaista pääomatuloa (tai toiminimen kautta yritystuloa)
- Käytännössä verovaikutus on pieni kotitalouskoossa

## Verkkoon liittäminen ja mittarit {#verkkoon-liittaminen}

### Kaksisuuntainen mittari

Aurinkopaneelijärjestelmä vaatii kaksisuuntaisen sähkömittarin, joka mittaa sekä verkosta otetun sähkön (kulutus) että verkkoon syötetyn sähkön (tuotanto). Suomessa lähes kaikki etäluettavat mittarit ovat jo kaksisuuntaisia — tarkista asia verkkoyhtiöltäsi.

### Verkkoon syöttö teknisesti

- **Invertteri** muuntaa paneelien tasavirran (DC) verkkoyhteensopivaksi vaihtovirraksi (AC)
- Invertteri synkronoituu automaattisesti verkon taajuuteen ja jännitteeseen
- Jos sähköverkko katkeaa, invertteri sammuu turvallisuussyistä (anti-islanding)
- Hybridinvertteri + akku mahdollistaa toiminnan myös sähkökatkon aikana

### Verkkoon syötön rajoitukset

- Jakeluverkkoyhtiö voi asettaa rajoituksia verkkoon syöttöteholle
- Yleensä kotitalouksissa ei ole ongelmaa (alle 20 kW:n järjestelmät)
- Suuremmissa järjestelmissä (yli 50 kW) voi tulla lisävaatimuksia

## Ylijäämäsähkön myynti {#ylijaamasahkon-myynti}

### Korvauksen suuruus

Ylijäämäsähköstä saat korvauksen sähkönmyyjältäsi. Korvaus perustuu yleensä:

- **Pörssisähkösopimus**: Nord Pool -tuntihinta miinus myyjän marginaali (0,2–0,5 c/kWh)
- **Kiinteä korvaus**: Jotkut myyjät tarjoavat kiinteän hinnan, esim. 3–6 c/kWh
- **Vuosikeskiarvo**: Korvaus pörssisähköllä vaihtelee kesän 2–5 c/kWh ja talven 5–15 c/kWh välillä

### Tärkeä ymmärtää

Ylijäämäsähköstä saat korvauksen **vain energiaosuudesta**. Et saa takaisin sähkönsiirtomaksua etkä sähköveroa. Siksi:

- **Omakäyttö säästää**: ~12 c/kWh (energia + siirto + verot)
- **Verkkoon myynti tuottaa**: ~3–6 c/kWh (vain energia)
- **Ero on merkittävä**: Jokainen itse käytetty kWh on 2–4 kertaa arvokkaampi kuin verkkoon myyty

## Akkuvarastointi ja omavaraisuus {#akkuvarastointi}

### Miksi akku?

Akku mahdollistaa aurinkosähkön varastoinnin iltaa ja yötä varten, jolloin paneelit eivät tuota. Tämä nostaa omakäyttöastetta merkittävästi.

### Akkujen kustannukset ja mitoitus (2026)

| Akun koko | Hinta (asennettu) | Omakäyttöasteen nosto | Lisäsäästö/v |
|---|---|---|---|
| 5 kWh | 3 500–5 000 € | +15–20 % | 100–200 € |
| 10 kWh | 5 500–8 000 € | +20–30 % | 180–350 € |
| 15 kWh | 8 000–12 000 € | +25–35 % | 250–450 € |

### Akun kannattavuus

Akkuvarastoinnin takaisinmaksuaika on toistaiseksi pidempi kuin pelkkien paneelien (10–15 vuotta). Akku kannattaa erityisesti, jos:

- Omakäyttöaste on ilman akkua alle 40 %
- Pörssisähkön hintavaihtelut ovat suuria (osta halvalla, käytä kalliina)
- Haluat varavoimaa sähkökatkojen varalle (hybridinvertteri)
- Sähkön hinta on korkea (yli 12 c/kWh kokonaishinta)

### Virtuaalivoimalaitokset

Uutena palvelumallina **virtuaalivoimalaitokset** yhdistävät satojen kotitalouksien akut yhdeksi kokonaisuudeksi. Yhtiö voi ohjata akkuja markkinahintojen mukaan ja maksaa sinulle korvausta joustavuudesta. Tämä parantaa akun kannattavuutta merkittävästi.

## Ylläpito ja huolto {#yllapito-ja-huolto}

### Paneelien puhdistus

- Suomessa sade puhdistaa paneelit pääosin itsestään
- **Lumen poisto**: Kevättalvella paneelit voivat olla lumen peitossa — kallistus yli 30° auttaa lunta liukumaan pois
- **Siitepöly ja lika**: Keväällä voi kertyä siitepölyä — tarvittaessa pese pehmeällä harjalla ja vedellä
- **Älä käytä painepesuria**: Voi vahingoittaa paneeleja

### Invertterien huolto

- Invertterien käyttöikä on tyypillisesti **10–15 vuotta** (lyhyempi kuin paneelien)
- Varaudu invertterien vaihtoon paneelien elinkaaren aikana (~1 500–3 000 € vaihto)
- Mikroinvertterien käyttöikä on usein pidempi (25+ vuotta)

### Seurantajärjestelmä

Lähes kaikki nykyaikaiset invertterit sisältävät seurantajärjestelmän, jolla voit:
- Seurata tuotantoa reaaliajassa ja historiallisesti
- Havaita mahdolliset viat nopeasti (tuotannon lasku)
- Vertailla tuotantoa sääennusteisiin
- Optimoida kulutusta tuotannon perusteella

### Paneeliien takuut

- **Tuotetakuu**: Tyypillisesti 12–25 vuotta (valmistusvirheet)
- **Tehotakuu**: 25–30 vuotta (vähintään 80–85 % alkuperäisestä tehosta 25 vuoden jälkeen)
- **Invertteritakuu**: 5–12 vuotta (lisätakuu usein saatavilla)

## Yhteenveto {#yhteenveto}

Aurinkopaneelit ovat kannattava investointi Suomessa — erityisesti omakotitaloissa, joissa katto on suunnattu etelään tai lounaaseen. Tärkeimmät askeleet:

1. **Selvitä kulutuksesi** ja valitse oikea mitoitus
2. **Valitse laadukkaat paneelit** — yksikidepaneelit ovat paras hinta-hyötysuhde
3. **Pyydä 2–3 tarjousta** luotettavilta asentajilta
4. **Maksimoi omakäyttö** ajoittamalla kulutus päiväaikaan
5. **Harkitse akkua**, jos omakäyttöaste jää matalaksi
6. **Hyödynnä kotitalousvähennys** ja mahdolliset tuet

Tyypillinen takaisinmaksuaika on **6–12 vuotta**, ja paneelien elinikä on **25–30+ vuotta**. Aurinkopaneelit ovat paitsi taloudellisesti kannattava, myös ekologisesti kestävä valinta.`,
  },

  {
    slug: 'sahkoauton-lataus-opas',
    title: 'Sähköauton lataaminen — opas kotilatauksen ja julkisen latauksen kustannuksiin',
    description:
      'Kattava opas sähköauton lataukseen: kotilaturityypit, wallbox-asennus, spot-hinnoilla lataus, julkiset latausverkostot Suomessa ja kustannusvertailu bensiiniin.',
    category: 'Sähköauto',
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-20',
    readTime: 15,
    author: 'Energiavertailu-toimitus',
    tags: ['sähköauto', 'lataus', 'kotilataus', 'wallbox', 'julkinen lataus', 'pörssisähkö'],
    relatedGuides: ['porssisahko-opas', 'sahkosopimustyypit', 'energiansaastovinkit'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'lataustyypit', title: 'Lataustyypit ja liittimet', level: 2 },
      { id: 'kotilataus', title: 'Kotilataus — wallbox ja asennus', level: 2 },
      { id: 'kotilatauksen-kustannukset', title: 'Kotilatauksen kustannukset', level: 2 },
      { id: 'porssisahkolla-lataus', title: 'Lataus pörssisähkön spot-hinnalla', level: 2 },
      { id: 'julkinen-lataus', title: 'Julkinen lataus Suomessa', level: 2 },
      { id: 'julkisen-latauksen-hinnat', title: 'Julkisen latauksen hinnat', level: 2 },
      { id: 'kustannusvertailu', title: 'Kustannusvertailu: sähkö vs. bensiini', level: 2 },
      { id: 'talvilataaus', title: 'Lataus talvella', level: 2 },
      { id: 'taloyhtion-lataus', title: 'Lataus taloyhtiössä', level: 2 },
      { id: 'vinkit', title: 'Vinkit edulliseen lataukseen', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Sähköautojen määrä Suomessa kasvaa nopeasti — vuoden 2026 alussa rekisterissä on jo yli 200 000 täyssähköautoa ja yli 150 000 ladattavaa hybridiä. Yksi sähköautoon siirtymisen suurimmista eduista on merkittävästi alhaisemmat energiakustannukset verrattuna bensiini- tai dieselautoon. Tässä oppaassa käymme läpi kotilatauksen ja julkisen latauksen vaihtoehdot, kustannukset ja parhaat strategiat edulliseen lataukseen.

Sähköauton lataus on monelle arkipäiväinen asia, mutta oikeat valinnat laturin, sähkösopimuksen ja latausajankohdan suhteen voivat tuoda **satojen eurojen vuosittaiset säästöt**. Erityisesti pörssisähkön kanssa älykkään latauksen mahdollisuudet ovat merkittävät.

## Lataustyypit ja liittimet {#lataustyypit}

### AC-lataus (vaihtovirta) — hidas ja peruslataus

AC-lataus on yleisin kotilatauksen ja hitaan julkisen latauksen muoto. Sähköauton sisäinen laturi muuntaa vaihtovirran tasavirraksi akun lataamiseksi.

- **Schuko-pistoke (tyypin E/F)**: Tavallinen kotipistorasia, **max 2,3 kW** (1-vaihe, 10 A). Hätälataus, ei suositella jatkuvaan käyttöön.
- **Type 2 -liitin**: Eurooppalainen standardi, **3,7–22 kW**. Kotilatausasemat (wallboxit) ja julkiset AC-latauspisteet.
- **1-vaihelataus**: Max 3,7 kW (16 A). Sopii pieneen päiväkulutukseen.
- **3-vaihelataus**: Max 11 kW (16 A) tai 22 kW (32 A). Suositeltavin kotilataus.

### DC-lataus (tasavirta) — pikalataus

DC-latauksessa latauspiste muuntaa virran suoraan tasavirraksi ja syöttää sen akkuun. Tämä ohittaa auton sisäisen laturin.

- **CCS (Combined Charging System)**: Eurooppalainen pikalatausstandardi, **50–350 kW**
- **CHAdeMO**: Japanilainen standardi (harvinaistumassa), **50–100 kW**
- **Pikalataus**: 50–150 kW, lataa 20 % → 80 % noin 30–45 minuutissa
- **Ultranopea lataus**: 150–350 kW, lataa 20 % → 80 % noin 15–25 minuutissa

### Latausajat käytännössä (60 kWh akku)

| Latausteho | 10–80 % latausaika | Käyttötilanne |
|---|---|---|
| 2,3 kW (Schuko) | ~22 tuntia | Hätälataus |
| 3,7 kW (1-vaihe) | ~13 tuntia | Yölataus |
| 11 kW (3-vaihe) | ~4,5 tuntia | Kotilataus, suositeltu |
| 22 kW (3-vaihe) | ~2,5 tuntia | Nopea kotilataus |
| 50 kW (DC) | ~50 minuuttia | Julkinen pikalataus |
| 150 kW (DC) | ~20 minuuttia | Julkinen ultranopea |

## Kotilataus — wallbox ja asennus {#kotilataus}

### Miksi wallbox?

Wallbox eli kotilatausasema on suositeltavin tapa ladata sähköautoa kotona. Se tarjoaa:

- **Turvallinen lataus**: Suunniteltu jatkuvaan suuritehoiseen lataukseen, toisin kuin tavallinen pistorasia
- **Nopea lataus**: 11–22 kW vs. Schukon 2,3 kW
- **Älytoiminnot**: Ajastus, kulutusseuranta, pörssisähköintegraatio
- **Kestävyys**: Suunniteltu ulkokäyttöön ja Suomen sääoloihin

### Wallboxin valinta

**Suositellut ominaisuudet**:
- **11 kW, 3-vaihelataus** (riittää useimmille, vastaa yölatauksen tarpeeseen)
- **Type 2 -liitin tai kiinteä kaapeli**
- **Älytoiminnot**: WiFi/4G, pörssisähköohjaus, OCPP-tuki
- **Kuormanhallinta**: Estää sulakkeiden ylikuormituksen
- **Sääsuojaus**: IP54 tai parempi ulkoasennukseen

**Suosittuja malleja Suomessa (2026)**:
- Easee Charge / Easee Home: 7 400 W – 22 kW, älykkäät ominaisuudet
- Zaptec Go / Pro: 1,4–22 kW, erityisesti taloyhtiöihin
- Webasto Unite / Live: 11–22 kW, luotettava
- ABB Terra AC: 11–22 kW, teollisuuslaatu

### Asennuskustannukset

| Komponentti | Kustannus |
|---|---|
| Wallbox-laite | 800–2 000 € |
| Sähköasennus (kaapelointi, sulakkeet) | 500–2 000 € |
| Mahdollinen pääsulakkeen nosto | 200–800 € |
| **Yhteensä** | **1 500–4 000 €** |

Kotitalousvähennys: Asennustyöstä saa kotitalousvähennyksen (40 % työosuudesta), mikä voi säästää 300–800 €.

### Sulakekoko ja kuormanhallinta

Wallboxin asennus vaatii riittävän sulakekoon:
- **11 kW lataus**: 3 × 25 A sulakkeet riittävät yleensä (kuormanhallinnan kanssa)
- **22 kW lataus**: Voi vaatia 3 × 35 A tai suuremmat sulakkeet
- **Kuormanhallinta**: Älykäs kuormanhallinta jakaa käytettävissä olevan tehon kodin ja laturin välillä, jolloin sulakkeita ei tarvitse nostaa

## Kotilatauksen kustannukset {#kotilatauksen-kustannukset}

### Esimerkki: 15 000 km/v, kulutus 18 kWh/100 km

**Vuotuinen energiantarve**: 15 000 × 0,18 = **2 700 kWh**

| Sähkösopimus | Hinta (c/kWh, sis. siirto+verot) | Vuosikustannus |
|---|---|---|
| Kiinteä hinta (kallis) | 15 c/kWh | 405 € |
| Kiinteä hinta (edullinen) | 12 c/kWh | 324 € |
| Pörssisähkö (keskihinta) | 10 c/kWh | 270 € |
| Pörssisähkö (yölataus) | 6 c/kWh | 162 € |

### Kotilataus vs. julkinen lataus

| Latausmuoto | Hinta per kWh | 2 700 kWh/v kustannus |
|---|---|---|
| Kotilataus (pörssi, yö) | 6 c/kWh | **162 €** |
| Kotilataus (kiinteä) | 12 c/kWh | **324 €** |
| Julkinen AC (hidas) | 25–35 c/kWh | **675–945 €** |
| Julkinen DC (pika) | 35–55 c/kWh | **945–1 485 €** |

Kotilataus on selkeästi edullisin tapa — jopa **5–10 kertaa halvempi** kuin julkinen pikalataus.

## Lataus pörssisähkön spot-hinnalla {#porssisahkolla-lataus}

### Miksi pörssisähkö on paras sähköautoilijalle?

Sähköauto on ihanteellinen pörssisähkön käyttäjä, koska:
- **Lataus ei ole aikakriittistä**: Auto seisoo yöllä 8–12 tuntia → voit valita halvimmat tunnit
- **Suuri kulutus**: 2 000–5 000 kWh/v → pienikin hintaero kertautuu
- **Älylataus**: Wallboxit ja autot tukevat ajastettua latausta

### Älylatauksen toiminta

1. **Seuraavan päivän hinnat** julkaistaan n. klo 14
2. **Älylaturi** valitsee automaattisesti halvimmat tunnit yöltä
3. **Aseta lähtöaika**: Esim. "auto täyteen klo 7:00 mennessä"
4. **Laturi optimoi**: Lataa halvimpina tunteina, jotta auto on valmis ajoissa

### Säästöesimerkki

**Ilman optimointia** (klo 18–22 lataus, kalliimmat tunnit):
- Keskihinta: ~10 c/kWh → 2 700 kWh × 0,10 = **270 €/v**

**Älylataus** (halvimmat yötunnit, klo 01–05):
- Keskihinta: ~4 c/kWh → 2 700 kWh × 0,04 = **108 €/v**

**Vuosisäästö älylatatauksella: ~162 €**

### Sovellukset ja palvelut

- **Easee**: Sisäänrakennettu pörssisähköohjaus
- **Zaptec**: Tukee OCPP-pohjaista ohjausta
- **Tibber**: Sähkönmyyjä, joka tarjoaa automaattisen älylaturiohjauksen
- **Home Assistant + Nordpool-integraatio**: DIY-ratkaisu edistyneille käyttäjille

## Julkinen lataus Suomessa {#julkinen-lataus}

### Latausverkostot

Suomessa toimii useita latausverkostoja. Suurimmat:

**K-Lataus**: Suomen laajin verkosto, K-ryhmän kauppojen yhteydessä. AC- ja DC-latauspisteitä ympäri Suomen.

**Recharge**: Pohjoismainen verkosto, keskittyy pikalataukseen. 50–300 kW DC-latauspisteitä moottoriteiden varsilla.

**Virta**: Suomalainen latauspalvelualusta, yhdistää useita latausoperaattoreita yhdellä sovelluksella ja maksutavalla.

**Tesla Supercharger**: Teslan verkosto, avautunut myös muille merkeille CCS-liittimellä. 150–250 kW.

**ABC-lataus**: S-ryhmän latausverkosto, ABC-asemien yhteydessä.

**Neste**: Pikalatauspisteitä Neste-asemilla, kumppanuudet eri operaattoreiden kanssa.

### Latauspisteiden määrä

Suomessa on vuonna 2026 arviolta:
- **Julkisia latauspisteitä**: Yli 15 000 (AC + DC)
- **Pikalatauspisteitä (DC)**: Yli 3 000
- **Ultranopeita (150+ kW)**: Yli 1 000

Verkosto kasvaa nopeasti, ja uusia pisteitä lisätään jatkuvasti erityisesti moottoriteiden varsille ja kaupunkikeskustoihin.

## Julkisen latauksen hinnat {#julkisen-latauksen-hinnat}

### Tyypilliset hinnat (2026)

| Lataustyyppi | Hinta | Hinta per 100 km* |
|---|---|---|
| AC hidas (3,7–11 kW) | 0,25–0,35 €/kWh | 4,50–6,30 € |
| AC nopea (22 kW) | 0,30–0,40 €/kWh | 5,40–7,20 € |
| DC pikalataus (50 kW) | 0,35–0,50 €/kWh | 6,30–9,00 € |
| DC ultranopea (150+ kW) | 0,45–0,59 €/kWh | 8,10–10,60 € |

*Olettaen 18 kWh/100 km kulutus

### Hinnoittelumallit

- **kWh-pohjainen**: Maksat kulutetun energian mukaan (yleisin ja reiluin)
- **Minuuttipohjainen**: Maksat latausajan mukaan (suosii nopeasti lataavia autoja)
- **Aloitusmaksu + kWh**: Kiinteä aloitusmaksu + energiamaksu
- **Kuukausitilaus**: Kiinteä kuukausimaksu + alennettu kWh-hinta

### Vinkkejä julkiseen lataukseen

- **Vertaile sovelluksia**: Eri operaattoreilla on eri hinnat samalle pisteelle
- **Kuukausitilaus**: Jos lataat paljon julkisilla, kuukausitilaus voi säästää 20–30 %
- **Vältä pikalatausta turhaan**: AC-lataus kauppa-asioinnin aikana on halvempaa
- **Tarkista roaming-hinnat**: Virran tai muun aggregaattorin kautta lataus voi olla kalliimpaa

## Kustannusvertailu: sähkö vs. bensiini {#kustannusvertailu}

### 15 000 km vuodessa

| Kustannuserä | Sähköauto (kotilataus) | Bensiiniauto |
|---|---|---|
| Kulutus | 18 kWh/100 km | 7 l/100 km |
| Energian hinta | 10 c/kWh | 1,80 €/l |
| **Energiakustannus/v** | **270 €** | **1 890 €** |
| Säästö sähköautolla | | **1 620 €/v** |

### 30 000 km vuodessa (paljon ajava)

| Kustannuserä | Sähköauto (kotilataus) | Bensiiniauto |
|---|---|---|
| **Energiakustannus/v** | **540 €** | **3 780 €** |
| Säästö sähköautolla | | **3 240 €/v** |

### Pörssisähkön yölataus (optimaalinen)

Jos lataat älylatausella yön halvimpina tunteina (~4 c/kWh):
- 15 000 km: **108 €/v** → säästö bensiiniin verrattuna **1 782 €/v**
- 30 000 km: **216 €/v** → säästö bensiiniin verrattuna **3 564 €/v**

Sähköauton energiakustannus on tyypillisesti **70–85 % alhaisempi** kuin bensiiniauton.

## Lataus talvella {#talvilataaus}

### Talven vaikutukset

Suomen talvi vaikuttaa sähköauton lataukseen ja kulutukseen merkittävästi:

- **Kulutus kasvaa**: Talvella kulutus on 20–40 % suurempi (lämmitys, renkaiden vastus)
- **Lataus hidastuu**: Kylmä akku latautuu hitaammin, erityisesti DC-latauksessa
- **Toimintamatka lyhenee**: -20 °C:ssa toimintamatka voi olla 30–40 % lyhyempi kuin kesällä

### Vinkit talvilataukseen

- **Esilämmitä auto latauksen aikana**: Kun auto on kiinni laturissa, lämmitys ei kuluta akkua
- **Lataa useammin**: Pidä akun varaustaso 20–80 % välillä — kylmä ja tyhjä akku on huono yhdistelmä
- **DC-lataus lämmenneellä akulla**: Pikalataus on nopeampaa, kun akku on lämmennyt ajon jälkeen
- **Ajastettu lähtöaika**: Aseta wallboxiin ja autoon lähtöaika → auto on lämmin ja valmis

### Lämpöpumppu parantaa talvikestävyyttä

Uusimmissa sähköautoissa on **lämpöpumppupohjainen lämmitys**, joka on 2–3 kertaa tehokkaampi kuin vastuslämmitys. Tämä vähentää talvella energiankulutusta ja parantaa toimintamatkaa merkittävästi.

## Lataus taloyhtiössä {#taloyhtion-lataus}

### Taloyhtiön latausratkaisut

Taloyhtiössä latauksen järjestäminen vaatii yhteistyötä:

**Yhtiökokouspäätös**: Latauspisteiden asennus vaatii taloyhtiön hallituksen tai yhtiökokouksen päätöksen.

**Vaihtoehdot**:
1. **Oma latauspiste omaan paikkaan**: Asukas kustantaa oman wallboxin ja sähkö mitataan erikseen
2. **Taloyhtiön latausjärjestelmä**: Yhteinen järjestelmä kuormanhallinnalla, kustannukset jaetaan
3. **Latauspalveluyritys**: Ulkopuolinen yritys asentaa ja operoi latauspisteet (esim. Virta, Liikennevirta)

### Kuormanhallinta on välttämätön

Taloyhtiössä kuormanhallinta on kriittinen, koska:
- Monta autoa latautuu samanaikaisesti
- Kiinteistön sähköliittymä on rajallinen
- Ilman kuormanhallintaa sulakkeet voivat laueta
- Älykäs kuormanhallinta jakaa tehon tasaisesti autojen välillä

### Kustannusten jakaminen

- **Alamittarointi**: Jokainen latauspiste on omassa mittauksessa → kukin maksaa omansa
- **Kulutuslaskutus**: Latausjärjestelmä laskee kulutukset ja laskuttaa asukasta
- **Kiinteä kuukausimaksu**: Yksinkertaisin, mutta ei kannusta säästämiseen

## Vinkit edulliseen lataukseen {#vinkit}

1. **Lataa kotona**: Kotilataus on 3–10 kertaa halvempaa kuin julkinen lataus
2. **Käytä pörssisähköä**: Älylataus halvimpina tunteina säästää satoja euroja vuodessa
3. **Lataa yöllä**: Yön tunnit ovat lähes aina halvimpia
4. **Asenna wallbox**: Investointi maksaa itsensä takaisin 1–2 vuodessa verrattuna julkiseen lataukseen
5. **Hyödynnä aurinkopaneelit**: Lataa autoa päivällä aurinkosähköllä → lähes ilmaista
6. **Vältä turhaa pikalatausta**: Käytä pikalatausta vain pitkillä matkoilla
7. **Lataa 20–80 %**: Akun elinikä pitenee ja latausnopeus on paras tällä välillä
8. **Ilmainen lataus**: Hyödynnä kauppakeskusten ja työnantajien tarjoama ilmainen lataus
9. **Vertaile julkisia hintoja**: Eri operaattorit, eri hinnat — sama latauspiste
10. **Esilämmitä talvella**: Esilämmitä auto laturissa kiinni ollessaan, älä akun voimalla

## Yhteenveto {#yhteenveto}

Sähköauton lataus on merkittävästi edullisempaa kuin polttomoottoriauton tankkaaminen — energiakustannukset ovat tyypillisesti **70–85 % alhaisemmat**. Suurimmat säästöt saavutetaan:

- **Kotilataus wallboxilla**: Edullisin ja kätevin tapa, investointi 1 500–4 000 €
- **Pörssisähkö + älylataus**: Automaattinen lataus halvimpina tunteina, säästö jopa 50 % kotilatauksen kustannuksista
- **Aurinkopaneelit**: Kesällä lähes ilmainen lataus omalla aurinkosähköllä

Julkinen latausverkosto Suomessa on kattava ja kasvaa jatkuvasti, mutta hinnat ovat moninkertaiset kotilataukseen verrattuna. Pikalatausta kannattaa käyttää vain pitkillä matkoilla. Investoi wallboxiin — se on sähköautoilijan tärkein lisävaruste.`,
  },

  {
    slug: 'kerrostaloasujan-sahkoopas',
    title: 'Kerrostaloasujan sähköopas',
    description:
      'Opas kerrostaloasukkaan sähkönkulutukseen: tyypillinen kulutus, kustannuksia nostattavat tekijät, säästövinkit, sopimuksen valinta ja taloyhtiön yhteissähkö.',
    category: 'Perustiedot',
    publishedAt: '2026-02-15',
    updatedAt: '2026-03-12',
    readTime: 12,
    author: 'Energiavertailu-toimitus',
    tags: ['kerrostalo', 'sähkönkulutus', 'sähkösopimus', 'säästäminen', 'asuminen'],
    relatedGuides: ['sahkosopimustyypit', 'sahkon-kilpailutus', 'energiansaastovinkit'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'tyypillinen-kulutus', title: 'Kerrostaloasunnon tyypillinen sähkönkulutus', level: 2 },
      { id: 'mika-kuluttaa-eniten', title: 'Mikä kuluttaa eniten sähköä?', level: 2 },
      { id: 'sahkolasku-kasaan', title: 'Mistä sähkölasku koostuu?', level: 2 },
      { id: 'oikea-sopimus', title: 'Oikean sähkösopimuksen valinta', level: 2 },
      { id: 'saastovinkit', title: 'Säästövinkit kerrostaloasujalle', level: 2 },
      { id: 'taloyhtio-sahko', title: 'Taloyhtiön yhteissähkö', level: 2 },
      { id: 'sahkosauna', title: 'Sähkösauna kerrostalossa', level: 2 },
      { id: 'sahkoauto-kerrostalossa', title: 'Sähköauto kerrostalossa', level: 2 },
      { id: 'usein-kysytyt', title: 'Usein kysytyt kysymykset', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Kerrostaloasuminen on Suomen yleisin asumismuoto, ja kerrostaloasukkaan sähkönkulutus poikkeaa merkittävästi omakotitaloasujasta. Kerrostalossa lämmitys ei yleensä kuulu sähkölaskuun (se sisältyy yhtiövastikkeeseen), joten sähkönkulutus on huomattavasti pienempi. Tässä oppaassa käymme läpi kaiken oleellisen kerrostaloasujan sähkönkulutuksesta, sopimuksen valinnasta ja säästömahdollisuuksista.

Vaikka kerrostaloasujan sähkölasku on pienempi kuin omakotitaloasujan, oikean sopimuksen valinnalla ja pienillä arjen muutoksilla voit silti säästää **50–200 euroa vuodessa**. Pienet summat kertautuvat vuosien mittaan merkittäväksi säästöksi.

## Kerrostaloasunnon tyypillinen sähkönkulutus {#tyypillinen-kulutus}

### Kulutus asunnon koon ja asukkaiden mukaan

| Asuntokoko | 1 henkilö | 2 henkilöä | 3–4 henkilöä |
|---|---|---|---|
| Yksiö (30 m²) | 1 200–1 800 kWh/v | 1 500–2 200 kWh/v | — |
| Kaksio (50 m²) | 1 500–2 200 kWh/v | 1 800–2 800 kWh/v | 2 200–3 200 kWh/v |
| Kolmio (75 m²) | 1 800–2 500 kWh/v | 2 200–3 200 kWh/v | 2 800–4 000 kWh/v |
| Neliö+ (90+ m²) | 2 000–3 000 kWh/v | 2 500–3 800 kWh/v | 3 200–5 000 kWh/v |

### Keskimääräinen kulutus

Suomalainen kerrostaloasunto kuluttaa keskimäärin **2 000–3 000 kWh** sähköä vuodessa. Tämä on huomattavasti vähemmän kuin omakotitalo (10 000–25 000 kWh), koska kerrostalossa:
- Lämmitys ei kuulu sähkölaskuun (kaukolämpö tai taloyhtiön lämmitys)
- Lämmin vesi tuotetaan keskitetysti (ei sähköistä lämminvesivaraajaa)
- Sauna on useimmiten taloyhtiön yhteissauna
- Asunto on pienempi ja rakennuksen keskellä olevat asunnot hyötyvät naapureiden lämmöstä

## Mikä kuluttaa eniten sähköä? {#mika-kuluttaa-eniten}

### Sähkönkulutuksen jakautuminen kerrostalossa

| Laite/toiminto | Osuus kulutuksesta | kWh/vuosi (tyypillinen) |
|---|---|---|
| Kylmälaitteet (jääkaappi, pakastin) | 20–25 % | 400–600 kWh |
| Valaistus | 10–15 % | 200–400 kWh |
| Ruoanvalmistus (liesi, uuni) | 10–15 % | 200–350 kWh |
| Viihde-elektroniikka (TV, tietokone) | 10–15 % | 200–350 kWh |
| Pyykinpesu ja kuivaus | 5–10 % | 100–250 kWh |
| Astianpesukone | 5–8 % | 100–200 kWh |
| Asunnon oma sauna | 15–25 % | 300–700 kWh |
| Muu (lataus, pienlatteet, stand-by) | 5–10 % | 100–200 kWh |

### Suurimmat yllätyskuluttajat

**Sähkösauna asunnossa**: Jos asunnossa on oma sähkösauna, se on usein suurin yksittäinen sähkönkuluttaja. Yksi saunomiskerta kuluttaa 5–12 kWh. Jos saunot 3 kertaa viikossa, pelkkä sauna kuluttaa **750–1 800 kWh vuodessa** — jopa 30–40 % koko asunnon kulutuksesta.

**Vanha jääkaappi/pakastin**: Yli 10 vuotta vanha kylmälaite voi kuluttaa 2–3 kertaa enemmän kuin uusi energiatehokas malli. Vaihto uuteen A-luokan laitteeseen säästää 100–200 kWh vuodessa.

**Stand-by -kulutus**: Elektroniikkalaitteet lepotilassa kuluttavat yhteensä 100–300 kWh vuodessa — se on kuin pitäisit 15 W lamppua päällä ympäri vuorokauden.

**Lattialämmitys kylpyhuoneessa**: Jos asunnossa on sähköinen lattialämmitys kylpyhuoneessa, se voi kuluttaa 500–1 000 kWh vuodessa riippuen asetuksesta. Termostaatin säätö on tärkeää.

## Mistä sähkölasku koostuu? {#sahkolasku-kasaan}

### Esimerkkilaskelma: Kaksio, 2 500 kWh/v

| Komponentti | Yksikköhinta | Vuosikustannus |
|---|---|---|
| Sähköenergia | 8,0 c/kWh | 200 € |
| Energian perusmaksu | 2,99 €/kk | 36 € |
| Sähkönsiirto | 4,5 c/kWh | 113 € |
| Siirron perusmaksu | 4,50 €/kk | 54 € |
| Sähkövero | 2,79 c/kWh | 70 € |
| ALV 25,5 % | (kaikesta) | 121 € |
| **Yhteensä** | | **594 €/v (49,50 €/kk)** |

### Tärkeä huomio kerrostaloasujalle

Sähkönsiirron perusmaksu ja sähkövero muodostavat suhteellisesti **suuremman osan** kerrostaloasujan laskusta kuin omakotitalossa, koska kokonaiskulutus on pieni. Perusmaksut ovat kiinteitä riippumatta kulutuksesta.

Tämä tarkoittaa, että kerrostaloasujalle **perusmaksultaan edullinen sopimus** on erityisen tärkeä. Pieni ero perusmaksussa (esim. 1,99 €/kk vs. 3,99 €/kk) tuo vuositasolla 24 € säästön — suhteellisesti merkittävä osa kokonaislaskusta.

## Oikean sähkösopimuksen valinta {#oikea-sopimus}

### Pörssisähkö vai kiinteä hinta?

Kerrostaloasujan sähkönkulutus on suhteellisen pientä ja tasaista. Tämä vaikuttaa sopimuksen valintaan:

**Pörssisähkön edut kerrostaloasujalle**:
- Pitkällä aikavälillä todennäköisesti edullisin
- Pienet kulutuspiikit → hintojen vaihtelu ei aiheuta suuria yllätyksiä
- Voit optimoida saunan ja pyykinpesun ajoitusta

**Pörssisähkön haitat kerrostaloasujalle**:
- Pieni kulutus → absoluuttinen säästö euroissa on rajallinen
- Kuukausimaksu (1,99–3,99 €/kk) syö osan säästöstä
- Vaatii aktiivisuutta suhteessa pieneen hyötyyn

**Kiinteän hinnan edut**:
- Ennustettava lasku joka kuukausi
- Ei tarvitse seurata hintoja
- Hyvä, jos et halua vaivautua optimoimaan

### Suosituksemme

**Pienkuluttajille (alle 2 000 kWh/v)**: Kiinteähintainen tai toistaiseksi voimassa oleva sopimus voi olla järkevin — absoluuttinen hintaero on pieni, ja kuukausimaksut syövät pörssisähkön etua.

**Keskikuluttajille (2 000–4 000 kWh/v)**: Pörssisähkö on todennäköisesti edullisin, erityisesti jos voit ajoittaa saunan ja suuret kuormat halvimpiin tunteihin.

**Saunallisissa asunnoissa**: Pörssisähkö on selkeästi parempi — voit ajoittaa saunomisen halvimpiin tunteihin ja säästää merkittävästi.

### Sopimuksen vertailu käytännössä

Kun vertailet sopimuksia, huomioi:
1. **Kokonaiskustannus vuodessa** — laske oman kulutuksesi perusteella
2. **Perusmaksu** — merkittävä osa pienkuluttajan laskusta
3. **Sopimuksen joustavuus** — määräaikainen vs. toistaiseksi
4. **Mahdolliset lisäpalvelut** — kulutusseuranta, hintahälytykset

## Säästövinkit kerrostaloasujalle {#saastovinkit}

### Keittiö (säästöpotentiaali: 50–100 €/v)

- **Vaihda LED-valoihin**: Jos et ole vielä vaihtanut, tämä on ykkösasia. Säästö 30–80 €/v.
- **Tarkista jääkaapin lämpötila**: +5 °C riittää. Jokainen aste ylimääräistä vie 5–10 % enemmän.
- **Käytä astianpesukoneen eco-ohjelmaa**: Säästää 30–50 % energiaa.
- **Älä esilämmitä uunia turhaan**: Useimmat ruoat eivät vaadi esilämmitystä.

### Kylpyhuone (säästöpotentiaali: 30–80 €/v)

- **Lattialämmityksen termostaatti**: Aseta 25–27 °C. Älä pidä täydellä teholla ympäri vuoden.
- **Lyhyemmät suihkut**: 5 minuutin suihku vs. 10 minuutin suihku → puolet vähemmän lämmintä vettä.
- **Kuivaa pyykit narulla**: Kuivausrumpu on yksi kodin suurimmista energiasyöpöistä.

### Olohuone ja makuuhuone (säästöpotentiaali: 20–50 €/v)

- **Sammuta valot**: Yksinkertaisin ja tehokkain tapa.
- **Sammuta elektroniikka stand-by:stä**: Käytä pistorasian katkaisinta tai älypistorasiaa.
- **TV:n energiansäästöasetukset**: Pienennä kirkkautta, ota eco-tila käyttöön.

### Sauna (säästöpotentiaali: 50–200 €/v)

- **Lyhennä esilämmitystä**: 30–45 minuuttia riittää useimmille kiukaille.
- **Sammuta kiuas saunomisen jälkeen välittömästi**.
- **Saunomiskertojen vähentäminen**: 3 → 2 kertaa viikossa säästää jopa 100 €/v.
- **Ajoita pörssisähköllä**: Sauno halvimpina tunteina — erityisesti viikonloppuisin.

### Pyykinpesu (säästöpotentiaali: 20–40 €/v)

- **Pese 30 °C**: Riittää useimmille vaatteille.
- **Täytä kone**: Puolityhjä kone kuluttaa saman kuin täysi.
- **Ajoita halvimpiin tunteihin**: Pörssisähköllä yöpesu on edullisinta.

## Taloyhtiön yhteissähkö {#taloyhtio-sahko}

### Mitä taloyhtiön sähkö kattaa?

Taloyhtiön yhteissähkö on erillinen asukkaiden omasta sähköstä. Se kattaa:

- **Porraskäytävien valaistus**: Käytävät, portaikot, kellarit
- **Hissi**: Merkittävä sähkönkuluttaja suurissa taloissa
- **Pihavalaistus ja -lämmitys**: Ulkovalaistus, autolämmityspistorasiat
- **Ilmanvaihto**: Koneellinen ilmanvaihto
- **Yhteissauna**: Taloyhtiön saunan sähkö
- **Pesutupa**: Yhteiskäyttöiset pesukoneet ja kuivausrummut

### Vaikutus vastikkeeseen

Taloyhtiön sähkö näkyy yhtiövastikkeessa, ei suoraan sähkölaskussasi. Tyypillisesti taloyhtiön sähkökustannus on **2–5 €/m²/v**, mikä tarkoittaa 50 m² asunnossa noin **100–250 €/v** vastikkeen kautta.

### Voit vaikuttaa yhteissähköön

- Ehdota taloyhtiön kokouksessa LED-valaistusta porraskäytäviin
- Liiketunnistimet kellaritiloihin ja porraskäytäviin
- Taloyhtiön sähkösopimuksen kilpailutus → voi säästää 10–20 %

## Sähkösauna kerrostalossa {#sahkosauna}

### Asuntokohtainen sauna

Jos asunnossasi on oma sähkösauna, se on todennäköisesti suurin yksittäinen sähkönkuluttaja:

**Tyypillinen kiuasteho**: 4,5–8 kW
**Kulutus per saunomiskerta**: 5–12 kWh (esilämmitys + saunominen)
**Kustannus per kerta** (10 c/kWh kokonaishinta): 0,50–1,20 €

**Vuosikustannus saunatapojen mukaan**:
| Saunomistiheys | kWh/vuosi | Kustannus/vuosi |
|---|---|---|
| 1 × viikossa | 260–620 kWh | 26–62 € |
| 2 × viikossa | 520–1 250 kWh | 52–125 € |
| 3 × viikossa | 780–1 870 kWh | 78–187 € |

### Saunomisen säästövinkit

- **Pörssisähköllä**: Sauno halvimpina tunteina → 30–50 % säästö energiakustannuksissa
- **Lyhennä esilämmitysaikaa**: Nykyaikaiset kiukaat lämpiävät 30 minuutissa
- **Pidä saunan ovi kiinni**: Lämmönhukka on merkittävä, kun ovi on auki
- **Harkitse taloyhtiön saunavuoroa**: Jos käytät omaa saunaa harvoin, taloyhtiön sauna voi olla edullisempi

### Taloyhtiön yhteissauna

Monet kerrostalot tarjoavat yhteissaunan, jonka sähkö sisältyy vastikkeeseen. Taloyhtiön saunan käyttö on "ilmaista" (maksettu jo vastikkeessa), joten se voi olla taloudellisesti järkevämpi vaihtoehto kuin oman saunan lämmitys.

## Sähköauto kerrostalossa {#sahkoauto-kerrostalossa}

Sähköauton lataus kerrostalossa on kasvava haaste ja mahdollisuus. Katso erillinen oppaamme sähköauton latauksesta tarkempiin tietoihin.

### Lyhyesti

- **Taloyhtiön päätös tarvitaan** latauspisteiden asentamiseksi
- **Kuormanhallinta** on välttämätöntä usean latauspisteen taloyhtiössä
- **Kustannukset**: Latauspiste + asennus tyypillisesti 2 000–5 000 € per paikka
- **Sähkönmittaus**: Latauspisteen sähkö voidaan mitata erikseen tai laskuttaa kulutusmittauksen perusteella

## Usein kysytyt kysymykset {#usein-kysytyt}

### Paljonko kerrostaloasujan sähkö maksaa kuukaudessa?

Tyypillisesti **35–65 €/kk** riippuen asunnon koosta, asukkaiden määrästä ja kulutustottumuksista. Saunallisissa asunnoissa enemmän.

### Onko kaukolämpö sähkölaskussani?

**Ei.** Kaukolämpö sisältyy taloyhtiön vastikkeeseen. Sähkölaskussasi näkyy vain asuntosi sähkönkulutus (valaistus, laitteet, mahdollinen sauna, lattialämmitys).

### Voinko vaihtaa sähköyhtiötä vuokra-asunnossa?

**Kyllä.** Jos sähkösopimus on sinun nimissäsi, voit kilpailuttaa ja vaihtaa sähkönmyyjää vapaasti. Tarkista vuokrasopimuksestasi, kuka vastaa sähkösopimuksesta.

### Kannattaako pörssisähkö kerrostaloasujalle?

Riippuu kulutuksesta. Jos kulutus on alle 2 000 kWh/v ja et voi joustaa kulutuksessa, hyöty on rajallinen. Jos sinulla on oma sauna ja kulutus yli 2 500 kWh/v, pörssisähkö on todennäköisesti edullisin.

### Miten tiedän, paljonko sähköä kulutan?

Tarkista sähkölaskustasi vuosikulutus tai kirjaudu sähkönsiirtäjäsi verkkopalveluun. Datahub-palvelusta näet tarkan tuntikulutuksesi.

## Yhteenveto {#yhteenveto}

Kerrostaloasujan sähkönkulutus on tyypillisesti **2 000–3 000 kWh vuodessa**, ja vuosikustannus on noin **400–700 euroa**. Suurimmat kuluttajat ovat kylmälaitteet, valaistus, ruoanvalmistus ja mahdollinen asuntokohtainen sauna.

Tärkeimmät säästövinkit:
1. **Kilpailuta sähkösopimus** — erityisesti perusmaksultaan edullinen sopimus
2. **Vaihda LED-valoihin** — nopein ja helpoin säästö
3. **Optimoi sauna** — suurin yksittäinen säästöpotentiaali
4. **Harkitse pörssisähköä** — jos kulutus on yli 2 500 kWh/v ja voit joustaa
5. **Tarkista lattialämmitys** — kylpyhuoneen lattialämmitys on usein ylimääräinen kuluttaja

Kerrostaloasujan sähkölaskussa ei ole kyse suurista summista, mutta oikeat valinnat tuovat vuosien mittaan merkittävän kumulatiivisen säästön.`,
  },

  {
    slug: 'omakotitalon-sahko-opas',
    title: 'Omakotitalon sähkö — kokonaiskustannukset ja säästövinkit',
    description:
      'Kattava opas omakotitalon sähkökustannuksiin: lämmitystavat, eristys, aurinkopaneelit, lämpöpumput, talon koon vaikutus, kausivaihtelut ja älykotiautomaatio.',
    category: 'Energiansäästö',
    publishedAt: '2026-03-05',
    updatedAt: '2026-03-20',
    readTime: 18,
    author: 'Energiavertailu-toimitus',
    tags: ['omakotitalo', 'sähkökustannukset', 'lämmitys', 'energiansäästö', 'älykoti', 'aurinkopaneelit'],
    relatedGuides: ['lampopumppuopas', 'energiansaastovinkit', 'aurinkopaneelit-opas'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'kokonaiskustannukset', title: 'Sähkön kokonaiskustannukset', level: 2 },
      { id: 'lammitystavat', title: 'Lämmitystavat ja niiden kustannukset', level: 2 },
      { id: 'talon-koon-vaikutus', title: 'Talon koon vaikutus kulutukseen', level: 2 },
      { id: 'kausivaihtelut', title: 'Kausivaihtelut sähkönkulutuksessa', level: 2 },
      { id: 'eristys-ja-rakenne', title: 'Eristys ja rakennetekniikka', level: 2 },
      { id: 'aurinkopaneelit', title: 'Aurinkopaneelit omakotitaloon', level: 2 },
      { id: 'lampopumppu-integraatio', title: 'Lämpöpumpun integrointi', level: 2 },
      { id: 'alykoti', title: 'Älykotiautomaatio ja energianhallinta', level: 2 },
      { id: 'sahkosopimus', title: 'Paras sähkösopimus omakotitalolle', level: 2 },
      { id: 'investointien-priorisointi', title: 'Investointien priorisointi', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Omakotitalon sähkökustannukset ovat tyypillisesti moninkertaiset kerrostaloasuntoon verrattuna. Suurimman eron tekee **lämmitys** — sähkölämmitteisessä omakotitalossa lämmitys voi muodostaa jopa 60–70 % koko sähkölaskusta. Tämä opas kattaa omakotitalon sähkökustannusten kokonaisuuden: lämmitystavat, rakenteen vaikutuksen, sesongit, investointivaihtoehdot ja älykkäät säästöstrategiat.

Hyvä uutinen on, että omakotitaloasujalla on eniten mahdollisuuksia vaikuttaa sähkökustannuksiinsa. Lämpöpumppuinvestoinnit, aurinkopaneelit, eristysparannukset ja älykotiautomaatio voivat yhdessä **puolittaa sähkölaskun** tai jopa enemmän. Tässä oppaassa näytämme, miten.

## Sähkön kokonaiskustannukset {#kokonaiskustannukset}

### Tyypilliset vuosikustannukset lämmitystavan mukaan

| Lämmitystapa | Kulutus (kWh/v) | Kustannus (€/v)* | Kuukausikeskiarvo |
|---|---|---|---|
| Suora sähkölämmitys (150 m²) | 18 000–25 000 | 2 900–4 000 | 240–330 € |
| Sähkö + ilmalämpöpumppu | 12 000–18 000 | 1 900–2 900 | 160–240 € |
| Maalämpö | 6 000–10 000 | 970–1 600 | 80–130 € |
| Kaukolämpö + kotisähkö | 4 000–6 000 | 650–970 | 54–80 € |
| Öljylämmitys + kotisähkö | 4 000–6 000 + öljy | 650–970 + 2 500–3 500 (öljy) | — |

*Kokonaishinta sis. energia, siirto, verot. Laskentahinta ~16 c/kWh (sis. ALV).

### Mistä kustannus koostuu?

Omakotitalon sähkölasku voidaan jakaa karkeasti:
- **Lämmitys**: 40–70 % (riippuen lämmitystavasta)
- **Lämmin vesi**: 10–15 %
- **Sauna**: 5–10 %
- **Kodinkoneet ja valaistus**: 10–20 %
- **Muu (ilmanvaihto, pihavalot, autotalli)**: 5–10 %

### Esimerkkilaskelma: 150 m² omakotitalo, suora sähkölämmitys

| Komponentti | kWh/v | c/kWh* | €/v |
|---|---|---|---|
| Lämmitys | 14 000 | 16 | 2 240 |
| Lämmin vesi | 3 000 | 16 | 480 |
| Sauna (2×/vko) | 1 000 | 16 | 160 |
| Kodinkoneet | 2 000 | 16 | 320 |
| Valaistus | 800 | 16 | 128 |
| Muu | 1 200 | 16 | 192 |
| **Yhteensä** | **22 000** | | **3 520 €/v** |

*Kokonaishinta sis. siirto, verot ja ALV.

## Lämmitystavat ja niiden kustannukset {#lammitystavat}

### Suora sähkölämmitys

Suora sähkölämmitys (sähköpatterit, lattialämmitys sähköllä) on yksinkertaisin mutta kallein lämmitystapa. Kaikki lämmitysenergia tuotetaan suoraan sähköstä (COP = 1,0).

**Vuosikustannus (150 m²)**: 2 200–3 500 €
**Etu**: Edullinen asennus, yksinkertainen, ei huoltoa
**Haitta**: Korkeat käyttökustannukset

### Sähkölämmitys + ilmalämpöpumppu

Ilmalämpöpumppu täydentää suoraa sähkölämmitystä ja vähentää kustannuksia tyypillisesti **30–50 %**.

**Vuosikustannus (150 m²)**: 1 500–2 500 €
**Investointi**: 1 500–3 500 € (ILP)
**Takaisinmaksu**: 2–4 vuotta

### Ilma-vesilämpöpumppu

IVLP korvaa vanhan lämmitysjärjestelmän ja liitetään vesikiertoon.

**Vuosikustannus (150 m²)**: 1 000–1 800 €
**Investointi**: 8 000–15 000 €
**Takaisinmaksu**: 5–8 vuotta (korvattavasta järjestelmästä riippuen)

### Maalämpö

Maalämpö on energiatehokkain sähköpohjainen lämmitysmuoto.

**Vuosikustannus (150 m²)**: 700–1 200 €
**Investointi**: 15 000–25 000 € (sis. poraus)
**Takaisinmaksu**: 5–10 vuotta

### Kaukolämpö

Kaukolämpö on saatavilla taajamissa. Kotisähkö kattaa vain kodinkoneet ja valaistuksen.

**Sähkön vuosikustannus**: 500–900 €
**Kaukolämmön vuosikustannus**: 1 500–2 500 € (erillinen lasku)
**Yhteensä**: 2 000–3 400 €

### Vertailutaulukko (150 m², uudehko talo)

| Lämmitystapa | Sähkö (€/v) | Muu energia (€/v) | Yhteensä (€/v) |
|---|---|---|---|
| Suora sähkö | 3 200 | — | 3 200 |
| Sähkö + ILP | 2 200 | — | 2 200 |
| IVLP | 1 400 | — | 1 400 |
| Maalämpö | 950 | — | 950 |
| Kaukolämpö | 700 | 2 000 | 2 700 |
| Öljy | 700 | 3 000 | 3 700 |

## Talon koon vaikutus kulutukseen {#talon-koon-vaikutus}

### Kulutus talon koon mukaan (suora sähkölämmitys)

| Talokeoko | Lämmityskulutus (kWh/v) | Kokonaiskulutus (kWh/v) | Kustannus (€/v)* |
|---|---|---|---|
| 80 m² | 8 000–11 000 | 12 000–15 000 | 1 920–2 400 |
| 120 m² | 12 000–16 000 | 16 000–21 000 | 2 560–3 360 |
| 150 m² | 14 000–19 000 | 19 000–25 000 | 3 040–4 000 |
| 200 m² | 18 000–25 000 | 24 000–32 000 | 3 840–5 120 |
| 250 m² | 22 000–30 000 | 28 000–38 000 | 4 480–6 080 |

*Kokonaishinta 16 c/kWh

### Mikä vaikuttaa kulutukseen talon koon lisäksi?

- **Rakennusvuosi**: Uudet talot (2010-luku) kuluttavat 30–50 % vähemmän kuin 1970-luvun talot
- **Eristystaso**: Hyvä eristys vs. heikko eristys → jopa 40 % ero
- **Ikkunat**: 3-lasiset vs. 2-lasiset ikkunat → merkittävä ero
- **Ilmanvaihto**: Lämmöntalteenotolla varustettu IV vs. painovoimainen → 20–30 % ero lämmityskulutuksessa
- **Asukkaiden tottumukset**: Sisälämpötila, tuuletus, saunan käyttö

## Kausivaihtelut sähkönkulutuksessa {#kausivaihtelut}

### Kuukausittainen kulutus (suora sähkölämmitys, 150 m²)

| Kuukausi | Kulutus (kWh) | Kustannus (€)* | Osuus vuodesta |
|---|---|---|---|
| Tammikuu | 3 200 | 512 | 15 % |
| Helmikuu | 2 800 | 448 | 13 % |
| Maaliskuu | 2 400 | 384 | 11 % |
| Huhtikuu | 1 800 | 288 | 8 % |
| Toukokuu | 1 200 | 192 | 5 % |
| Kesäkuu | 800 | 128 | 4 % |
| Heinäkuu | 700 | 112 | 3 % |
| Elokuu | 800 | 128 | 4 % |
| Syyskuu | 1 200 | 192 | 5 % |
| Lokakuu | 1 800 | 288 | 8 % |
| Marraskuu | 2 400 | 384 | 11 % |
| Joulukuu | 2 900 | 464 | 13 % |
| **Yhteensä** | **22 000** | **3 520** | **100 %** |

*Kokonaishinta 16 c/kWh

### Talvi vs. kesä

- **Talvikuukausi** (tammi): Jopa **4–5 kertaa** suurempi kulutus kuin kesäkuukausi
- **Lämmityskausi** (loka–huhti): ~75 % koko vuoden kulutuksesta
- **Kesäkausi** (touko–syys): ~25 % koko vuoden kulutuksesta

### Pörssisähkön kausivaikutus

Talvella pörssisähkö on kalliimpaa ja kulutus suurempaa — tämä on kaksoishaaste. Mutta samalla säästöpotentiaali älykkäällä ohjauksella on suurin talvella:
- **Esilämmitys halvimpina tunteina**: Lämmitä talo täyteen halvimpina yötunteina
- **Lämminvesivaraaja**: Lämmitä vesi yöllä
- **Lattialämmityksen hitaus**: Lattialämmitys on hidas → voi varastoida halvempaa energiaa

## Eristys ja rakennetekniikka {#eristys-ja-rakenne}

### Eristyksen vaikutus lämmityskustannuksiin

Hyvä eristys on tehokkainta energiansäästöä — se vähentää lämmitystarvetta suoraan:

| Eristysparannuskohde | Investointi | Säästö/vuosi | Takaisinmaksu |
|---|---|---|---|
| Yläpohjan lisäeristys (200→400 mm) | 2 000–5 000 € | 200–500 € | 5–10 v |
| Ikkunoiden vaihto (2→3-lasiset) | 5 000–15 000 € | 200–600 € | 10–20 v |
| Ulkoseinän lisäeristys | 10 000–25 000 € | 300–800 € | 15–25 v |
| Ikkunoiden ja ovien tiivistys | 50–200 € | 50–200 € | 0,5–1 v |
| Alapohjan eristys | 3 000–8 000 € | 100–300 € | 10–20 v |

### Priorisointi

Kustannustehokkuusjärjestyksessä:
1. **Tiivistys** (ikkunat, ovet) — halvinta ja nopeinta
2. **Yläpohjan eristys** — suurin hyöty suhteessa investointiin (lämpö nousee ylös)
3. **Ilmalämpöpumppu** — ei eristys, mutta tuottaa saman hyödyn halvemmalla
4. **Ikkunoiden vaihto** — kallis, mutta merkittävä vaikutus
5. **Ulkoseinän lisäeristys** — suurin investointi, pitkä takaisinmaksu

### Ilmanvaihto ja lämmöntalteenotto

Modernissa ilmanvaihtojärjestelmässä (LTO) lämmöntalteenotto ottaa poistoilmasta 70–90 % lämmöstä ja siirtää sen tuloilmaan. Tämä vähentää lämmitystarvetta merkittävästi:

- **Ilman LTO:ta**: Ilmanvaihdon lämmitystarve ~5 000 kWh/v (150 m² talo)
- **LTO:n kanssa (80 % hyötysuhde)**: ~1 000 kWh/v
- **Säästö**: ~4 000 kWh/v = ~640 €/v

LTO-remontti maksaa 5 000–15 000 €, mutta se parantaa myös sisäilman laatua merkittävästi.

## Aurinkopaneelit omakotitaloon {#aurinkopaneelit}

### Miksi aurinkopaneelit sopivat erityisesti omakotitaloon?

Omakotitalossa aurinkopaneelit ovat parhaimmillaan:
- **Oma katto**: Ei tarvitse taloyhtiön lupaa
- **Riittävästi kattopinta-alaa**: Tyypillisesti 40–100 m² sopivaa kattoa
- **Suuri kulutus**: Enemmän omakäyttöä → parempi kannattavuus
- **Yhdistettävyys**: Aurinkopaneelit + lämpöpumppu + sähköauto = optimaalinen kokonaisuus

### Mitoitus omakotitaloon

| Kulutus | Suositeltu järjestelmä | Investointi | Säästö/v |
|---|---|---|---|
| 5 000–10 000 kWh/v | 5–8 kWp | 6 000–10 000 € | 500–900 € |
| 10 000–20 000 kWh/v | 8–12 kWp | 9 000–15 000 € | 800–1 400 € |
| 20 000–30 000 kWh/v | 12–15 kWp | 13 000–19 000 € | 1 100–1 800 € |

### Aurinkopaneelit + lämpöpumppu

Tämä on erinomainen yhdistelmä:
- **Kesällä**: Aurinkopaneelit tuottavat runsaasti, lämpöpumpun tarve on vähäinen
- **Keväällä ja syksyllä**: Paneelit tuottavat kohtalaisesti, lämpöpumppu hyödyntää aurinkosähköä
- **Talvella**: Paneelit tuottavat vähän, mutta lämpöpumpun COP on silti hyvä (maalämpö)

Yhdistelmä voi vähentää ostosähkön tarvetta **40–60 %**.

## Lämpöpumpun integrointi {#lampopumppu-integraatio}

### Lämpöpumppu ja pörssisähkö

Lämpöpumpun yhdistäminen pörssisähköön ja älykkääseen ohjaukseen on optimaalinen strategia:

1. **Esilämmitys halvimpina tunteina**: Lattialämmitys ja varaaja täyteen halvalla sähköllä
2. **Lämpötilan pudotus kalliina tunteina**: Lattialämmityksen hitaus mahdollistaa 2–4 tunnin tauot
3. **Lämminvesivaraaja**: Lämmitetään kokonaan halvimpina tunteina

### Säästöesimerkki: Maalämpö + pörssisähkö + älyohjaus

**Ilman optimointia** (maalämpö, tasainen käyttö):
- Sähkönkulutus: 7 000 kWh/v × 10 c/kWh = **700 €/v**

**Älyohjauksen kanssa** (80 % kulutuksesta halvimpina tunteina):
- Painotettu keskihinta: ~6 c/kWh
- Kustannus: 7 000 × 0,06 = **420 €/v**

**Säästö älyohjauksella: ~280 €/v**

### Hybridijärjestelmät

Modernit lämpöpumput voidaan integroida aurinkopaneeleihin ja akkuvarastoihin:
- **Aurinkosähköllä käyntiin**: Lämpöpumppu aktivoituu kun paneelit tuottavat
- **Akkuun varaus**: Yön halpa sähkö akkuun, lämpöpumppu käyttää päivällä
- **Joustavuuspalvelut**: Lämpöpumppu osallistuu sähkömarkkinoiden jousto-ohjelmiin

## Älykotiautomaatio ja energianhallinta {#alykoti}

### Älykodin peruspalikat

**Älytermostattit** (200–500 €):
- Huonekohtainen lämpötilan säätö
- Aikataulutettu lämmitys ja pudotukset
- Etähallinta sovelluksella
- Pörssisähköintegraatio

**Älypistorasiat** (15–40 €/kpl):
- Laitteiden ohjaus ja ajastus
- Kulutuksen seuranta per laite
- Automaatiot pörssisähkön perusteella

**Energiamittari** (100–300 €):
- Reaaliaikainen kulutuksen seuranta
- Historiallinen data
- Hälyytykset poikkeavasta kulutuksesta

### Home Assistant — edistynyt energianhallinta

**Home Assistant** on avoimen lähdekoodin kotiautomaatioalusta, jolla voit:

- **Ohjata lämmitystä** pörssisähkön hinnan perusteella automaattisesti
- **Ajastaa kodinkoneet** halvimpiin tunteihin
- **Optimoida lämpöpumpun** ja varaajan käyttöä
- **Integroida aurinkopaneelit** ja akun ohjaukseen
- **Seurata kaikkea** yhdestä dashboardista

**Tyypillinen säästö**: 10–25 % sähkökustannuksista älykkäällä ohjauksella

### Investointivertailu: Älykoti-järjestelmä

| Komponentti | Investointi | Vuosisäästö | Takaisinmaksu |
|---|---|---|---|
| Älytermostattit (5 kpl) | 400–600 € | 100–300 € | 2–4 v |
| Älypistorasiat (10 kpl) | 200–400 € | 50–100 € | 2–4 v |
| Home Assistant + gateway | 100–200 € | 100–400 € | 0,5–2 v |
| Energiamittari | 100–300 € | 50–100 € | 2–3 v |
| **Yhteensä** | **800–1 500 €** | **300–900 €** | **1–3 v** |

## Paras sähkösopimus omakotitalolle {#sahkosopimus}

### Pörssisähkö — suosituksemme

Omakotitaloasujalle pörssisähkö on lähes aina paras vaihtoehto, koska:
- **Suuri kulutus** → pienikin hintaero kertautuu merkittäväksi
- **Paljon joustoa**: Lämmitys, varaaja, sauna, sähköauto — kaikki ajoitettavissa
- **Älyohjaus**: Automatisoitu optimointi tuo suurimmat säästöt suurkuluttajille

### Kiinteä hinta — milloin se sopii?

Kiinteä hinta voi olla järkevä, jos:
- Et halua tai voi investoida älyohjaukseen
- Haluat ennustettavat kulut ehdottomasti
- Markkinahinnat ovat poikkeuksellisen matalalla ja kiinteän hinnan voi lukita edullisesti

### Laskuesimerkki: Pörssi vs. kiinteä (22 000 kWh/v)

**Kiinteä hinta 8,5 c/kWh** + 2,99 €/kk perusmaksu:
- 22 000 × 0,085 + 12 × 2,99 = 1 870 + 36 = **1 906 €/v** (sis. energiamaksu, ei siirtoa/veroja)

**Pörssisähkö** (keskihinta 5,5 c/kWh älyohjauksella) + 0,39 c/kWh marginaali + 2,99 €/kk:
- 22 000 × (0,055 + 0,0039) + 12 × 2,99 = 1 296 + 36 = **1 332 €/v**

**Säästö pörssisähköllä + älyohjauksella: ~574 €/v**

## Investointien priorisointi {#investointien-priorisointi}

### Priorisoitu investointilista omakotitalolle

Järjestys kustannustehokkuuden mukaan (paras ensin):

| # | Investointi | Kustannus | Takaisinmaksu | Vuosisäästö |
|---|---|---|---|---|
| 1 | LED-valaistus | 100–300 € | 0,5–1 v | 100–200 € |
| 2 | Tiivistys (ikkunat, ovet) | 50–200 € | 0,5–1 v | 50–200 € |
| 3 | Ilmalämpöpumppu | 1 500–3 500 € | 2–4 v | 500–1 000 € |
| 4 | Älykoti-automaatio | 800–1 500 € | 1–3 v | 300–900 € |
| 5 | Yläpohjan lisäeristys | 2 000–5 000 € | 5–10 v | 200–500 € |
| 6 | Aurinkopaneelit (8 kWp) | 8 000–11 000 € | 8–12 v | 700–1 200 € |
| 7 | Maalämpö | 15 000–25 000 € | 5–10 v | 1 500–2 500 € |
| 8 | Akkuvarasto | 5 000–10 000 € | 10–15 v | 200–500 € |

### Kokonaisinvestoinnin vaikutus

Jos toteuttaisit kaikki investoinnit 1–6, kokonaisinvestointi olisi noin **12 500–21 500 €** ja vuosisäästö noin **1 850–4 000 €**. Takaisinmaksuaika kokonaisuudelle on **4–8 vuotta**, jonka jälkeen säästöt ovat puhdasta voittoa.

## Yhteenveto {#yhteenveto}

Omakotitalon sähkökustannukset riippuvat ennen kaikkea lämmitystavasta. Suoran sähkölämmityksen **3 000–4 000 €/v** kustannus voidaan optimaalisilla investoinneilla pudottaa alle **1 500 €/v**:

1. **Lämpöpumppu on tärkein investointi**: ILP nopeasti, maalämpö pitkällä aikavälillä
2. **Pörssisähkö + älyohjaus**: Suurimmat säästöt suurkuluttajille
3. **Eristys ensin, sitten teknologia**: Vähennä ensin lämmitystarvetta, sitten optimoi tuotanto
4. **Aurinkopaneelit**: Täydentävä investointi, erityisesti yhdistettynä lämpöpumppuun
5. **Investoi vaiheittain**: Aloita halvimmista ja nopeimmin takaisinmaksettavista

Omakotitalon energiatalouteen voi vaikuttaa enemmän kuin mihinkään muuhun asumismuotoon. Oikeilla valinnoilla sähkölasku voi olla jopa pienempi kuin kerrostaloasunnossa — maalämmöllä ja aurinkopaneeleilla varustettu moderni omakotitalo kuluttaa ostosähköä vain 3 000–5 000 kWh vuodessa.`,
  },

  {
    slug: 'talven-sahkonkulutus-opas',
    title: 'Talven sähkönkulutus — näin varaudut kylmiin kuukausiin',
    description:
      'Opas talven sähkönkulutukseen: kulutushuiput, lämmityksen optimointi, pörssisähkön talvistrategiat, eristyksen ROI, varalämmitys ja Suomen talven erityispiirteet.',
    category: 'Energiansäästö',
    publishedAt: '2026-02-01',
    updatedAt: '2026-03-10',
    readTime: 14,
    author: 'Energiavertailu-toimitus',
    tags: ['talvi', 'sähkönkulutus', 'lämmitys', 'pörssisähkö', 'energiansäästö', 'varautuminen'],
    relatedGuides: ['lampopumppuopas', 'omakotitalon-sahko-opas', 'porssisahko-opas'],
    tableOfContents: [
      { id: 'johdanto', title: 'Johdanto', level: 2 },
      { id: 'talven-kulutusprofiilit', title: 'Talven kulutusprofiilit', level: 2 },
      { id: 'miksi-talvi-on-kallis', title: 'Miksi talvi on sähkölle kallista aikaa?', level: 2 },
      { id: 'lammityksen-optimointi', title: 'Lämmityksen optimointi talvella', level: 2 },
      { id: 'porssisahko-talvella', title: 'Pörssisähköstrategiat talvella', level: 2 },
      { id: 'eristyksen-roi', title: 'Eristysparannusten ROI talvella', level: 2 },
      { id: 'varalammitys', title: 'Varalämmitys ja varautuminen', level: 2 },
      { id: 'sahkokatko-varautuminen', title: 'Sähkökatkoihin varautuminen', level: 2 },
      { id: 'suomen-talven-erityispiirteet', title: 'Suomen talven erityispiirteet', level: 2 },
      { id: 'kaytannon-tarkistuslista', title: 'Käytännön tarkistuslista', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    content: `## Johdanto {#johdanto}

Suomen talvi on sähkönkulutuksen huippuaikaa. Kylmät kuukaudet marraskuusta maaliskuuhun vastaavat tyypillisesti **60–75 %** sähkölämmitteisen omakotitalon koko vuoden sähkönkulutuksesta. Samaan aikaan sähkön markkinahinnat ovat korkeimmillaan. Tämä kaksoishaaste tekee talveen varautumisesta kriittisen tärkeää sekä taloudellisesti että käytännön näkökulmasta.

Tässä oppaassa käymme läpi, miksi talvi on sähkölle kallista aikaa, miten optimoida lämmitystä, mitä strategioita pörssisähkön käyttäjän kannattaa soveltaa ja miten varautua äärimmäisiin tilanteisiin. Oikeilla toimenpiteillä voit vähentää talven sähkökustannuksia **20–40 %** ilman merkittävää mukavuuden menetystä.

## Talven kulutusprofiilit {#talven-kulutusprofiilit}

### Kuukausittainen kulutus asumismuodoittain

| Kuukausi | Kerrostalo (kWh) | OKT sähkölämmitys (kWh) | OKT maalämpö (kWh) |
|---|---|---|---|
| Marraskuu | 220 | 2 400 | 800 |
| Joulukuu | 250 | 2 900 | 950 |
| Tammikuu | 260 | 3 200 | 1 050 |
| Helmikuu | 240 | 2 800 | 920 |
| Maaliskuu | 220 | 2 400 | 780 |
| **Talvi yhteensä** | **1 190** | **13 700** | **4 500** |
| **Osuus vuodesta** | **~45 %** | **~62 %** | **~56 %** |

### Vuorokausiprofiilit talvella

Tyypillisen talvipäivän sähkönkulutus vaihtelee merkittävästi:

**Aamupiikki (klo 06–09)**: Lämmitys tehostuu, valaistus päälle, aamutoimet → korkeaa kulutusta
**Päivä (klo 09–16)**: Tasainen kulutus, lämmitys ylläpitää lämpöä
**Iltapiikki (klo 16–21)**: Ruoanlaitto, sauna, valaistus → vuorokauden korkein kulutus
**Yö (klo 22–06)**: Matalin kulutus, lämmitys voi laskea → halvinta pörssisähköä

### Pakkaspäivän vaikutus

Kovalla pakkasella (-20 °C ja alle) sähkönkulutus voi nousta **2–3-kertaiseksi** normaaliin talvipäivään verrattuna:

| Ulkolämpötila | Lämmitystarve (suhteellinen) | Päiväkulutus OKT (kWh) |
|---|---|---|
| 0 °C | 1,0× | 50–65 |
| -10 °C | 1,5× | 75–100 |
| -20 °C | 2,0× | 100–130 |
| -30 °C | 2,5× | 125–165 |

## Miksi talvi on sähkölle kallista aikaa? {#miksi-talvi-on-kallis}

### Kulutus kasvaa

Talven sähkönkulutuksen kasvun syyt:
- **Lämmitys**: Suurin tekijä — kylmä ilma vaatii jatkuvaa lämmitystä
- **Valaistus**: Lyhyet päivät → enemmän keinovaloa (6–7 h vs. 18–19 h päivänvaloa kesällä)
- **Lämmin vesi**: Tuleva kylmä vesi on kylmempää → enemmän energiaa sen lämmitykseen
- **Sauna**: Sauna lämpiää hitaammin kylmässä tilassa
- **Sähköauto**: Talvella 20–40 % suurempi kulutus (lämmitys, vastus)

### Pörssisähkön hinta nousee

Talvella sähkön markkinahinta on korkeimmillaan, koska:
- **Kysyntä on suurta**: Koko Suomi ja Pohjoismaat lämmittävät samanaikaisesti
- **Tuulivoiman vaihtelu**: Tyynillä pakkaspäivillä tuulivoiman tuotanto on minimissä
- **Vesivoiman rajoitteet**: Vesistöt jäässä, vesivarastot matalimmillaan
- **Tuontikapasiteetti**: Suomi tuo sähköä Ruotsista, Virosta ja Norjasta — siirtokapasiteetilla on rajansa

**Pörssisähkön hintatilastot**:
| Kausi | Keskihinta (c/kWh, ALV 0%) | Huippuhinta |
|---|---|---|
| Kesä (kesä–elo) | 2–5 | 10–20 |
| Syksy (syys–marras) | 5–10 | 20–50 |
| Talvi (joulu–helmi) | 8–15 | 50–200+ |
| Kevät (maalis–touko) | 4–8 | 15–40 |

### Kaksoishaaste: Enemmän kulutusta × kalliimpi hinta

Talvikuukausina olet tilanteessa, jossa kulutat eniten JA sähkö on kalleinta. Tämä tekee talvistrategiasta erityisen tärkeää:

- **Kesäkuukauden sähkölasku (OKT)**: ~100–150 €
- **Tammikuun sähkölasku (OKT, suora sähkö)**: ~400–600 €
- **Pahimmillaan pakkasjakso**: Yli 800 €/kk

## Lämmityksen optimointi talvella {#lammityksen-optimointi}

### Sisälämpötilan hallinta

Lämpötilan pudotus on yksinkertaisin tapa säästää:

| Toimenpide | Säästö lämmityskuluissa |
|---|---|
| 1 °C pudotus (22 → 21 °C) | ~5 % |
| 2 °C pudotus (22 → 20 °C) | ~10 % |
| Yöpudotus 2 °C | ~5 % |
| Tyhjän talon pudotus 5 °C | ~15–20 % (poissa ollessa) |

**Tärkeää**: Älä pudota lämpötilaa liian alas — alle 16 °C:n lämpötilat voivat aiheuttaa kosteusvaurioriskin.

### Huonekohtainen säätö

Eri huoneissa tarvitaan eri lämpötilat:
- **Olohuone**: 20–21 °C
- **Makuuhuoneet**: 18–19 °C (viileämpi on parempi nukkumiseen)
- **Kylpyhuone**: 22–24 °C
- **Eteinen ja käytävät**: 18 °C
- **Varastohuone**: 15 °C

### Lattialämmityksen optimointi

Lattialämmitys on hidas järjestelmä, ja tämä on sekä etu että haaste:

**Etu**: Lattia toimii lämpövarastona — voidaan "ladata" halvalla sähköllä
**Haaste**: Reagoi hitaasti muutoksiin — ei kannata sammuttaa kokonaan

**Strategia pörssisähköllä**:
1. Lämmitä lattia täyteen halvimpina tunteina (yö, klo 01–05)
2. Pudota tehoa kalliimpina aamutyneina (klo 07–09) — lattia luovuttaa varastoitua lämpöä
3. Ylläpidä tasaista lämpöä päivällä
4. Pudota jälleen illan hintapiikin aikaan (klo 17–20) — lattian lämpövarasto kestää 2–4 h

### Ilmalämpöpumpun talvikäyttö

- **Pidä päällä jatkuvasti**: Päälle/pois-syklaus kuluttaa enemmän
- **Aseta 20–21 °C**: Ei kannata ylilämmittää
- **Puhdista suodattimet**: Likainen suodatin heikentää tehoa 10–15 % — talvella tämä tuntuu
- **Tarkkaile huurtumista**: Kovalla pakkasella ulkoyksikkö huurtuu → automaattinen sulatus
- **Varalämmitys valmiudessa**: Alle -20 °C ILP:n teho laskee merkittävästi

## Pörssisähköstrategiat talvella {#porssisahko-talvella}

### Hintaprofiili talvella

Talven tyypillinen vuorokausihintaprofiili:
- **Halvimmat tunnit**: Klo 01–05 (usein 2–6 c/kWh)
- **Aamupiikki**: Klo 07–09 (usein 10–20 c/kWh)
- **Päivä**: Klo 10–16 (kohtalainen, 6–12 c/kWh)
- **Iltapiikki**: Klo 17–20 (usein 12–25 c/kWh, joskus huomattavasti enemmän)
- **Ilta**: Klo 21–24 (laskeva, 5–10 c/kWh)

### Strategia 1: Yölataus

Siirrä kaikki mahdollinen kulutus yöhön:
- Lämminvesivaraajan lämmitys klo 01–05
- Lattialämmityksen tehostus klo 01–06
- Sähköauton lataus klo 01–05
- Pyykinpesu- ja kuivauskoneen ajastus

### Strategia 2: Hintakatto

Aseta älyohjausjärjestelmään hintaraja, jonka yli et lämmitä:
- **Esim. 15 c/kWh raja**: Lämmitys pois kun hinta ylittää rajan
- Lattialämmityksen varastoitu lämpö kestää 2–4 tuntia
- Varaaja kestää 4–8 tuntia ilman lisälämmitystä

### Strategia 3: Ennakkolämmitys

Kun tiedät seuraavan päivän hinnat (julkaistaan klo 14):
1. **Tarkista kalliit tunnit** seuraavalle päivälle
2. **Esilämmitä** talo 1–2 °C ylemmäs ennen kalliita tunteja
3. **Pudota lämpöä** kalliina tunteina
4. **Palaa normaaliin** hinnan laskiessa

### Esimerkkilaskelma: Strategian tuottama säästö

**Ilman optimointia** (tasainen kulutus 100 kWh/vrk talvipäivänä):
- Keskihinta talvella: 12 c/kWh → 12 €/vrk

**Älyohjauksen kanssa** (70 % kulutuksesta halvimpina tunteina):
- Painotettu keskihinta: 7 c/kWh → 7 €/vrk
- **Säästö: 5 €/vrk → 150 €/kk → 750 €/talvi**

## Eristysparannusten ROI talvella {#eristyksen-roi}

### Eristyksen merkitys korostuu talvella

Heikko eristys "vuotaa" lämpöä sitä enemmän, mitä suurempi lämpötilaero sisä- ja ulkoilman välillä on. -20 °C pakkasella lämpöhäviö on moninkertainen +5 °C syyssäähän verrattuna.

### ROI-laskelma: Yläpohjan lisäeristys

**Lähtötilanne**: 150 m² talo, yläpohjan eristys 200 mm, U-arvo 0,22 W/m²K
**Parannus**: Lisäeristys 200 mm → yhteensä 400 mm, U-arvo 0,11 W/m²K
**Lämpöhäviön pienentyminen**: ~50 % yläpohjan kautta

**Laskenta**:
- Yläpohjan lämpöhäviö ennen: ~3 500 kWh/v
- Yläpohjan lämpöhäviö jälkeen: ~1 750 kWh/v
- **Säästö**: 1 750 kWh/v × 16 c/kWh = **280 €/v**
- **Investointi**: 3 000 €
- **Takaisinmaksu**: 3 000 / 280 = **10,7 vuotta**

### ROI-laskelma: Ikkunoiden tiivistys

**Lähtötilanne**: Vuotavat ikkunatiivisteet, ilmavuoto 0,5 l/s per ikkuna, 10 ikkunaa
**Parannus**: Uudet tiivisteet kaikiin ikkunoihin
**Investointi**: 100 € (tiivisteet) + 50 € (työkalut) = 150 €
**Säästö**: ~200–400 kWh/v = **30–60 €/v**
**Takaisinmaksu**: **2–5 vuotta**

Ikkunoiden tiivistys on yksi parhaista hinta-hyötysuhteen investoinneista — ja sen voi tehdä itse.

### Eristyksen vaikutus asuinmukavuuteen

Eristysparannukset eivät ole vain taloudellisia — ne parantavat myös:
- **Lämpöviihtyvyyttä**: Ei kylmiä pintoja eikä vetoa
- **Tasaisempaa lämpötilaa**: Vähemmän lämpötilavaihtelua huoneiden välillä
- **Kosteudenhallintaa**: Lämpimät pinnat eivät tiivisty — vähemmän kosteusvaurioriskiä

## Varalämmitys ja varautuminen {#varalammitys}

### Varalämmitysvaihtoehdot

Kovilla pakkasilla tai häiriötilanteissa on hyvä olla varalämmityssuunnitelma:

**Puulämmitys (takka, leivinuuni, puuliesi)**:
- Takan lämmitysteho: 3–8 kW
- Leivinuunin varastointikyky: 20–40 kWh lämpöä yhdellä lämmityksellä
- **Pidä aina polttopuita valmiina** — vähintään 1 m³ kuivaa puuta

**Sähkölämmitin (varatilanne)**:
- Öljytäytteinen sähköpatteri: 1–2,5 kW
- Hyvä varalämmitys yhteen huoneeseen
- Ei vaadi asennusta

**Aggregaatti**:
- Polttoainekäyttöinen sähkögeneraattori
- 2–5 kW aggregaatti riittää peruslämmitykseen ja valaistukseen
- Pidä polttoainetta varastossa

### Pakkasjakson varautumisstrategia

1. **Seuraa sääennustetta**: Varaudu kovaan pakkasjaksoon 3–5 päivää etukäteen
2. **Esilämmitä talo**: Nosta sisälämpötilaa 1–2 °C ennen pakkasia (erityisesti lattialämmitys)
3. **Täytä lämminvesivaraaja**: Varmista, että varaaja on täysi
4. **Tarkista takkapuut**: Varmista, että takka on käyttökunnossa ja puita on riittävästi
5. **Tarkista tiivisteet**: Varmista, ettei ikkunoista ja ovista vuoda kylmää ilmaa
6. **Vähennä tuuletusta**: Lyhyt, tehokas tuuletus pitkän rakotuuletuksen sijaan

## Sähkökatkoihin varautuminen {#sahkokatko-varautuminen}

### Sähkökatkon riskit talvella

Talvella sähkökatko on vakavampi kuin kesällä:
- **Jäätymisriski**: Vesikiertoinen lämmitys voi jäätyä alle -10 °C
- **Lämpötila laskee nopeasti**: Heikosti eristetyssä talossa sisälämpötila laskee -10 °C:ssa ulkona noin 1 °C/tunti
- **Hyvin eristetyssä talossa**: Lämpötila laskee noin 0,3–0,5 °C/tunti

### Varautuminen sähkökatkoon

**Välittömät toimenpiteet (0–2 h)**:
- Takan sytytys
- Turhien sähkölaitteiden irrotus (suojaavat virran palautuessa)
- Jääkaapin ja pakastimen pitäminen kiinni (kestävät 4–6 h ilman sähköä)

**Pidempi katko (2–12 h)**:
- Takan jatkuva lämmitys
- Käyttövesi: Täytä astioita ennen kuin vedenpaine laskee (jos vesipumppu on sähkökäyttöinen)
- Kokoontuminen yhteen huoneeseen lämmön säilyttämiseksi

**Pitkä katko (yli 12 h, kova pakkanen)**:
- **Putkien jäätymisvaara**: Jos sisälämpötila laskee alle +5 °C:n ja kova pakkanen jatkuu
- Jätä hanat tippumaan ohuesti (estää jäätymisen)
- Harkitse vesijärjestelmän tyhjennystä pitkässä katkossa
- Hae ammattiapua tarvittaessa

### Investointi sähkökatkovalmiuteen

| Varuste | Kustannus | Hyöty |
|---|---|---|
| Taskulamppu + paristot | 20–50 € | Perustarvike |
| Puulämmitysjärjestelmä (takka) | 2 000–8 000 € | Varalämmitys ja tunnelma |
| Aggregaatti (3 kW) | 800–2 000 € | Sähköä kriittisiin laitteisiin |
| UPS-akku (2 kWh) | 1 000–2 000 € | Automaattinen varavirta |
| Hybridinvertteri + akku (aurinkopaneelit) | 5 000–12 000 € | Varavirta + normaaliajan säästö |

## Suomen talven erityispiirteet {#suomen-talven-erityispiirteet}

### Alueelliset erot

Suomen talvi vaihtelee merkittävästi alueittain:

**Etelä-Suomi (Helsinki–Turku–Tampere)**:
- Mitoituslämpötila: -26 °C
- Talven keskilämpötila: -3 – -6 °C
- Lämmitystarveluku: 3 800–4 200 °Cvrk
- Pakkasjaksot: Tyypillisesti 1–2 viikon kovia pakkasjaksoja

**Keski-Suomi (Jyväskylä–Kuopio–Joensuu)**:
- Mitoituslämpötila: -29 – -32 °C
- Talven keskilämpötila: -6 – -10 °C
- Lämmitystarveluku: 4 500–5 000 °Cvrk
- Pakkasjaksot: Pidempiä ja kylmempiä kuin etelässä

**Pohjois-Suomi (Oulu–Rovaniemi–Sodankylä)**:
- Mitoituslämpötila: -32 – -38 °C
- Talven keskilämpötila: -10 – -15 °C
- Lämmitystarveluku: 5 500–6 500 °Cvrk
- Pakkasjaksot: Pitkiä, jopa kuukauden kylmiä jaksoja

### Ilmastonmuutoksen vaikutus

Ilmastonmuutos muuttaa Suomen talvia:
- **Keskilämpötila nousee**: Talvet leudompia pitkällä aikavälillä
- **Ääriolosuhteet**: Vaikka keskiarvo leudontuu, yksittäiset pakkaspiikit voivat olla edelleen kovia
- **Lumimäärän vaihtelu**: Lumi voi tulla ja sulaa useammin → jäätymis-sulamisjaksot lisääntyvät
- **Energiantarve vähenee**: Pitkällä aikavälillä lämmitystarve pienenee

### Suomalainen sähköjärjestelmä talvella

- **Huipputeho**: Suomen sähkön huipputeho on talvella noin 15 000 MW
- **Kotimainen kapasiteetti**: Noin 17 000 MW (ydinvoima, vesivoima, tuulivoima, CHP)
- **Tuonti**: Suomi tuooo sähköä Ruotsista, Virosta ja Norjasta (siirtokapasiteetti ~5 500 MW)
- **Tehoreservi**: Fingrid ylläpitää tehoreserviä äärimmäisiä huipputilanteita varten
- **Sähköpula**: Suomessa ei ole ollut varsinaista sähköpulaa, mutta tehopula-tilanteita on harjoiteltu

## Käytännön tarkistuslista {#kaytannon-tarkistuslista}

### Ennen talvea (syys-lokakuu)

- **Tarkista ja vaihda ikkunatiivisteet** — vuotavat tiivisteet lisäävät lämmityskustannuksia 10–30 %
- **Huolla ilmalämpöpumppu** — puhdista suodattimet, tarkista toiminta
- **Tarkista takka ja piippu** — nuohous, tarkistus, polttopuuvarasto
- **Tarkista eristyksen kunto** — erityisesti yläpohja ja kellari
- **Kilpailuta sähkösopimus** — kiinteähintaiset sopimukset ovat edullisimpia kesällä/syksyllä
- **Testaa varalämmitys** — aggregaatti, takka, varalämmittimet
- **Ohjelmoi älytermostaatit** — talviohjelma: yöpudotus, huonekohtaiset lämpötilat
- **Tarkista lämminvesivaraaja** — toimiiko termostaatti, onko oikea lämpötila (55–60 °C)

### Talven aikana (marras-maaliskuu)

- **Seuraa sääennustetta** — varaudu pakkasjaksoihin 3–5 päivää etukäteen
- **Seuraa sähkön hintaa** — erityisesti pörssisähköasiakkaat, tarkista seuraavan päivän hinnat klo 14
- **Tuuleta oikein** — lyhyt, tehokas ristivetostuuletus (5 min) pitkän rakotuuletuksen sijaan
- **Pidä tasainen lämpötila** — älä sammuta lämmitystä kokonaan, vaikka olisit poissa
- **Puhdista ILP:n suodattimet** — kuukausittain talvella
- **Seuraa kulutusta** — vertaile edelliseen vuoteen, havaitse poikkeamat ajoissa
- **Poista lumi paneeleista** — jos sinulla on aurinkopaneelit, keväällä lumien lähtö nopeuttaa tuotannon alkua

### Pakkasjakson aikana (-20 °C ja alle)

- **Nosta sisälämpötilaa hieman** — 1 °C ylimääräistä puskuriksi
- **Käytä takkaa aktiivisesti** — vähentää sähkön tarvetta merkittävästi
- **Vältä turhaa tuuletusta** — tuuleta vain lyhyesti
- **Tarkista putkien suojaus** — erityisesti ulkoseinien lähellä kulkevat putket
- **Jätä vettä valumaan** — jos on jäätymisriski, ohut valuma estää putkien jäätymisen

## Yhteenveto {#yhteenveto}

Talven sähkökustannukset ovat sähkölämmitteisissä kodeissa vuoden suurin yksittäinen menoerä. Varautumalla oikein ja optimoimalla kulutusta voit säästää merkittävästi:

**Taloudellinen hyöty optimoinnista**:
- **Pörssisähkö + älyohjaus**: 500–1 000 € säästö per talvi
- **Eristysparannukset**: 200–600 € säästö per talvi
- **Ilmalämpöpumppu**: 500–1 000 € säästö per talvi
- **Lämpötilan hallinta**: 100–300 € säästö per talvi

**Tärkeimmät toimenpiteet**:
1. **Kilpailuta sähkösopimus ennen talvea** — syksyllä saat parhaat tarjoukset
2. **Investoi lämpöpumppuun** — nopein takaisinmaksu energiainvestoinneista
3. **Hyödynnä pörssisähkön yöhintoja** — siirrä lämmitys, varaaja ja lataus yöhön
4. **Tiivistä ja eristä** — aloita halvimmista: tiivisteet, yläpohja
5. **Pidä varalämmitys kunnossa** — takka on sekä tunnelmallinen että käytännöllinen
6. **Seuraa ja reagoi** — sääennuste, hintaennuste, kulutusseuranta

Talveen varautuminen ei ole pelkästään kustannuskysymys — se on myös turvallisuuskysymys. Hyvin valmistautunut koti selviää pakkasjaksoista ja mahdollisista häiriöistä ilman ongelmia.`,
  },
];
