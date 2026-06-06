<?php

/**
 * Clinic knowledge base.
 *
 * A hardcoded catalog of the clinic's pages. The ClinicAssistant agent reads the
 * `pages` list and uses each `description` to decide which URL is relevant, then
 * fetches that page on demand via the FetchPage tool to answer the visitor.
 *
 * @var array{
 *     name: string,
 *     base_url: string,
 *     allowed_domain: string,
 *     booking_url: string,
 *     pages: list<array{url: string, label: string, category: string, description: string}>
 * }
 */

return [
    'name' => 'The Golden Glow',
    'base_url' => 'https://thegoldenglow.nl',
    'allowed_domain' => 'thegoldenglow.nl',
    'booking_url' => 'https://schedule.clinicminds.com/services?clinic=a797764d-6a99-11ed-9e8e-0a42d89bf169&l=nl-NL',

    'pages' => [
        // Praktische info
        ['url' => 'https://thegoldenglow.nl/prijzen/', 'label' => 'Prijzen', 'category' => 'Info', 'description' => 'Overzicht van alle tarieven en prijzen per behandeling.'],
        ['url' => 'https://thegoldenglow.nl/contact/', 'label' => 'Contact', 'category' => 'Info', 'description' => 'Contactgegevens, adres in Amsterdam, openingstijden en route.'],
        ['url' => 'https://thegoldenglow.nl/arts/', 'label' => 'De arts', 'category' => 'Info', 'description' => 'Over cosmetisch arts Arwind Chigharoe, ervaring en BIG-registratie.'],

        // Spierontspanners (botulinetoxine)
        ['url' => 'https://thegoldenglow.nl/spierontspanners/', 'label' => 'Spierontspanners', 'category' => 'Spierontspanners', 'description' => 'Overzicht van alle behandelingen met spierontspanners (botulinetoxine).'],
        ['url' => 'https://thegoldenglow.nl/frons-rimpels/', 'label' => 'Fronsrimpel', 'category' => 'Spierontspanners', 'description' => 'Fronsrimpel tussen de wenkbrauwen gladmaken met spierontspanners.'],
        ['url' => 'https://thegoldenglow.nl/voorhoofdrimpels/', 'label' => 'Voorhoofdsrimpels', 'category' => 'Spierontspanners', 'description' => 'Horizontale voorhoofdrimpels behandelen met spierontspanners.'],
        ['url' => 'https://thegoldenglow.nl/kraaienpootjes/', 'label' => 'Kraaienpootjes', 'category' => 'Spierontspanners', 'description' => 'Lachrimpeltjes (kraaienpootjes) rond de ogen verzachten.'],
        ['url' => 'https://thegoldenglow.nl/wenkbrauwlift/', 'label' => 'Wenkbrauwlift', 'category' => 'Spierontspanners', 'description' => 'Subtiele lift van de wenkbrauwen met spierontspanners (brow lift).'],
        ['url' => 'https://thegoldenglow.nl/bunny-lines/', 'label' => 'Bunny lines', 'category' => 'Spierontspanners', 'description' => 'Neusrimpeltjes (bunny lines) bovenop de neus behandelen.'],
        ['url' => 'https://thegoldenglow.nl/gummy-smile/', 'label' => 'Gummy smile', 'category' => 'Spierontspanners', 'description' => 'Zichtbaar tandvlees bij het lachen (gummy smile) corrigeren.'],
        ['url' => 'https://thegoldenglow.nl/marionetlijnen/', 'label' => 'Marionetlijnen', 'category' => 'Spierontspanners', 'description' => 'Mondhoeklijnen (marionetlijnen) die de mond verdrietig laten ogen.'],
        ['url' => 'https://thegoldenglow.nl/lip-flip/', 'label' => 'Lip flip', 'category' => 'Spierontspanners', 'description' => 'Bovenlip subtiel laten krullen met een lip flip.'],
        ['url' => 'https://thegoldenglow.nl/rokers-lijntjes/', 'label' => 'Rokerslijntjes', 'category' => 'Spierontspanners', 'description' => 'Verticale lijntjes rond de lippen (rokerslijntjes) verzachten.'],
        ['url' => 'https://thegoldenglow.nl/neuspunt-lift/', 'label' => 'Neuspunt lift', 'category' => 'Spierontspanners', 'description' => 'Afhangende neuspunt subtiel liften met spierontspanners.'],
        ['url' => 'https://thegoldenglow.nl/tanden-knarsen/', 'label' => 'Tandenknarsen', 'category' => 'Spierontspanners', 'description' => 'Tandenknarsen (bruxisme) en kaakspierverkleining via de masseter.'],
        ['url' => 'https://thegoldenglow.nl/migraine/', 'label' => 'Migraine', 'category' => 'Spierontspanners', 'description' => 'Chronische migraine behandelen met botulinetoxine.'],
        ['url' => 'https://thegoldenglow.nl/platysma/', 'label' => 'Platysma Band', 'category' => 'Spierontspanners', 'description' => 'Verticale platysma-banden in de hals behandelen.'],
        ['url' => 'https://thegoldenglow.nl/nefertiti-lift/', 'label' => 'Nefertiti lift', 'category' => 'Spierontspanners', 'description' => 'Hals- en kaaklijnlift met spierontspanners (Nefertiti lift).'],
        ['url' => 'https://thegoldenglow.nl/trap-tox/', 'label' => 'Traptox', 'category' => 'Spierontspanners', 'description' => 'Trapeziusspier ontspannen voor nek/schouders en een langere hals (traptox).'],
        ['url' => 'https://thegoldenglow.nl/liquid-facelift/', 'label' => 'Liquid Facelift', 'category' => 'Spierontspanners', 'description' => 'Non-surgical facelift door een combinatie van injectables.'],
        ['url' => 'https://thegoldenglow.nl/kaaklijn/', 'label' => 'Kaaklijn', 'category' => 'Spierontspanners', 'description' => 'Kaaklijn definiëren en verfijnen met spierontspanners.'],
        ['url' => 'https://thegoldenglow.nl/kin/', 'label' => 'Kin', 'category' => 'Spierontspanners', 'description' => 'Kin behandelen met spierontspanners (o.a. kuiltjeskin).'],
        ['url' => 'https://thegoldenglow.nl/hyperhidrose/', 'label' => 'Hyperhidrose', 'category' => 'Spierontspanners', 'description' => 'Overmatig zweten (hyperhidrose) van oksels of handen behandelen.'],

        // Gezichtsfillers (hyaluronzuur)
        ['url' => 'https://thegoldenglow.nl/filler-behandeling/', 'label' => 'Filler Behandeling', 'category' => 'Gezichtsfillers', 'description' => 'Overzicht van gezichtsfillers met hyaluronzuur.'],
        ['url' => 'https://thegoldenglow.nl/lipfiller/', 'label' => 'Lipfiller', 'category' => 'Gezichtsfillers', 'description' => 'Lippen vergroten, vormgeven of hydrateren met lipfillers.'],
        ['url' => 'https://thegoldenglow.nl/jukbeenderen/', 'label' => 'Jukbeenderen', 'category' => 'Gezichtsfillers', 'description' => 'Jukbeenderen accentueren en volume herstellen met filler.'],
        ['url' => 'https://thegoldenglow.nl/traangootjes/', 'label' => 'Traangootjes', 'category' => 'Gezichtsfillers', 'description' => 'Wallen en donkere kringen (traangoot) onder de ogen opvullen.'],
        ['url' => 'https://thegoldenglow.nl/neuslippenplooi/', 'label' => 'Neuslippenplooi', 'category' => 'Gezichtsfillers', 'description' => 'Neus-lippenplooi van neus naar mondhoek opvullen met filler.'],
        ['url' => 'https://thegoldenglow.nl/wangen/', 'label' => 'Wangen', 'category' => 'Gezichtsfillers', 'description' => 'Wangvolume herstellen voor een jeugdige uitstraling.'],
        ['url' => 'https://thegoldenglow.nl/kinfiller/', 'label' => 'Kinfiller', 'category' => 'Gezichtsfillers', 'description' => 'Kin vormgeven en projecteren met filler.'],
        ['url' => 'https://thegoldenglow.nl/kaaklijn-filler/', 'label' => 'Kaaklijn filler', 'category' => 'Gezichtsfillers', 'description' => 'Kaaklijn aanscherpen en definiëren met filler.'],
        ['url' => 'https://thegoldenglow.nl/slapen/', 'label' => 'Slapen', 'category' => 'Gezichtsfillers', 'description' => 'Ingevallen slapen opvullen met filler.'],
        ['url' => 'https://thegoldenglow.nl/neus/', 'label' => 'Neus', 'category' => 'Gezichtsfillers', 'description' => 'Non-surgical neuscorrectie (vloeibare neuscorrectie) met filler.'],
        ['url' => 'https://thegoldenglow.nl/full-face/', 'label' => 'Fullface', 'category' => 'Gezichtsfillers', 'description' => 'Full face fillerbehandeling voor totaalbalans van het gezicht.'],

        // Bodyfillers & intieme behandelingen
        ['url' => 'https://thegoldenglow.nl/bodyfillers/', 'label' => 'Body fillers', 'category' => 'Bodyfillers', 'description' => 'Overzicht van bodyfillers voor het lichaam.'],
        ['url' => 'https://thegoldenglow.nl/bilfillers/', 'label' => 'Bilfillers', 'category' => 'Bodyfillers', 'description' => 'Billen vergroten en vormgeven zonder operatie (bilfillers).'],
        ['url' => 'https://thegoldenglow.nl/hip-dip-fillers/', 'label' => 'Hip dips', 'category' => 'Bodyfillers', 'description' => 'Hip dips opvullen voor rondere heupcontouren.'],
        ['url' => 'https://thegoldenglow.nl/eikelvergroting/', 'label' => 'Eikelvergroting', 'category' => 'Bodyfillers', 'description' => 'Intieme mannenbehandeling: eikelvergroting met filler.'],
        ['url' => 'https://thegoldenglow.nl/penisvergroting/', 'label' => 'Penisvergroting', 'category' => 'Bodyfillers', 'description' => 'Intieme mannenbehandeling: penisvergroting met filler.'],
        ['url' => 'https://thegoldenglow.nl/erectieproblemen/', 'label' => 'Erectieproblemen', 'category' => 'Bodyfillers', 'description' => 'Behandeling van erectieproblemen.'],
        ['url' => 'https://thegoldenglow.nl/vagina-verjonging/', 'label' => 'Vagina Verjonging', 'category' => 'Bodyfillers', 'description' => 'Intieme vrouwenbehandeling: vaginale verjonging.'],

        // Medisch afvallen
        ['url' => 'https://thegoldenglow.nl/medisch-afvallen/', 'label' => 'Medisch afvallen', 'category' => 'Medisch afvallen', 'description' => 'Medisch begeleid afvallen met persoonlijk behandelplan.'],
        ['url' => 'https://thegoldenglow.nl/overzicht-afval-medicatie/', 'label' => 'Overzicht Afvalmedicatie', 'category' => 'Medisch afvallen', 'description' => 'Overzicht van afslankmedicatie (GLP-1) zoals Ozempic, Wegovy en Mounjaro.'],

        // Lasers
        ['url' => 'https://thegoldenglow.nl/lasers/', 'label' => 'Lasers', 'category' => 'Lasers', 'description' => 'Overzicht van laser- en huidverbeteringsbehandelingen.'],
        ['url' => 'https://thegoldenglow.nl/tixel/', 'label' => 'Tixel', 'category' => 'Lasers', 'description' => 'Tixel huidverbetering met fractionele warmte-energie.'],
        ['url' => 'https://thegoldenglow.nl/endolift/', 'label' => 'Endolift', 'category' => 'Lasers', 'description' => 'Endolift laser voor huidverstrakking zonder operatie.'],

        // Biostimulatie (collageenstimulatie)
        ['url' => 'https://thegoldenglow.nl/biostimulatie/', 'label' => 'Biostimulatie', 'category' => 'Biostimulatie', 'description' => 'Overzicht van biostimulatie en collageenstimulerende behandelingen.'],
        ['url' => 'https://thegoldenglow.nl/sculptra/', 'label' => 'Sculptra', 'category' => 'Biostimulatie', 'description' => 'Sculptra (poly-L-melkzuur) voor geleidelijke collageenopbouw.'],
        ['url' => 'https://thegoldenglow.nl/lanluma/', 'label' => 'Lanluma', 'category' => 'Biostimulatie', 'description' => 'Lanluma collageenstimulator voor gezicht en lichaam.'],
        ['url' => 'https://thegoldenglow.nl/pdo/', 'label' => 'PDO', 'category' => 'Biostimulatie', 'description' => 'PDO-draadjes voor lift en biostimulatie van de huid.'],
        ['url' => 'https://thegoldenglow.nl/pdrn/', 'label' => 'PDRN', 'category' => 'Biostimulatie', 'description' => 'PDRN (salmon DNA) voor huidherstel en -kwaliteit.'],
        ['url' => 'https://thegoldenglow.nl/profhilo/', 'label' => 'Profhilo', 'category' => 'Biostimulatie', 'description' => 'Profhilo skinbooster voor diepe hydratatie en huidkwaliteit.'],
        ['url' => 'https://thegoldenglow.nl/radiesse/', 'label' => 'Radiesse', 'category' => 'Biostimulatie', 'description' => 'Radiesse (calciumhydroxylapatiet) voor volume en collageen.'],
        ['url' => 'https://thegoldenglow.nl/prp-prf/', 'label' => 'PRP/PRF', 'category' => 'Biostimulatie', 'description' => 'PRP/PRF-behandeling met lichaamseigen bloedplaatjes.'],
        ['url' => 'https://thegoldenglow.nl/skinbooster/', 'label' => 'Skinbooster', 'category' => 'Biostimulatie', 'description' => 'Skinboosters voor hydratatie en een stralende huid.'],
        ['url' => 'https://thegoldenglow.nl/ellanse/', 'label' => 'Ellanse', 'category' => 'Biostimulatie', 'description' => 'Ellansé collageenstimulator met langdurig effect.'],

        // Producten & merkinformatie
        ['url' => 'https://thegoldenglow.nl/producten-informatie/', 'label' => 'Producten', 'category' => 'Producten', 'description' => 'Overzicht van de gebruikte producten en merken.'],
        ['url' => 'https://thegoldenglow.nl/juvederm-informatie/', 'label' => 'Juvederm', 'category' => 'Producten', 'description' => 'Informatie over het fillermerk Juvederm.'],
        ['url' => 'https://thegoldenglow.nl/belotero-informatie/', 'label' => 'Belotero', 'category' => 'Producten', 'description' => 'Informatie over het fillermerk Belotero.'],
        ['url' => 'https://thegoldenglow.nl/ellanse-informatie/', 'label' => 'Ellansé', 'category' => 'Producten', 'description' => 'Informatie over de collageenstimulator Ellansé.'],
        ['url' => 'https://thegoldenglow.nl/radiesse-informatie/', 'label' => 'Radiesse', 'category' => 'Producten', 'description' => 'Informatie over het product Radiesse.'],
        ['url' => 'https://thegoldenglow.nl/profhilo-informatie/', 'label' => 'Profhilo', 'category' => 'Producten', 'description' => 'Informatie over het product Profhilo.'],
        ['url' => 'https://thegoldenglow.nl/sculptra-informatie/', 'label' => 'Sculptra', 'category' => 'Producten', 'description' => 'Informatie over het product Sculptra.'],
        ['url' => 'https://thegoldenglow.nl/lanluma-informatie/', 'label' => 'Lanluma', 'category' => 'Producten', 'description' => 'Informatie over het product Lanluma.'],
        ['url' => 'https://thegoldenglow.nl/vistabel-informatie/', 'label' => 'Vistabel', 'category' => 'Producten', 'description' => 'Informatie over Vistabel (botulinetoxine).'],
        ['url' => 'https://thegoldenglow.nl/mounjaro-informatie/', 'label' => 'Mounjaro', 'category' => 'Producten', 'description' => 'Informatie over afslankmedicatie Mounjaro (tirzepatide).'],
        ['url' => 'https://thegoldenglow.nl/ozempic-informatie/', 'label' => 'Ozempic', 'category' => 'Producten', 'description' => 'Informatie over afslankmedicatie Ozempic (semaglutide).'],
        ['url' => 'https://thegoldenglow.nl/wegovy-informatie/', 'label' => 'Wegovy', 'category' => 'Producten', 'description' => 'Informatie over afslankmedicatie Wegovy (semaglutide).'],
    ],
];
