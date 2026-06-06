import { Head } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ChatWidget from '@/components/clinic/chat-widget';

const TREATMENTS = [
    'Spierontspanners',
    'Gezichtsfillers',
    'Biostimulatie',
    'Medisch afvallen',
    'Lasers',
    'Bodyfillers',
];

const REVIEWS = [
    {
        name: 'Sandra V.',
        text: 'Heel professioneel en persoonlijk advies. Het resultaat ziet er natuurlijk uit, precies wat ik wilde.',
    },
    {
        name: 'Mark D.',
        text: 'Dokter Chigharoe neemt echt de tijd. Je voelt je in goede handen van begin tot eind.',
    },
    {
        name: 'Leila K.',
        text: 'Prachtige kliniek in hartje Amsterdam en een fantastisch team. Een aanrader!',
    },
];

const FAQS = [
    {
        question: 'Is mijn leeftijd een belemmering voor een behandeling?',
        answer: 'Beginnende lijntjes verdwijnen vaak volledig na een behandeling met spierontspanners. We behandelen vanaf 18 jaar, idealiter vanaf 21 jaar, altijd na een eerlijk consult.',
    },
    {
        question: 'Hoelang duurt het voordat ik weer kan werken?',
        answer: "Je kunt direct na de sessie je normale bezigheden oppakken. Daarom wordt het ook wel een 'lunchpauze-behandeling' genoemd.",
    },
    {
        question: 'Hoelang werkt de behandeling?',
        answer: 'Het middel is na 3–6 maanden uitgewerkt, maar heeft een blijvend verbeterend effect op het behandelde gebied, zeker bij langdurig gebruik.',
    },
];

export default function Clinic() {
    return (
        <>
            <Head title="The Golden Glow — Cosmetische Kliniek Amsterdam">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#ffece2] font-['Poppins',sans-serif] text-black">
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-black/5 bg-[#ffece2]/90 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-[5%] py-4">
                        <a href="/" className="flex items-center gap-2.5">
                            <img src="/images/golden-glow-logo.png" alt="The Golden Glow" className="h-9 w-9 object-contain" />
                            <span className="font-['Playfair_Display',serif] text-xl font-semibold uppercase tracking-wide text-[#cb6843]">
                                The Golden Glow
                            </span>
                        </a>
                        <nav className="hidden items-center gap-7 text-sm font-medium uppercase tracking-wide lg:flex">
                            {TREATMENTS.slice(0, 5).map((t) => (
                                <a key={t} href="#behandelingen" className="text-black/70 transition-colors hover:text-[#cb6843]">
                                    {t}
                                </a>
                            ))}
                        </nav>
                        <a
                            href="#afspraak"
                            className="rounded-full bg-[#cb6843] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#1f2124]"
                        >
                            Maak een afspraak
                        </a>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#cb6843] via-[#b9572f] to-[#1f2124]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
                    <div className="relative z-10 px-[5%] text-center text-white">
                        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/80">Dé cosmetische kliniek in Amsterdam</p>
                        <h1 className="font-['Playfair_Display',serif] text-4xl font-semibold uppercase leading-tight md:text-6xl lg:text-7xl">
                            The Golden Glow
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base text-white/85 md:text-lg">
                            Maatwerk, verjongende en medisch onderbouwde behandelingen — uitgevoerd door een BIG-geregistreerde
                            arts met 14+ jaar ervaring.
                        </p>
                        <a
                            href="#afspraak"
                            className="mt-8 inline-block rounded-full border border-white bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-widest backdrop-blur transition-colors hover:bg-white hover:text-[#cb6843]"
                        >
                            Plan een gratis consult
                        </a>
                    </div>
                </section>

                {/* Banner */}
                <section className="py-12 text-center">
                    <h2 className="font-['Playfair_Display',serif] text-3xl font-semibold uppercase md:text-5xl">The golden glow</h2>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wide md:text-base">Dé beste kliniek in Amsterdam</p>
                </section>

                {/* Treatment pills */}
                <section id="behandelingen" className="px-[5%] pb-14">
                    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
                        {TREATMENTS.map((t) => (
                            <a
                                key={t}
                                href="#afspraak"
                                className="rounded-full bg-[#cb6843] px-7 py-3 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#1f2124]"
                            >
                                {t}
                            </a>
                        ))}
                    </div>
                </section>

                {/* Behandelingen text + image */}
                <section className="bg-white px-[5%] py-16">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
                        <div>
                            <p className="mb-4 text-sm uppercase tracking-wide text-[#cb6843]">Behandelingen</p>
                            <h3 className="font-['Playfair_Display',serif] mb-6 text-3xl text-[#cb6843] md:text-4xl">
                                Alles draait om maatwerk
                            </h3>
                            <div className="space-y-4 leading-relaxed text-gray-700">
                                <p>
                                    Wij bieden hoogwaardige, verjongende en medisch onderbouwde behandelingen, waaronder
                                    hyaluronzuur-fillers, biostimulatie en — als één van de weinige klinieken in Amsterdam — de
                                    exclusieve Endolift-laserbehandeling.
                                </p>
                                <p>
                                    Onze fillerbehandelingen herstellen volume, verfijnen contouren en geven de huid een frisse,
                                    jeugdige uitstraling. Ook voor medisch verantwoord afvallen bent u bij ons aan het juiste adres,
                                    met een persoonlijk behandelplan en professionele begeleiding.
                                </p>
                            </div>
                        </div>
                        <div className="flex h-72 items-center justify-center rounded-lg bg-gradient-to-br from-[#ffd9c4] to-[#cb6843]/40 text-[#cb6843]/60 lg:h-96">
                            <span className="font-['Playfair_Display',serif] text-lg italic">Kliniekfoto</span>
                        </div>
                    </div>
                </section>

                {/* Doctor */}
                <section className="px-[5%] py-16">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
                        <div className="order-2 flex h-72 items-center justify-center rounded-lg bg-gradient-to-br from-[#cb6843]/30 to-[#1f2124]/20 text-[#cb6843]/60 lg:order-1 lg:h-96">
                            <span className="font-['Playfair_Display',serif] text-lg italic">Dr. Arwind Chigharoe</span>
                        </div>
                        <div className="order-1 lg:order-2">
                            <p className="mb-1 text-sm uppercase tracking-wide text-[#cb6843]">Arwind Chigharoe</p>
                            <h3 className="font-['Playfair_Display',serif] mb-6 text-3xl text-[#cb6843] md:text-4xl">
                                Cosmetisch Arts, KNMG
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                Afgestudeerd aan de Universiteit van Maastricht en BIG-geregistreerd. Inmiddels werk ik al meer dan
                                14 jaar met veel plezier als cosmetisch arts in Amsterdam. Door jaarlijks congressen en trainingen
                                bij te wonen bied ik mijn cliënten altijd de beste zorg en kwaliteit.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section className="bg-white px-[5%] py-16">
                    <div className="mx-auto max-w-6xl">
                        <h3 className="font-['Playfair_Display',serif] mb-10 text-center text-3xl uppercase text-[#cb6843]">
                            Wat onze cliënten zeggen
                        </h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            {REVIEWS.map((r) => (
                                <div key={r.name} className="rounded-xl bg-[#fff7f2] p-6 ring-1 ring-black/5">
                                    <div className="mb-3 text-[#cb6843]">★★★★★</div>
                                    <p className="mb-4 text-sm leading-relaxed text-gray-700">“{r.text}”</p>
                                    <p className="text-sm font-medium">{r.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="px-[5%] py-16">
                    <div className="mx-auto max-w-3xl">
                        <h3 className="font-['Playfair_Display',serif] mb-10 text-center text-3xl uppercase text-[#cb6843]">
                            Veelgestelde vragen
                        </h3>
                        <div className="space-y-3">
                            {FAQS.map((f) => (
                                <details key={f.question} className="group rounded-xl bg-white p-5 ring-1 ring-black/5">
                                    <summary className="cursor-pointer list-none font-medium text-gray-800 marker:content-none">
                                        {f.question}
                                    </summary>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer / contact */}
                <footer id="afspraak" className="bg-[#1f2124] px-[5%] py-14 text-white/80">
                    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
                        <div>
                            <p className="font-['Playfair_Display',serif] mb-4 text-xl uppercase text-white">The Golden Glow</p>
                            <p className="text-sm leading-relaxed">
                                Specialist in fillerbehandelingen, spierontspanners, biostimulatie, medisch afvallen en
                                lasertherapie.
                            </p>
                        </div>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-[#cb6843]" /> Kerkstraat 147, 1017 GG Amsterdam
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-[#cb6843]" /> +31 (0)68 139 0127
                            </p>
                            <p className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-[#cb6843]" /> info@thegoldenglow.nl
                            </p>
                            <p className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-[#cb6843]" /> Ma–Vr 10:00–19:00 · Za–Zo 10:00–16:00
                            </p>
                        </div>
                        <div className="flex items-start md:justify-end">
                            <a
                                href="https://schedule.clinicminds.com/services?clinic=a797764d-6a99-11ed-9e8e-0a42d89bf169&l=nl-NL"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-[#cb6843] px-7 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#cb6843]"
                            >
                                Maak een afspraak
                            </a>
                        </div>
                    </div>
                    <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
                        © {new Date().getFullYear()} The Golden Glow · Cosmetische Kliniek Amsterdam
                    </p>
                </footer>
            </div>

            <ChatWidget />
        </>
    );
}
