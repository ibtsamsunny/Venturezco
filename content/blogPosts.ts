export type BlogPost = {
  slug: string;
  category: string;
  accent: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  heroBg: string;
  heroSvg: string;
  pullQuote: string;
  body: string;
  cardSvg: string;
  cardBg: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "crm-follow-up",
    category: "Automation",
    accent: "#B3A6FF",
    title: "Why your CRM should run your follow-up, not your team",
    excerpt: "Manual follow-up is where most revenue quietly leaks. Here's how to hand it to a system that never forgets.",
    date: "Jun 2026",
    readTime: "6 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(59,47,224,0.32), rgba(59,47,224,0.04) 65%), #0C0D11",
    heroSvg:
      '<polyline points="0,280 145,220 290,238 435,145 580,166 900,64" fill="none" stroke="#9F91FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="435" cy="145" r="6" fill="#fff"/><circle cx="900" cy="64" r="7" fill="#fff"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(59,47,224,0.32), rgba(59,47,224,0.04) 65%), #0C0D11",
    cardSvg:
      '<polyline points="0,132 68,104 136,112 204,68 272,78 340,30" fill="none" stroke="#9F91FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="204" cy="68" r="3" fill="#fff"/><circle cx="340" cy="30" r="3.5" fill="#fff"/>',
    pullQuote: "The lead didn't go cold because your team didn't care. It went cold because no system was watching the clock.",
    body: `<p>Every pipeline has a moment where a warm lead turns cold, and it almost never happens because someone made a bad decision. It happens because nobody was watching. A rep gets pulled into a demo, an inbox fills up, and the follow-up that should have gone out in ten minutes goes out in four days — if it goes out at all.</p>
    <p>That gap is where the majority of enterprise pipeline actually leaks. Not from bad targeting, not from weak messaging, but from response time. And response time is not a people problem. It's a systems problem.</p>
    <h2>What "the CRM runs it" actually means</h2>
    <p>We don't mean adding a reminder task. We mean building a follow-up engine that fires the moment a trigger happens — a form fill, a reply, a pricing page visit — without waiting for a human to notice. The rep still writes the message and makes the call. The system decides when, and makes sure it happens.</p>
    <ul>
      <li>Instant first response on every inbound lead, day or night</li>
      <li>Sequenced nurture that adjusts based on engagement, not a fixed calendar</li>
      <li>Automatic re-engagement when a deal goes quiet for a set number of days</li>
    </ul>
    <h2>The result</h2>
    <p>Clients who put this in place typically see the biggest shift in speed-to-lead, not close rate. The close rate was always there — it just used to arrive on lead number four instead of lead number one.</p>`,
  },
  {
    slug: "funnel-anatomy",
    category: "Lead Gen",
    accent: "#C4B5FD",
    title: "The anatomy of a funnel that actually converts",
    excerpt: "More traffic won't save a leaking funnel. We break down the structure behind pages that turn clicks into calls.",
    date: "May 2026",
    readTime: "5 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(139,92,246,0.32), rgba(139,92,246,0.04) 65%), #0C0B12",
    heroSvg:
      '<polygon points="116,58 784,58 662,164 238,164" fill="rgba(196,181,253,0.35)"/><polygon points="248,184 652,184 561,275 339,275" fill="rgba(196,181,253,0.5)"/><polygon points="349,296 551,296 492,380 408,380" fill="rgba(196,181,253,0.7)"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(139,92,246,0.32), rgba(139,92,246,0.04) 65%), #0C0B12",
    cardSvg:
      '<polygon points="44,28 296,28 250,62 90,62" fill="rgba(196,181,253,0.35)"/><polygon points="94,70 246,70 212,104 128,104" fill="rgba(196,181,253,0.5)"/><polygon points="132,112 208,112 186,144 154,144" fill="rgba(196,181,253,0.7)"/>',
    pullQuote: "More traffic on a broken funnel just means more people watching it fail.",
    body: `<p>Most funnels are diagnosed backwards. Something feels off, so the instinct is to buy more traffic and hope volume covers for structure. It rarely does — it just makes the leak bigger and more expensive.</p>
    <h2>Start at the offer, not the ad</h2>
    <p>A funnel converts when every step answers the objection the previous step created. The ad earns attention. The landing page earns trust. The offer earns a decision. If any one of those is doing someone else's job, the whole thing collapses under its own weight.</p>
    <h2>The three checkpoints we audit first</h2>
    <ul>
      <li>Message match between ad and landing page headline</li>
      <li>Time-to-value on the page — how fast a visitor understands what they get</li>
      <li>Friction in the conversion action itself — form length, page load, next step clarity</li>
    </ul>
    <p>Fix those three and most funnels recover more revenue than any new campaign would generate. Traffic amplifies whatever structure is already there — good or bad.</p>`,
  },
  {
    slug: "systems-beat-tactics",
    category: "Strategy",
    accent: "#A5F3FC",
    title: "Systems beat tactics: how to think about growth",
    excerpt: "Campaigns come and go. The businesses that compound are the ones that build a repeatable engine underneath.",
    date: "May 2026",
    readTime: "7 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(34,211,238,0.3), rgba(34,211,238,0.04) 65%), #0A0F11",
    heroSvg:
      '<g stroke="#22D3EE" stroke-width="2.5" fill="none"><line x1="232" y1="105" x2="450" y2="180"/><line x1="232" y1="255" x2="450" y2="180"/><line x1="450" y1="180" x2="682" y2="180"/></g><g fill="rgba(34,211,238,0.18)" stroke="#22D3EE" stroke-width="2"><circle cx="232" cy="105" r="26"/><circle cx="232" cy="255" r="26"/><circle cx="682" cy="180" r="26"/><circle cx="450" cy="180" r="38"/></g>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(34,211,238,0.3), rgba(34,211,238,0.04) 65%), #0A0F11",
    cardSvg:
      '<g stroke="#22D3EE" stroke-width="2" fill="none"><line x1="88" y1="50" x2="170" y2="86"/><line x1="88" y1="122" x2="170" y2="86"/><line x1="170" y1="86" x2="258" y2="86"/></g><g fill="rgba(34,211,238,0.18)" stroke="#22D3EE" stroke-width="1.5"><circle cx="88" cy="50" r="12"/><circle cx="88" cy="122" r="12"/><circle cx="258" cy="86" r="12"/><circle cx="170" cy="86" r="18"/></g>',
    pullQuote: "A campaign is a bet. A system is compound interest.",
    body: `<p>Every quarter brings a new tactic worth trying — a channel, a format, a growth hack someone saw work for another company. Some of them help. None of them, on their own, build a business that keeps growing when you stop paying attention to it.</p>
    <h2>Tactics are additive. Systems compound.</h2>
    <p>A tactic gives you a result once. A system gives you that result, then uses the data from it to make the next result better, cheaper, or faster. The difference shows up not in month one, but in month twelve — when the system has learned from eleven months of signal and the tactic is still starting from zero.</p>
    <h2>What a growth system actually contains</h2>
    <ul>
      <li>A single source of truth for every lead and its full history</li>
      <li>Defined triggers that move a contact from one stage to the next automatically</li>
      <li>A feedback loop that routes performance data back into targeting and messaging</li>
    </ul>
    <p>None of this rules out trying new channels. It just means every new tactic plugs into an engine that was already compounding — instead of becoming one more disconnected experiment competing for attention.</p>`,
  },
  {
    slug: "ai-lead-qualification",
    category: "AI",
    accent: "#B3A6FF",
    title: "Putting AI agents to work on lead qualification",
    excerpt: "What actually changes when an AI agent handles first response, scoring, and routing before a human ever steps in.",
    date: "Apr 2026",
    readTime: "5 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(59,47,224,0.3), rgba(59,47,224,0.04) 65%), #0C0D11",
    heroSvg:
      '<rect x="318" y="137" width="264" height="180" rx="20" fill="rgba(59,47,224,0.14)" stroke="#9F91FF" stroke-width="2"/><circle cx="397" cy="227" r="13" fill="#B3A6FF"/><circle cx="503" cy="227" r="13" fill="#B3A6FF"/><path d="M296 227h-37M666 227h-37" stroke="#9F91FF" stroke-width="2"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(59,47,224,0.3), rgba(59,47,224,0.04) 65%), #0C0D11",
    cardSvg:
      '<rect x="120" y="52" width="100" height="68" rx="10" fill="rgba(59,47,224,0.14)" stroke="#9F91FF" stroke-width="1.6"/><circle cx="150" cy="86" r="5" fill="#B3A6FF"/><circle cx="190" cy="86" r="5" fill="#B3A6FF"/><path d="M112 86h-14M242 86h-14" stroke="#9F91FF" stroke-width="1.6"/>',
    pullQuote: "The best qualification question isn't in your script. It's the one the agent asks based on what the lead just said.",
    body: `<p>First response used to mean a human, eventually, replying to a form fill. Now it can mean an AI agent that responds in seconds, asks the right qualifying questions in a real conversation, and hands a rep a lead that's already scored and ready — not a name in a spreadsheet.</p>
    <h2>Where the agent actually adds value</h2>
    <p>Not in replacing your sales team's judgment — in removing the delay and inconsistency that sits in front of it. The agent asks the same sharp questions every time, at any hour, and routes based on the answers instead of on who happened to be free.</p>
    <ul>
      <li>Immediate, natural-language first response on every channel</li>
      <li>Dynamic qualification that adapts follow-up questions to prior answers</li>
      <li>Automatic scoring and routing to the right rep, with full context attached</li>
    </ul>
    <h2>What changes for the team</h2>
    <p>Reps stop opening conversations with "so, tell me about your business" and start them already knowing the answer. That single shift changes the tone of the first call — and how fast it closes.</p>`,
  },
  {
    slug: "tool-consolidation",
    category: "Operations",
    accent: "#A5F3FC",
    title: "Replacing 10 tools with one growth platform",
    excerpt: "Tool sprawl is a hidden tax on every team. Here's how consolidating onto one platform pays for itself fast.",
    date: "Apr 2026",
    readTime: "4 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(34,211,238,0.28), rgba(34,211,238,0.04) 65%), #0A0F11",
    heroSvg:
      '<g fill="none" stroke="#22D3EE" stroke-width="2"><rect x="228" y="122" width="122" height="122" rx="16"/><rect x="389" y="122" width="122" height="122" rx="16"/><rect x="550" y="122" width="122" height="122" rx="16"/></g><rect x="318" y="312" width="264" height="90" rx="16" fill="rgba(34,211,238,0.16)" stroke="#22D3EE" stroke-width="2"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(34,211,238,0.28), rgba(34,211,238,0.04) 65%), #0A0F11",
    cardSvg:
      '<g fill="none" stroke="#22D3EE" stroke-width="1.6"><rect x="86" y="58" width="46" height="46" rx="9"/><rect x="147" y="58" width="46" height="46" rx="9"/><rect x="208" y="58" width="46" height="46" rx="9"/></g><rect x="120" y="118" width="100" height="34" rx="9" fill="rgba(34,211,238,0.16)" stroke="#22D3EE" stroke-width="1.6"/>',
    pullQuote: "Tool sprawl doesn't show up on the invoice. It shows up in every handoff that quietly drops a lead.",
    body: `<p>Ten tools rarely means ten times the capability. It usually means ten places data can go stale, ten logins someone forgets to revoke, and ten integrations that break the moment one vendor ships an update.</p>
    <h2>The real cost isn't the subscriptions</h2>
    <p>It's the handoffs. Every time a lead's data moves from the ad platform to the form tool to the CRM to the email tool to the calendar tool, there's a chance something doesn't sync — a tag doesn't pass, a status doesn't update, a follow-up doesn't fire.</p>
    <ul>
      <li>One system of record for every contact, from first click to closed deal</li>
      <li>No sync delay between marketing, sales, and fulfillment data</li>
      <li>A single place to see what's actually working, instead of ten dashboards that disagree</li>
    </ul>
    <p>Consolidating rarely means losing capability. It means the capability you already had stops leaking between the seams.</p>`,
  },
  {
    slug: "compounding-channels",
    category: "Marketing",
    accent: "#C4B5FD",
    title: "Compounding demand: channels that feed each other",
    excerpt: "The strongest growth doesn't come from one channel — it comes from a loop where each one makes the next work harder.",
    date: "Mar 2026",
    readTime: "6 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(139,92,246,0.3), rgba(139,92,246,0.04) 65%), #0C0B12",
    heroSvg:
      '<line x1="80" y1="330" x2="820" y2="330" stroke="rgba(255,255,255,0.12)" stroke-width="2"/><rect x="158" y="228" width="90" height="102" rx="8" fill="rgba(196,181,253,0.45)"/><rect x="316" y="163" width="90" height="167" rx="8" fill="rgba(196,181,253,0.55)"/><rect x="474" y="118" width="90" height="212" rx="8" fill="rgba(196,181,253,0.68)"/><rect x="632" y="73" width="90" height="257" rx="8" fill="rgba(196,181,253,0.82)"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(139,92,246,0.3), rgba(139,92,246,0.04) 65%), #0C0B12",
    cardSvg:
      '<line x1="30" y1="150" x2="310" y2="150" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/><rect x="60" y="104" width="34" height="46" rx="5" fill="rgba(196,181,253,0.45)"/><rect x="120" y="78" width="34" height="72" rx="5" fill="rgba(196,181,253,0.55)"/><rect x="180" y="56" width="34" height="94" rx="5" fill="rgba(196,181,253,0.68)"/><rect x="240" y="34" width="34" height="116" rx="5" fill="rgba(196,181,253,0.82)"/>',
    pullQuote: "One channel gets you a lead. Channels that talk to each other get you a category.",
    body: `<p>The businesses that keep growing without their acquisition cost climbing every quarter aren't the ones with the single best channel. They're the ones whose channels reinforce each other — where paid search retargets people from organic content, where a case study from a closed deal becomes the next ad, where every touchpoint makes the next one work harder.</p>
    <h2>What a compounding loop looks like</h2>
    <p>Content earns attention and trust. Paid amplifies the content that's already proven itself. Outbound reaches people who've already seen the brand somewhere else, so the cold email doesn't feel cold. Each channel lowers the cost of the next.</p>
    <ul>
      <li>Retarget engaged content readers with paid before they ever fill out a form</li>
      <li>Turn every closed-won case study into new top-of-funnel content</li>
      <li>Feed real conversion data back into targeting instead of guessing at personas</li>
    </ul>
    <p>Isolated channels get judged on their own ROI and get cut when that number dips. Compounding channels get judged on the system's ROI — which is a much harder number to shrink.</p>`,
  },
  {
    slug: "why-estate-agency-websites-dont-convert",
    category: "Website Development",
    accent: "#F9A8D4",
    title: "Why Most Estate Agency Websites Don't Convert",
    excerpt: "Most estate agency websites are built to look nice, not to convert. Here's what's actually costing you enquiries.",
    date: "Sep 2026",
    readTime: "6 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    heroSvg:
      '<rect x="60" y="60" width="780" height="200" rx="16" fill="rgba(236,72,153,0.14)" stroke="rgba(236,72,153,0.4)" stroke-width="2"/><rect x="100" y="100" width="300" height="24" rx="6" fill="rgba(249,168,212,0.5)"/><rect x="100" y="140" width="460" height="14" rx="4" fill="rgba(249,168,212,0.25)"/><rect x="100" y="166" width="380" height="14" rx="4" fill="rgba(249,168,212,0.25)"/><rect x="100" y="200" width="160" height="40" rx="10" fill="#EC4899"/><circle cx="760" cy="90" r="8" fill="#F9A8D4"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    cardSvg:
      '<rect x="20" y="18" width="300" height="100" rx="10" fill="rgba(236,72,153,0.14)" stroke="rgba(236,72,153,0.4)" stroke-width="1.5"/><rect x="38" y="36" width="130" height="12" rx="4" fill="rgba(249,168,212,0.55)"/><rect x="38" y="58" width="200" height="7" rx="3" fill="rgba(249,168,212,0.28)"/><rect x="38" y="72" width="160" height="7" rx="3" fill="rgba(249,168,212,0.28)"/><rect x="38" y="92" width="70" height="18" rx="6" fill="#EC4899"/>',
    pullQuote: "A beautiful website that doesn't capture the enquiry isn't a website — it's a brochure with a domain name.",
    body: `<p>Most estate agency websites look fine. Clean photography, a tidy logo, maybe a property search bar. And yet, for most agencies, the website is the weakest part of the growth system — not because it looks bad, but because it was never built to convert.</p>
    <h2>Looking good isn't the same as working</h2>
    <p>A website can be visually polished and still fail at its one real job: turning a visitor who's thinking about buying, selling, or renting into an enquiry your team can follow up on. That gap — between "looks professional" and "generates business" — is where most agency websites quietly lose money every month.</p>
    <h2>The three most common leaks</h2>
    <ul>
      <li>No clear path from a listing to an enquiry — just a generic "contact us" page buried in the nav</li>
      <li>Slow load times on mobile, where most property searches now start</li>
      <li>Forms that ask for too much, too early, before trust has been built</li>
    </ul>
    <p>None of these are design problems in the aesthetic sense. They're conversion problems — and they're exactly what a website built specifically for how buyers and sellers actually search for property is designed to fix.</p>`,
  },
  {
    slug: "estate-agency-website-features",
    category: "Website Development",
    accent: "#F9A8D4",
    title: "7 Features Every Modern Estate Agency Website Needs",
    excerpt: "From property search to instant lead capture — the features that separate a modern agency site from a digital brochure.",
    date: "Sep 2026",
    readTime: "7 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    heroSvg:
      '<rect x="78" y="52" width="340" height="156" rx="20" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" stroke-width="2"/><rect x="470" y="52" width="340" height="156" rx="20" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" stroke-width="2"/><rect x="78" y="232" width="340" height="156" rx="20" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" stroke-width="2"/><rect x="470" y="232" width="340" height="156" rx="20" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" stroke-width="2"/><circle cx="248" cy="130" r="22" fill="#F9A8D4"/><circle cx="640" cy="130" r="22" fill="#EC4899"/><circle cx="248" cy="310" r="22" fill="#EC4899"/><circle cx="640" cy="310" r="22" fill="#F9A8D4"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    cardSvg:
      '<rect x="30" y="20" width="130" height="60" rx="10" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" stroke-width="1.5"/><rect x="180" y="20" width="130" height="60" rx="10" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" stroke-width="1.5"/><rect x="30" y="92" width="130" height="60" rx="10" fill="rgba(249,168,212,0.14)" stroke="rgba(236,72,153,0.3)" stroke-width="1.5"/><rect x="180" y="92" width="130" height="60" rx="10" fill="rgba(236,72,153,0.16)" stroke="rgba(236,72,153,0.35)" stroke-width="1.5"/><circle cx="95" cy="50" r="10" fill="#F9A8D4"/><circle cx="245" cy="50" r="10" fill="#EC4899"/><circle cx="95" cy="122" r="10" fill="#EC4899"/><circle cx="245" cy="122" r="10" fill="#F9A8D4"/>',
    pullQuote: "A property website without instant lead capture is just a digital version of a printed brochure.",
    body: `<p>Not every estate agency website needs the same features, but the best-performing ones share a common foundation. Here are the seven that matter most.</p>
    <h2>1. Fast, accurate property search</h2>
    <p>Buyers filter by area, price, and bedrooms before they do anything else. If search is slow or inaccurate, they leave before seeing a single listing.</p>
    <h2>2. Mobile-first layouts</h2>
    <p>Most property searches start on a phone. A site that was "made responsive" after the fact rarely performs as well as one built mobile-first from day one.</p>
    <h2>3. Instant enquiry capture on every listing</h2>
    <p>Every property page should make it effortless to ask a question or book a viewing — not funnel visitors to a single generic contact form.</p>
    <h2>4. Local SEO foundations</h2>
    <p>Agencies win or lose on local search visibility. That means structured data, location pages, and fast technical performance, not just good copy.</p>
    <h2>5. CRM integration</h2>
    <p>An enquiry that lands in an inbox and nowhere else is an enquiry that's likely to go cold. It should land directly in your CRM, ready for follow-up.</p>
    <h2>6. Clear valuation and seller pathways</h2>
    <p>Sellers are a different audience with different intent. They need their own clear, dedicated journey — not an afterthought tab in the main menu.</p>
    <h2>7. Genuine page speed</h2>
    <p>Every feature above is undermined if the site is slow. Speed isn't a nice-to-have; it's the foundation everything else sits on.</p>`,
  },
  {
    slug: "website-speed-property-enquiries",
    category: "Website Development",
    accent: "#F9A8D4",
    title: "How Website Speed Affects Property Enquiries",
    excerpt: "A slow website doesn't just frustrate visitors — it quietly costs you enquiries before a buyer even sees a listing.",
    date: "Sep 2026",
    readTime: "5 min read",
    heroBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    heroSvg:
      '<line x1="60" y1="110" x2="400" y2="110" stroke="#F9A8D4" stroke-width="8" stroke-linecap="round" opacity="0.3"/><line x1="60" y1="170" x2="580" y2="170" stroke="#F9A8D4" stroke-width="10" stroke-linecap="round" opacity="0.5"/><line x1="60" y1="230" x2="760" y2="230" stroke="#EC4899" stroke-width="12" stroke-linecap="round" opacity="0.75"/><line x1="60" y1="290" x2="830" y2="290" stroke="#EC4899" stroke-width="14" stroke-linecap="round"/><circle cx="830" cy="290" r="14" fill="#fff"/>',
    cardBg: "radial-gradient(120% 130% at 20% 0%, rgba(236,72,153,0.32), rgba(236,72,153,0.04) 65%), #130A10",
    cardSvg:
      '<line x1="20" y1="40" x2="140" y2="40" stroke="#F9A8D4" stroke-width="4" stroke-linecap="round" opacity="0.3"/><line x1="20" y1="66" x2="220" y2="66" stroke="#F9A8D4" stroke-width="5" stroke-linecap="round" opacity="0.5"/><line x1="20" y1="92" x2="300" y2="92" stroke="#EC4899" stroke-width="6" stroke-linecap="round" opacity="0.75"/><line x1="20" y1="118" x2="320" y2="118" stroke="#EC4899" stroke-width="7" stroke-linecap="round"/><circle cx="320" cy="118" r="6" fill="#fff"/>',
    pullQuote: "Every extra second of load time is a buyer deciding your competitor's site is worth trying instead.",
    body: `<p>Website speed sounds like a technical detail best left to developers. For estate agencies, it's closer to a revenue metric.</p>
    <h2>Why speed matters more for property sites</h2>
    <p>Property websites are image-heavy by nature — listings live and die by photography. That makes them especially vulnerable to slow load times if the underlying site isn't built to handle high-quality images without dragging down performance.</p>
    <h2>The enquiry you never see</h2>
    <p>A slow page doesn't usually generate a complaint. It generates silence — a visitor who simply leaves before the listing finishes loading, and an enquiry that never happens. Because there's no error message, slow performance is one of the easiest leaks to miss entirely.</p>
    <h2>What actually makes a difference</h2>
    <ul>
      <li>Properly optimized, responsively sized property images</li>
      <li>A technical foundation built for speed, not bolted onto a template after launch</li>
      <li>Minimal reliance on heavy third-party scripts that block rendering</li>
    </ul>
    <p>None of this requires sacrificing the premium look an agency needs. It requires building the site correctly from the start — which is exactly where most template-based agency websites fall short.</p>`,
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
