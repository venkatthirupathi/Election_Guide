// ─── CHAT KNOWLEDGE BASE ─────────────────────────────────────────────────────
// Each entry: keywords[], response (HTML string), followups[]

const chatKB = [

  // ── GREETINGS ──────────────────────────────────────────────────────────────
  {
    id: "greet",
    keywords: ["hi", "hello", "hey", "namaste", "hii", "helo", "start", "help"],
    response: `👋 <strong>Namaste! Welcome to the India Election Guide chatbot.</strong><br><br>
I can help you understand <strong>every step of the Indian election process</strong>. Ask me anything about:<br><br>
• 🗳️ How elections are conducted<br>
• ⚖️ Role of Election Commission<br>
• 📋 Nomination & candidate process<br>
• 🖥️ EVMs and voting technology<br>
• 🏛️ Types of elections<br>
• 👤 Voter registration & rights<br>
• 📅 Election timeline & schedule<br><br>
Or pick a topic below to get started! ⬇️`,
    followups: ["How does the election process work?", "What is ECI?", "How do I register to vote?", "What is an EVM?"]
  },

  // ── COMPLETE PROCESS ───────────────────────────────────────────────────────
  {
    id: "full_process",
    keywords: ["complete process", "full process", "entire process", "election process", "how election works", "how elections work", "step by step", "steps of election", "election steps"],
    response: `📋 <strong>Complete Indian Election Process — Step by Step</strong><br><br>

<div class="chat-steps">

<div class="chat-step">
  <span class="step-num">1</span>
  <div><strong>🔔 Election Announcement</strong><br>
  ECI announces election dates. The <em>Model Code of Conduct (MCC)</em> comes into force immediately. Government cannot announce new schemes or use official machinery for campaigning.</div>
</div>

<div class="chat-step">
  <span class="step-num">2</span>
  <div><strong>📝 Filing of Nominations</strong><br>
  Candidates file nomination papers with the Returning Officer. Must submit Form 2B + affidavit of assets/criminal records + security deposit (₹25,000 for Lok Sabha / ₹12,500 for SC/ST).</div>
</div>

<div class="chat-step">
  <span class="step-num">3</span>
  <div><strong>🔍 Scrutiny of Nominations</strong><br>
  Returning Officer examines nominations for validity. Candidates can raise objections. Invalid nominations are rejected.</div>
</div>

<div class="chat-step">
  <span class="step-num">4</span>
  <div><strong>↩️ Withdrawal of Nominations</strong><br>
  Candidates can withdraw within 2 days of scrutiny. Final ballot list is prepared. Election symbols are allotted to candidates.</div>
</div>

<div class="chat-step">
  <span class="step-num">5</span>
  <div><strong>📣 Election Campaign</strong><br>
  Parties and candidates campaign across constituencies. Spending limit: ₹95 lakh per candidate (Lok Sabha). Campaign must stop 48 hours before polling (Silence Period).</div>
</div>

<div class="chat-step">
  <span class="step-num">6</span>
  <div><strong>🗳️ Polling Day</strong><br>
  Voters visit their assigned booth (7 AM – 6 PM). Verify identity → ink on finger → press EVM button → VVPAT slip appears for 7 seconds. One vote cast!</div>
</div>

<div class="chat-step">
  <span class="step-num">7</span>
  <div><strong>🔢 Counting of Votes</strong><br>
  EVMs are brought to counting centres. Postal ballots counted first. EVM results announced round by round. Winner declared by Returning Officer.</div>
</div>

<div class="chat-step">
  <span class="step-num">8</span>
  <div><strong>🏛️ Government Formation</strong><br>
  Party/coalition with 272+ seats invited by President to form government. PM sworn in and Cabinet constituted.</div>
</div>

</div>`,
    followups: ["Tell me more about nomination", "What happens on polling day?", "How is vote counting done?", "What is Model Code of Conduct?"]
  },

  // ── ECI ────────────────────────────────────────────────────────────────────
  {
    id: "eci",
    keywords: ["eci", "election commission", "chief election commissioner", "cec", "who conducts", "who runs election"],
    response: `⚖️ <strong>Election Commission of India (ECI)</strong><br><br>
The ECI is an <strong>autonomous constitutional authority</strong> established under <strong>Article 324</strong> of the Indian Constitution.<br><br>
<strong>Structure:</strong><br>
• Chief Election Commissioner (CEC) — head of ECI<br>
• 2 Election Commissioners<br>
• All appointed by the <strong>President of India</strong><br>
• CEC can only be removed like a Supreme Court judge (impeachment process)<br><br>
<strong>Key Powers:</strong><br>
• 📅 Schedules and announces elections<br>
• 🚦 Enforces Model Code of Conduct<br>
• 🏳️ Registers political parties & assigns symbols<br>
• 💰 Sets spending limits for candidates<br>
• 🪖 Deploys central security forces<br>
• ❌ Can cancel/postpone polls in violence-affected areas<br><br>
<em>Fun fact: The ECI was established on January 25, 1950 — one day before India became a Republic! 🇮🇳</em>`,
    followups: ["What is Model Code of Conduct?", "How are election dates decided?", "What is the role of Returning Officer?"]
  },

  // ── NOMINATION ─────────────────────────────────────────────────────────────
  {
    id: "nomination",
    keywords: ["nomination", "nominate", "candidate", "file nomination", "how to contest", "run for election", "security deposit"],
    response: `📝 <strong>Nomination Process — How to Contest an Election</strong><br><br>
<strong>Who can be a candidate?</strong><br>
• Indian citizen, minimum age <strong>25 years</strong> (Lok Sabha) / <strong>30 years</strong> (Rajya Sabha)<br>
• Must be on voter roll of any constituency<br>
• Not disqualified under any law<br><br>
<strong>Documents Required:</strong><br>
• <strong>Form 2B</strong> — nomination paper<br>
• <strong>Affidavit</strong> — criminal antecedents, assets & liabilities, education<br>
• <strong>Security Deposit</strong> — ₹25,000 (Lok Sabha), ₹12,500 for SC/ST candidates<br>
• Proposers' signatures (1 proposer for national party, 10 for others)<br><br>
<strong>Security Deposit Forfeiture:</strong><br>
If a candidate fails to get <strong>⅙th (16.67%) of total votes polled</strong>, the deposit is forfeited to the government.<br><br>
<strong>Affidavit Disclosure (mandatory since 2003):</strong><br>
• Pending criminal cases<br>
• Convictions<br>
• Assets of self, spouse & dependents<br>
• Educational qualifications`,
    followups: ["What is scrutiny of nominations?", "Can a criminal contest elections?", "What is the withdrawal process?"]
  },

  // ── POLLING DAY ────────────────────────────────────────────────────────────
  {
    id: "polling",
    keywords: ["polling day", "voting day", "how to vote", "booth", "polling booth", "vote cast", "polling station", "what happens polling"],
    response: `🗳️ <strong>What Happens on Polling Day?</strong><br><br>
<strong>Before You Vote:</strong><br>
• Find your booth at <a href="#" style="color:#6366f1">voters.eci.gov.in</a> or call <strong>1950</strong><br>
• Carry valid ID — Voter ID (EPIC), Aadhaar, Passport, Driving License, etc.<br>
• Polling hours: <strong>7:00 AM to 6:00 PM</strong> (may vary)<br><br>
<strong>At the Polling Booth:</strong><br>

<div class="chat-steps">
<div class="chat-step"><span class="step-num">1</span><div>Enter the booth, present ID to Polling Officer</div></div>
<div class="chat-step"><span class="step-num">2</span><div>Name is verified on the Electoral Roll</div></div>
<div class="chat-step"><span class="step-num">3</span><div><strong>Indelible ink</strong> is applied to your left index finger (prevents double voting)</div></div>
<div class="chat-step"><span class="step-num">4</span><div>Voter slip is issued — proceed to the Balloting Unit</div></div>
<div class="chat-step"><span class="step-num">5</span><div>Press the button next to your chosen candidate on the <strong>EVM</strong></div></div>
<div class="chat-step"><span class="step-num">6</span><div>A <strong>VVPAT slip</strong> appears for 7 seconds — verify your vote</div></div>
<div class="chat-step"><span class="step-num">7</span><div>You're done! 🎉 Exit the booth</div></div>
</div>

<br><strong>NOTA:</strong> If you don't want to vote for anyone, press the <strong>NOTA</strong> button (last option on EVM).`,
    followups: ["What is VVPAT?", "What is NOTA?", "What is indelible ink?", "What is a postal ballot?"]
  },

  // ── EVM ────────────────────────────────────────────────────────────────────
  {
    id: "evm",
    keywords: ["evm", "electronic voting machine", "voting machine", "how evm works", "evm security", "evm tamper"],
    response: `🖥️ <strong>Electronic Voting Machine (EVM)</strong><br><br>
<strong>Components:</strong><br>
• <strong>Control Unit</strong> — with the Presiding Officer; controls the ballot<br>
• <strong>Balloting Unit</strong> — with the voter; has candidate buttons<br>
• Connected by a 5-metre cable<br><br>
<strong>How it Works:</strong><br>
1. Presiding Officer enables the ballot on Control Unit<br>
2. Voter presses the button for their candidate<br>
3. A <em>beep</em> confirms the vote is recorded<br>
4. Control Unit locks until next voter is enabled<br><br>
<strong>Security Features:</strong><br>
• 🔌 <strong>Standalone</strong> — NOT connected to internet or any network<br>
• 🔒 <strong>One-time programmable</strong> microcontroller — cannot be reprogrammed<br>
• 🛡️ Tamper-detection mechanism triggers if opened<br>
• 📦 Sealed with numbered seals after voting<br>
• 📹 Stored in strong rooms with 24/7 CCTV<br><br>
<strong>Capacity:</strong> Up to <strong>64 candidates</strong> and <strong>3,840 votes</strong> per unit<br><br>
<em>India became the first country to use EVMs nationwide (2004). 🇮🇳</em>`,
    followups: ["What is VVPAT?", "When were EVMs introduced?", "What is NOTA?"]
  },

  // ── VVPAT ──────────────────────────────────────────────────────────────────
  {
    id: "vvpat",
    keywords: ["vvpat", "paper trail", "paper slip", "verify vote", "audit trail"],
    response: `🖨️ <strong>VVPAT — Voter Verified Paper Audit Trail</strong><br><br>
VVPAT is a device attached to each EVM that provides a <strong>physical paper record</strong> of each vote cast.<br><br>
<strong>How it Works:</strong><br>
1. When a voter presses the EVM button, VVPAT prints a slip<br>
2. The slip shows: <strong>Party name + Symbol + Candidate name</strong><br>
3. The slip is visible through a <strong>glass window for 7 seconds</strong><br>
4. Then it automatically falls into a sealed, tamper-proof box<br><br>
<strong>Purpose:</strong><br>
• Allows voters to independently verify their vote<br>
• Provides a paper audit trail for disputes<br>
• Builds public confidence in EVMs<br><br>
<strong>Timeline:</strong><br>
• <strong>2013</strong> — First pilot in Nagaland state election<br>
• <strong>2014</strong> — Used in select constituencies<br>
• <strong>2019</strong> — Used in ALL 543 Lok Sabha constituencies for the first time<br><br>
<strong>VVPAT Count:</strong> Supreme Court (2019) ordered VVPAT slips from 5 random EVMs per constituency to be counted and matched with EVM results.`,
    followups: ["How does EVM work?", "What is NOTA?", "How is vote counting done?"]
  },

  // ── NOTA ───────────────────────────────────────────────────────────────────
  {
    id: "nota",
    keywords: ["nota", "none of the above", "reject candidate", "none above"],
    response: `✗ <strong>NOTA — None Of The Above</strong><br><br>
NOTA allows voters to <strong>formally reject all candidates</strong> on the ballot without staying home.<br><br>
<strong>How to use NOTA:</strong><br>
It's the <em>last option</em> on the EVM ballot, marked with a ballot paper and cross symbol.<br><br>
<strong>Key Facts:</strong><br>
• Introduced in <strong>2013</strong> after Supreme Court order in <em>PUCL vs Union of India</em><br>
• Available in <strong>all elections</strong> — Lok Sabha, State, Rajya Sabha<br>
• NOTA votes are <strong>counted and announced</strong> in results<br>
• A candidate can <strong>still win even if NOTA gets the most votes</strong> (NOTA doesn't cancel the election)<br>
• Exception: some State election commissions have rules where if NOTA > all candidates, re-election is held<br><br>
<strong>Why it Matters:</strong><br>
NOTA empowers voters to send a message of disapproval without abstaining. It promotes accountability among political parties in selecting candidates.`,
    followups: ["What happens on polling day?", "What is indelible ink?", "What is postal ballot?"]
  },

  // ── MODEL CODE OF CONDUCT ──────────────────────────────────────────────────
  {
    id: "mcc",
    keywords: ["model code", "mcc", "code of conduct", "election code", "adarsh achaar sanhita"],
    response: `📋 <strong>Model Code of Conduct (MCC)</strong><br><br>
The MCC is a set of <strong>guidelines issued by ECI</strong> for political parties and candidates once elections are announced.<br><br>
<strong>When does it apply?</strong><br>
From the <strong>date of election announcement</strong> until the <strong>counting of votes</strong>.<br><br>
<strong>What it Prohibits:</strong><br>
• 🏗️ Government cannot announce new schemes, projects or appointments<br>
• 💰 No distribution of gifts, cash or liquor to voters<br>
• 🕌 No use of religious places for campaigning<br>
• 🚗 No use of government vehicles for campaigns<br>
• 📢 No hate speech or personal attacks targeting religion/caste<br>
• 📸 No party material at polling stations<br><br>
<strong>Important:</strong><br>
• MCC is <strong>NOT a law</strong> — it's a moral/voluntary code<br>
• However, ECI can take action including <em>censure, reprimand</em>, and recommending FIR<br>
• Has been highly effective since the 1960s<br><br>
<em>The MCC was first introduced in 1960 during Kerala Assembly elections. 📜</em>`,
    followups: ["What is the election announcement process?", "What is election campaign spending limit?", "What is silence period?"]
  },

  // ── CAMPAIGN & SPENDING ────────────────────────────────────────────────────
  {
    id: "campaign",
    keywords: ["campaign", "campaigning", "spending limit", "election expenses", "silence period", "48 hours", "campaign rules"],
    response: `📣 <strong>Election Campaigning Rules</strong><br><br>
<strong>Campaign Period:</strong><br>
From withdrawal of nominations until <strong>48 hours before polling</strong> (Silence Period begins).<br><br>
<strong>Spending Limits (ECI, 2022 revision):</strong><br>
• <strong>Lok Sabha</strong>: ₹95 lakh per candidate (large states) / ₹75 lakh (small states/UTs)<br>
• <strong>State Assembly</strong>: ₹40 lakh per candidate (large states) / ₹28 lakh (small states)<br><br>
<strong>Allowed Campaign Activities:</strong><br>
• Public rallies and meetings<br>
• Door-to-door canvassing<br>
• Advertisements in media<br>
• Social media campaigns<br><br>
<strong>Prohibited Activities:</strong><br>
• ❌ Paid news (paying for positive coverage)<br>
• ❌ Distributing cash/gifts<br>
• ❌ Campaigning within 100 metres of polling booth<br>
• ❌ Exit polls until last phase polling ends<br><br>
<strong>Silence Period:</strong><br>
No campaigning allowed for <strong>48 hours</strong> before polling ends in a constituency. Violation is a criminal offense.`,
    followups: ["What is Model Code of Conduct?", "What is exit poll?", "What are election expenses?"]
  },

  // ── VOTER REGISTRATION ─────────────────────────────────────────────────────
  {
    id: "voter_reg",
    keywords: ["register voter", "voter registration", "how to register", "voter id", "epic", "electoral roll", "vote register", "enroll voter"],
    response: `🪪 <strong>Voter Registration in India</strong><br><br>
<strong>Eligibility:</strong><br>
• Indian citizen aged <strong>18 or above</strong> as on January 1 of the qualifying year<br>
• Ordinary resident of the constituency<br>
• Not disqualified under any law<br><br>
<strong>How to Register (Online):</strong><br>

<div class="chat-steps">
<div class="chat-step"><span class="step-num">1</span><div>Visit <strong>voters.eci.gov.in</strong> or use <strong>Voter Helpline App</strong></div></div>
<div class="chat-step"><span class="step-num">2</span><div>Click "Register as New Voter" → Fill <strong>Form 6</strong></div></div>
<div class="chat-step"><span class="step-num">3</span><div>Upload proof of age and address</div></div>
<div class="chat-step"><span class="step-num">4</span><div>Submit — you'll get an Application Reference Number</div></div>
<div class="chat-step"><span class="step-num">5</span><div>BLO (Booth Level Officer) verifies your details</div></div>
<div class="chat-step"><span class="step-num">6</span><div>EPIC (Voter ID Card) dispatched to your address</div></div>
</div>

<br><strong>Accepted ID at Polling Booth:</strong><br>
EPIC, Aadhaar, Passport, Driving License, PAN Card, MNREGA Job Card, Pension document, Service ID with photo (12 options total).<br><br>
<strong>Helpline:</strong> <strong>1950</strong> (toll-free national voter helpline)`,
    followups: ["What documents do I need to vote?", "What is a BLO?", "What is the voter list?"]
  },

  // ── COUNTING ───────────────────────────────────────────────────────────────
  {
    id: "counting",
    keywords: ["counting", "count votes", "vote counting", "how votes counted", "result", "declare result", "election result"],
    response: `🔢 <strong>Vote Counting Process</strong><br><br>
<strong>Before Counting:</strong><br>
• All EVMs are stored in sealed strong rooms with multi-party guards<br>
• Candidates/agents can request re-check of strong room seals<br>
• Counting begins usually <strong>2-3 days after polling</strong><br><br>
<strong>Counting Day Sequence:</strong><br>

<div class="chat-steps">
<div class="chat-step"><span class="step-num">1</span><div><strong>Postal Ballots counted first</strong> — service voters, overseas, specially-abled</div></div>
<div class="chat-step"><span class="step-num">2</span><div>EVMs are brought from strong rooms to counting tables</div></div>
<div class="chat-step"><span class="step-num">3</span><div>Candidates/agents verify EVM seals and serial numbers</div></div>
<div class="chat-step"><span class="step-num">4</span><div>Control Unit is switched to <strong>Result mode</strong> — votes displayed round by round</div></div>
<div class="chat-step"><span class="step-num">5</span><div>Results are tabulated constituency-wise on Form 20</div></div>
<div class="chat-step"><span class="step-num">6</span><div>Winning candidate declared — <strong>Result Certificate (Form 21C)</strong> issued</div></div>
</div>

<br><strong>Winning Criterion:</strong> <em>First-Past-the-Post</em> — candidate with the <strong>most votes wins</strong>, no minimum % required.<br><br>
<strong>Tie:</strong> If two candidates have equal votes, the winner is decided by a <strong>draw of lots (coin toss)</strong>!`,
    followups: ["What is First-Past-the-Post?", "What is a hung parliament?", "What is an election petition?"]
  },

  // ── GOVERNMENT FORMATION ───────────────────────────────────────────────────
  {
    id: "govt_formation",
    keywords: ["government formation", "form government", "prime minister", "who becomes pm", "hung parliament", "coalition", "majority", "272 seats"],
    response: `🏛️ <strong>Government Formation After Elections</strong><br><br>
<strong>Simple Majority Rule:</strong><br>
In Lok Sabha (543 seats), a party needs <strong>272+ seats</strong> for a simple majority.<br><br>
<strong>Scenario 1 — Clear Majority:</strong><br>
• President invites leader of majority party<br>
• PM is sworn in, then forms Cabinet<br>
• Cabinet sworn in by President at Rashtrapati Bhavan<br><br>
<strong>Scenario 2 — Hung Parliament (No majority):</strong><br>

<div class="chat-steps">
<div class="chat-step"><span class="step-num">1</span><div>President invites the <strong>single largest party</strong> to form government</div></div>
<div class="chat-step"><span class="step-num">2</span><div>Party seeks support through <strong>coalition negotiations</strong></div></div>
<div class="chat-step"><span class="step-num">3</span><div>If majority is secured, PM is sworn in</div></div>
<div class="chat-step"><span class="step-num">4</span><div>New PM must prove majority on floor of Lok Sabha within <strong>30 days</strong> (Floor Test)</div></div>
<div class="chat-step"><span class="step-num">5</span><div>If no coalition possible → <strong>President's Rule</strong> or fresh elections</div></div>
</div>

<br><strong>India's Coalition Governments:</strong><br>
• 1977 — Janata Party (first non-Congress government)<br>
• 1989, 1996, 1998, 1999 — Coalition governments<br>
• 2004–2014 — UPA (Congress-led coalition)<br>
• 2014–present — NDA (BJP-led, with majority)`,
    followups: ["What is a floor test?", "What is President's Rule?", "What is No-Confidence Motion?"]
  },

  // ── TYPES OF ELECTIONS ─────────────────────────────────────────────────────
  {
    id: "election_types",
    keywords: ["types of election", "lok sabha election", "rajya sabha election", "state election", "assembly election", "vidhan sabha", "by election", "bypoll", "upchunav", "presidential election"],
    response: `🗳️ <strong>Types of Elections in India</strong><br><br>
<table class="chat-table">
<tr><th>Election</th><th>Body</th><th>Frequency</th><th>Method</th></tr>
<tr><td>🏛️ Lok Sabha</td><td>Lower House (Parliament)</td><td>Every 5 years</td><td>Direct (FPTP)</td></tr>
<tr><td>🏛️ Rajya Sabha</td><td>Upper House (Parliament)</td><td>Biennial (⅓ retire)</td><td>Indirect (STV)</td></tr>
<tr><td>🏛️ Vidhan Sabha</td><td>State Assembly</td><td>Every 5 years</td><td>Direct (FPTP)</td></tr>
<tr><td>👤 President</td><td>Constitutional Head</td><td>Every 5 years</td><td>Electoral College (STV)</td></tr>
<tr><td>👤 Vice President</td><td>Rajya Sabha Chairman</td><td>Every 5 years</td><td>Electoral College</td></tr>
<tr><td>🏘️ Local Bodies</td><td>Panchayat/Municipality</td><td>Every 5 years</td><td>Direct (FPTP)</td></tr>
<tr><td>↩️ By-Election</td><td>Vacant seat</td><td>Within 6 months of vacancy</td><td>Same as original</td></tr>
</table>
<br>
<strong>FPTP</strong> = First Past The Post &nbsp;|&nbsp; <strong>STV</strong> = Single Transferable Vote`,
    followups: ["How is Rajya Sabha elected?", "What is First-Past-the-Post?", "What is a by-election?"]
  },

  // ── POLITICAL PARTIES ──────────────────────────────────────────────────────
  {
    id: "parties",
    keywords: ["political party", "parties india", "bjp", "congress", "inc", "national party", "regional party", "party symbol", "party recognition"],
    response: `🏳️ <strong>Political Parties of India</strong><br><br>
<strong>How a Party Gets "National Party" Status:</strong><br>
ECI recognises a party as National if it:<br>
• Gets 6% votes in 4+ states AND wins 4 Lok Sabha seats, OR<br>
• Wins 2% of Lok Sabha seats (11 seats) from 3+ states<br><br>
<strong>Current National Parties (2024):</strong><br>
<table class="chat-table">
<tr><th>Party</th><th>Founded</th><th>Symbol</th><th>Alliance</th></tr>
<tr><td>BJP</td><td>1980</td><td>🪷 Lotus</td><td>NDA</td></tr>
<tr><td>INC (Congress)</td><td>1885</td><td>✋ Hand</td><td>INDIA</td></tr>
<tr><td>AAP</td><td>2012</td><td>🧹 Broom</td><td>INDIA</td></tr>
<tr><td>BSP</td><td>1984</td><td>🐘 Elephant</td><td>None</td></tr>
<tr><td>CPI(M)</td><td>1964</td><td>⚒️ Hammer-Sickle</td><td>INDIA</td></tr>
<tr><td>NCP (SP)</td><td>1999</td><td>🕰️ Clock</td><td>INDIA</td></tr>
<tr><td>TMC</td><td>1998</td><td>🌸 Flowers & Grass</td><td>INDIA</td></tr>
</table>`,
    followups: ["What is NDA?", "What is INDIA alliance?", "How are election symbols assigned?"]
  },

  // ── RESERVATION ────────────────────────────────────────────────────────────
  {
    id: "reservation",
    keywords: ["reservation", "reserved seat", "sc st seats", "scheduled caste", "scheduled tribe", "reserved constituency"],
    response: `🛡️ <strong>Reserved Constituencies in India</strong><br><br>
India reserves certain parliamentary and assembly seats for historically marginalized communities.<br><br>
<strong>Lok Sabha Reserved Seats:</strong><br>
• <strong>84 seats for Scheduled Castes (SC)</strong><br>
• <strong>47 seats for Scheduled Tribes (ST)</strong><br>
• Total: 131 out of 543 seats (24%)<br><br>
<strong>How it Works:</strong><br>
• In a reserved constituency, <em>only candidates from SC/ST can contest</em><br>
• However, <em>all voters</em> in that constituency vote (not just SC/ST voters)<br>
• This ensures representation without segregation<br><br>
<strong>Constitutional Basis:</strong><br>
• Articles <strong>330 and 332</strong> provide for reservation<br>
• Originally for 10 years (extended by amendments)<br>
• Extended till <strong>2030</strong> by the 104th Constitutional Amendment<br><br>
<strong>Women's Reservation:</strong><br>
The <strong>Nari Shakti Vandan Adhiniyam (2023)</strong> reserves 33% of Lok Sabha and state assembly seats for women — to be implemented after delimitation (post-2026 census).`,
    followups: ["What is delimitation?", "When is next delimitation?", "What is OBC reservation?"]
  },

  // ── ELECTION PHASES ────────────────────────────────────────────────────────
  {
    id: "phases",
    keywords: ["phases", "election phase", "multi phase", "phased election", "why phases", "how many phases"],
    response: `📅 <strong>Why Are Indian Elections Held in Multiple Phases?</strong><br><br>
India conducts elections in <strong>multiple phases</strong> spread over weeks/months due to:<br><br>
<strong>Reasons for Multiple Phases:</strong><br>
• 🪖 <strong>Security</strong> — Central forces need to move between states/constituencies<br>
• 👮 <strong>Administration</strong> — Same polling officials can be deployed across phases<br>
• 🌾 <strong>Seasonal factors</strong> — Avoid harvest seasons, extreme weather<br>
• 🗺️ <strong>Geography</strong> — Remote areas, hills, forests need advance preparation<br><br>
<strong>Recent General Elections:</strong><br>
<table class="chat-table">
<tr><th>Year</th><th>Phases</th><th>Days</th><th>Winner</th></tr>
<tr><td>2014</td><td>9 phases</td><td>36 days</td><td>BJP (282 seats)</td></tr>
<tr><td>2019</td><td>7 phases</td><td>39 days</td><td>BJP (303 seats)</td></tr>
<tr><td>2024</td><td>7 phases</td><td>44 days</td><td>NDA majority</td></tr>
</table>
<br>
<em>The first general election (1951-52) was conducted over 4 months in 68 phases!</em>`,
    followups: ["What is the complete election process?", "What is One Nation One Election?", "How many Lok Sabha seats are there?"]
  },

  // ── ELECTION PETITION ─────────────────────────────────────────────────────
  {
    id: "petition",
    keywords: ["election petition", "challenge result", "dispute election", "corrupt practice", "contest result", "election court"],
    response: `⚖️ <strong>Election Petitions — Challenging Election Results</strong><br><br>
If a candidate or voter believes an election was conducted unfairly, they can file an <strong>Election Petition</strong>.<br><br>
<strong>Where to File:</strong><br>
• Lok Sabha/Rajya Sabha results → <strong>High Court</strong><br>
• Presidential election → <strong>Supreme Court</strong><br><br>
<strong>Who Can File:</strong><br>
• Any candidate who contested in that election<br>
• Any registered voter of that constituency<br><br>
<strong>Time Limit:</strong> Must be filed within <strong>45 days</strong> of result declaration.<br><br>
<strong>Grounds for Petition:</strong><br>
• Corrupt practices (bribing voters, booth capturing)<br>
• Non-compliance with election laws<br>
• Candidate's disqualification<br>
• False affidavit/wrong information<br><br>
<strong>Outcome:</strong><br>
Court can declare the election <strong>void</strong> or declare a different candidate as winner. A by-election may follow.`,
    followups: ["What is corrupt practice?", "What is booth capturing?", "What is disqualification?"]
  },

  // ── ONE NATION ONE ELECTION ────────────────────────────────────────────────
  {
    id: "one_nation",
    keywords: ["one nation one election", "simultaneous election", "onoe"],
    response: `🗓️ <strong>One Nation, One Election (ONOE)</strong><br><br>
ONOE proposes holding <strong>Lok Sabha and all State Assembly elections simultaneously</strong> instead of the current staggered schedule.<br><br>
<strong>Current Situation:</strong><br>
India holds elections almost every year since different states have different 5-year cycles, keeping the MCC active for extended periods.<br><br>
<strong>Arguments For ONOE:</strong><br>
• 💰 Reduces election expenditure significantly<br>
• 🏗️ Government work not disrupted by frequent MCC<br>
• 👮 Less deployment of security forces<br>
• 📊 Reduces policy paralysis during election seasons<br><br>
<strong>Arguments Against ONOE:</strong><br>
• 📜 Requires multiple Constitutional amendments<br>
• 🗳️ State issues may get overshadowed by national issues<br>
• 🏛️ What if a state government falls mid-term?<br>
• Undermines federal structure<br><br>
<strong>Status:</strong> The <em>Ram Nath Kovind Committee</em> submitted its report in 2024 recommending simultaneous elections in a phased manner. Yet to be implemented.`,
    followups: ["What is Model Code of Conduct?", "What is federal structure?", "What is the election schedule?"]
  },

  // ── ANTI DEFECTION ────────────────────────────────────────────────────────
  {
    id: "defection",
    keywords: ["defection", "anti defection", "party switching", "floor crossing", "10th schedule", "disqualification member"],
    response: `⛔ <strong>Anti-Defection Law (10th Schedule)</strong><br><br>
The Anti-Defection Law was added as the <strong>10th Schedule</strong> to the Constitution by the <strong>52nd Amendment (1985)</strong> under PM Rajiv Gandhi.<br><br>
<strong>What is Defection?</strong><br>
When an elected legislator:<br>
• Voluntarily gives up party membership<br>
• Votes against the party's direction in the house<br>
• Abstains from voting against party's direction<br><br>
<strong>Consequence:</strong> Disqualified from membership of the house!<br><br>
<strong>Exceptions (Mergers):</strong><br>
If <strong>⅔ of the party's members</strong> in the house agree to merge with another party, it is NOT considered defection.<br><br>
<strong>Who Decides?</strong><br>
The <strong>Speaker</strong> (Lok Sabha) or <strong>Chairman</strong> (Rajya Sabha) decides on disqualification petitions.<br><br>
<strong>Criticism:</strong><br>
• Speaker may be partisan<br>
• Delays in deciding petitions (some pending for years)<br>
• Supreme Court has asked for time limits to be set`,
    followups: ["What is the role of Speaker?", "What is a floor test?", "What is coalition government?"]
  },

  // ── ECI POWERS ────────────────────────────────────────────────────────────
  {
    id: "eci_powers",
    keywords: ["eci power", "election commission power", "postpone election", "cancel election", "repoll", "countermand"],
    response: `⚡ <strong>Special Powers of Election Commission of India</strong><br><br>
ECI has wide-ranging powers to ensure free and fair elections:<br><br>
<strong>Election Management Powers:</strong><br>
• 📅 Set election schedule and revise if needed<br>
• ❌ Cancel/postpone polls in violence-affected areas (<em>countermanding</em>)<br>
• 🔄 Order <strong>repoll</strong> in booths where irregularities occurred<br>
• 🪖 Demand central security forces from the government<br>
• 🔃 Transfer police/civil officials who may influence elections<br><br>
<strong>Political Party Powers:</strong><br>
• Register and de-register political parties<br>
• Assign and freeze election symbols<br>
• Issue notice/reprimand to parties violating MCC<br>
• Recommend disqualification of candidates for false affidavits<br><br>
<strong>Advisory/Quasi-Judicial Powers:</strong><br>
• Advise President/Governor on disqualification of MPs/MLAs<br>
• Settle disputes over party name/symbol (split parties)<br><br>
<em>The ECI once transferred 500+ officials in a single state before elections to ensure neutrality!</em>`,
    followups: ["What is Model Code of Conduct?", "What is a repoll?", "What is countermanding?"]
  },

  // ── FALLBACK ───────────────────────────────────────────────────────────────
  {
    id: "fallback",
    keywords: [],
    response: `🤔 I'm not sure about that specific topic. Here are things I can help you with:<br><br>
• 📋 <strong>Complete Election Process</strong> — step by step<br>
• ⚖️ <strong>Election Commission of India</strong><br>
• 🗳️ <strong>Types of Elections</strong><br>
• 📝 <strong>Nomination Process</strong><br>
• 🖥️ <strong>EVM & VVPAT</strong><br>
• 🗳️ <strong>Polling Day Process</strong><br>
• 🔢 <strong>Vote Counting</strong><br>
• 🏛️ <strong>Government Formation</strong><br>
• 📣 <strong>Campaign Rules</strong><br>
• 🪪 <strong>Voter Registration</strong><br><br>
Try typing one of these topics, or ask a more specific question!`,
    followups: ["How does the election process work?", "What is ECI?", "What is EVM?", "How do I register to vote?"]
  }
];

// ─── QUICK REPLIES ────────────────────────────────────────────────────────────
const quickReplies = [
  "How does the election process work?",
  "What is ECI?",
  "What is EVM?",
  "How do I register to vote?",
  "What is NOTA?",
  "What is VVPAT?",
  "What is Model Code of Conduct?",
  "How is vote counting done?",
  "Types of elections in India",
  "What is Anti-Defection Law?"
];
