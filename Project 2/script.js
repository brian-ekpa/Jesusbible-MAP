/* ================================================================
   BIBLE MAP — MAIN JAVASCRIPT
   script.js

   TABLE OF CONTENTS:
   1.  Bible Locations Data
       - Each location has: name, coordinates, icon, color, story,
         verse, extra verses, AI explanations (pre-written pool),
         and quick tips (rotating encouragements).
   2.  Dark Mode Toggle
   3.  Map Initialization (Leaflet)
   4.  Custom Animated Marker Creator
   5.  Marker & Popup Setup
   6.  Info Panel Logic
       - Show location card on marker click
       - Close panel button
       - Animate in the AI devotional
   7.  Quick Tip Logic
       - Rotating tips, "New Tip" button
   8.  Search Bar Logic
       - Filter locations by name
       - Pan map to selected location
   9.  Utility Functions
================================================================ */


/* ================================================================
   1. BIBLE LOCATIONS DATA
   ----------------------------------------------------------------
   Each entry in the LOCATIONS array is a JavaScript object with:
   - name:        Display name of the place
   - lat / lng:   Geographic coordinates (latitude, longitude)
   - icon:        An emoji representing the place
   - color:       Pin color (CSS color string)
   - pulseColor:  Color for the animated ripple ring
   - story:       A short paragraph about the Bible event at this place
   - verse:       The text of the key Bible verse
   - verseRef:    The reference (book, chapter, verse)
   - extraVerses: Array of {ref, text} objects for the expandable section
   - aiExplanations: Array of strings — we pick one "randomly" to
                     simulate an AI generating fresh content each time
   - quickTips:   Array of short one-line encouragements
================================================================ */
const LOCATIONS = [

  /* ---------- 1. JERUSALEM ---------- */
  {
    name: "Jerusalem",
    lat: 31.7683,
    lng: 35.2137,
    icon: "🏛️",
    color: "#C0392B",           /* deep red — royalty and sacrifice      */
    pulseColor: "rgba(192, 57, 43, 0.35)",
    story: "Jerusalem is the city of God — the place where King David established his throne, where Solomon built the magnificent Temple, and most importantly, where Jesus was crucified, buried, and rose from the dead. It is the spiritual center of the entire Bible.",
    verse: "\"Jerusalem, built as a city that is closely compacted together. That is where the tribes go up—the tribes of the LORD—to praise the name of the LORD according to the statute given to Israel.\"",
    verseRef: "Psalm 122:3-4 (NIV)",
    extraVerses: [
      { ref: "Matthew 21:1-11",  text: "Jesus' triumphal entry into Jerusalem — the crowds lay palm branches before him." },
      { ref: "Luke 23:33",       text: "Jesus is crucified on the hill called Golgotha (The Skull), just outside the city." },
      { ref: "Acts 2:1-4",       text: "The Holy Spirit descends on the disciples in Jerusalem on the day of Pentecost." },
      { ref: "Revelation 21:2",  text: "A vision of the New Jerusalem descending from heaven — the eternal city of God." },
    ],
    aiExplanations: [
      "Jerusalem is not just a city on a map — it is the story of God pursuing humanity. Every stone, every hill, every ancient gate speaks of covenants made and kept. When you stand spiritually in Jerusalem, you stand at the crossroads of all of Scripture. The sacrifice made here — Jesus dying on the cross — was the ultimate act of love, paying a debt we could never pay. Jerusalem teaches us that God doesn't give up on His people. Even when we are far away from Him, He is always drawing us back. Just as God chose Jerusalem as the place where salvation would be accomplished, He has chosen each of us as people He deeply loves and desires to be close to.",
      "There is something deeply moving about Jerusalem. Prophets wept over her. Kings ruled from her. And the Son of God shed His blood within her walls. When we read about Jerusalem, we are reminded that God is a God of place and time — He enters our real, physical world to meet us. The resurrection of Jesus in Jerusalem changed everything. Death is not the end. Every time you feel overwhelmed by life's difficulties, remember: if God could conquer death in Jerusalem, He can certainly handle whatever you are facing today.",
      "Jerusalem holds a mirror to the human soul. It has been destroyed and rebuilt, abandoned and restored — much like our own hearts. God's faithfulness to Jerusalem through centuries of turmoil reminds us that He is equally faithful to us in our own struggles. His love for Jerusalem was not based on her perfection but on His promise. His love for you works the same way. Today, let the story of Jerusalem encourage you: God keeps His promises, restores broken things, and never abandons what He loves.",
    ],
    quickTips: [
      "God chose Jerusalem not because it was perfect, but because He chose it. He has chosen you too.",
      "The same God who raised Jesus from the dead in Jerusalem is alive and at work in your life right now.",
      "When you feel broken like the ancient walls of Jerusalem, remember: God specializes in rebuilding.",
      "Jerusalem reminds us that God's promises outlast empires, armies, and our own doubts.",
      "The cross in Jerusalem was not a defeat — it was the greatest victory ever won.",
    ],
  },

  /* ---------- 2. BETHLEHEM ---------- */
  {
    name: "Bethlehem",
    lat: 31.7054,
    lng: 35.2024,
    icon: "⭐",
    color: "#2980B9",           /* sky blue — the star of Bethlehem      */
    pulseColor: "rgba(41, 128, 185, 0.35)",
    story: "Bethlehem means 'House of Bread' — and fittingly, it is the birthplace of the Bread of Life. Jesus was born in Bethlehem in a humble stable, fulfilling a prophecy spoken 700 years earlier by Micah. Shepherds heard the announcement from angels, and wise men traveled from the east following a star to find the child.",
    verse: "\"But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.\"",
    verseRef: "Micah 5:2 (NIV)",
    extraVerses: [
      { ref: "Luke 2:1-7",   text: "Mary and Joseph travel to Bethlehem. Jesus is born and laid in a manger." },
      { ref: "Luke 2:8-20",  text: "Angels appear to shepherds in the fields near Bethlehem, announcing the birth." },
      { ref: "Matthew 2:1-12", text: "The Magi (wise men) follow the star and find the Christ child in Bethlehem." },
      { ref: "Ruth 1:19",    text: "Ruth and Naomi arrive in Bethlehem — setting the stage for the lineage of David and Jesus." },
    ],
    aiExplanations: [
      "Bethlehem is a powerful reminder that God does His greatest work in the most humble, unexpected places. The King of the universe chose to be born not in a palace, but in a stable. Not in Rome or Jerusalem, but in a small, overlooked town. This is the upside-down kingdom of God: the first shall be last, the humble shall be exalted, and the greatest King arrives as a helpless baby. If you have ever felt too small or insignificant to be used by God, look to Bethlehem. God specializes in using the ordinary to accomplish the extraordinary.",
      "The prophecy in Micah about Bethlehem was spoken 700 years before Jesus was born. Think about that. God planned the most important event in human history long before any of the people involved were even alive. This should fill your heart with confidence: if God plans salvation with that kind of precision and patience, then He is equally attentive to the details of your life. You are not forgotten. Your future is not uncertain to Him. God is working out His plans for you with the same faithfulness He showed in Bethlehem.",
      "Bethlehem teaches us about the gift of God's presence. The word 'Emmanuel' means 'God with us' — and it all started in Bethlehem. Jesus left the glory of heaven to enter our world, breathe our air, and feel our weakness. Whatever you are going through today, you are not alone. The One who was born in a manger, wrapped in cloth, and laid in a feeding trough has walked through human struggle. He knows what it feels like. And He is with you right now.",
    ],
    quickTips: [
      "God chose the smallest town for the biggest event. He can use you right where you are.",
      "Bethlehem reminds us: the best gifts often come in the most unexpected packages.",
      "God's plans are always on time — Bethlehem was prophesied 700 years in advance!",
      "Like the shepherds, be willing to drop everything and run toward Jesus.",
      "The manger had no room — but Jesus still made a way. He always makes a way.",
    ],
  },

  /* ---------- 3. NAZARETH ---------- */
  {
    name: "Nazareth",
    lat: 32.7021,
    lng: 35.2978,
    icon: "🏠",
    color: "#27AE60",           /* green — growth, hidden years          */
    pulseColor: "rgba(39, 174, 96, 0.35)",
    story: "Nazareth was the hometown of Jesus, where He grew up from childhood to the age of about 30. He lived a simple, ordinary life as a carpenter's son. People were so used to knowing Him that when He began to teach and perform miracles, many struggled to believe. 'Can anything good come out of Nazareth?' was a common skeptical question.",
    verse: "\"And he went and lived in a city called Nazareth, so that what was spoken by the prophets might be fulfilled, that he would be called a Nazarene.\"",
    verseRef: "Matthew 2:23 (ESV)",
    extraVerses: [
      { ref: "Luke 4:16-21",    text: "Jesus returns to Nazareth and reads from Isaiah in the synagogue, declaring the year of the Lord's favor." },
      { ref: "Luke 4:22-30",    text: "The people of Nazareth are amazed but then try to throw Jesus off a cliff — familiarity breeds contempt." },
      { ref: "Luke 2:51-52",    text: "Jesus grows up in Nazareth, obedient to His parents, increasing in wisdom and stature." },
      { ref: "John 1:45-46",    text: "Philip tells Nathanael about Jesus of Nazareth. Nathanael asks, 'Can anything good come from Nazareth?'" },
    ],
    aiExplanations: [
      "Nazareth represents the hidden years — the long, quiet seasons of preparation that God builds into every faithful life. Jesus spent 30 years in relative obscurity before His 3 years of public ministry. He swept sawdust off a workshop floor, helped customers choose lumber, and lived an unremarkable daily life. Yet none of those years were wasted. They were preparation. If you are in a hidden season right now — doing faithful work that nobody notices — take heart. God is preparing you for something too. Your Nazareth is not your final destination.",
      "The people of Nazareth struggled to see Jesus clearly because they thought they knew Him. Familiarity can be one of the greatest spiritual obstacles. Sometimes we need fresh eyes to see who God truly is. Have you grown so familiar with the idea of Jesus that you have stopped being amazed by Him? Nazareth invites you to encounter Jesus again as if for the first time — to hear His words not as something routine, but as the life-changing, world-altering truth they really are.",
      "From Nazareth came the question: 'Can anything good come from here?' And the answer is: absolutely yes. God delights in confounding expectations. He raises up leaders from small towns, calls fishermen to change the world, and uses the most unlikely people for His greatest purposes. What 'Nazareth' in your own life have you been dismissing — what skill, background, or experience have you thought was too ordinary? God sees your Nazareth differently than you do.",
    ],
    quickTips: [
      "Your ordinary days are not wasted — Jesus spent 30 years in Nazareth before His ministry began.",
      "Never despise a season of preparation. God is always at work in the quiet times.",
      "When others underestimate you, remember: they said 'nothing good' comes from Nazareth.",
      "Faithfulness in small things opens doors to bigger callings.",
      "Your hometown does not define your destiny. Nazareth did not define Jesus — and your past does not define you.",
    ],
  },

  /* ---------- 4. MOUNT SINAI ---------- */
  {
    name: "Mount Sinai",
    lat: 28.5391,
    lng: 33.9750,
    icon: "⚡",
    color: "#E67E22",           /* orange — fire and divine presence     */
    pulseColor: "rgba(230, 126, 34, 0.35)",
    story: "Mount Sinai (also called Horeb) is where God revealed Himself to Moses in the burning bush, and later where He gave Moses the Ten Commandments amid thunder, lightning, and a thick cloud. It was a mountain of divine encounter — where heaven and earth touched, and where God established His covenant with Israel.",
    verse: "\"Now Mount Sinai was wrapped in smoke because the LORD had descended on it in fire. The smoke of it went up like the smoke of a kiln, and the whole mountain trembled greatly.\"",
    verseRef: "Exodus 19:18 (ESV)",
    extraVerses: [
      { ref: "Exodus 3:1-6",    text: "Moses encounters the burning bush — God reveals His name 'I AM' for the first time." },
      { ref: "Exodus 20:1-17",  text: "God speaks the Ten Commandments to Moses on Mount Sinai." },
      { ref: "1 Kings 19:11-13", text: "Elijah flees to Mount Horeb and hears God not in wind, fire, or earthquake, but in a still small voice." },
      { ref: "Galatians 4:24-25", text: "Paul uses Mount Sinai as a symbol of the Old Covenant, pointing forward to the freedom of the New." },
    ],
    aiExplanations: [
      "Mount Sinai is a place of encounter. When Moses stood before the burning bush on this mountain, he was an 80-year-old shepherd who had spent 40 years in the wilderness, seemingly wasted. And yet God's plans were just beginning. The fire that burned without consuming the bush is a picture of God Himself — He is holy, powerful, and transforming, but He does not destroy what He touches. He refines it. If you feel like your best years are behind you or your dreams have been delayed too long, remember Moses at the burning bush. God's timing is never late.",
      "The Ten Commandments given at Sinai were not meant to be a burden — they were a gift. God was saying: 'Here is how to live in freedom, in community, in wholeness.' The law reflected the character of a holy God who wanted His people to flourish. In the New Testament, Jesus fulfills the law — not abolishing it, but writing it on our hearts instead of stone. As you read the Ten Commandments today, ask yourself: which of these is speaking directly to an area of your life that needs God's realignment?",
      "Elijah returned to Mount Sinai, running for his life, exhausted and depressed after a great victory. And God met him there — not in a dramatic earthquake or fire (as He had with Moses), but in a gentle whisper. God adjusts the way He speaks to meet us where we are. Sometimes we look for God in the big, spectacular moments and miss His voice in the quiet. Are you listening for the still, small voice today? God is speaking — even now, even to you — perhaps in a whisper you almost missed.",
    ],
    quickTips: [
      "Moses was 80 when God called him at the burning bush. It's never too late for your story to begin.",
      "God's voice at Sinai was thunderous AND a still small whisper — He speaks in every season.",
      "The law at Sinai was given in love, not anger. God's commands are always for our good.",
      "Like Moses, take off your shoes — you might be standing on holy ground right now.",
      "God doesn't consume what He calls — He transforms it. Let His fire refine, not destroy.",
    ],
  },

  /* ---------- 5. SEA OF GALILEE ---------- */
  {
    name: "Sea of Galilee",
    lat: 32.8328,
    lng: 35.6002,
    icon: "🌊",
    color: "#2471A3",           /* ocean blue — water, storms, faith     */
    pulseColor: "rgba(36, 113, 163, 0.35)",
    story: "The Sea of Galilee (also called Lake Tiberias) was the backdrop for many of Jesus' most dramatic miracles. Here He calmed a violent storm with a word, walked on water, called fishermen to be His disciples, and fed five thousand people on its shores. The lake was the center of daily life for the disciples who were fishermen.",
    verse: "\"He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm.\"",
    verseRef: "Mark 4:39 (NIV)",
    extraVerses: [
      { ref: "Matthew 4:18-22",  text: "Jesus calls Peter, Andrew, James, and John from their fishing boats to follow Him." },
      { ref: "Matthew 14:25-31", text: "Jesus walks on the water. Peter steps out in faith — and then sinks when he takes his eyes off Jesus." },
      { ref: "John 6:1-14",      text: "Jesus feeds 5,000 people with 5 loaves and 2 fish on the shore of the Sea of Galilee." },
      { ref: "John 21:1-17",     text: "After the resurrection, Jesus appears to the disciples fishing on the sea and restores Peter." },
    ],
    aiExplanations: [
      "The Sea of Galilee is where Jesus showed His authority over nature itself. The disciples were seasoned fishermen who knew this lake and its storms — and they were terrified. Yet with three words ('Peace, be still'), Jesus silenced the chaos. What storms are raging in your life right now? It may be fear, financial pressure, relationship struggles, or health concerns. Jesus does not always remove the storm instantly, but He is always in the boat with you. And He has authority over every wind and wave that threatens you.",
      "Peter's walk on water is one of the most misunderstood stories in the Bible. We focus on his sinking, but let's not miss this: Peter was the one who had enough faith to ask to step out of the boat. And he DID walk on water — for a moment. Jesus didn't criticize him for sinking; He caught him and asked why he doubted. The lesson isn't 'don't sink.' It's 'keep your eyes on Jesus.' When you take risks of faith and start to sink, He reaches out His hand. Don't be afraid of stepping out.",
      "It was on the shores of the Sea of Galilee that Jesus restored Peter after his three-time denial. Three times Peter said 'I don't know him.' Three times Jesus asked, 'Do you love me?' — giving Peter three chances to replace denial with declaration. The Sea of Galilee is a place of restoration. No failure disqualifies you from God's love or purpose. Whatever you have done, whatever you have denied, Jesus is asking you the same question today: 'Do you love me?' And that is where restoration begins.",
    ],
    quickTips: [
      "Jesus is in your boat during the storm. He may be 'asleep' but He is never absent.",
      "Even when you sink like Peter, Jesus reaches out His hand. Keep your eyes on Him.",
      "The same voice that said 'peace be still' to the sea speaks peace to your heart.",
      "The disciples asked 'Who is this?' after the storm was calmed. Keep asking — keep discovering who Jesus is.",
      "Five loaves and two fish fed 5,000. Offer what you have; God multiplies what He receives.",
    ],
  },

  /* ---------- 6. GARDEN OF GETHSEMANE ---------- */
  {
    name: "Garden of Gethsemane",
    lat: 31.7790,
    lng: 35.2395,
    icon: "🌿",
    color: "#1A6B3C",           /* dark green — olive trees, prayer      */
    pulseColor: "rgba(26, 107, 60, 0.35)",
    story: "The Garden of Gethsemane, located on the Mount of Olives just east of Jerusalem, is where Jesus prayed in agony the night before His crucifixion. While His disciples fell asleep, Jesus wrestled in prayer, sweating drops of blood, asking if the cup of suffering could pass — yet surrendering fully to the Father's will.",
    verse: "\"Father, if you are willing, take this cup from me; yet not my will, but yours be done.\"",
    verseRef: "Luke 22:42 (NIV)",
    extraVerses: [
      { ref: "Matthew 26:36-46", text: "Jesus asks His disciples to watch and pray with Him, but they fall asleep three times." },
      { ref: "Luke 22:43-44",    text: "An angel appears to strengthen Jesus, and His sweat becomes like great drops of blood." },
      { ref: "John 18:1-11",     text: "Judas leads the soldiers to Gethsemane to arrest Jesus. Jesus says 'I am he' and they fall backward." },
      { ref: "Hebrews 5:7-9",    text: "Jesus learned obedience through what He suffered — His Gethsemane prayer was heard." },
    ],
    aiExplanations: [
      "Gethsemane means 'oil press' — and that is exactly what happened to Jesus there. He was pressed. Crushed. And out of that crushing came the purest surrender: 'Not my will, but yours.' This is the most profound prayer in all of Scripture. Jesus fully felt the weight of what was coming — the betrayal, the pain, the sin of the world — and He chose obedience anyway. When life presses you in ways that feel unbearable, Gethsemane reminds you that surrender to God is not weakness. It is the highest form of trust.",
      "The disciples fell asleep while Jesus prayed. We read that and think, 'How could they?' But we are not so different. When life gets hard, when prayer feels heavy and faith feels costly, the human tendency is to drift — to find a way to escape the weight. Gethsemane invites you to stay awake in prayer even when it's hard. The most important conversations with God often happen in the darkest, loneliest nights. Don't fall asleep in your Gethsemane season. Press through in prayer.",
      "There is something extraordinary hidden in Gethsemane: the prayer 'not my will, but yours' was answered by the resurrection. That which Jesus surrendered — His very life — God returned to Him transformed and glorified. This is the pattern of the kingdom: what you surrender to God, He returns to you more fully than you imagined. Your Gethsemane — the painful thing you are surrendering — is not the end of your story. It is the turning point. Trust the Father's plan, even when it takes you through the dark.",
    ],
    quickTips: [
      "'Not my will but yours' — five words that changed history. Try praying them today.",
      "Jesus prayed alone in Gethsemane. He understands when you feel no one is watching or caring.",
      "The oil press produces oil only through pressure. Your Gethsemane seasons produce character.",
      "Even Jesus needed an angel to strengthen Him. Ask God to send you strength when you are struggling.",
      "What you surrender in Gethsemane, God can restore in resurrection. Don't be afraid to let go.",
    ],
  },

  /* ---------- 7. JORDAN RIVER ---------- */
  {
    name: "Jordan River",
    lat: 31.8451,
    lng: 35.5516,
    icon: "💧",
    color: "#1ABC9C",           /* teal — water, baptism, crossing over  */
    pulseColor: "rgba(26, 188, 156, 0.35)",
    story: "The Jordan River appears throughout the entire Bible as a place of crossing and new beginnings. Joshua led Israel across its waters into the Promised Land. Elijah parted it with his cloak. John the Baptist preached and baptized here. And most significantly, Jesus was baptized in the Jordan by John — at which point the heavens opened and the Father's voice declared, 'This is my beloved Son.'",
    verse: "\"And when Jesus was baptized, immediately he went up from the water, and behold, the heavens were opened to him, and he saw the Spirit of God descending like a dove and coming to rest on him.\"",
    verseRef: "Matthew 3:16 (ESV)",
    extraVerses: [
      { ref: "Joshua 3:14-17",   text: "The priests carry the ark into the Jordan and the waters part — Israel enters the Promised Land dry-shod." },
      { ref: "2 Kings 5:9-14",   text: "Naaman the Syrian general dips in the Jordan seven times and is healed of leprosy." },
      { ref: "Mark 1:4-8",       text: "John the Baptist preaches repentance and baptizes crowds in the Jordan River." },
      { ref: "Luke 3:21-22",     text: "Jesus is baptized by John; the Holy Spirit descends as a dove and the Father speaks from heaven." },
    ],
    aiExplanations: [
      "The Jordan River is a threshold — a crossing point. In Israel's history, crossing the Jordan meant leaving the wilderness and entering the Promised Land. It was the moment of transition from wandering to inheriting. In your own life, God may be calling you to a Jordan moment — a step of faith that requires you to get your feet wet before you see the waters part. The priests had to walk to the edge of the river before God stopped the flow. What step of faith is God asking you to take before He acts on your behalf?",
      "Jesus had no sin to repent of — so why was He baptized? The answer reveals His character. He identified completely with humanity, including our need for repentance and renewal. At His baptism, the Trinity was fully present: the Son in the water, the Spirit as a dove, and the Father speaking from heaven. This was the official 'commissioning' of Jesus before His public ministry began. Before you begin any significant work for God, consider the importance of being filled with His Spirit and having the Father's affirmation over your life. Seek that first.",
      "Naaman was a great military commander — but he almost missed his healing because he was offended that the prophet told him to dip in the Jordan seven times. The Jordan wasn't special; it was ordinary. He expected something grand. But the miracle was hidden in simple, humble obedience. Is God asking you to do something simple that your pride resists? The breakthrough may be on the other side of an uncomplicated act of faith — not some spectacular gesture, but a plain step of trust.",
    ],
    quickTips: [
      "The Jordan crossing required wet feet before dry ground. Your miracle may need a step first.",
      "Jesus' baptism shows God values public declaration of faith. Don't be ashamed of yours.",
      "Naaman nearly missed his healing through pride. Humble obedience unlocks miracles.",
      "Every Jordan River in your life is an invitation to leave the wilderness behind.",
      "The Father declared 'You are my beloved' over Jesus. He says the same over you today.",
    ],
  },

  /* ---------- 8. MOUNT OF OLIVES ---------- */
  {
    name: "Mount of Olives",
    lat: 31.7784,
    lng: 35.2460,
    icon: "🌄",
    color: "#8E44AD",           /* purple — royalty, prophecy            */
    pulseColor: "rgba(142, 68, 173, 0.35)",
    story: "The Mount of Olives overlooks Jerusalem from the east. Jesus gave His famous Olivet Discourse here — prophecies about the end times. He wept over Jerusalem from this mountain. He ascended to heaven from its slopes. And according to prophecy, He will return and stand on this same mountain when He comes again.",
    verse: "\"When he came near the place where the road goes down the Mount of Olives, the whole crowd of disciples began joyfully to praise God in loud voices for all the miracles they had seen.\"",
    verseRef: "Luke 19:37 (NIV)",
    extraVerses: [
      { ref: "Luke 19:41-44",   text: "Jesus weeps over Jerusalem from the Mount of Olives, mourning those who would not receive Him." },
      { ref: "Matthew 24:1-3",  text: "Jesus sits on the Mount of Olives and delivers the Olivet Discourse about the end of the age." },
      { ref: "Acts 1:9-12",     text: "Jesus ascends to heaven from the Mount of Olives as the disciples watch." },
      { ref: "Zechariah 14:4",  text: "Prophecy: The LORD will stand on the Mount of Olives on the day of His return." },
    ],
    aiExplanations: [
      "Jesus wept over Jerusalem from the Mount of Olives. He could see both the physical city and the spiritual state of its people — and He grieved. This tells us something profound about the heart of God: He is not distant or indifferent to human hardship and rejection. He weeps. He cares. The tears of Jesus on the Mount of Olives are proof that your pain moves God's heart. He does not watch suffering with cold detachment. He weeps with you — and then He acts.",
      "The Ascension from the Mount of Olives was not abandonment — it was promotion. Jesus went up so that the Holy Spirit could come down. His physical absence made room for His universal presence through the Spirit. When it feels like God has 'gone away' in your life — when the sky seems silent and prayer feels distant — remember: this may be a season where He is preparing to send His Spirit in a new way. Seasons of perceived absence often precede seasons of profound encounter.",
      "The prophecy that Jesus will return and stand on the Mount of Olives gives Christians a horizon of hope. History is not spinning out of control — it is moving toward a destination. The one who wept on this mountain, who ascended from it, will one day return to it. This future hope is not a distraction from the present — it is fuel for it. When you know where the story is going, you can face today's difficulties with courage and perspective. The Mount of Olives reminds us: this is not the end.",
    ],
    quickTips: [
      "Jesus wept over Jerusalem — He sees your city, your struggles, and He cares deeply.",
      "The Ascension wasn't goodbye — it was 'I'll send someone even better.' The Spirit is here.",
      "From the Mount of Olives, Jesus could see both the glory of the Temple and the grief ahead. He chose to go forward. So can you.",
      "Prophecy from the Mount of Olives reminds us: history has a destination. You are part of the story.",
      "Jesus went up so the Spirit could come down. Sometimes God takes things away to give something better.",
    ],
  },

  /* ---------- 9. CAPERNAUM ---------- */
  {
    name: "Capernaum",
    lat: 32.8812,
    lng: 35.5754,
    icon: "🐟",
    color: "#D35400",           /* burnt orange — fishermen's town       */
    pulseColor: "rgba(211, 84, 0, 0.35)",
    story: "Capernaum was Jesus' home base during His Galilean ministry. From this fishing village on the north shore of the Sea of Galilee, He taught in the synagogue, healed many people (including Peter's mother-in-law), raised a dead girl, and performed the miracle of the paralyzed man lowered through the roof by his determined friends.",
    verse: "\"And when Jesus returned to Capernaum after some days, it was reported that he was at home. And many were gathered together, so that there was no more room, not even at the door.\"",
    verseRef: "Mark 2:1-2 (ESV)",
    extraVerses: [
      { ref: "Mark 2:1-12",    text: "Four men lower a paralyzed friend through the roof of a house in Capernaum to reach Jesus. Jesus heals him." },
      { ref: "Mark 1:21-28",   text: "Jesus teaches in the Capernaum synagogue with authority and casts out an unclean spirit." },
      { ref: "Luke 7:1-10",    text: "A Roman centurion in Capernaum shows remarkable faith — and Jesus heals his servant from a distance." },
      { ref: "John 6:35-59",   text: "Jesus delivers the 'Bread of Life' discourse in the Capernaum synagogue." },
    ],
    aiExplanations: [
      "Four men carried their paralyzed friend to Jesus in Capernaum — and when the crowd was too thick to get through the door, they climbed to the roof and dug through it. This is what radical, creative, persistent intercession looks like. They were not deterred by obstacles. They found another way. When you are praying for someone who needs healing — physical, emotional, or spiritual — be like these four friends. Don't give up because the door seems blocked. Find the roof. God honors persistent, creative, loving faith.",
      "Capernaum became Jesus' base of operations, which means the ordinary people of this fishing town became His everyday neighbors. Jesus sat with them, ate their food, healed their sick, and walked their streets. The Kingdom of God was not launched from a palace — it was launched from a modest fishing village. This means God is deeply comfortable in ordinary, everyday spaces — in your home, your workplace, your neighborhood. The Kingdom comes where Jesus is welcomed. Where have you invited Him today?",
      "The centurion in Capernaum said something that amazed even Jesus: 'Just say the word, and my servant will be healed.' He understood authority. He didn't need Jesus to come physically — he knew that Jesus' word alone was enough. Jesus described this as greater faith than He had seen in all of Israel. You don't need to manufacture the right feelings or the perfect circumstances for God to work. Simply trust the authority of His word. What He has promised, He will perform. Take Him at His word.",
    ],
    quickTips: [
      "The four friends found the roof when the door was blocked. Don't stop at obstacles in prayer.",
      "Jesus was comfortable in a fishing village. He is equally at home in the ordinary spaces of your life.",
      "The centurion understood authority. Learn to trust the word of Jesus over what you can see.",
      "Capernaum was a center of miracles — but they all started when Jesus was welcomed in.",
      "When you can't carry your own burdens, let trusted friends carry you to Jesus.",
    ],
  },

  /* ---------- 10. JERICHO ---------- */
  {
    name: "Jericho",
    lat: 31.8719,
    lng: 35.4608,
    icon: "🏰",
    color: "#B7950B",           /* golden — ancient, fallen walls        */
    pulseColor: "rgba(183, 149, 11, 0.35)",
    story: "Jericho is one of the oldest cities in the world. Its walls famously fell when the Israelites marched around them for seven days, then shouted — the walls collapsed without a weapon being raised. In the New Testament, Jesus healed blind Bartimaeus near Jericho and met Zacchaeus, a despised tax collector who climbed a tree to see Him.",
    verse: "\"By faith the walls of Jericho fell down after they had been encircled for seven days.\"",
    verseRef: "Hebrews 11:30 (ESV)",
    extraVerses: [
      { ref: "Joshua 6:1-21",  text: "The Israelites march around Jericho's walls seven times on the seventh day, then shout — and the walls fall." },
      { ref: "Mark 10:46-52",  text: "Blind Bartimaeus cries out to Jesus outside Jericho. Despite being told to be quiet, he shouts louder — and is healed." },
      { ref: "Luke 19:1-10",   text: "Zacchaeus climbs a sycamore tree in Jericho. Jesus calls him by name and visits his house." },
      { ref: "Luke 10:30-37",  text: "The Good Samaritan parable takes place on the road from Jerusalem to Jericho." },
    ],
    aiExplanations: [
      "The walls of Jericho fell not through military strength, but through obedient worship. God's instruction seemed absurd — march in silence for six days, then shout. The strategy made no military sense. But the Israelites obeyed anyway, and the impossible happened. The walls came down. Sometimes God calls you to do things that seem illogical, that others will not understand, that don't fit the normal strategy. But the strategy of heaven is not always visible from earth. Trust the instruction, do the next thing God has told you to do, and let Him bring the walls down.",
      "Blind Bartimaeus refused to be silenced. The crowd told him to be quiet when he called out to Jesus. He shouted louder. And Jesus stopped. In all of Jericho, with all its noise and crowd, Jesus heard one persistent, desperate voice and responded to it. If you feel like your prayers are disappearing into the crowd — shout louder. Not in volume, but in sincerity and persistence. Don't let the noise of doubt, discouragement, or other voices quiet your cry to Jesus. He stops for the persistent ones.",
      "Zacchaeus climbed a tree because he was too short to see over the crowd — and Jesus called him down by name. Zacchaeus was despised, excluded, written off by his community. He didn't expect to be personally addressed — he just wanted to catch a glimpse. But Jesus saw him, knew his name, and chose to come to his house. God sees the people others overlook. He knows the names of the ones who feel invisible. If you have ever felt too small, too disqualified, or too far in the back of the crowd, look up. Jesus is calling your name.",
    ],
    quickTips: [
      "The walls of Jericho fell through worship, not warfare. Praise is a powerful weapon.",
      "Bartimaeus shouted louder when told to be quiet. Don't let discouragement silence your prayers.",
      "Zacchaeus was too small to see, but Jesus saw him first. You are never invisible to God.",
      "Seven laps around Jericho must have felt foolish. Obedience that looks foolish often leads to breakthroughs.",
      "The road from Jerusalem to Jericho is where the Good Samaritan showed love. Who needs your love today?",
    ],
  },

];


/* ================================================================
   2. DARK MODE TOGGLE
   ----------------------------------------------------------------
   We read the user's system preference first (prefers-color-scheme),
   and also store the user's manual choice in localStorage so it
   persists when they reload the page.
================================================================ */

/* Reference to the dark mode button in the header */
const darkModeBtn = document.getElementById("darkModeToggle");

/**
 * applyDarkMode(isDark)
 * Adds or removes the .dark-mode class on <body> and updates the
 * button label accordingly.
 * @param {boolean} isDark - true = dark mode ON
 */
function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    darkModeBtn.textContent = "🌙 Dark Mode";
  }
}

/* Check if the user previously set a preference (stored in localStorage) */
const savedMode = localStorage.getItem("bibleMapDarkMode");

/* If no saved preference, check the OS/browser preference */
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

/* Apply the correct mode on page load */
applyDarkMode(savedMode === "true" || (savedMode === null && prefersDark));

/* Toggle dark mode when the button is clicked */
darkModeBtn.addEventListener("click", () => {
  const isCurrentlyDark = document.body.classList.contains("dark-mode");
  applyDarkMode(!isCurrentlyDark);
  /* Save the user's choice to localStorage for next visit */
  localStorage.setItem("bibleMapDarkMode", String(!isCurrentlyDark));
});


/* ================================================================
   3. MAP INITIALIZATION (LEAFLET)
   ----------------------------------------------------------------
   We create a Leaflet map and attach it to the <div id="map">.
   - setView([lat, lng], zoom): centers the map on the Middle East
   - The tile layer provides the visual map imagery from OpenStreetMap
================================================================ */

/* Initialize the Leaflet map centered on the Middle East */
const map = L.map("map").setView([31.5, 35.0], 7);

/* Add the OpenStreetMap tile layer (the actual map imagery)
   The {s}, {z}, {x}, {y} placeholders are filled in by Leaflet
   to request the correct map tiles based on zoom/position. */
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);


/* ================================================================
   4. CUSTOM ANIMATED MARKER CREATOR
   ----------------------------------------------------------------
   Instead of using Leaflet's default blue marker, we create a
   custom HTML marker (L.divIcon) for each location.
   The marker consists of:
   - A teardrop-shaped "pin" that floats gently up and down
   - A small dot inside the pin
   - A pulsing ring that expands outward from the base

   The marker's color is set per-location using the color and
   pulseColor properties from the LOCATIONS array.
================================================================ */

/**
 * createCustomIcon(color, pulseColor)
 * Returns a Leaflet DivIcon with a custom animated HTML marker.
 * @param {string} color      - CSS color for the pin (e.g. "#C0392B")
 * @param {string} pulseColor - CSS color for the pulse ring
 * @returns {L.DivIcon}
 */
function createCustomIcon(color, pulseColor) {
  /* Build the HTML string for our custom marker */
  const html = `
    <div class="bible-marker-container">
      <div class="bible-marker-pin" style="background-color: ${color};">
        <div class="bible-marker-dot"></div>
      </div>
      <div class="bible-marker-pulse" style="background-color: ${pulseColor};"></div>
    </div>
  `;

  /* L.divIcon creates a marker icon from raw HTML */
  return L.divIcon({
    html: html,
    className: "",      /* clear Leaflet's default class to avoid conflicts */
    iconSize: [40, 50], /* bounding box size for click detection */
    iconAnchor: [20, 48], /* the tip of the pin — this is the geographic point */
    popupAnchor: [0, -48], /* popup appears above the marker tip */
  });
}


/* ================================================================
   5. MARKER & POPUP SETUP
   ----------------------------------------------------------------
   For each location in LOCATIONS, we:
   1. Create a custom animated icon
   2. Add a Leaflet marker to the map at that location's coordinates
   3. Bind a simple popup (quick summary) to the marker
   4. Add a click handler to open the full info panel
================================================================ */

/* Store markers by location name for the search feature */
const markerMap = {};

/* Create a marker for each location */
LOCATIONS.forEach((loc) => {
  /* Create the custom icon using this location's colors */
  const icon = createCustomIcon(loc.color, loc.pulseColor);

  /* Add the marker to the map */
  const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

  /* Quick popup content (shown on hover/click before full panel opens) */
  const popupContent = `
    <div>
      <div class="popup-title">${loc.icon} ${loc.name}</div>
      <div class="popup-sub">${loc.story.substring(0, 90)}...</div>
      <div class="popup-hint">Click for full story &amp; devotional →</div>
    </div>
  `;

  /* Bind the popup to the marker (Leaflet handles showing/hiding it) */
  marker.bindPopup(popupContent, {
    maxWidth: 260,
    className: "bible-popup",
  });

  /* When the marker is clicked, open the full info panel */
  marker.on("click", () => {
    openLocationPanel(loc);
    /* Keep the popup visible too for quick reference */
    marker.openPopup();
  });

  /* Store marker reference for the search feature */
  markerMap[loc.name] = marker;
});


/* ================================================================
   6. INFO PANEL LOGIC
   ----------------------------------------------------------------
   When a marker is clicked, we:
   1. Hide the default message
   2. Show the location card
   3. Populate all the text fields from the location's data
   4. Simulate AI "generation" with a short loading delay
   5. Show the AI explanation with a smooth fade-in
   6. Pick a random quick tip to display

   The close button hides the panel and restores the default view.
================================================================ */

/* DOM references for the info panel */
const infoPanel       = document.getElementById("infoPanel");
const defaultMessage  = document.getElementById("defaultMessage");
const locationCard    = document.getElementById("locationCard");
const closePanel      = document.getElementById("closePanel");

/* DOM references for location card content fields */
const locationIcon    = document.getElementById("locationIcon");
const locationName    = document.getElementById("locationName");
const locationStory   = document.getElementById("locationStory");
const locationVerse   = document.getElementById("locationVerse");
const locationVerseRef = document.getElementById("locationVerseRef");
const extraVersesList = document.getElementById("extraVerses");
const aiLoading       = document.getElementById("aiLoading");
const aiExplanation   = document.getElementById("aiExplanation");

/* Track which location is currently selected */
let currentLocation = null;

/* Track which AI explanation was last used (to allow rotation) */
let lastAiIndex = -1;

/**
 * openLocationPanel(loc)
 * Opens the info panel and fills it with the given location's data.
 * @param {object} loc - A location object from the LOCATIONS array
 */
function openLocationPanel(loc) {
  /* Save the currently selected location */
  currentLocation = loc;

  /* Show the info panel by adding the .panel-open class (CSS handles animation) */
  infoPanel.classList.add("panel-open");

  /* Hide the default "click a marker" message */
  defaultMessage.classList.add("hidden");

  /* Show the location card */
  locationCard.classList.remove("hidden");

  /* Populate the card fields with this location's data */
  locationIcon.textContent      = loc.icon;
  locationName.textContent      = loc.name;
  locationStory.textContent     = loc.story;
  locationVerse.textContent     = loc.verse;
  locationVerseRef.textContent  = loc.verseRef;

  /* Populate the extra verses list */
  extraVersesList.innerHTML = "";   /* clear previous location's verses */
  loc.extraVerses.forEach((ev) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="ev-ref">${ev.ref}</span>
      <span>${ev.text}</span>
    `;
    extraVersesList.appendChild(li);
  });

  /* Show a quick tip */
  showRandomTip(loc);

  /* Simulate AI generating an explanation:
     1. Show the spinner for ~1.5 seconds
     2. Then reveal the AI text with a fade-in */
  startAiGeneration(loc);
}

/**
 * startAiGeneration(loc)
 * Simulates an AI generating content by:
 * 1. Showing a "Generating..." spinner
 * 2. After a delay, picking one of the pre-written AI explanations
 * 3. Fading it in on screen
 * @param {object} loc - The current location
 */
function startAiGeneration(loc) {
  /* Clear any previous AI text */
  aiExplanation.textContent = "";

  /* Show spinner, hide previous explanation */
  aiLoading.classList.remove("hidden");
  aiExplanation.classList.add("hidden");

  /* Pick a random AI explanation (avoid repeating the same one immediately) */
  let aiIndex;
  do {
    aiIndex = Math.floor(Math.random() * loc.aiExplanations.length);
  } while (aiIndex === lastAiIndex && loc.aiExplanations.length > 1);
  lastAiIndex = aiIndex;

  const chosenExplanation = loc.aiExplanations[aiIndex];

  /* Simulate AI "thinking" with a delay (between 1.2 and 2 seconds) */
  const delay = 1200 + Math.random() * 800;

  setTimeout(() => {
    /* Hide spinner */
    aiLoading.classList.add("hidden");

    /* Set the AI text and show it */
    aiExplanation.textContent = chosenExplanation;
    aiExplanation.classList.remove("hidden");

    /* Trigger the fade-in animation by briefly removing and re-adding the class */
    aiExplanation.style.animation = "none";
    void aiExplanation.offsetHeight; /* force browser to acknowledge the reset */
    aiExplanation.style.animation = "";

  }, delay);
}

/* Close button: hide panel and return to default message */
closePanel.addEventListener("click", () => {
  infoPanel.classList.remove("panel-open");
  currentLocation = null;

  /* After the panel close animation, restore default message */
  setTimeout(() => {
    locationCard.classList.add("hidden");
    defaultMessage.classList.remove("hidden");
  }, 350);   /* match the CSS transition duration */

  /* Close any open map popup */
  map.closePopup();
});


/* ================================================================
   7. QUICK TIP LOGIC
   ----------------------------------------------------------------
   Each location has an array of quickTips — short, one-line
   encouragements. We pick a random tip to display, and the user
   can click "New Tip ↻" to get a different one.
================================================================ */

/* DOM references for the quick tip */
const quickTipText = document.getElementById("quickTip");
const newTipBtn    = document.getElementById("newTipBtn");

/* Track the last tip index to avoid immediate repetition */
let lastTipIndex = -1;

/**
 * showRandomTip(loc)
 * Picks a random tip from the location's quickTips array and displays it.
 * @param {object} loc - The current location (or null to use currentLocation)
 */
function showRandomTip(loc) {
  const location = loc || currentLocation;
  if (!location) return;

  /* Pick a random tip, avoiding the same one twice in a row */
  let tipIndex;
  do {
    tipIndex = Math.floor(Math.random() * location.quickTips.length);
  } while (tipIndex === lastTipIndex && location.quickTips.length > 1);
  lastTipIndex = tipIndex;

  /* Apply a brief fade-out/fade-in animation for the tip change */
  quickTipText.style.opacity = "0";
  quickTipText.style.transition = "opacity 0.2s ease";

  setTimeout(() => {
    quickTipText.textContent = location.quickTips[tipIndex];
    quickTipText.style.opacity = "1";
  }, 200);
}

/* "New Tip" button: show a different random tip for the current location */
newTipBtn.addEventListener("click", () => {
  showRandomTip(null); /* null = use currentLocation */
});


/* ================================================================
   8. SEARCH BAR LOGIC
   ----------------------------------------------------------------
   As the user types in the search box:
   1. We filter LOCATIONS by name (case-insensitive)
   2. Show matching locations in a dropdown list
   3. When the user clicks a result:
      - Close the dropdown
      - Pan/zoom the map to that location
      - Open that location's info panel
================================================================ */

/* DOM references for search */
const searchInput   = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

/**
 * renderSearchResults(matches)
 * Clears and repopulates the search results dropdown.
 * @param {Array} matches - Array of location objects that match the query
 */
function renderSearchResults(matches) {
  searchResults.innerHTML = ""; /* clear previous results */

  if (matches.length === 0) {
    /* Show a "no results" message */
    const li = document.createElement("li");
    li.innerHTML = `<span class="result-icon">🔍</span><div><div class="result-name">No locations found</div><div class="result-sub">Try a different name</div></div>`;
    li.style.cursor = "default";
    searchResults.appendChild(li);
    searchResults.style.display = "block";
    return;
  }

  /* Create a list item for each matching location */
  matches.forEach((loc) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.setAttribute("aria-label", loc.name);
    li.innerHTML = `
      <span class="result-icon">${loc.icon}</span>
      <div>
        <div class="result-name">${loc.name}</div>
        <div class="result-sub">${loc.story.substring(0, 60)}...</div>
      </div>
    `;

    /* When a result is clicked, navigate to that location */
    li.addEventListener("click", () => {
      /* Clear search box and hide dropdown */
      searchInput.value = "";
      searchResults.style.display = "none";

      /* Fly the map to this location with a smooth animation */
      map.flyTo([loc.lat, loc.lng], 12, {
        animate: true,
        duration: 1.5,       /* seconds */
      });

      /* Open the marker's popup */
      if (markerMap[loc.name]) {
        setTimeout(() => {
          markerMap[loc.name].openPopup();
        }, 1500);             /* open after flyTo completes */
      }

      /* Open the info panel for this location */
      openLocationPanel(loc);
    });

    searchResults.appendChild(li);
  });

  /* Show the dropdown */
  searchResults.style.display = "block";
}

/* Listen for input events (fires on every keystroke) */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length === 0) {
    /* If input is empty, hide the dropdown */
    searchResults.style.display = "none";
    return;
  }

  /* Filter locations by name (case-insensitive partial match) */
  const matches = LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(query)
  );

  renderSearchResults(matches);
});

/* Close the search dropdown when the user clicks outside it */
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

/* Allow keyboard navigation in the search box */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchResults.style.display = "none";
    searchInput.blur();
  }
});


/* ================================================================
   9. UTILITY FUNCTIONS
   ----------------------------------------------------------------
   Small helper functions used throughout the application.
================================================================ */

/**
 * getRandomInt(min, max)
 * Returns a random integer between min (inclusive) and max (exclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Initialize the search results dropdown as hidden */
searchResults.style.display = "none";

/* Log a friendly message to the browser console */
console.log(
  "%c✦ AI Bible Map loaded successfully! Explore sacred places of Scripture. ✦",
  "color: #C9A84C; font-size: 14px; font-weight: bold; padding: 4px;"
);
