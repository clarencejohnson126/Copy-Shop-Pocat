import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'de' | 'en';

// Define language translations
export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

// Context interface
interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  t: (key: string, variables?: Record<string, string | null>) => string;
}

// Create translations object
const translations: Translations = {
  // Navbar
  'nav.bindings': {
    de: 'Bindungen',
    en: 'Bindings',
  },
  'nav.process': {
    de: 'Ablauf',
    en: 'Process',
  },
  'nav.shipping': {
    de: 'Versand',
    en: 'Shipping',
  },
  'nav.about': {
    de: 'Über uns',
    en: 'About us',
  },
  'nav.faq': {
    de: 'FAQ',
    en: 'FAQ',
  },
  'nav.configure': {
    de: 'Jetzt konfigurieren',
    en: 'Configure now',
  },
  'nav.login': {
    de: 'Anmelden',
    en: 'Login',
  },
  'nav.logout': {
    de: 'Abmelden',
    en: 'Logout',
  },
  'auth.title': {
    de: 'Anmelden oder Registrieren',
    en: 'Login or Register',
  },
  'auth.signin_title': {
    de: 'Anmelden',
    en: 'Login',
  },
  'auth.signup_title': {
    de: 'Registrieren',
    en: 'Register',
  },
  'auth.switch_to_login': {
    de: 'Bereits registriert? Anmelden',
    en: 'Already registered? Login',
  },
  'auth.switch_to_register': {
    de: 'Registrieren',
    en: 'Register',
  },
  'auth.back': {
    de: 'Zurück zur Startseite',
    en: 'Back to Homepage',
  },
  'auth.email': {
    de: 'E-Mail',
    en: 'Email',
  },
  'auth.password': {
    de: 'Passwort',
    en: 'Password',
  },
  'auth.signup': {
    de: 'Registrieren',
    en: 'Sign Up',
  },
  'auth.signin': {
    de: 'Anmelden',
    en: 'Sign In',
  },
  'auth.loading': {
    de: 'Lädt...',
    en: 'Loading...',
  },
  'auth.check_inbox': {
    de: 'Bestätigungs-Link wurde an deine E-Mail gesendet',
    en: 'Check your inbox for confirmation link',
  },
  'auth.success': {
    de: 'Erfolgreich angemeldet!',
    en: 'Logged in successfully!',
  },
  'auth.welcome': {
    de: 'Willkommen, {{email}}!',
    en: 'Welcome, {{email}}!',
  },
  'auth.signout': {
    de: 'Abmelden',
    en: 'Sign out',
  },
  'auth.error.unexpected': {
    de: 'Ein unerwarteter Fehler ist aufgetreten',
    en: 'An unexpected error occurred',
  },
  'auth.email_in_use': {
    de: 'Diese E-Mail-Adresse wird bereits verwendet',
    en: 'This email address is already in use',
  },
  'auth.already_confirmed': {
    de: 'Dein Konto ist bereits bestätigt. Du kannst dich jetzt anmelden.',
    en: 'Your account is already confirmed. You can now log in.',
  },
  'auth.dev_signin_option': {
    de: 'Im Testmodus: Versuche dich jetzt mit denselben Daten anzumelden.',
    en: 'In test mode: Try signing in with the same credentials now.',
  },
  'auth.test_note': {
    de: 'Nutze eine beliebige E-Mail und Passwort zum Testen (keine echte E-Mail erforderlich)',
    en: 'Use any email and password to test (doesn\'t need to be real)',
  },
  'auth.ui_note': {
    de: 'Nur die Benutzeroberfläche funktioniert, wenn dies nicht mit einem echten Supabase-Projekt verbunden ist',
    en: 'Only the UI will work if this isn\'t connected to a real Supabase project',
  },
  // Top bar
  'topbar.hours': {
    de: 'Mo-Fr: 9:00-18:00, Sa: 10:00-14:00',
    en: 'Mon-Fri: 9:00-18:00, Sat: 10:00-14:00',
  },
  // Language toggle
  'language.toggle': {
    de: 'EN',
    en: 'DE',
  },
  'language.name': {
    de: 'Sprache',
    en: 'Language',
  },
  // Hero section
  'hero.title': {
    de: 'Dein Lieblingscopyshop in Heidelberg',
    en: 'Your favorite copy shop in Heidelberg',
  },
  'hero.subtitle': {
    de: 'Seit über 20 Jahren die erste Adresse für das Drucken und Binden von Abschlussarbeiten',
    en: 'For over 20 years the first choice for printing and binding theses',
  },
  'hero.deadline': {
    de: 'Die Deadline ruft?',
    en: 'Deadline approaching?',
  },
  'hero.binding': {
    de: 'Wir haben die perfekte Bindung!',
    en: 'We have the perfect binding!',
  },
  'hero.configure': {
    de: 'Jetzt konfigurieren',
    en: 'Configure now',
  },
  'hero.show.options': {
    de: 'Bindungsoptionen anzeigen',
    en: 'Show binding options',
  },
  'hero.premium': {
    de: 'Premium Qualität',
    en: 'Premium Quality',
  },
  'hero.premium.desc': {
    de: 'Hochwertige Bindeoptionen für jede Arbeit',
    en: 'High-quality binding options for every project',
  },
  'hero.sustainability': {
    de: 'Nachhaltigkeit',
    en: 'Sustainability',
  },
  'hero.sustainability.desc': {
    de: 'Print Green and Local',
    en: 'Print Green and Local',
  },
  'hero.sustainability.iso': {
    de: 'ISO-konform',
    en: 'ISO-compliant',
  },
  'hero.express': {
    de: 'Express-Service',
    en: 'Express Service',
  },
  'hero.express.desc': {
    de: 'Weltweiter Expressversand',
    en: 'Worldwide express shipping',
  },
  'hero.express.insurance': {
    de: 'Kostenlos versichert ab Bestellwert von €100',
    en: 'Free insurance for orders over €100',
  },
  'hero.guarantee': {
    de: 'Liefergarantie',
    en: 'Delivery Guarantee',
  },
  'hero.guarantee.desc': {
    de: 'Garantierte Zustellung national am nächsten Werktag bei Bestellung vor 12 Uhr',
    en: 'Guaranteed next-day delivery nationally for orders placed before 12 pm',
  },
  'hero.google_rating': {
    de: '4,5 Sterne Google-Bewertungen',
    en: '4.5 Star Google Reviews',
  },
  'hero.google_reviews_count': {
    de: 'über 500 Bewertungen',
    en: 'over 500 reviews',
  },
  'hero.google_rating.desc': {
    de: 'Über 600 zufriedene Kunden',
    en: 'Over 600 satisfied customers',
  },
  // Green Printing section
  'green.title': {
    de: 'Print Green & Local',
    en: 'Print Green & Local',
  },
  'green.subtitle': {
    de: 'Umweltfreundlich und nachhaltig drucken',
    en: 'Environmentally friendly and sustainable printing',
  },
  'green.description': {
    de: 'Bei Pocat setzen wir auf Nachhaltigkeit und Umweltschutz in allen Aspekten unserer Arbeit. Wir verwenden ausschließlich FSC-zertifiziertes Papier, umweltfreundliche Druckfarben und recyclebare Materialien.',
    en: 'At Pocat, we are committed to sustainability and environmental protection in all aspects of our work. We exclusively use FSC-certified paper, eco-friendly printing inks, and recyclable materials.',
  },
  'green.local_production': {
    de: 'Lokale Produktion spart CO2',
    en: 'Local production saves CO2',
  },
  'green.recycled_materials': {
    de: 'Recycelte Materialien',
    en: 'Recycled materials',
  },
  'green.eco_friendly': {
    de: 'Umweltfreundliche Druckverfahren',
    en: 'Eco-friendly printing methods',
  },
  'green.carbon_neutral': {
    de: 'Klimaneutrale Lieferung',
    en: 'Carbon-neutral delivery',
  },
  // Binding Options section
  'binding.title': {
    de: 'Unsere Bindungsoptionen',
    en: 'Our Binding Options',
  },
  'binding.subtitle': {
    de: 'Wähle aus verschiedenen Bindungsarten für deine Arbeit – von der klassischen Hardcover-Bindung bis hin zur flexiblen Ringbindung.',
    en: 'Choose from various binding types for your work – from classic hardcover binding to flexible ring binding.',
  },
  'binding.popular': {
    de: 'Beliebt',
    en: 'Popular',
  },
  'binding.hardcover.name': {
    de: 'Hardcover',
    en: 'Hardcover',
  },
  'binding.hardcover.desc': {
    de: 'Stabile, langlebige Bindung mit festem Einband',
    en: 'Stable, durable binding with solid cover',
  },
  'binding.softcover.name': {
    de: 'Softcover',
    en: 'Softcover',
  },
  'binding.softcover.desc': {
    de: 'Flexible, leichte Bindung mit dünnem Einband',
    en: 'Flexible, lightweight binding with thin cover',
  },
  'binding.metalring.name': {
    de: 'Metall Ringbuch',
    en: 'Metal Ring Binding',
  },
  'binding.metalring.desc': {
    de: 'Flexible Bindung mit stabilen Metallringen',
    en: 'Flexible binding with stable metal rings',
  },
  'binding.plasticring.name': {
    de: 'Plastik Ringbuch',
    en: 'Plastic Ring Binding',
  },
  'binding.plasticring.desc': {
    de: 'Stabile, geschlossene Bindung mit Kunststoffringen',
    en: 'Stable, closed binding with plastic rings',
  },
  'binding.feature.premium': {
    de: 'Premium Qualität',
    en: 'Premium Quality',
  },
  'binding.feature.elegant': {
    de: 'Edler und hochwertiger Look',
    en: 'Elegant and high-quality look',
  },
  'binding.feature.thesis': {
    de: 'Perfekt für Abschlussarbeiten',
    en: 'Perfect for theses',
  },
  'binding.feature.colors': {
    de: 'Verschiedene Farben verfügbar',
    en: 'Various colors available',
  },
  'binding.feature.affordable': {
    de: 'Kostengünstige Alternative',
    en: 'Cost-effective alternative',
  },
  'binding.feature.handling': {
    de: 'Leichtere Handhabung',
    en: 'Easier handling',
  },
  'binding.feature.reports': {
    de: 'Ideal für Berichte',
    en: 'Ideal for reports',
  },
  'binding.feature.production': {
    de: 'Schnelle Produktion',
    en: 'Fast production',
  },
  'binding.feature.turning': {
    de: 'Einfaches Umblättern',
    en: 'Easy page turning',
  },
  'binding.feature.foldable': {
    de: 'Komplett aufklappbar',
    en: 'Completely foldable',
  },
  'binding.feature.durable': {
    de: 'Langlebig und robust',
    en: 'Durable and robust',
  },
  'binding.feature.presentations': {
    de: 'Ideal für Präsentationen',
    en: 'Ideal for presentations',
  },
  'binding.feature.cheapest': {
    de: 'Günstigste Option',
    en: 'Cheapest option',
  },
  'binding.feature.fast': {
    de: 'Schnelle Fertigstellung',
    en: 'Quick completion',
  },
  'binding.feature.colors.various': {
    de: 'Verschiedene Farben',
    en: 'Various colors',
  },
  'binding.feature.documentation': {
    de: 'Ideal für Dokumentationen',
    en: 'Ideal for documentation',
  },
  'binding.features': {
    de: 'Ausstattungsmerkmale',
    en: 'Features',
  },
  'binding.select': {
    de: 'Auswählen',
    en: 'Select',
  },
  'binding.unsure': {
    de: 'Unsicher, welche Bindung am besten zu deiner Arbeit passt? Kontaktiere uns für eine persönliche Beratung!',
    en: 'Not sure which binding suits your work best? Contact us for personal advice!',
  },
  'binding.configurator': {
    de: 'Zum Konfigurator',
    en: 'To Configurator',
  },
  // Process Steps section
  'process.title': {
    de: 'So einfach geht\'s',
    en: 'It\'s that simple',
  },
  'process.subtitle': {
    de: 'Deine Abschlussarbeit ist nur wenige Schritte von der perfekten Bindung entfernt.',
    en: 'Your thesis is just a few steps away from the perfect binding.',
  },
  'process.step1.title': {
    de: 'Schritt 1',
    en: 'Step 1',
  },
  'process.step1.heading': {
    de: 'Daten hochladen',
    en: 'Upload Data',
  },
  'process.step1.desc': {
    de: 'Lade deine PDF-Datei hoch und konfiguriere deine gewünschte Bindung.',
    en: 'Upload your PDF file and configure your desired binding.',
  },
  'process.step2.title': {
    de: 'Schritt 2',
    en: 'Step 2',
  },
  'process.step2.heading': {
    de: 'Bearbeitung & Druck',
    en: 'Processing & Printing',
  },
  'process.step2.desc': {
    de: 'Wir drucken und binden deine Arbeit mit höchster Qualität und Sorgfalt.',
    en: 'We print and bind your work with the highest quality and care.',
  },
  'process.step3.title': {
    de: 'Schritt 3',
    en: 'Step 3',
  },
  'process.step3.heading': {
    de: 'Versand & Lieferung',
    en: 'Shipping & Delivery',
  },
  'process.step3.desc': {
    de: 'Deine fertige Arbeit wird verpackt und pünktlich zu dir geliefert oder steht zur Abholung bereit.',
    en: 'Your finished work is packaged and delivered punctually or ready for pickup.',
  },
  'process.step4.title': {
    de: 'Schritt 4',
    en: 'Step 4',
  },
  'process.step4.heading': {
    de: 'Erfolgreicher Abschluss',
    en: 'Successful Completion',
  },
  'process.step4.desc': {
    de: 'Präsentiere deine professionell gebundene Arbeit und feiere deinen Erfolg!',
    en: 'Present your professionally bound thesis and celebrate your success!',
  },
  // Shipping Options section
  'shipping.title': {
    de: 'Versandoptionen',
    en: 'Shipping Options',
  },
  'shipping.subtitle': {
    de: 'Deine fertige Arbeit schnell und sicher erhalten – wähle die passende Versandoption.',
    en: 'Receive your finished work quickly and safely – choose the right shipping option.',
  },
  'shipping.pickup.title': {
    de: 'Selbstabholung',
    en: 'Self-Pickup',
  },
  'shipping.pickup.desc': {
    de: 'Hole deine fertige Arbeit in unserer Filiale in Heidelberg ab.',
    en: 'Pick up your finished work at our branch in Heidelberg.',
  },
  'shipping.standard.title': {
    de: 'Standardversand',
    en: 'Standard Shipping',
  },
  'shipping.standard.desc': {
    de: 'Deutschlandweiter Versand per DHL mit Sendungsverfolgung.',
    en: 'Nationwide shipping via DHL with tracking.',
  },
  'shipping.express.title': {
    de: 'Express-Versand',
    en: 'Express Shipping',
  },
  'shipping.express.recommended': {
    de: 'Empfohlen',
    en: 'Recommended',
  },
  'shipping.express.desc': {
    de: 'Schneller Versand für dringende Abgabetermine. Deutschlandweit am nächsten Werktag.',
    en: 'Fast shipping for urgent deadlines. Nationwide delivery by the next business day.',
  },
  'shipping.international.title': {
    de: 'Internationaler Express',
    en: 'International Express',
  },
  'shipping.international.desc': {
    de: 'Weltweiter Expressversand für internationale Kunden.',
    en: 'Worldwide express shipping for international customers.',
  },
  'shipping.delivery.same': {
    de: 'Gleicher Tag oder',
    en: 'Same day or',
  },
  'shipping.delivery.next': {
    de: 'nächster Werktag möglich',
    en: 'next business day possible',
  },
  'shipping.delivery.days13': {
    de: '1-3 Werktage',
    en: '1-3 business days',
  },
  'shipping.delivery.nextday': {
    de: 'Nächster Werktag (bis 12 Uhr)',
    en: 'Next business day (by 12 pm)',
  },
  'shipping.delivery.days25': {
    de: '2-5 Werktage (je nach Destination)',
    en: '2-5 business days (depending on destination)',
  },
  'shipping.cost.free': {
    de: 'Kostenlos',
    en: 'Free',
  },
  'shipping.hints': {
    de: 'Hinweise zum Versand',
    en: 'Shipping Information',
  },
  'shipping.hints.sameday': {
    de: 'Bestellungen, die vor 12 Uhr eingehen, werden in der Regel noch am selben Werktag bearbeitet.',
    en: 'Orders received before 12 pm are usually processed on the same business day.',
  },
  'shipping.hints.express': {
    de: 'Der Express-Versand garantiert eine Zustellung am nächsten Werktag (Montag bis Freitag).',
    en: 'Express shipping guarantees delivery on the next business day (Monday to Friday).',
  },
  'shipping.hints.tracking': {
    de: 'Zu jeder Sendung erhältst du eine Tracking-Nummer zur Sendungsverfolgung.',
    en: 'You will receive a tracking number for each shipment to track your order.',
  },
  'shipping.hints.packaging': {
    de: 'Unsere Verpackungen sind umweltfreundlich und recycelbar - getreu unserem Motto "Print Green and Local".',
    en: 'Our packaging is environmentally friendly and recyclable - true to our motto "Print Green and Local".',
  },
  'shipping.label.delivery': {
    de: 'Lieferzeit:',
    en: 'Delivery time:',
  },
  'shipping.label.cost': {
    de: 'Kosten:',
    en: 'Cost:',
  },
  // Reviews section
  'reviews.title': {
    de: 'Was unsere Kunden sagen',
    en: 'What our customers say',
  },
  'reviews.subtitle': {
    de: 'Über 600 positive Google-Bewertungen sprechen für sich. Hier einige Stimmen unserer zufriedenen Kunden.',
    en: 'Over 600 positive Google reviews speak for themselves. Here are some voices from our satisfied customers.',
  },
  'reviews.rating': {
    de: '4.9/5',
    en: '4.9/5',
  },
  'reviews.leave': {
    de: 'Bewertung auf Google hinterlassen',
    en: 'Leave a review on Google',
  },
  // About Us translations
  'about.title': {
    de: 'Über Pocat – Ihr Copyshop in Heidelberg',
    en: 'About Pocat – Your Copy Shop in Heidelberg'
  },
  'about.experience': {
    de: 'Über 20 Jahre Erfahrung',
    en: 'Over 20 Years of Experience'
  },
  'about.experience_desc': {
    de: 'Seit 2003 vertrauen uns Studenten ihre wichtigsten Arbeiten an.',
    en: 'Since 2003, students have been trusting us with their most important work.'
  },
  'about.intro': {
    de: 'Seit über 20 Jahren sind wir die erste Adresse für das Drucken und Binden von Abschlussarbeiten. Mit unserer Expertise und Leidenschaft unterstützen wir Studierende und Akademiker dabei, ihre Arbeiten in bester Qualität zu präsentieren.',
    en: 'For over 20 years, we have been the go-to address for printing and binding academic papers. With our expertise and passion, we support students and academics in presenting their work in the best quality.'
  },
  'about.sustainability_title': {
    de: 'Nachhaltigkeit',
    en: 'Sustainability'
  },
  'about.sustainability_desc': {
    de: '"Print Green and Local" ist nicht nur ein Slogan, sondern unser Versprechen. Wir verwenden Premiumpapier aus nachhaltiger Herstellung.',
    en: '"Print Green and Local" is not just a slogan, but our promise. We use premium paper from sustainable production.'
  },
  'about.quality_title': {
    de: 'Qualität',
    en: 'Quality'
  },
  'about.quality_desc': {
    de: 'Höchste Druck- und Bindequalität ist unser Anspruch. Wir arbeiten mit modernster Technologie und besten Materialien.',
    en: 'Highest print and binding quality is our standard. We work with the latest technology and best materials.'
  },
  'about.outro': {
    de: 'Als lokales Unternehmen unterstützen wir die Region und bieten persönlichen Service, den unsere Kunden zu schätzen wissen. Nachhaltigkeit und Qualität stehen bei uns im Mittelpunkt jedes Auftrags.',
    en: 'As a local business, we support the region and offer personal service that our customers appreciate. Sustainability and quality are at the center of every order we process.'
  },
  'about.heidelberg': {
    de: 'Heidelberg',
    en: 'Heidelberg'
  },
  'about.schwetzingen': {
    de: '',
    en: ''
  },
  'about.opening_hours': {
    de: 'Öffnungszeiten',
    en: 'Opening Hours'
  },
  'about.partners_title': {
    de: 'Unsere Partner & Kooperationen',
    en: 'Our Partners & Cooperations'
  },
  
  // Blog translations
  'blog.title': {
    de: 'Unser Blog',
    en: 'Our Blog'
  },
  'blog.subtitle': {
    de: 'Neuigkeiten, Tipps und Einblicke rund um Bindung und Druck',
    en: 'News, tips and insights about binding and printing'
  },
  'blog.read_more': {
    de: 'Weiterlesen',
    en: 'Read more'
  },
  'blog.show_less': {
    de: 'Weniger anzeigen',
    en: 'Show less'
  },
  'blog.article1.title': {
    de: 'Die richtige Bindung für deine Abschlussarbeit',
    en: 'The right binding for your thesis'
  },
  'blog.article1.summary': {
    de: 'Die Wahl der richtigen Bindung ist entscheidend für den ersten Eindruck deiner Abschlussarbeit. Wir stellen die verschiedenen Optionen vor und helfen dir bei der Entscheidung.',
    en: 'Choosing the right binding is crucial for the first impression of your thesis. We present the different options and help you make a decision.'
  },
  'blog.article1.content': {
    de: 'Eine Abschlussarbeit ist das Ergebnis monatelanger intensiver Arbeit. Die Wahl der richtigen Bindung ist dabei nicht nur eine Frage der Ästhetik, sondern auch der Funktionalität und Langlebigkeit. Hardcover-Bindungen bieten den höchsten Schutz und repräsentieren den professionellen Charakter einer Bachelor- oder Masterarbeit. Softcover-Bindungen sind leichter und kostengünstiger, eignen sich aber ebenso gut für viele akademische Arbeiten. Spiralbindungen bieten den Vorteil, dass die Arbeit flach aufliegt und sich perfekt für Präsentationen oder Arbeiten mit vielen Tabellen eignet. Beachte bei deiner Entscheidung auch die Vorgaben deiner Hochschule – manche Institutionen haben strikte Regeln bezüglich des Einbands. Qualitativ hochwertige Bindungen wie unsere schützen nicht nur deine Arbeit, sondern unterstreichen auch deinen professionellen Anspruch.',
    en: 'A thesis is the result of months of intensive work. Choosing the right binding is not just a matter of aesthetics, but also of functionality and durability. Hardcover bindings offer the highest protection and represent the professional character of a bachelor\'s or master\'s thesis. Softcover bindings are lighter and more cost-effective, but are equally suitable for many academic works. Spiral bindings have the advantage that the work lies flat and is perfect for presentations or works with many tables. When making your decision, also consider your university\'s requirements - some institutions have strict rules regarding the cover. High-quality bindings like ours not only protect your work but also emphasize your professional standards.'
  },
  'blog.article2.title': {
    de: 'Nachhaltig drucken: Unsere Umweltinitiativen',
    en: 'Sustainable printing: Our environmental initiatives'
  },
  'blog.article2.summary': {
    de: 'Nachhaltigkeit liegt uns am Herzen. Erfahre mehr über unsere Umweltinitiativen und wie wir den ökologischen Fußabdruck beim Drucken reduzieren.',
    en: 'Sustainability is close to our hearts. Learn more about our environmental initiatives and how we reduce the ecological footprint of printing.'
  },
  'blog.article2.content': {
    de: 'Bei Pocat setzen wir auf umweltbewusstes Handeln in allen Bereichen unseres Unternehmens. Unser grünes Konzept umfasst die Verwendung von FSC-zertifiziertem Papier, umweltfreundlichen Druckfarben und energieeffizienten Maschinen. Durch unsere lokale Produktion in Heidelberg minimieren wir Transportwege und reduzieren CO2-Emissionen. Unsere Verpackungsmaterialien sind zu 100% recycelbar oder kompostierbar. Wir arbeiten kontinuierlich daran, unseren ökologischen Fußabdruck zu verkleinern – von der Verwendung von Ökostrom bis hin zur Unterstützung lokaler Umweltprojekte. Besonders stolz sind wir auf unsere neuen wasserbasierten Tinten, die deutlich umweltschonender sind als herkömmliche lösungsmittelbasierte Alternativen. Durch diese Maßnahmen können wir nicht nur hochwertige Druckerzeugnisse anbieten, sondern auch einen positiven Beitrag zum Umweltschutz leisten. Wähle nachhaltige Drucklösungen für deine nächste Arbeit!',
    en: 'At Pocat, we are committed to environmentally conscious actions in all areas of our business. Our green concept includes the use of FSC-certified paper, environmentally friendly printing inks, and energy-efficient machines. Through our local production in Heidelberg, we minimize transportation routes and reduce CO2 emissions. Our packaging materials are 100% recyclable or compostable. We continuously work to reduce our ecological footprint - from using green electricity to supporting local environmental projects. We are particularly proud of our new water-based inks, which are significantly more environmentally friendly than conventional solvent-based alternatives. Through these measures, we can not only offer high-quality printed products but also make a positive contribution to environmental protection. Choose sustainable printing solutions for your next project!'
  },
  'blog.article3.title': {
    de: 'Digitalisierung trifft Tradition: Moderne Drucktechniken',
    en: 'Digitization meets tradition: Modern printing techniques'
  },
  'blog.article3.summary': {
    de: 'Die Drucktechnologie entwickelt sich stetig weiter. Wir stellen dir die neuesten Innovationen vor und zeigen, wie wir Tradition mit modernen Techniken verbinden.',
    en: 'Printing technology continues to evolve. We present the latest innovations and show how we combine tradition with modern techniques.'
  },
  'blog.article3.content': {
    de: 'Die Welt des Drucks befindet sich im ständigen Wandel, und bei Pocat vereinen wir traditionelles Handwerk mit moderner Digitaltechnik. Unsere neuesten Digitaldruckmaschinen ermöglichen eine Qualität, die früher nur im Offsetdruck erreichbar war – bei deutlich geringeren Kosten und kürzeren Produktionszeiten. Besonders bei kleinen Auflagen und individuellen Druckprojekten zeigt sich die Stärke des Digitaldrucks. Gleichzeitig bewahren wir das Wissen um traditionelle Bindeverfahren, die bei bestimmten Projekten nach wie vor unübertroffen sind. Die Kombination aus hochpräzisen Digitaldruckern, automatisierten Weiterverarbeitungsmaschinen und handwerklichem Know-how ermöglicht es uns, für jedes Projekt die optimale Lösung anzubieten. Besonders spannend ist die Entwicklung im Bereich des personalisierten Drucks, der durch variable Daten individuelle Anpassungen ermöglicht. Diese Technologie nutzen wir beispielsweise für personalisierte Exemplare von Abschlussarbeiten oder für individuell gestaltete Publikationen.',
    en: 'The world of printing is constantly changing, and at Pocat, we combine traditional craftsmanship with modern digital technology. Our latest digital printing machines provide a quality that was previously only achievable in offset printing - at significantly lower costs and shorter production times. Digital printing shows its strength, especially for small print runs and individual printing projects. At the same time, we preserve the knowledge of traditional binding methods, which remain unmatched for certain projects. The combination of high-precision digital printers, automated post-processing machines, and craftsmanship know-how allows us to offer the optimal solution for every project. Particularly exciting is the development in personalized printing, which enables individual adjustments through variable data. We use this technology, for example, for personalized copies of theses or individually designed publications.'
  },
  
  // FAQ translations
  'faq.title': {
    de: 'Häufig gestellte Fragen',
    en: 'Frequently Asked Questions'
  },
  'faq.subtitle': {
    de: 'Hier findest du Antworten auf die häufigsten Fragen zu unseren Dienstleistungen.',
    en: 'Find answers to the most common questions about our services.'
  },
  'faq.more_questions': {
    de: 'Hast du weitere Fragen? Kontaktiere uns gerne direkt!',
    en: 'Do you have more questions? Feel free to contact us directly!'
  },
  'faq.contact': {
    de: 'Kontakt aufnehmen',
    en: 'Contact us'
  },
  'faq.q1': {
    de: 'Wie lange dauert die Bindung meiner Abschlussarbeit?',
    en: 'How long does it take to bind my thesis?'
  },
  'faq.a1': {
    de: 'In unseren Filialen in Heidelberg und Schwetzingen können wir Hardcover-Bindungen innerhalb von 2-3 Stunden fertigstellen. Softcover- und Ringbindungen sind in der Regel innerhalb von 30-60 Minuten abholbereit. Bei hohem Aufkommen kann es zu längeren Wartezeiten kommen, daher empfehlen wir eine Vorbestellung über unseren Konfigurator.',
    en: 'In our stores in Heidelberg and Schwetzingen, we can complete hardcover bindings within 2-3 hours. Softcover and ring bindings are usually ready for pickup within 30-60 minutes. During busy periods, there may be longer waiting times, so we recommend pre-ordering through our configurator.'
  },
  'faq.q2': {
    de: 'Welche Bindung ist für meine Abschlussarbeit am besten geeignet?',
    en: 'Which binding is best for my thesis?'
  },
  'faq.a2': {
    de: 'Die beste Bindung hängt von verschiedenen Faktoren ab: den Vorgaben deiner Hochschule, der Art der Arbeit und persönlichen Vorlieben. Für Abschlussarbeiten wie Bachelor- und Masterarbeiten empfehlen wir Hardcover-Bindungen für ein professionelles Erscheinungsbild. Bei längeren Arbeiten wie Dissertationen ist ein Hardcover unerlässlich. Für Seminararbeiten oder Präsentationsunterlagen eignen sich Softcover oder Ringbindungen besser.',
    en: 'The best binding depends on various factors: your university\'s requirements, the type of work, and personal preferences. For final theses such as bachelor\'s and master\'s theses, we recommend hardcover bindings for a professional appearance. For longer works like dissertations, a hardcover is essential. For seminar papers or presentation materials, softcover or ring bindings are more suitable.'
  },
  'faq.q3': {
    de: 'Welches Dateiformat sollte ich für den Druck meiner Arbeit verwenden?',
    en: 'Which file format should I use for printing my thesis?'
  },
  'faq.a3': {
    de: 'Wir empfehlen, deine Arbeit als PDF-Datei hochzuladen. PDFs bewahren das Layout, die Schriftarten und Bilder unabhängig vom Betriebssystem. Achte darauf, dass alle Schriften eingebettet sind und Bilder eine Auflösung von mindestens 300 dpi haben. Für beste Ergebnisse sollte das Dokument im A4-Format mit entsprechenden Rändern (mindestens 2 cm) erstellt sein.',
    en: 'We recommend uploading your work as a PDF file. PDFs preserve the layout, fonts, and images regardless of the operating system. Make sure all fonts are embedded and images have a resolution of at least 300 dpi. For best results, the document should be created in A4 format with appropriate margins (at least 2 cm).'
  },
  'faq.q4': {
    de: 'Kann ich meine Arbeit auch farbig drucken lassen?',
    en: 'Can I have my thesis printed in color?'
  },
  'faq.a4': {
    de: 'Ja, wir bieten sowohl Schwarz-Weiß- als auch Farbdruck an. Du kannst im Konfigurator auswählen, ob du die gesamte Arbeit oder nur bestimmte Seiten (z.B. Diagramme, Grafiken) in Farbe drucken möchtest. Farbseiten sind etwas teurer als Schwarz-Weiß-Seiten, daher kann eine selektive Farbauswahl kostensparend sein.',
    en: 'Yes, we offer both black-and-white and color printing. In the configurator, you can choose whether to print the entire work or only specific pages (e.g., diagrams, graphics) in color. Color pages are somewhat more expensive than black-and-white pages, so selective color selection can be cost-saving.'
  },
  'faq.q5': {
    de: 'Bietet ihr Expressdruck und -bindung an?',
    en: 'Do you offer express printing and binding?'
  },
  'faq.a5': {
    de: 'Ja, wir bieten einen Express-Service für dringende Abgaben an. In unseren Filialen können viele Bindungsarten innerhalb weniger Stunden fertiggestellt werden. Für Hardcover-Bindungen mit Express-Option garantieren wir eine Fertigstellung am selben Tag, wenn die Bestellung vor 11:00 Uhr eingeht. Ein Expressversand ist ebenfalls verfügbar.',
    en: 'Yes, we offer an express service for urgent submissions. In our stores, many types of bindings can be completed within a few hours. For hardcover bindings with the express option, we guarantee same-day completion if the order is received before 11:00 AM. Express shipping is also available.'
  },
  'faq.q6': {
    de: 'Welche Zahlungsmethoden akzeptiert ihr?',
    en: 'What payment methods do you accept?'
  },
  'faq.a6': {
    de: 'Wir akzeptieren verschiedene Zahlungsmethoden: Kreditkarte (Visa, MasterCard), PayPal, Sofortüberweisung, Rechnung (für Firmenkunden nach Vereinbarung) sowie Barzahlung bei Abholung in unseren Filialen. Alle Online-Zahlungen werden sicher und verschlüsselt verarbeitet.',
    en: 'We accept various payment methods: credit card (Visa, MasterCard), PayPal, instant bank transfer, invoice (for business customers by arrangement), and cash payment when picking up at our stores. All online payments are processed securely and encrypted.'
  },
  'faq.q7': {
    de: 'Wie kann ich meine Bestellung verfolgen?',
    en: 'How can I track my order?'
  },
  'faq.a7': {
    de: 'Nach Aufgabe deiner Bestellung erhältst du eine Bestätigungs-E-Mail mit einer Bestellnummer. Mit dieser Nummer kannst du den Status deiner Bestellung auf unserer Website verfolgen oder telefonisch nachfragen. Bei Versandaufträgen senden wir dir zusätzlich eine Tracking-Nummer, sobald deine Arbeit verschickt wurde.',
    en: 'After placing your order, you will receive a confirmation email with an order number. With this number, you can track the status of your order on our website or inquire by phone. For shipping orders, we will also send you a tracking number once your work has been dispatched.'
  },
  'faq.q8': {
    de: 'Gibt es Vorgaben für die Prägung auf dem Einband?',
    en: 'Are there guidelines for embossing on the cover?'
  },
  'faq.a8': {
    de: 'Für Hardcover-Bindungen bieten wir Prägungen in Gold, Silber, Kupfer, Weiß oder Schwarz an. Der Text sollte eine Mindestschriftgröße von 18pt haben. Die Prägung kann auf dem Buchrücken und/oder auf dem Einband erfolgen. Beachte, dass sehr lange Titel eventuell nicht vollständig auf dem Buchrücken Platz finden. Universitätslogos können ebenfalls geprägt werden, benötigen aber eine hochauflösende Vektordatei.',
    en: 'For hardcover bindings, we offer embossing in gold, silver, copper, white, or black. The text should have a minimum font size of 18pt. Embossing can be done on the spine and/or cover. Note that very long titles may not fit completely on the spine. University logos can also be embossed but require a high-resolution vector file.'
  },
  
  // Footer translations
  'footer.description': {
    de: 'Dein Copyshop für hochwertige Bindungen und Drucke in Heidelberg.',
    en: 'Your copy shop for high-quality bindings and prints in Heidelberg.'
  },
  'footer.contact': {
    de: 'Kontakt',
    en: 'Contact'
  },
  'footer.opening_hours': {
    de: 'Öffnungszeiten',
    en: 'Opening Hours'
  },
  'footer.service': {
    de: 'Service',
    en: 'Service'
  },
  'footer.binding_options': {
    de: 'Bindungsoptionen',
    en: 'Binding Options'
  },
  'footer.process': {
    de: 'Ablauf',
    en: 'Process'
  },
  'footer.shipping_options': {
    de: 'Versandoptionen',
    en: 'Shipping Options'
  },
  'footer.configurator': {
    de: 'Konfigurator',
    en: 'Configurator'
  },
  'footer.privacy': {
    de: 'Datenschutz',
    en: 'Privacy Policy'
  },
  'footer.imprint': {
    de: 'Impressum',
    en: 'Imprint'
  },
  'footer.terms': {
    de: 'AGB',
    en: 'Terms & Conditions'
  },
  'footer.rights_reserved': {
    de: 'Alle Rechte vorbehalten.',
    en: 'All rights reserved.'
  },
  'footer.sustainability': {
    de: 'Nachhaltigkeit und Qualität aus der Region.',
    en: 'Sustainability and quality from the region.'
  },
  'footer.monday_friday': {
    de: 'Montag - Freitag',
    en: 'Monday - Friday'
  },
  'footer.saturday': {
    de: 'Samstag',
    en: 'Saturday'
  },
  'footer.sunday': {
    de: 'Sonntag',
    en: 'Sunday'
  },
  'footer.closed': {
    de: 'Geschlossen',
    en: 'Closed'
  },
  
  // Configurator translations
  'configurator.title': {
    de: 'Konfiguriere deine Abschlussarbeit',
    en: 'Configure your thesis',
  },
  'configurator.subtitle': {
    de: 'In wenigen Schritten zur perfekten Bindung für deine Arbeit.',
    en: 'In a few steps to the perfect binding for your work.',
  },
  'configurator.step1': {
    de: 'Bindung',
    en: 'Binding',
  },
  'configurator.step2': {
    de: 'Details',
    en: 'Details',
  },
  'configurator.step3': {
    de: 'Cover',
    en: 'Cover',
  },
  'configurator.step4': {
    de: 'Upload',
    en: 'Upload',
  },
  'configurator.binding.title': {
    de: 'Bindung wählen',
    en: 'Choose Binding',
  },
  'configurator.paper.title': {
    de: 'Papier & Extras',
    en: 'Paper & Extras',
  },
  'configurator.cover.title': {
    de: 'Cover Gestaltung',
    en: 'Cover design',
  },
  'configurator.upload.title': {
    de: 'Dateien hochladen',
    en: 'Upload files',
  },
  'configurator.binding.cover_color': {
    de: 'Einbandfarbe',
    en: 'Cover Color',
  },
  'configurator.binding.embossing': {
    de: 'Prägungsfarbe',
    en: 'Embossing Color',
  },
  'configurator.binding.upload_design': {
    de: 'Eigenes Design hochladen',
    en: 'Upload Custom Design',
  },
  'configurator.binding.drag_drop': {
    de: 'Datei hierher ziehen oder klicken zum Hochladen',
    en: 'Drag and drop file here or click to upload',
  },
  'configurator.binding.supported_formats': {
    de: 'Unterstützte Formate: PDF, PNG, JPG (max. 10MB)',
    en: 'Supported formats: PDF, PNG, JPG (max. 10MB)',
  },
  'configurator.binding.preview': {
    de: 'Vorschau',
    en: 'Preview',
  },
  'configurator.paper.standard': {
    de: '80g/m² Standardpapier',
    en: '80g/m² standard paper',
  },
  'configurator.paper.standard.desc': {
    de: 'Leichtes Papier, ideal für umfangreiche Arbeiten',
    en: 'Lightweight paper, ideal for extensive works',
  },
  'configurator.paper.premium': {
    de: '120g/m² Premiumpapier',
    en: '120g/m² premium paper',
  },
  'configurator.paper.premium.desc': {
    de: 'Hochwertiges Papier für eine edle Optik',
    en: 'High-quality paper for a sophisticated look',
  },
  'configurator.extras.bookmark': {
    de: 'Lesezeichen',
    en: 'Bookmark',
  },
  'configurator.extras.bookmark.desc': {
    de: 'Praktisches Lesezeichen für deine Arbeit',
    en: 'Practical bookmark for your work',
  },
  'configurator.extras.corners': {
    de: 'Buchecken',
    en: 'Book corners',
  },
  'configurator.extras.corners.desc': {
    de: 'Schützende Ecken für längere Haltbarkeit',
    en: 'Protective corners for longer durability',
  },
  'configurator.extras.uvCoating': {
    de: 'UV-Beschichtung',
    en: 'UV coating',
  },
  'configurator.extras.uvCoating.desc': {
    de: 'Schützt den Einband vor Verschmutzungen',
    en: 'Protects the cover from dirt',
  },
  'configurator.color.black': {
    de: 'Schwarz',
    en: 'Black',
  },
  'configurator.color.darkblue': {
    de: 'Dunkelblau',
    en: 'Dark blue',
  },
  'configurator.color.darkgreen': {
    de: 'Dunkelgrün',
    en: 'Dark green',
  },
  'configurator.color.burgundy': {
    de: 'Bordeauxrot',
    en: 'Burgundy',
  },
  'configurator.color.gray': {
    de: 'Grau',
    en: 'Gray',
  },
  'configurator.embossing.gold': {
    de: 'Gold',
    en: 'Gold',
  },
  'configurator.embossing.silver': {
    de: 'Silber',
    en: 'Silver',
  },
  'configurator.embossing.copper': {
    de: 'Kupfer',
    en: 'Copper',
  },
  'configurator.embossing.white': {
    de: 'Weiß',
    en: 'White',
  },
  'configurator.embossing.black': {
    de: 'Schwarz',
    en: 'Black',
  },
  'configurator.pageCount': {
    de: 'Seitenanzahl',
    en: 'Page count',
  },
  'configurator.copies': {
    de: 'Anzahl der Exemplare',
    en: 'Number of copies',
  },
  'configurator.embossingText': {
    de: 'Text für Prägung',
    en: 'Text for embossing',
  },
  'configurator.embossingText.placeholder': {
    de: 'z.B. Titel, Name, Jahr',
    en: 'e.g. title, name, year',
  },
  'configurator.uploadPDF': {
    de: 'PDF Datei hochladen',
    en: 'Upload PDF file',
  },
  'configurator.uploadLogo': {
    de: 'Logo hochladen (optional)',
    en: 'Upload logo (optional)',
  },
  'configurator.next': {
    de: 'Weiter',
    en: 'Next',
  },
  'configurator.back': {
    de: 'Zurück',
    en: 'Back',
  },
  'configurator.total': {
    de: 'Gesamtpreis',
    en: 'Total price',
  },
  'configurator.submit': {
    de: 'Bestellung abschließen',
    en: 'Complete order',
  },
  
  // Price formatting
  'price.starting_from': {
    de: 'ab',
    en: 'from',
  },
  'price.currency': {
    de: '€',
    en: '€',
  },
  
  // Reviews translations (additional testimonials text)
  'review.julia': {
    de: 'Meine Masterarbeit kam perfekt gebunden an! Die Hardcover-Bindung sieht super professionell aus und hat bei meiner Verteidigung viele Komplimente bekommen.',
    en: 'My master\'s thesis arrived perfectly bound! The hardcover binding looks super professional and received many compliments during my defense.',
  },
  'review.julia.degree': {
    de: 'Master in Wirtschaftswissenschaften',
    en: 'Master in Economics',
  },
  'review.markus': {
    de: 'Schneller Service, tolle Qualität und faire Preise. Meine Bachelorarbeit wurde innerhalb eines Tages gedruckt und gebunden. Absolut empfehlenswert!',
    en: 'Fast service, great quality, and fair prices. My bachelor\'s thesis was printed and bound within one day. Absolutely recommended!',
  },
  'review.markus.degree': {
    de: 'Bachelor in Informatik',
    en: 'Bachelor in Computer Science',
  },
  'review.laura': {
    de: 'Die Beratung vor Ort in Heidelberg war super hilfreich. Das Team hat mir bei der Auswahl der richtigen Bindung geholfen und das Ergebnis ist wirklich toll.',
    en: 'The on-site consultation in Heidelberg was super helpful. The team helped me choose the right binding and the result is really great.',
  },
  'review.laura.degree': {
    de: 'Promotion in Biologie',
    en: 'PhD in Biology',
  },
  'review.thomas': {
    de: 'Der Online-Konfigurator war einfach zu bedienen und die Lieferung kam pünktlich. Ein Stern Abzug, weil die Seiten leicht versetzt waren, aber immer noch sehr gut!',
    en: 'The online configurator was easy to use and the delivery arrived on time. One star deducted because the pages were slightly offset, but still very good!',
  },
  'review.thomas.degree': {
    de: 'Bachelor in Maschinenbau',
    en: 'Bachelor in Mechanical Engineering',
  },
  'review.sarah': {
    de: 'Toller Service! Habe kurzfristig meine Dissertation binden lassen und bin sehr zufrieden mit dem Ergebnis. Die goldene Prägung sieht besonders edel aus.',
    en: 'Great service! I had my dissertation bound on short notice and am very satisfied with the result. The gold embossing looks particularly elegant.',
  },
  'review.sarah.degree': {
    de: 'Promotion in Psychologie',
    en: 'PhD in Psychology',
  },
  'about.binding.time': {
    de: 'In unserer Filiale in Heidelberg können wir Hardcover-Bindungen innerhalb von 2-3 Stunden fertigstellen. Softcover- und Ringbindungen sind in der Regel innerhalb von 30-60 Minuten abholbereit. Bei hohem Aufkommen kann es zu längeren Wartezeiten kommen.',
    en: 'In our store in Heidelberg, we can complete hardcover bindings within 2-3 hours. Softcover and ring bindings are usually ready for pickup within 30-60 minutes. During busy periods, there may be longer waiting times.'
  },
  
  // Additional Services translations
  'additional.printing.title': {
    de: 'Farbdruck in Großformat',
    en: 'Large Format Color Printing',
  },
  'additional.printing.desc': {
    de: 'Poster, Banner und Plakate in Topqualität - ideal für Präsentationen und Werbematerialien.',
    en: 'Posters, banners and placards in top quality - ideal for presentations and promotional materials.',
  },
  'additional.scanning.title': {
    de: 'Scan- & Digitalisierungsservice',
    en: 'Scanning & Digitization Service',
  },
  'additional.scanning.desc': {
    de: 'Digitalisieren Sie wichtige Dokumente und archivieren Sie diese sicher als PDF oder in anderen Formaten.',
    en: 'Digitize important documents and archive them securely as PDF or in other formats.',
  },
  'additional.mailings.title': {
    de: 'Mailing-Service',
    en: 'Mailing Service',
  },
  'additional.mailings.desc': {
    de: 'Von der Gestaltung bis zum Versand - wir kümmern uns um Ihre Direktmailings und Werbeaussendungen.',
    en: 'From design to delivery - we take care of your direct mailings and promotional distributions.',
  },
  'additional.consulting.title': {
    de: 'Layout- & Designberatung',
    en: 'Layout & Design Consulting',
  },
  'additional.consulting.desc': {
    de: 'Professionelle Gestaltungsberatung für Ihre wissenschaftlichen Arbeiten und Dokumente.',
    en: 'Professional design consultation for your academic papers and documents.',
  },
  'additional.calendar.title': {
    de: 'Individuelle Kalender',
    en: 'Custom Calendars',
  },
  'additional.calendar.desc': {
    de: 'Persönliche Kalender mit eigenen Fotos und individueller Gestaltung für Privat oder als Geschenk.',
    en: 'Personal calendars with your own photos and individual design for private use or as a gift.',
  },
  'additional.merchandise.title': {
    de: 'Merchandise & Textildruck',
    en: 'Merchandise & Textile Printing',
  },
  'additional.merchandise.desc': {
    de: 'T-Shirts, Taschen und mehr mit Ihrem Logo oder Design - perfekt für Vereine, Events und Unternehmen.',
    en: 'T-shirts, bags and more with your logo or design - perfect for clubs, events and companies.',
  },
  'additional.proofreading.title': {
    de: 'Korrekturlesen',
    en: 'Proofreading',
  },
  'additional.proofreading.desc': {
    de: 'Professionelles Korrekturlesen Ihrer Texte für fehlerfreie und sprachlich einwandfreie Dokumente.',
    en: 'Professional proofreading of your texts for error-free and linguistically impeccable documents.',
  },
  'additional.business.title': {
    de: 'Geschäftsdrucksachen',
    en: 'Business Printing',
  },
  'additional.business.desc': {
    de: 'Visitenkarten, Briefpapier, Flyer und mehr für Ihren professionellen Geschäftsauftritt.',
    en: 'Business cards, letterheads, flyers and more for your professional business appearance.',
  },
  'additional.online.title': {
    de: 'Online-Druckportal',
    en: 'Online Printing Portal',
  },
  'additional.online.desc': {
    de: 'Bequem von zu Hause oder unterwegs drucken und bei uns abholen oder liefern lassen.',
    en: 'Print conveniently from home or on the go and pick up from us or have it delivered.',
  },
  'blog.section_title': {
    de: 'Blogs zum Stöbern',
    en: 'Browse Our Blog Posts',
  },
  'blog.section_subtitle': {
    de: 'Entdecken Sie unsere Blogbeiträge rund um das Thema Drucken und Binden',
    en: 'Discover our blog posts about printing and binding',
  },
  'about.section_title': {
    de: 'Über Pocat - Ihr Copyshop in Heidelberg',
    en: 'About Pocat - Your Copy Shop in Heidelberg',
  },
  'about.section_subtitle': {
    de: 'Seit über 20 Jahren Ihr zuverlässiger Partner für alle Ihre Druckbedürfnisse',
    en: 'Your reliable partner for all your printing needs for over 20 years',
  },
  'about.history_paragraph': {
    de: 'Wir begleiten unsere Kunden seit über 20 Jahren – von der Bachelorarbeit bis zur Promotion. Unser Ziel ist es, Studierenden und Akademikern dabei zu helfen, ihre Arbeiten im besten Licht zu präsentieren.',
    en: 'We have been supporting our customers for over 20 years – from bachelor theses to doctoral dissertations. Our goal is to help students and academics present their work in the best light.',
  },
  'about.sustainability_paragraph': {
    de: 'Zudem setzen wir auf Nachhaltigkeit und möchten unser Unternehmen fit für die Zukunft als umweltbewussten Copyshop gestalten.',
    en: 'We also focus on sustainability and want to make our company fit for the future as an environmentally conscious copy shop.',
  },
  'about.experience_heading': {
    de: 'Über 20 Jahre Erfahrung',
    en: 'Over 20 Years of Experience',
  },
  'about.experience_text': {
    de: 'Seit 2005 ein fester Begriff in Heidelberg',
    en: 'A trusted name in Heidelberg since 2005',
  },
  'about.philosophy_heading': {
    de: 'Unsere Philosophie',
    en: 'Our Philosophy',
  },
  'about.philosophy_text': {
    de: 'Bei Pocat verstehen wir, dass ein gedrucktes Dokument mehr ist als nur Tinte auf Papier. Es repräsentiert Wochen, Monate oder gar Jahre harter Arbeit und Hingabe. Daher gehen wir mit jedem Projekt mit größter Sorgfalt um.',
    en: 'At Pocat, we understand that a printed document is more than just ink on paper. It represents weeks, months, or even years of hard work and dedication. That\'s why we treat each project with the utmost care.',
  },
  'about.sustainability_heading': {
    de: 'Nachhaltigkeit als Kernwert',
    en: 'Sustainability as a Core Value',
  },
  'about.sustainability_text': {
    de: 'In einer Branche, die traditionell ressourcenintensiv ist, haben wir es uns zur Aufgabe gemacht, nachhaltiger zu arbeiten. Wir verwenden FSC-zertifiziertes Papier, arbeiten mit umweltfreundlichen Tinten und achten auf energieeffiziente Geräte.',
    en: 'In an industry that is traditionally resource-intensive, we have made it our mission to work more sustainably. We use FSC-certified paper, work with environmentally friendly inks, and focus on energy-efficient equipment.',
  },
  'about.future_heading': {
    de: 'Die Zukunft von Pocat',
    en: 'The Future of Pocat',
  },
  'about.future_text': {
    de: 'Während wir stolz auf unsere Geschichte sind, blicken wir auch stets nach vorne. Die Druckbranche entwickelt sich ständig weiter, und wir entwickeln uns mit ihr. Wir investieren in neue Technologien, schulen unser Team regelmäßig und bleiben offen für Innovationen.',
    en: 'While we are proud of our history, we always look forward. The printing industry is constantly evolving, and we evolve with it. We invest in new technologies, regularly train our team, and remain open to innovations.',
  },
  
  // Additional Services translations
  'additionalServices.section_title': {
    de: 'Wir sind noch nicht fertig, es gibt noch mehr!',
    en: 'We\'re not done yet, there\'s more!',
  },
  'additionalServices.section_subtitle': {
    de: 'Neben wissenschaftlichen Arbeiten bieten wir viele weitere Druck- und Kopierdienstleistungen an, die Ihren Anforderungen gerecht werden.',
    en: 'In addition to academic work, we offer many other printing and copying services that meet your requirements.',
  },
  'additionalServices.plotting.title': {
    de: 'Plotten',
    en: 'Plotting',
  },
  'additionalServices.plotting.description': {
    de: 'Technische Zeichnungen präzise in s/w oder Farbe geplottet - ideal für CAD, Baupläne und mehr.',
    en: 'Technical drawings precisely plotted in b/w or color - ideal for CAD, construction plans, and more.',
  },
  'additionalServices.laminating.title': {
    de: 'Laminieren',
    en: 'Laminating',
  },
  'additionalServices.laminating.description': {
    de: 'Langlebiger Schutz für Dokumente, Plakate oder Ausweise in verschiedenen Formaten und Stärken. Perfekt für Dokumente, die lange halten sollen.',
    en: 'Durable protection for documents, posters, or ID cards in various formats and thicknesses. Perfect for documents that need to last long.',
  },
  'additionalServices.stickers.title': {
    de: 'Sticker & Aufkleber',
    en: 'Stickers & Labels',
  },
  'additionalServices.stickers.description': {
    de: 'Personalisierte Aufkleber und Sticker in verschiedenen Größen, Formen und Materialien - wetterfest, matt oder glänzend für jede Anwendung.',
    en: 'Personalized stickers and labels in different sizes, shapes, and materials - weatherproof, matte, or glossy for any application.',
  },
  'additionalServices.chatbot.title': {
    de: 'Einfach anfragen über den Chatbot!',
    en: 'Simply ask via the chatbot!',
  },
  'additionalServices.chatbot.description': {
    de: 'Du hast eine spezielle Anfrage? Unser Chatbot steht rund um die Uhr bereit, um dir sofort weiterzuhelfen.',
    en: 'Do you have a special request? Our chatbot is available 24/7 to help you immediately.',
  },
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  translations,
  setLanguage: () => {},
  t: (key: string, variables?: Record<string, string | null>): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    let text = translations[key]['de']; // Default to German if no language specified
    
    // Replace variables if any
    if (variables) {
      Object.entries(variables).forEach(([name, value]) => {
        text = text.replace(new RegExp(`{{${name}}}`, 'g'), value || '');
      });
    }
    
    return text;
  },
});

// Define the useLanguage hook separately and consistently
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to German
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'de';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string, variables?: Record<string, string | null>): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    let text = translations[key]['de']; // Default to German if no language specified
    
    // Replace variables if any
    if (variables) {
      Object.entries(variables).forEach(([name, value]) => {
        text = text.replace(new RegExp(`{{${name}}}`, 'g'), value || '');
      });
    }
    
    return text;
  };

  // Update language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage as Language);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 