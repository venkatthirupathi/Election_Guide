// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const quizData = [
  {
    question: "Which body conducts elections in India?",
    options: ["Parliament of India", "Supreme Court of India", "Election Commission of India", "Ministry of Home Affairs"],
    answer: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering all elections in India.",
    category: "Institutions"
  },
  {
    question: "How many seats are there in the Lok Sabha?",
    options: ["250", "543", "545", "552"],
    answer: 1,
    explanation: "The Lok Sabha (House of the People) has 543 elected seats. 2 additional seats were for Anglo-Indians (abolished in 2020).",
    category: "Structure"
  },
  {
    question: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    answer: 1,
    explanation: "The voting age was lowered from 21 to 18 years by the 61st Constitutional Amendment Act, 1988.",
    category: "Voting"
  },
  {
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electro Voter Monitor", "Electoral Vote Management", "Electronic Voter Module"],
    answer: 0,
    explanation: "EVM stands for Electronic Voting Machine. India began using EVMs in 1982 and replaced paper ballots completely by 2004.",
    category: "Technology"
  },
  {
    question: "How frequently are Lok Sabha general elections held?",
    options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
    answer: 2,
    explanation: "Lok Sabha elections are held every 5 years unless the house is dissolved earlier by the President on the advice of the Prime Minister.",
    category: "Structure"
  },
  {
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "Chief Justice of India", "President of India", "Vice President of India"],
    answer: 2,
    explanation: "The Chief Election Commissioner is appointed by the President of India. The CEC can only be removed through a process similar to removing a Supreme Court judge.",
    category: "Institutions"
  },
  {
    question: "What is NOTA in Indian elections?",
    options: ["National Online Tracking App", "None Of The Above", "New Official Tally Approach", "National Official Transparent Audit"],
    answer: 1,
    explanation: "NOTA (None Of The Above) allows voters to reject all candidates on the ballot. It was introduced in 2013 following a Supreme Court directive.",
    category: "Voting"
  },
  {
    question: "What is VVPAT?",
    options: ["Voter Verified Paper Audit Trail", "Virtual Voting Process Audit Tool", "Verified Voter Personal Access Token", "Voting Validity and Protocol Assessment Terminal"],
    answer: 0,
    explanation: "VVPAT (Voter Verified Paper Audit Trail) is a device attached to EVMs that prints a slip showing the candidate voted for, allowing voters to verify their vote.",
    category: "Technology"
  },
  {
    question: "What is the Model Code of Conduct (MCC)?",
    options: ["A law passed by Parliament for elections", "Guidelines for political parties and candidates during elections", "Rules for media coverage of elections", "Code of conduct for election officials"],
    answer: 1,
    explanation: "The MCC is a set of guidelines issued by the ECI that political parties and candidates must follow once elections are announced. It is not legally enforceable but is a moral code.",
    category: "Process"
  },
  {
    question: "How many seats does Rajya Sabha have?",
    options: ["200", "238", "250", "280"],
    answer: 2,
    explanation: "Rajya Sabha has 250 seats — 238 are elected by state/UT legislatures, and 12 are nominated by the President for their contributions to art, science, literature, and social service.",
    category: "Structure"
  },
  {
    question: "Which article of the Indian Constitution establishes the Election Commission?",
    options: ["Article 256", "Article 310", "Article 324", "Article 356"],
    answer: 2,
    explanation: "Article 324 of the Indian Constitution vests the superintendence, direction, and control of elections in the Election Commission of India.",
    category: "Constitution"
  },
  {
    question: "What is the minimum age to become a Member of Parliament (Lok Sabha)?",
    options: ["18 years", "21 years", "25 years", "30 years"],
    answer: 2,
    explanation: "A person must be at least 25 years old to be elected to the Lok Sabha. For Rajya Sabha, the minimum age is 30 years.",
    category: "Structure"
  },
  {
    question: "India follows which electoral system for Lok Sabha elections?",
    options: ["Proportional Representation", "First-Past-the-Post (FPTP)", "Two-Round System", "Instant Runoff Voting"],
    answer: 1,
    explanation: "India uses the First-Past-the-Post (FPTP) system for Lok Sabha elections, where the candidate with the most votes in a constituency wins, regardless of whether they have a majority.",
    category: "System"
  },
  {
    question: "What is Delimitation in the context of Indian elections?",
    options: ["Setting voting time limits", "Redrawing constituency boundaries", "Banning political parties", "Cancelling elections in certain areas"],
    answer: 1,
    explanation: "Delimitation is the process of redrawing the boundaries of electoral constituencies. It is carried out by the Delimitation Commission based on census data.",
    category: "Process"
  },
  {
    question: "When was the first general election held in India?",
    options: ["1947", "1948", "1952", "1955"],
    answer: 2,
    explanation: "India's first general election was held in 1951-52, making it the world's largest democratic exercise at the time, with over 173 million eligible voters.",
    category: "History"
  },
  {
    question: "What is a 'Swing' in election terminology?",
    options: ["A type of voting booth", "Change in vote share between elections", "A candidate switching parties", "Swinging gate at polling station"],
    answer: 1,
    explanation: "Electoral swing measures the change in vote share for a party from one election to the next, helping analysts predict election outcomes.",
    category: "Concepts"
  },
  {
    question: "Which document serves as proof of identity for voting in India?",
    options: ["Aadhaar Card only", "PAN Card only", "Voter ID Card (EPIC)", "Driving License only"],
    answer: 2,
    explanation: "The Electors Photo Identity Card (EPIC), commonly called Voter ID, is the primary identity document for voting. However, 12 other documents are also accepted.",
    category: "Voting"
  },
  {
    question: "What is a 'Reserved Constituency' in India?",
    options: ["Constituencies for government employees", "Constituencies reserved for SC/ST candidates", "Constituencies with no opposition", "Constituencies in border areas"],
    answer: 1,
    explanation: "Reserved constituencies are seats exclusively for candidates from Scheduled Castes (SC) and Scheduled Tribes (ST), ensuring representation of historically marginalized communities.",
    category: "System"
  },
  {
    question: "What is the Election Symbol of the Indian National Congress?",
    options: ["Lotus", "Bicycle", "Hand", "Arrow"],
    answer: 2,
    explanation: "The Hand (open palm) is the election symbol of the Indian National Congress (INC), one of the oldest political parties in India.",
    category: "Parties"
  },
  {
    question: "What is the election symbol of the Bharatiya Janata Party (BJP)?",
    options: ["Lotus", "Hand", "Bicycle", "Star"],
    answer: 0,
    explanation: "The Lotus is the election symbol of the Bharatiya Janata Party (BJP). The lotus is also India's national flower.",
    category: "Parties"
  },
  {
    question: "What is a 'No-Confidence Motion'?",
    options: ["A motion to dissolve Parliament", "A motion to express Parliament's lack of confidence in the government", "A motion against the President", "A motion to call new elections immediately"],
    answer: 1,
    explanation: "A No-Confidence Motion is moved in the Lok Sabha against the sitting government. If passed, the government must resign. It requires a simple majority to pass.",
    category: "Process"
  },
  {
    question: "How long is a Rajya Sabha member's term?",
    options: ["2 years", "4 years", "6 years", "5 years"],
    answer: 2,
    explanation: "Rajya Sabha members serve a 6-year term. One-third of the members retire every 2 years, making Rajya Sabha a permanent house that is never dissolved.",
    category: "Structure"
  },
  {
    question: "What is Booth Capturing?",
    options: ["Setting up a polling booth", "Illegally taking over a polling station to manipulate votes", "A digital voting system", "A media coverage strategy"],
    answer: 1,
    explanation: "Booth capturing is a serious electoral malpractice where armed individuals forcibly take over polling booths and cast votes illegally. It is a criminal offense in India.",
    category: "Process"
  },
  {
    question: "What does 'Hung Parliament' mean?",
    options: ["A parliament with too many members", "No single party wins a majority", "Parliament sessions that run too long", "A parliament in constitutional crisis"],
    answer: 1,
    explanation: "A Hung Parliament occurs when no single political party wins an outright majority (272+ seats in Lok Sabha). This typically leads to coalition government formation.",
    category: "Concepts"
  },
  {
    question: "Which Amendment Act lowered the voting age from 21 to 18 in India?",
    options: ["42nd Amendment", "52nd Amendment", "61st Amendment", "73rd Amendment"],
    answer: 2,
    explanation: "The 61st Constitutional Amendment Act of 1988 lowered the voting age from 21 to 18 years, which came into effect on March 28, 1989.",
    category: "Constitution"
  }
];

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const flashcardData = [
  {
    term: "Election Commission of India (ECI)",
    definition: "An autonomous constitutional authority established under Article 324. It supervises, directs and controls elections to Parliament and State Legislatures. Currently has a Chief Election Commissioner and 2 Election Commissioners.",
    category: "Institutions",
    icon: "⚖️"
  },
  {
    term: "Lok Sabha",
    definition: "The lower house of India's Parliament (House of the People). Has 543 elected seats. Members are directly elected by voters. Term is 5 years. Speaker presides over it.",
    category: "Structure",
    icon: "🏛️"
  },
  {
    term: "Rajya Sabha",
    definition: "The upper house of India's Parliament (Council of States). Has 250 seats (238 elected + 12 nominated). It is a permanent house — never dissolved. Vice President presides as ex-officio Chairman.",
    category: "Structure",
    icon: "🏛️"
  },
  {
    term: "EVM (Electronic Voting Machine)",
    definition: "A standalone electronic device used to record votes. Consists of a Control Unit (with polling officer) and a Balloting Unit (with voter). Replaced paper ballots completely in 2004 general elections.",
    category: "Technology",
    icon: "🖥️"
  },
  {
    term: "VVPAT",
    definition: "Voter Verified Paper Audit Trail — a device attached to EVMs that prints a paper slip showing the party/candidate voted for. The slip is visible for 7 seconds before falling into a sealed box. Introduced in 2013.",
    category: "Technology",
    icon: "🖨️"
  },
  {
    term: "NOTA",
    definition: "None Of The Above — an option on the ballot allowing voters to reject all candidates. Introduced in 2013 after Supreme Court order in PUCL vs Union of India. Getting the most NOTA votes does NOT cancel an election.",
    category: "Voting",
    icon: "✗"
  },
  {
    term: "Model Code of Conduct",
    definition: "A set of guidelines issued by ECI for political parties and candidates once election schedule is announced. Covers conduct, speeches, polling booths, manifestos, and government activity. Effective from announcement to result.",
    category: "Process",
    icon: "📋"
  },
  {
    term: "First-Past-the-Post (FPTP)",
    definition: "India's electoral system for Lok Sabha and State Assembly elections. The candidate with the highest number of votes in a constituency wins — even without a majority. Simple but can produce disproportionate results.",
    category: "System",
    icon: "🏁"
  },
  {
    term: "EPIC (Electors Photo Identity Card)",
    definition: "Commonly called Voter ID Card. Issued by ECI to eligible voters. Required to vote but 12 alternate documents are accepted including Aadhaar, Passport, and Driving License.",
    category: "Voting",
    icon: "🪪"
  },
  {
    term: "Delimitation",
    definition: "The process of redrawing electoral constituency boundaries based on census data. Done by the Delimitation Commission. Last delimitation for Lok Sabha seats was in 2002 (based on 2001 census). Frozen until 2026.",
    category: "Process",
    icon: "🗺️"
  },
  {
    term: "Constituency",
    definition: "A geographical unit that elects one representative to a legislature. India has 543 Lok Sabha constituencies. Each constituency has roughly equal population. Divided into polling stations/booths.",
    category: "Structure",
    icon: "📍"
  },
  {
    term: "Returning Officer (RO)",
    definition: "An officer appointed by ECI for each constituency to oversee the election process. Responsible for accepting nominations, conducting polls, counting votes, and declaring results.",
    category: "Process",
    icon: "👤"
  },
  {
    term: "Booth Capturing",
    definition: "A serious electoral malpractice where people forcibly take over polling stations and cast fraudulent votes. A cognizable offense under Section 135A of Representation of People Act. Can lead to cancellation of election.",
    category: "Malpractice",
    icon: "⚠️"
  },
  {
    term: "Hung Parliament",
    definition: "When no single party wins an outright majority in elections (272+ seats in Lok Sabha). Leads to coalition governments or President's Rule. India has seen hung parliaments in 1989, 1996, 1999, and 2004.",
    category: "Concepts",
    icon: "⚖️"
  },
  {
    term: "Representation of the People Act, 1951",
    definition: "The primary law governing elections in India. Covers electoral rolls, conduct of elections, election offenses, and dispute resolution. Along with RPA 1950, it forms the legal backbone of Indian elections.",
    category: "Law",
    icon: "📜"
  },
  {
    term: "Rajya Sabha Election Process",
    definition: "Rajya Sabha members are elected by elected members of State Legislative Assemblies (MLAs) using Single Transferable Vote (proportional representation). Not directly elected by common voters.",
    category: "Structure",
    icon: "🗳️"
  },
  {
    term: "Reserved Constituencies",
    definition: "Seats exclusively for candidates from Scheduled Castes (SC) or Scheduled Tribes (ST). Out of 543 Lok Sabha seats: 84 reserved for SC, 47 for ST. Ensures representation of marginalized communities.",
    category: "System",
    icon: "🛡️"
  },
  {
    term: "Anti-Defection Law",
    definition: "10th Schedule of the Constitution (added by 52nd Amendment, 1985). Disqualifies an elected member if they voluntarily give up party membership or vote against party direction. Prevents political defections.",
    category: "Law",
    icon: "⛔"
  },
  {
    term: "No-Confidence Motion",
    definition: "A motion in Lok Sabha expressing lack of confidence in the Council of Ministers. If passed by majority, the PM and council must resign. First such motion was in 1963 by J.B. Kripalani against Nehru government.",
    category: "Process",
    icon: "📢"
  },
  {
    term: "President's Rule",
    definition: "Also called 'State Emergency' under Article 356. When a State's constitutional machinery fails, President's Rule can be imposed. State assembly is dissolved/suspended and Centre governs directly. Max 3 years with Parliament approval.",
    category: "Constitution",
    icon: "🔴"
  }
];

// ─── TOPIC CONTENT ────────────────────────────────────────────────────────────
const topicsData = [
  {
    id: "eci",
    title: "Election Commission of India",
    icon: "⚖️",
    color: "#4f46e5",
    summary: "The independent body that runs India's elections",
    content: [
      {
        heading: "What is the Election Commission?",
        text: "The Election Commission of India (ECI) is an autonomous constitutional authority established under Article 324 of the Indian Constitution. It is responsible for administering electoral processes for the Parliament of India, State Legislatures, and the offices of the President and Vice President."
      },
      {
        heading: "Structure",
        text: "The ECI consists of the Chief Election Commissioner (CEC) and currently two Election Commissioners. They are appointed by the President of India and have security of tenure — they can only be removed through a process similar to removing a Supreme Court judge."
      },
      {
        heading: "Key Powers",
        text: "• Schedules elections and announces election dates\n• Enforces the Model Code of Conduct\n• Registers political parties and assigns election symbols\n• Sets spending limits for candidates\n• Deploys central forces during elections\n• Can postpone elections in specific areas due to violence or natural disasters"
      },
      {
        heading: "Important Milestones",
        text: "1950: ECI established | 1977: First multi-member ECI | 1982: EVMs first used | 1989: Voting age lowered to 18 | 2004: Full EVM deployment | 2013: VVPAT introduced | 2013: NOTA introduced"
      }
    ]
  },
  {
    id: "types",
    title: "Types of Elections",
    icon: "🗳️",
    color: "#059669",
    summary: "Lok Sabha, Rajya Sabha, State elections and more",
    content: [
      {
        heading: "General Elections (Lok Sabha)",
        text: "Held every 5 years to elect 543 members to the lower house of Parliament. All Indian citizens aged 18+ can vote. Uses First-Past-the-Post system. The party/coalition with 272+ seats forms the government."
      },
      {
        heading: "State Legislative Assembly Elections (Vidhan Sabha)",
        text: "Each Indian state has its own legislative assembly. Elections are held every 5 years. Uses FPTP system. The party with majority forms the state government; leader becomes Chief Minister."
      },
      {
        heading: "Rajya Sabha Elections",
        text: "Members are elected by State Legislative Assembly members (MLAs), not by the public directly. Uses Single Transferable Vote with proportional representation. 1/3rd of members retire every 2 years."
      },
      {
        heading: "Presidential Election",
        text: "The President of India is elected by an Electoral College — elected MPs and MLAs. Uses Single Transferable Vote with proportional representation. Term is 5 years."
      },
      {
        heading: "By-Elections",
        text: "Held when a seat falls vacant due to death, resignation, or disqualification of a sitting member. Also called 'Upchunav'. Must be held within 6 months of vacancy."
      },
      {
        heading: "Local Body Elections",
        text: "Elections for Panchayats (rural) and Municipalities/Corporations (urban). Conducted by State Election Commissions (not ECI). Added by 73rd and 74th Constitutional Amendments (1992)."
      }
    ]
  },
  {
    id: "process",
    title: "Election Process Step by Step",
    icon: "📋",
    color: "#d97706",
    summary: "How an Indian election is conducted from start to finish",
    content: [
      {
        heading: "Step 1: Announcement of Elections",
        text: "ECI announces the election schedule — notification date, nomination filing, scrutiny, withdrawal, polling date, and result date. Model Code of Conduct comes into effect immediately."
      },
      {
        heading: "Step 2: Filing of Nominations",
        text: "Candidates file nomination papers with the Returning Officer. Must submit Form 2B, affidavit of assets/criminal record, security deposit (₹25,000 for Lok Sabha). Scrutiny of nominations follows."
      },
      {
        heading: "Step 3: Withdrawal of Nominations",
        text: "Candidates can withdraw their nominations within 2 days of scrutiny. Final list of candidates is published. Election symbols are allocated."
      },
      {
        heading: "Step 4: Election Campaign",
        text: "Parties and candidates campaign within MCC guidelines. Campaigning must stop 48 hours before polling (Silence Period). Spending limits apply: ₹95 lakh for Lok Sabha in large states."
      },
      {
        heading: "Step 5: Polling Day",
        text: "Voting happens at designated booths (typically one per 1,500 voters). Voters verify identity, get ink on finger, and vote on EVM. Polling hours are typically 7 AM to 6 PM."
      },
      {
        heading: "Step 6: Counting of Votes",
        text: "EVMs are brought to counting centers. Postal ballots are counted first. EVM counting is done round by round. Winning candidate is declared by the Returning Officer."
      },
      {
        heading: "Step 7: Formation of Government",
        text: "If a party wins 272+ seats, their leader is invited by the President to form the government. In a hung parliament, coalition negotiations happen before government formation."
      }
    ]
  },
  {
    id: "evm",
    title: "EVM & Voting Technology",
    icon: "🖥️",
    color: "#7c3aed",
    summary: "Electronic Voting Machines and how they work",
    content: [
      {
        heading: "What is an EVM?",
        text: "Electronic Voting Machine is a standalone, battery-operated device used to record votes in Indian elections. It has two components: the Control Unit (with polling officer) and the Balloting Unit (with the voter)."
      },
      {
        heading: "How EVMs Work",
        text: "The Balloting Unit has buttons corresponding to candidates. When a voter presses a button, a beep confirms the vote. The Control Unit records and stores votes. Each EVM can record up to 64 candidates and 3,840 votes."
      },
      {
        heading: "Security Features",
        text: "• Standalone — not connected to internet or any network\n• One-time programmable microcontroller (cannot be reprogrammed)\n• Tamper detection mechanisms\n• Sealed after voting with unique serial numbers\n• Stored in secure strong rooms with CCTV"
      },
      {
        heading: "VVPAT — The Paper Trail",
        text: "Voter Verified Paper Audit Trail (VVPAT) is attached to EVMs. After voting, it prints a slip showing party name, symbol, and candidate name. The slip is visible for 7 seconds through a glass window before falling into a sealed box."
      },
      {
        heading: "EVM History",
        text: "1977: ECI proposed EVMs | 1982: First EVM trial in Kerala (Parur constituency) | 1998: Used in some state elections | 2004: Used in all Lok Sabha seats for the first time | 2019: VVPAT used across all constituencies"
      }
    ]
  },
  {
    id: "parties",
    title: "Political Parties of India",
    icon: "🏳️",
    color: "#dc2626",
    summary: "Major national and regional parties, their symbols and history",
    content: [
      {
        heading: "National Parties",
        text: "A party is recognized as 'National' if it wins 2% of Lok Sabha seats or 6% votes in 4+ states. Currently: BJP (Lotus), INC (Hand), AAP (Broom), BSP (Elephant), CPI(M) (Hammer-Sickle-Star), NCP (Clock), TMC (Flowers & Grass)."
      },
      {
        heading: "Bharatiya Janata Party (BJP)",
        text: "Founded: 1980 | Symbol: Lotus | Ideology: Hindu nationalism, conservatism, economic liberalism. Currently the ruling party at the Centre. Part of NDA alliance. Led by PM Narendra Modi since 2014."
      },
      {
        heading: "Indian National Congress (INC)",
        text: "Founded: 1885 | Symbol: Hand | India's oldest political party. Led freedom struggle against British rule. Governed India for most of its post-independence history. Currently main opposition party."
      },
      {
        heading: "Regional Parties",
        text: "India has 50+ recognized state parties including: DMK (Tamil Nadu), AIADMK (Tamil Nadu), SP (UP), RJD (Bihar), Shiv Sena (Maharashtra), TDP (Andhra), BJD (Odisha), AGP (Assam), JMM (Jharkhand)."
      },
      {
        heading: "Alliance Politics",
        text: "NDA (National Democratic Alliance) — BJP-led coalition. INDIA (Indian National Developmental Inclusive Alliance) — Opposition coalition including INC, TMC, AAP, SP, DMK. Alliance politics is crucial in a hung parliament."
      }
    ]
  },
  {
    id: "voter",
    title: "Voter Rights & Responsibilities",
    icon: "✅",
    color: "#0891b2",
    summary: "What every Indian voter should know",
    content: [
      {
        heading: "Who Can Vote?",
        text: "Any Indian citizen aged 18 or above on the qualifying date (January 1 of the year) who is not disqualified under any law. Non-Resident Indians (NRIs) can also register and vote in their home constituency."
      },
      {
        heading: "How to Register",
        text: "Register online at voters.eci.gov.in using Form 6, or offline at Electoral Registration Officer's office. Registration drives are held before every election. Aadhaar-Voter ID linking is optional but encouraged."
      },
      {
        heading: "Your Rights at the Polling Booth",
        text: "• Right to a secret ballot\n• Right to receive a replacement ballot if accidentally spoiled\n• Right to refuse to vote after entering booth (NOTA option)\n• Right to assistance if differently-abled\n• Right to vote via Postal Ballot if eligible (service voter, elderly, specially-abled)"
      },
      {
        heading: "Responsibilities",
        text: "• Verify details on electoral roll before election\n• Carry valid identity proof on polling day\n• Do not accept money/gifts for votes (bribery is illegal)\n• Do not photograph your vote\n• Report electoral malpractice to ECI (1950 helpline)"
      },
      {
        heading: "ECI Helpline",
        text: "1950 — National Voter Helpline. Can be used to check voter registration, find polling booth location, report election violations, and get election-related information."
      }
    ]
  }
];

// ─── TIMELINE DATA ─────────────────────────────────────────────────────────────
const timelineData = [
  { year: "1950", event: "Election Commission of India established", detail: "ECI was set up on January 25, 1950 — one day before India became a Republic.", icon: "⚖️" },
  { year: "1951–52", event: "First General Election", detail: "World's largest democratic exercise at the time. 173 million voters, 489 constituencies. Indian National Congress won under PM Jawaharlal Nehru.", icon: "🗳️" },
  { year: "1977", event: "First Non-Congress Government", detail: "Janata Party defeated INC after the Emergency period, demonstrating democracy's resilience. Also first time ECI became multi-member.", icon: "🏛️" },
  { year: "1982", event: "First EVM Trial", detail: "EVMs were first used experimentally in the Kerala State Assembly election in the Parur constituency.", icon: "🖥️" },
  { year: "1985", event: "Anti-Defection Law", detail: "10th Schedule added to the Constitution by 52nd Amendment to prevent legislators from switching parties.", icon: "⛔" },
  { year: "1989", event: "Voting Age Lowered to 18", detail: "61st Constitutional Amendment reduced voting age from 21 to 18, effective March 28, 1989. Massively expanded the electorate.", icon: "🔞" },
  { year: "1991", event: "EVMs in More Constituencies", detail: "EVMs used in 16 Assembly constituencies across 5 states — phased expansion began.", icon: "📡" },
  { year: "1996", event: "First Hung Parliament (11th Lok Sabha)", detail: "No party won majority. BJP formed government under Vajpayee but lasted only 13 days. HD Deve Gowda then PM of United Front government.", icon: "⚖️" },
  { year: "2004", event: "Full EVM Deployment", detail: "All 543 Lok Sabha constituencies used EVMs for the first time. Congress-led UPA won unexpectedly, ending Vajpayee's NDA government.", icon: "🖥️" },
  { year: "2013", event: "NOTA & VVPAT Introduced", detail: "Supreme Court mandated NOTA option. VVPAT pilot in Nagaland election provided paper trail for EVM verification.", icon: "🖨️" },
  { year: "2014", event: "Social Media Election", detail: "India's first election significantly influenced by social media. BJP won landslide majority with 282 seats under Narendra Modi.", icon: "📱" },
  { year: "2019", event: "VVPAT Nationwide & Record Turnout", detail: "VVPAT used in all 543 constituencies for the first time. 67.4% turnout — highest ever in Lok Sabha elections. BJP won 303 seats.", icon: "📊" },
  { year: "2024", event: "18th General Election", detail: "World's largest election with 969 million eligible voters. Voting in 7 phases over 44 days. NDA won majority, BJP won 240 seats.", icon: "🗳️" }
];

// ─── GLOSSARY DATA ─────────────────────────────────────────────────────────────
const glossaryData = [
  { term: "Affidavit", definition: "A sworn statement filed by a candidate disclosing criminal antecedents, assets, liabilities, and educational qualifications." },
  { term: "By-Election", definition: "An election held to fill a vacancy in a constituency between general elections. Also called Upchunav." },
  { term: "Caretaker Government", definition: "A government that continues in office after elections are announced or after losing confidence, until a new government is formed." },
  { term: "Constituency", definition: "A geographic area whose registered voters elect a representative to a legislative body." },
  { term: "Defection", definition: "When an elected legislator switches from one political party to another. Regulated by the Anti-Defection Law (10th Schedule)." },
  { term: "Electoral Roll / Voter List", definition: "The official list of registered voters in each constituency, updated periodically by the Electoral Registration Officer." },
  { term: "Floor Test", definition: "A vote held in the legislature to determine whether the government has the confidence of the majority." },
  { term: "Governor", definition: "The constitutional head of a State, appointed by the President. Invites the leader of the largest party/coalition to form the state government." },
  { term: "Hung Parliament", definition: "A situation where no single party wins an outright majority of seats." },
  { term: "Ink Marking", definition: "Indelible ink (using silver nitrate) applied to a voter's index finger after voting to prevent double voting." },
  { term: "Joint Session", definition: "A meeting of both houses of Parliament (Lok Sabha and Rajya Sabha) presided over by the Speaker of Lok Sabha, called to resolve deadlocks." },
  { term: "Locus Standi", definition: "The right or capacity to bring a legal action (used in election petitions)." },
  { term: "Manifesto", definition: "A formal public declaration of a party's policies, intentions, and proposals issued before an election." },
  { term: "Minority Government", definition: "A government formed by a party or coalition with fewer seats than required for a majority." },
  { term: "Nomination", definition: "The formal process by which a candidate submits documents to contest an election." },
  { term: "Observer", definition: "An IAS/IPS officer deputed by ECI to oversee election proceedings in a constituency." },
  { term: "Postal Ballot", definition: "Facility for certain categories of voters (service personnel, overseas, differently-abled) to vote by mail without visiting a booth." },
  { term: "Quorum", definition: "The minimum number of members required to be present for Parliament to conduct business — 1/10th of total membership." },
  { term: "Rajya Sabha", definition: "Council of States — the upper house of India's Parliament. A permanent body that is never dissolved." },
  { term: "Security Deposit", definition: "Money deposited by a candidate when filing nomination (₹25,000 for Lok Sabha). Forfeited if they fail to get 1/6th of votes polled." },
  { term: "Tenth Schedule", definition: "Constitutional provisions related to disqualification of members on grounds of defection (Anti-Defection Law)." },
  { term: "Upchunav", definition: "Hindi term for By-Election — election held to fill a vacancy in a constituency." },
  { term: "Vote on Account", definition: "A special provision allowing the government to draw money from the Consolidated Fund for a few months during election year before full budget is passed." },
  { term: "Whip", definition: "An official of a political party in a legislature whose job is to ensure party members vote as directed. Also refers to the directive itself." },
  { term: "Zero Hour", definition: "A parliamentary procedure where members can raise matters without prior notice immediately after question hour (12:00 noon)." }
];
