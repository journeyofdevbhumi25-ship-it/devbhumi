/* ------------------------------------------------------------------ */
/*  Regions                                                            */
/* ------------------------------------------------------------------ */

export const REGIONS = [
  "Himachal Pradesh",
  "Uttarakhand",
  "Jammu & Kashmir",
  "Ladakh",
  "Punjab",
  "Rajasthan",
  "Goa",
  "Sikkim",
  "Kerala",
] as const;
export type Region = (typeof REGIONS)[number];
export type RegionFilter = "All" | Region;

/* ------------------------------------------------------------------ */
/*  Business                                                           */
/* ------------------------------------------------------------------ */

export const BUSINESS = {
  name: "Journey of Dev Bhumi",
  tagline: "Discover. Explore. Experience.",
  phoneDisplay: "+91 7986897771",
  phoneE164: "+917986897771",
  whatsappNumber: "917986897771",
  email: "journeyofdevbhumi25@gmail.com",
  regions: REGIONS,
} as const;

export const DEFAULT_WA_MESSAGE =
  "Hello Journey of Dev Bhumi, I would like to enquire about planning a trip.";

export const TEL_LINK = `tel:${BUSINESS.phoneE164}`;
export const MAIL_LINK = `mailto:${BUSINESS.email}`;
export const INSTAGRAM_LINK =
  "https://www.instagram.com/journey_of_devbhumi?vrfl=MWJqaXQ2azFlaGt5bw%3D%3D&utm_source=qr";

export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject: string, body?: string): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  return `${MAIL_LINK}?${params.toString().replace(/\+/g, "%20")}`;
}

/* ------------------------------------------------------------------ */
/*  Imagery (Pexels CDN, resized on the fly)                           */
/* ------------------------------------------------------------------ */

export function px(id: number, w: number, h?: number): string {
  const base = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
  return h ? `${base}&h=${h}&fit=crop` : base;
}

/** Builds a srcSet for a fixed aspect ratio (w / h). */
export function pxSet(id: number, widths: number[], ratio?: number): string {
  return widths
    .map((w) => `${px(id, w, ratio ? Math.round(w / ratio) : undefined)} ${w}w`)
    .join(", ");
}

export const IMAGES = {
  hero: 31874591,
  welcomeMain: 38587220,
  welcomeSecondary: 32902593,
  plannerBackground: 13652247,
  emotional: 29494212,
  contact: 36004351,
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Destinations", href: "#destinations", id: "destinations" },
  { label: "Tours", href: "#tours", id: "tours" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

/* ------------------------------------------------------------------ */
/*  Destinations                                                       */
/* ------------------------------------------------------------------ */

export interface Destination {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  region: Region;
  description: string;
  story: string;
  highlights: string[];
  bestTime: string;
  imageId: number;
}

export const DESTINATIONS: Destination[] = [
  /* ---------- Himachal Pradesh ---------- */
  {
    id: "shimla",
    name: "Shimla",
    shortName: "Shimla",
    tagline: "The Queen of Hills",
    region: "Himachal Pradesh",
    description:
      "Experience colonial charm, beautiful mountains, peaceful walks and the timeless beauty of the Queen of Hills.",
    story:
      "Once the summer capital of British India, Shimla still carries its colonial charm along the Ridge, the Mall Road and Christ Church. Wander through cedar-lined lanes, ride the heritage toy train and watch the evening lights sparkle across the hills.",
    highlights: ["Mall Road & The Ridge", "Kufri", "Jakhu Temple", "Kalka–Shimla Toy Train", "Naldehra", "Christ Church"],
    bestTime: "March–June for pleasant weather · December–February for snow",
    imageId: 5238342,
  },
  {
    id: "kullu-manali",
    name: "Kullu & Manali",
    shortName: "Manali",
    tagline: "Valley of the Gods",
    region: "Himachal Pradesh",
    description:
      "Escape into spectacular valleys, snow-covered mountains, rivers and unforgettable Himalayan adventures.",
    story:
      "Set along the Beas River, Kullu and Manali are where pine forests meet snow-covered peaks. From the meadows of Solang Valley to the cafés of Old Manali and the road through the Atal Tunnel, every turn opens up a new adventure.",
    highlights: ["Solang Valley", "Atal Tunnel & Sissu", "Hadimba Temple", "Old Manali", "Rohtang Pass", "River rafting in Kullu"],
    bestTime: "October–June · December–February for snow",
    imageId: 28680808,
  },
  {
    id: "manali-manikaran-kasol",
    name: "Manali – Manikaran – Kasol",
    shortName: "Kasol",
    tagline: "The Parvati Valley",
    region: "Himachal Pradesh",
    description:
      "Discover scenic valleys, riverside landscapes, peaceful villages, hot springs and the unique charm of the Parvati Valley.",
    story:
      "Follow the Parvati River from Manali into a valley of pine forests, riverside villages and natural hot springs. Kasol's laid-back cafés, Manikaran's sacred springs and the quiet trails to Chalal and Tosh make this a journey worth slowing down for.",
    highlights: ["Kasol riverside", "Manikaran Sahib hot springs", "Chalal trail", "Tosh village", "Kheerganga trek", "Old Manali"],
    bestTime: "March–June · September–November",
    imageId: 12531022,
  },
  {
    id: "spiti-valley",
    name: "Spiti Valley",
    shortName: "Spiti",
    tagline: "The Middle Land",
    region: "Himachal Pradesh",
    description:
      "Journey into the remote Himalayan desert where dramatic landscapes, ancient monasteries and unforgettable roads await.",
    story:
      "A high-altitude cold desert of ochre mountains, thousand-year-old monasteries and villages that seem to float above the clouds. Spiti rewards those who take the long road with silence, starlight and landscapes unlike anywhere else in India.",
    highlights: ["Key Monastery", "Chandratal Lake", "Kaza", "Langza & Hikkim", "Dhankar Monastery", "Kunzum Pass"],
    bestTime: "June–September for open roads · winter for a snow-covered Spiti",
    imageId: 39003870,
  },
  /* ---------- Ladakh ---------- */
  {
    id: "leh-ladakh",
    name: "Leh – Ladakh",
    shortName: "Leh Ladakh",
    tagline: "Land of High Passes",
    region: "Ladakh",
    description:
      "Experience high-altitude landscapes, crystal-clear lakes, dramatic mountains and the legendary roads of Ladakh.",
    story:
      "Turquoise lakes, sand dunes beside snow peaks and prayer flags fluttering over some of the world's highest motorable passes. Ladakh is a road trip, a pilgrimage and an adventure rolled into one unforgettable journey.",
    highlights: ["Pangong Tso", "Nubra Valley & Hunder", "Khardung La", "Magnetic Hill", "Thiksey & Hemis monasteries", "Sangam viewpoint"],
    bestTime: "May–September",
    imageId: 18014641,
  },
  /* ---------- Himachal Pradesh ---------- */
  {
    id: "dharamshala",
    name: "Dharamshala",
    shortName: "Dharamshala",
    tagline: "Little Lhasa",
    region: "Himachal Pradesh",
    description:
      "Experience mountain views, Tibetan culture, peaceful monasteries and the refreshing beauty of the Dhauladhar range.",
    story:
      "Home to the Tibetan community in exile, Dharamshala and McLeod Ganj blend prayer wheels, monasteries and mountain cafés beneath the snow-dusted Dhauladhar range. Walk to Bhagsu Falls, sit in the calm of Namgyal Monastery or simply watch the clouds roll over the peaks.",
    highlights: ["McLeod Ganj", "Namgyal Monastery", "Bhagsu Falls", "Triund trek", "Dal Lake & Naddi", "HPCA Stadium"],
    bestTime: "March–June · September–November",
    imageId: 38043214,
  },
  {
    id: "dalhousie",
    name: "Dalhousie",
    shortName: "Dalhousie",
    tagline: "Pine-Scented Hill Retreat",
    region: "Himachal Pradesh",
    description:
      "Slow down among pine forests, colonial architecture, peaceful valleys and beautiful Himalayan landscapes.",
    story:
      "Spread across five hills, Dalhousie is all pine forests, Victorian-era churches and slow, misty mornings. A short drive brings you to the meadows of Khajjiar and the panoramic ridge of Dainkund, where the Dhauladhar range fills the horizon.",
    highlights: ["Khajjiar meadows", "Dainkund Peak", "Panchpula", "St. John's Church", "Kalatop Wildlife Sanctuary", "Chamera Lake"],
    bestTime: "March–June · October–December",
    imageId: 37791800,
  },
  /* ---------- Punjab ---------- */
  {
    id: "amritsar",
    name: "Amritsar",
    shortName: "Amritsar",
    tagline: "The Golden City",
    region: "Punjab",
    description:
      "Experience the Golden Temple, rich Punjabi heritage, incredible food and the vibrant spirit of Amritsar.",
    story:
      "The spiritual heart of Punjab welcomes everyone with the shimmering Harmandir Sahib, the stirring Wagah Border ceremony and lanes fragrant with kulchas and lassi. Amritsar is a journey for the soul and for the appetite.",
    highlights: ["Golden Temple", "Wagah Border ceremony", "Jallianwala Bagh", "Partition Museum", "Heritage Street", "Amritsari food trail"],
    bestTime: "October–March",
    imageId: 29429170,
  },
  /* ---------- Uttarakhand ---------- */
  {
    id: "rishikesh-haridwar",
    name: "Rishikesh & Haridwar",
    shortName: "Rishikesh",
    tagline: "Gateway to the Gods",
    region: "Uttarakhand",
    description:
      "Feel the calm of the Ganga, the glow of the evening aarti, yoga by the river and the thrill of white-water rafting.",
    story:
      "Where the Ganga leaves the mountains and meets the plains, Haridwar's ghats glow with the evening Ganga Aarti while Rishikesh — the yoga capital of the world — hums with ashrams, riverside cafés and the rush of white-water rafting. Spiritual, adventurous and deeply peaceful, all in one journey.",
    highlights: ["Ganga Aarti at Har Ki Pauri", "Laxman Jhula & Ram Jhula", "Triveni Ghat", "White-water rafting", "Beatles Ashram", "Neer Garh Waterfall"],
    bestTime: "September–April · rafting season runs until June",
    imageId: 38236787,
  },
  {
    id: "mussoorie",
    name: "Mussoorie",
    shortName: "Mussoorie",
    tagline: "Misty Hills Above the Doon",
    region: "Uttarakhand",
    description:
      "Stroll the Mall, chase waterfalls, watch clouds drift through the valley and enjoy the timeless charm of this misty hill town.",
    story:
      "Perched above the Doon Valley, Mussoorie is all misty ridgelines, colonial-era bungalows and easy walks along Camel's Back Road. Ride the ropeway up Gun Hill, picnic at Kempty Falls, wander the quiet lanes of Landour and watch the lights of Dehradun twinkle far below at night.",
    highlights: ["Mall Road", "Kempty Falls", "Gun Hill ropeway", "Landour", "Camel's Back Road", "Lal Tibba"],
    bestTime: "March–June · September–November",
    imageId: 40329176,
  },
  {
    id: "nainital-jim-corbett",
    name: "Nainital & Jim Corbett",
    shortName: "Nainital",
    tagline: "Lakes & Wild Kumaon",
    region: "Uttarakhand",
    description:
      "Boat across emerald lakes, wander through pine-covered hills and go looking for tigers in India's oldest national park.",
    story:
      "Nainital curls around its emerald Naini Lake, with the Mall Road, Snow View Point and the quieter lakes of Bhimtal, Sattal and Naukuchiatal all within easy reach. Drive down into the Terai and the sal forests of Jim Corbett open up — elephants, deer, hundreds of birds and, with a little luck, a tiger on the trail.",
    highlights: ["Naini Lake boating", "Snow View Point", "Tiffin Top", "Bhimtal & Sattal", "Jim Corbett jeep safari", "Naina Devi Temple"],
    bestTime: "March–June · October–November (Corbett safaris best November–June)",
    imageId: 34792711,
  },
  {
    id: "char-dham",
    name: "Char Dham Yatra",
    shortName: "Char Dham",
    tagline: "Yamunotri · Gangotri · Kedarnath · Badrinath",
    region: "Uttarakhand",
    description:
      "Walk the sacred trails to Kedarnath and Badrinath, follow the Ganga towards its source and discover the spiritual heart of Dev Bhumi.",
    story:
      "The Char Dham — Yamunotri, Gangotri, Kedarnath and Badrinath — are the four most sacred shrines of the Garhwal Himalaya. The yatra is as much about the journey as the darshan: deep river gorges, alpine meadows, the trek to Kedarnath beneath snow peaks and the serenity of Badrinath on the banks of the Alaknanda.",
    highlights: ["Kedarnath Temple", "Badrinath Temple", "Gangotri", "Yamunotri", "Mana village", "Auli & Joshimath"],
    bestTime: "May–June · September–October, while the shrines are open",
    imageId: 15031440,
  },
  /* ---------- Jammu & Kashmir ---------- */
  {
    id: "kashmir-valley",
    name: "Kashmir Valley",
    shortName: "Kashmir",
    tagline: "Paradise on Earth",
    region: "Jammu & Kashmir",
    description:
      "Drift across Dal Lake on a shikara, ride the Gulmarg gondola above the clouds and lose yourself in the meadows and rivers of Pahalgam.",
    story:
      "Houseboats and shikaras on Dal Lake, Mughal gardens in bloom, the Gulmarg gondola rising over pine forests, the Lidder river rushing through Pahalgam and the glacier meadows of Sonamarg — Kashmir lives up to its name in every season, from spring tulips to winter snow.",
    highlights: ["Dal Lake shikara & houseboats", "Gulmarg Gondola", "Pahalgam & Betaab Valley", "Sonamarg", "Mughal Gardens", "Tulip Garden (spring)"],
    bestTime: "April–October · December–February for snow in Gulmarg",
    imageId: 12025044,
  },
  {
    id: "jammu-vaishno-devi",
    name: "Jammu & Vaishno Devi",
    shortName: "Vaishno Devi",
    tagline: "The City of Temples",
    region: "Jammu & Kashmir",
    description:
      "Begin with a blessing at the sacred shrine of Mata Vaishno Devi, then unwind in the pine-clad hills of Patnitop.",
    story:
      "Pilgrims from across the world make the climb from Katra to the holy cave shrine of Mata Vaishno Devi, set high in the Trikuta hills. Pair the yatra with Jammu's ancient temples and the quiet pine meadows of Patnitop and Sanasar for a journey that nourishes both faith and spirit.",
    highlights: ["Mata Vaishno Devi Shrine", "Katra", "Bhairon Temple", "Patnitop", "Sanasar meadows", "Raghunath Temple"],
    bestTime: "Open year-round · March–June and September–November are most comfortable",
    imageId: 13081039,
  },
  /* ---------- Rajasthan ---------- */
  {
    id: "jaipur",
    name: "Jaipur",
    shortName: "Jaipur",
    tagline: "The Pink City",
    region: "Rajasthan",
    description:
      "Wander rose-pink bazaars, climb to the ramparts of Amber Fort and discover the royal grandeur of Rajasthan's capital.",
    story:
      "Rajasthan's capital glows in shades of terracotta pink — from the honeycomb windows of Hawa Mahal to the lamplit courtyards of the City Palace. Ride up to Amber Fort, watch the sunset from Nahargarh, puzzle over the giant instruments of Jantar Mantar and lose an afternoon in the bazaars of Johari and Bapu.",
    highlights: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar", "Nahargarh Fort sunset", "Johari & Bapu Bazaar"],
    bestTime: "October–March",
    imageId: 19149600,
  },
  {
    id: "udaipur",
    name: "Udaipur",
    shortName: "Udaipur",
    tagline: "The City of Lakes",
    region: "Rajasthan",
    description:
      "Glide across Lake Pichola at sunset, explore marble palaces and feel the romance of Rajasthan's most beautiful city.",
    story:
      "Set around the shimmering Lake Pichola and ringed by the Aravalli hills, Udaipur is Rajasthan at its most romantic. Explore the vast City Palace, take a boat to Jag Mandir, watch the sun set from the Monsoon Palace and wander the ghats and rooftop cafés of the old city.",
    highlights: ["Lake Pichola boat ride", "City Palace", "Jag Mandir", "Sajjangarh Monsoon Palace", "Fateh Sagar Lake", "Saheliyon ki Bari"],
    bestTime: "September–March",
    imageId: 39567970,
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    shortName: "Jodhpur",
    tagline: "The Blue City",
    region: "Rajasthan",
    description:
      "Stand atop mighty Mehrangarh Fort, look out over a sea of indigo rooftops and step into the heart of Marwar.",
    story:
      "Rising from the rock above a sea of blue-washed houses, Mehrangarh is one of India's most magnificent forts. Below it, the lanes around the Clock Tower buzz with spice sellers and tea stalls, while the marble Jaswant Thada and the art-deco Umaid Bhawan Palace tell the story of the Marwar royals.",
    highlights: ["Mehrangarh Fort", "Blue City heritage walk", "Umaid Bhawan Palace", "Jaswant Thada", "Clock Tower & Sardar Market", "Mandore Gardens"],
    bestTime: "October–March",
    imageId: 19160107,
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    shortName: "Jaisalmer",
    tagline: "The Golden City",
    region: "Rajasthan",
    description:
      "Watch the sun set over the Thar from a camel's back, sleep under desert stars and explore a living sandstone fort.",
    story:
      "Jaisalmer rises from the Thar Desert like a sandcastle — a living fort of golden stone, intricately carved havelis and quiet lanes. Ride out to the Sam Sand Dunes for a camel safari at sunset, spend a night in a desert camp with folk music under the stars and wake to the calm of Gadisar Lake.",
    highlights: ["Jaisalmer Fort", "Sam Sand Dunes camel safari", "Desert camp under the stars", "Patwon ki Haveli", "Gadisar Lake", "Kuldhara village"],
    bestTime: "October–March",
    imageId: 12041147,
  },
  /* ---------- Goa ---------- */
  {
    id: "north-goa",
    name: "North Goa",
    shortName: "North Goa",
    tagline: "Beaches, Forts & Nightlife",
    region: "Goa",
    description:
      "Sun-kissed beaches, lively shacks, Portuguese forts and flea markets — North Goa is where the holiday never really ends.",
    story:
      "From the busy sands of Baga and Calangute to the red cliffs of Vagator and the bohemian lanes of Anjuna, North Goa is Goa at its liveliest. Watch the sunset from Fort Aguada or Chapora Fort, browse the Anjuna flea market, feast on seafood at a beach shack and dance the night away.",
    highlights: ["Baga & Calangute beaches", "Anjuna flea market", "Vagator & Chapora Fort", "Fort Aguada", "Arambol & Morjim", "Beach shacks & nightlife"],
    bestTime: "November–February",
    imageId: 32262444,
  },
  {
    id: "south-goa",
    name: "South Goa",
    shortName: "South Goa",
    tagline: "Serene Shores",
    region: "Goa",
    description:
      "Quiet palm-fringed beaches, gentle waves, roaring waterfalls and slow sunsets — South Goa is where you go to breathe.",
    story:
      "South Goa trades the crowds for calm: the crescent bay of Palolem, the long white sands of Colva and Agonda, dolphin trips at dawn and candlelit dinners by the water. Add a day trip to the thundering Dudhsagar Falls and a spice-plantation lunch for a holiday that moves at its own unhurried pace.",
    highlights: ["Palolem Beach", "Colva & Benaulim", "Agonda & Butterfly Beach", "Dudhsagar Falls", "Cabo de Rama Fort", "Spice plantation visit"],
    bestTime: "November–March",
    imageId: 32262432,
  },
  {
    id: "old-goa-panaji",
    name: "Old Goa & Panaji",
    shortName: "Old Goa",
    tagline: "Heritage & the Latin Quarter",
    region: "Goa",
    description:
      "Baroque churches, the colourful lanes of Fontainhas and sunset cruises on the Mandovi — discover the Portuguese soul of Goa.",
    story:
      "Step back four centuries in Old Goa, where the Basilica of Bom Jesus and the Sé Cathedral rise above the palms as a UNESCO World Heritage Site. In nearby Panaji, the pastel-painted lanes of Fontainhas, the white steps of the Immaculate Conception Church and an evening cruise on the Mandovi complete the picture.",
    highlights: ["Basilica of Bom Jesus", "Sé Cathedral", "Fontainhas Latin Quarter", "Immaculate Conception Church", "Mandovi river cruise", "Miramar & Dona Paula"],
    bestTime: "October–March",
    imageId: 37706898,
  },
  /* ---------- Sikkim ---------- */
  {
    id: "gangtok-tsomgo",
    name: "Gangtok & Tsomgo Lake",
    shortName: "Gangtok",
    tagline: "Capital in the Clouds",
    region: "Sikkim",
    description:
      "Monasteries, mountain views, a glacial lake at 12,000 feet and the gentle charm of Sikkim's hilltop capital.",
    story:
      "Gangtok spills down a ridge with Kanchenjunga on the horizon — a clean, calm capital of monasteries, cable-car views and the lively MG Marg promenade. Drive up through pine forests to the sacred Tsomgo Lake, ride a yak on its shores and, with the right permit, stand at Nathula Pass on the old Silk Route to Tibet.",
    highlights: ["Tsomgo (Changu) Lake", "Nathula Pass & Baba Mandir", "Rumtek Monastery", "MG Marg", "Gangtok Ropeway", "Tashi View Point"],
    bestTime: "March–June · October–December",
    imageId: 37866434,
  },
  {
    id: "north-sikkim",
    name: "North Sikkim – Lachung & Yumthang",
    shortName: "North Sikkim",
    tagline: "Valley of Flowers",
    region: "Sikkim",
    description:
      "Drive deep into the high Himalaya — rhododendron valleys, hot springs, glacier viewpoints and the sacred blue of Gurudongmar Lake.",
    story:
      "North Sikkim is where the roads climb past waterfalls to the alpine villages of Lachung and Lachen. From Lachung, the Yumthang Valley blooms with rhododendrons in spring and lies under snow in winter; beyond it, Zero Point sits among glaciers. From Lachen, the road rises to Gurudongmar — a sacred, impossibly blue lake at over 17,000 feet.",
    highlights: ["Yumthang Valley", "Gurudongmar Lake", "Zero Point", "Lachung & Lachen", "Yumthang hot springs", "Seven Sisters Waterfall"],
    bestTime: "March–June for rhododendrons · October–December for clear skies",
    imageId: 34318075,
  },
  {
    id: "pelling-west-sikkim",
    name: "Pelling & West Sikkim",
    shortName: "Pelling",
    tagline: "In the Shadow of Kanchenjunga",
    region: "Sikkim",
    description:
      "Wake to Kanchenjunga glowing at sunrise, walk the glass Skywalk and find peace at ancient monasteries and a sacred wishing lake.",
    story:
      "Pelling faces Kanchenjunga head-on, and on clear mornings the world's third-highest mountain fills the entire sky. Walk the glass Skywalk to the giant Chenrezig statue, explore the 300-year-old Pemayangtse Monastery and the ruins of Rabdentse, and make a wish at the still, sacred waters of Khecheopalri Lake.",
    highlights: ["Kanchenjunga sunrise", "Pelling Skywalk", "Pemayangtse Monastery", "Khecheopalri Lake", "Rabdentse Ruins", "Kanchenjunga Falls"],
    bestTime: "October–December · March–May",
    imageId: 30701907,
  },
  /* ---------- Kerala ---------- */
  {
    id: "munnar",
    name: "Munnar",
    shortName: "Munnar",
    tagline: "Tea Gardens in the Mist",
    region: "Kerala",
    description:
      "Roll through endless emerald tea gardens, misty mountain roads and cool, fragrant air high in the Western Ghats.",
    story:
      "Munnar is a sea of tea — rolling, manicured gardens draped over the Western Ghats, cut by waterfalls and often wrapped in mist. Visit a tea factory, look for the rare Nilgiri tahr in Eravikulam National Park, picnic beside Mattupetty Dam and drive the spectacular road up to Top Station on the Tamil Nadu border.",
    highlights: ["Tea garden walks & tea museum", "Eravikulam National Park", "Mattupetty Dam", "Top Station", "Echo Point", "Attukal Waterfalls"],
    bestTime: "September–March",
    imageId: 39503242,
  },
  {
    id: "alleppey-backwaters",
    name: "Alleppey & Kumarakom Backwaters",
    shortName: "Alleppey",
    tagline: "Venice of the East",
    region: "Kerala",
    description:
      "Drift through palm-lined canals on a traditional houseboat, eat fresh Kerala food on deck and watch village life glide past.",
    story:
      "Nothing captures Kerala like a night on a kettuvallam houseboat, drifting across Vembanad Lake and through the narrow canals of Alappuzha and Kumarakom. Paddy fields stretch to the horizon, kingfishers flash past, and dinner is a Kerala feast cooked on board as the sun sets over the water.",
    highlights: ["Overnight houseboat cruise", "Vembanad Lake", "Kumarakom Bird Sanctuary", "Village canal canoe rides", "Alappuzha Beach & lighthouse", "Snake boat races (Aug–Sep)"],
    bestTime: "September–March",
    imageId: 12950219,
  },
  {
    id: "kochi",
    name: "Kochi",
    shortName: "Kochi",
    tagline: "Queen of the Arabian Sea",
    region: "Kerala",
    description:
      "Chinese fishing nets at sunset, spice-scented lanes, colonial churches and a Kathakali performance — Kochi is Kerala's cultural heart.",
    story:
      "Fort Kochi wears five centuries of history lightly: Portuguese churches, a Dutch palace, a Jewish synagogue and the giant Chinese fishing nets that still rise and fall along the shore at sunset. Wander the art-filled lanes, browse the spice markets of Mattancherry and end the evening with a Kathakali performance.",
    highlights: ["Chinese fishing nets at sunset", "Fort Kochi heritage walk", "Mattancherry Palace & Jew Town", "St. Francis Church", "Kathakali performance", "Marine Drive"],
    bestTime: "October–March",
    imageId: 12593493,
  },
  {
    id: "thekkady-periyar",
    name: "Thekkady & Periyar",
    shortName: "Thekkady",
    tagline: "Spice Hills & Wild Forests",
    region: "Kerala",
    description:
      "Cruise a forest lake looking for wild elephants, walk through cardamom and pepper plantations and breathe the cool hill air.",
    story:
      "Set in the Cardamom Hills, Thekkady is the gateway to Periyar Tiger Reserve — a boat ride across the lake brings herds of wild elephants, bison and sambar to the water's edge. Around town, spice plantations fill the air with cardamom and pepper, and evenings bring Kalaripayattu martial-arts shows and Ayurvedic massages.",
    highlights: ["Periyar Lake boat safari", "Spice plantation tour", "Bamboo rafting & nature walks", "Kalaripayattu show", "Elephant encounters", "Ayurvedic treatments"],
    bestTime: "September–March",
    imageId: 36717711,
  },
  {
    id: "kovalam-varkala",
    name: "Kovalam & Varkala",
    shortName: "Kovalam",
    tagline: "Kerala's Golden Coast",
    region: "Kerala",
    description:
      "Lighthouse beaches, red cliffs rising from the sea, Ayurvedic retreats and sunsets you'll remember for years.",
    story:
      "Kerala's southern coast is made for slowing down. Kovalam's crescent beaches curve beneath a candy-striped lighthouse, while Varkala's red cliffs rise straight from the sand, lined with cafés that face the sunset. Add an Ayurvedic treatment, a visit to the Padmanabhaswamy Temple in Thiruvananthapuram and the quiet backwaters of Poovar.",
    highlights: ["Kovalam Lighthouse Beach", "Varkala Cliff & Papanasam Beach", "Ayurvedic retreats", "Padmanabhaswamy Temple", "Poovar Island backwaters", "Sunset at the cliff cafés"],
    bestTime: "October–March",
    imageId: 6073482,
  },
];

/**
 * Curated preview for the collapsed "All destinations" view — one or two
 * highlights from every region. Ordered so the first and last entries have
 * landscape imagery that suits a wide card.
 */
export const FEATURED_DESTINATION_IDS = [
  "leh-ladakh",
  "shimla",
  "kullu-manali",
  "kashmir-valley",
  "rishikesh-haridwar",
  "amritsar",
  "jaipur",
  "north-goa",
  "munnar",
  "gangtok-tsomgo",
] as const;

/** Destinations grouped by region, in region order. */
export const DESTINATIONS_BY_REGION = REGIONS.map((region) => ({
  region,
  items: DESTINATIONS.filter((d) => d.region === region),
}));

/** Grouped options for the trip-planner destination select. */
export const DESTINATION_GROUPS: { label: string; options: string[] }[] = [
  ...DESTINATIONS_BY_REGION.map(({ region, items }) => ({ label: region, options: items.map((d) => d.name) })),
  { label: "Other", options: ["Multiple Destinations", "Not sure yet – help me decide"] },
];

/* ------------------------------------------------------------------ */
/*  Featured journeys                                                  */
/* ------------------------------------------------------------------ */

export interface Journey {
  id: string;
  name: string;
  destination: string;
  region: Region;
  idealFor: string;
  highlights: string[];
  imageId: number;
}

export const JOURNEYS: Journey[] = [
  {
    id: "shimla-getaway",
    name: "Shimla Getaway",
    destination: "Shimla",
    region: "Himachal Pradesh",
    idealFor: "Families & first hill trips",
    highlights: ["Mall Road & The Ridge", "Kufri", "Jakhu Temple", "Toy Train"],
    imageId: 3574440,
  },
  {
    id: "manali-mountain-escape",
    name: "Manali Mountain Escape",
    destination: "Kullu & Manali",
    region: "Himachal Pradesh",
    idealFor: "Couples & families",
    highlights: ["Solang Valley", "Atal Tunnel", "Hadimba Temple", "Old Manali"],
    imageId: 14572763,
  },
  {
    id: "manali-kasol-manikaran",
    name: "Manali – Kasol – Manikaran Experience",
    destination: "Manali – Manikaran – Kasol",
    region: "Himachal Pradesh",
    idealFor: "Friends & backpackers",
    highlights: ["Parvati River", "Manikaran Sahib", "Chalal & Tosh", "Riverside cafés"],
    imageId: 38086300,
  },
  {
    id: "spiti-valley-adventure",
    name: "Spiti Valley Adventure",
    destination: "Spiti Valley",
    region: "Himachal Pradesh",
    idealFor: "Adventure seekers",
    highlights: ["Key Monastery", "Chandratal", "Kaza", "Langza & Hikkim"],
    imageId: 31875016,
  },
  {
    id: "leh-ladakh-expedition",
    name: "Leh Ladakh Expedition",
    destination: "Leh – Ladakh",
    region: "Ladakh",
    idealFor: "Road-trip lovers",
    highlights: ["Pangong Tso", "Nubra Valley", "Khardung La", "Magnetic Hill"],
    imageId: 29494220,
  },
  {
    id: "kashmir-paradise-escape",
    name: "Kashmir Paradise Escape",
    destination: "Kashmir Valley",
    region: "Jammu & Kashmir",
    idealFor: "Couples & families",
    highlights: ["Dal Lake shikara", "Gulmarg Gondola", "Pahalgam", "Sonamarg"],
    imageId: 32620987,
  },
  {
    id: "royal-rajasthan-circuit",
    name: "Royal Rajasthan Circuit",
    destination: "Multiple Destinations",
    region: "Rajasthan",
    idealFor: "Palaces, forts & culture",
    highlights: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur"],
    imageId: 21382502,
  },
  {
    id: "classic-kerala-circuit",
    name: "Classic Kerala Circuit",
    destination: "Multiple Destinations",
    region: "Kerala",
    idealFor: "Honeymoons & families",
    highlights: ["Kochi", "Munnar", "Thekkady", "Alleppey houseboat"],
    imageId: 35994958,
  },
  {
    id: "goa-beach-holiday",
    name: "Goa Beach Holiday",
    destination: "Multiple Destinations",
    region: "Goa",
    idealFor: "Friends, couples & families",
    highlights: ["Baga & Calangute", "Palolem", "Fort Aguada", "Sunset cruise"],
    imageId: 39182453,
  },
  {
    id: "sikkim-himalayan-explorer",
    name: "Sikkim Himalayan Explorer",
    destination: "Multiple Destinations",
    region: "Sikkim",
    idealFor: "Mountain lovers & road trips",
    highlights: ["Gangtok", "Tsomgo Lake", "Lachung & Yumthang", "Gurudongmar Lake"],
    imageId: 8180772,
  },
  {
    id: "rishikesh-haridwar-retreat",
    name: "Rishikesh & Haridwar Retreat",
    destination: "Rishikesh & Haridwar",
    region: "Uttarakhand",
    idealFor: "Spiritual seekers & adventurers",
    highlights: ["Ganga Aarti", "Laxman Jhula", "River rafting", "Riverside cafés"],
    imageId: 29495753,
  },
  {
    id: "jaipur-pink-city-getaway",
    name: "Jaipur Pink City Getaway",
    destination: "Jaipur",
    region: "Rajasthan",
    idealFor: "Short breaks & heritage lovers",
    highlights: ["Hawa Mahal", "Amber Fort", "City Palace", "Nahargarh sunset"],
    imageId: 19521546,
  },
  {
    id: "dharamshala-dalhousie-escape",
    name: "Dharamshala & Dalhousie Escape",
    destination: "Multiple Destinations",
    region: "Himachal Pradesh",
    idealFor: "Slow, peaceful holidays",
    highlights: ["McLeod Ganj", "Bhagsu Falls", "Khajjiar", "Dainkund"],
    imageId: 15499160,
  },
  {
    id: "vaishno-devi-yatra",
    name: "Vaishno Devi Yatra & Patnitop",
    destination: "Jammu & Vaishno Devi",
    region: "Jammu & Kashmir",
    idealFor: "Pilgrims & families",
    highlights: ["Vaishno Devi darshan", "Katra", "Patnitop", "Sanasar"],
    imageId: 18552039,
  },
  {
    id: "jaisalmer-desert-experience",
    name: "Jaisalmer Desert Experience",
    destination: "Jaisalmer",
    region: "Rajasthan",
    idealFor: "Desert nights & adventure",
    highlights: ["Jaisalmer Fort", "Sam Sand Dunes", "Camel safari", "Desert camp"],
    imageId: 37415419,
  },
  {
    id: "nainital-corbett-getaway",
    name: "Nainital & Corbett Getaway",
    destination: "Nainital & Jim Corbett",
    region: "Uttarakhand",
    idealFor: "Families & wildlife lovers",
    highlights: ["Naini Lake", "Snow View Point", "Bhimtal", "Corbett safari"],
    imageId: 34792318,
  },
  {
    id: "amritsar-heritage-journey",
    name: "Amritsar Heritage Journey",
    destination: "Amritsar",
    region: "Punjab",
    idealFor: "Culture & heritage",
    highlights: ["Golden Temple", "Wagah Border", "Jallianwala Bagh", "Punjabi food trail"],
    imageId: 28905555,
  },
  {
    id: "goa-heritage-and-beaches",
    name: "Goa Heritage & Beaches",
    destination: "Old Goa & Panaji",
    region: "Goa",
    idealFor: "Culture lovers & couples",
    highlights: ["Basilica of Bom Jesus", "Fontainhas", "Mandovi cruise", "Palolem"],
    imageId: 19346797,
  },
  {
    id: "kerala-backwaters-and-beaches",
    name: "Kerala Backwaters & Beaches",
    destination: "Multiple Destinations",
    region: "Kerala",
    idealFor: "Slow, restful holidays",
    highlights: ["Alleppey houseboat", "Kumarakom", "Varkala cliffs", "Kovalam"],
    imageId: 31746465,
  },
  {
    id: "mussoorie-hill-escape",
    name: "Mussoorie Hill Escape",
    destination: "Mussoorie",
    region: "Uttarakhand",
    idealFor: "Couples & slow travellers",
    highlights: ["Mall Road", "Kempty Falls", "Landour", "Gun Hill"],
    imageId: 33236798,
  },
  {
    id: "gangtok-pelling-getaway",
    name: "Gangtok & Pelling Getaway",
    destination: "Multiple Destinations",
    region: "Sikkim",
    idealFor: "Couples & families",
    highlights: ["MG Marg", "Rumtek Monastery", "Kanchenjunga sunrise", "Pelling Skywalk"],
    imageId: 19864821,
  },
  {
    id: "char-dham-yatra",
    name: "Char Dham Yatra",
    destination: "Char Dham Yatra",
    region: "Uttarakhand",
    idealFor: "Pilgrims & trekkers",
    highlights: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
    imageId: 19010050,
  },
];

/* ------------------------------------------------------------------ */
/*  Planning steps                                                     */
/* ------------------------------------------------------------------ */

export const PLANNING_STEPS = [
  {
    title: "Tell us your plan",
    text: "Share where you'd like to go, when, and who's travelling with you.",
  },
  {
    title: "Receive a personalised itinerary",
    text: "We shape a route, stays and travel around your preferences.",
  },
  {
    title: "Confirm and travel",
    text: "Finalise the details with us, then pack your bags for the mountains.",
  },
] as const;
