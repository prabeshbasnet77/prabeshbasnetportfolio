import { Project, Skill, Service, Testimonial, Message, Profile, SocialLinks } from './types';

export const INITIAL_PROFILE: Profile = {
  fullName: "Prabesh Basnet",
  professionalTitle: "Full-stack Developer & UI Designer",
  bio: "Crafting high-impact digital experiences that merge technical mastery with editorial elegance. Specialized in cinematic UI and robust system architectures.",
  emailAddress: "prabeshbasnet529@gmail.com",
  location: "Chitwan, Nepal",
  phone: "+977 9749849144",
  avatarUrl: "/public/ppp.webp"
};

export const INITIAL_SOCIALS: SocialLinks = {
  linkedIn: "",
  github: "github.com/prabeshbasnet77",
  Facebook: "facebook.com/prabeshbasnet1042",
  instagram: "instagram.com/prabeshbasnet_",
  youtube: "www.youtube.com/@perrinmusa"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj_1",
    title: "ESN Boarding School Website",
    category: "Web Design",
    description: "A modern and intuitive landing page design for an educational institution. The UI features a clean layout, accessible navigation, and a dynamic hero section that highlights key campus imagery alongside clear calls-to-action for admissions and notices. Key institutional metrics are prominently displayed to build credibility and engagement at a glance.",
    imageUrl: "https://cdn.discordapp.com/attachments/1225791669891371018/1513940349779706047/Screenshot_2026-06-09_220001.png?ex=6a298e53&is=6a283cd3&hm=479dd2fdcc8e165cf67ec50c43f9ac91755337b1bc78e8df591e900820989844&",
    liveLink: "https://boarding-school-project.vercel.app/",
    isPublic: true,
    dateAdded: "Oct 12, 2023"
  },
  {
    id: "proj_2",
    title: "BALLAS OFFICIAL SONG💜",
    category: "Video Editing",
    description: "A mobile app interface for a fitness tracking application. Dynamic data visualizations, circular progress indicators, and snapping dark mode interfaces.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513952261225582662/image.png?ex=6a29996a&is=6a2847ea&hm=5102955ee66cc8641efd85f49c532fe36f7b17dee54a905a0c778ea8034ffd4e&=&format=webp&quality=lossless&width=688&height=323",
    liveLink: "https://youtu.be/0mlx7fv2Efc?si=kuVSuyOXBSYKNK_p",
    isPublic: true,
    dateAdded: "Nov 04, 2023"
  },
  {
    id: "proj_3",
    title: "LICT Webpage Duplicate",
    category: "Web Design",
    description: "A precise front-end replication of the Lumbini ICT Campus institutional website. The project faithfully reconstructs the academic portal's user interface, featuring a multi-tier navigation header, an embedded campus introduction, a structured list of available degree programs (B.Sc. CSIT, BIM, BCA, BHM), and a dynamic sidebar designated for recent academic posts and admissions notices.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513943075469398076/image.png?ex=6a2990dc&is=6a283f5c&hm=492ca5b83ac27094796aa05a09ff187602b64a35b13c3cbae4beab29da75fcd9&=&format=webp&quality=lossless&width=1413&height=800",
    liveLink: "NOT LIVE",
    isPublic: true,
    dateAdded: "Jan 18, 2024"
  },
  {
    id: "proj_4",
    title: "Jhapalish : Raylas - Tile | Free Verse",
    category: "Video Editing",
    description: "An aggressive and raw video production showcase for the explicit Nepali rap track  Tile by Raylas under the Jhapalish collective. The project features clean, cinematic room lighting, dynamic framing, and a high-energy urban aesthetic that matches the unfiltering intensity of an 18+ free verse rap performance.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513949652691718314/6bbadde3-2a08-45ab-a640-c1eff9551413.png?ex=6a2996fd&is=6a28457d&hm=15435a75d75a9f919ef7dcdb42d74afe7475ebb32b46e1c2113f83d041de7da3&=&format=webp&quality=lossless&width=1423&height=800",
    liveLink: "https://youtu.be/VSJ69r95Nic?si=pdjB_M8guMEe0_3F",
    isPublic: true,
    dateAdded: "Feb 05, 2024"
  },
  {
  id: "proj_5",
    title: "I$H ~ Gaidey Club",
    category: "Video Editing",
    description: "An aggressive and raw video production showcase for the explicit Nepali rap track  Tile by Raylas under the Jhapalish collective. The project features clean, cinematic room lighting, dynamic framing, and a high-energy urban aesthetic that matches the unfiltering intensity of an 18+ free verse rap performance.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513951226889502840/image.png?ex=6a299874&is=6a2846f4&hm=c42eefec33d422de4dc0cb18b99f9fb7c793cfb551e14c2a2d9cac8b0d189f2a&=&format=webp&quality=lossless&width=688&height=358",
    liveLink: "https://youtu.be/dB8clBNckQw?si=_8vEiRJ5kHiWOyR5",
    isPublic: true,
    dateAdded: "Feb 05, 2024"
  },
  {
  id: "proj_6",
    title: "911 Porsche POSTER",
    category: "Photo Shop",
    description: "A high-impact, professional digital poster design showcasing the iconic Porsche 911 GT3 RS. The composition utilizes a bold, high-contrast color palette featuring a clean white vehicle render against a dramatic matte red background. The design is anchored by massive, stylized 911 typography that emphasizes the aggressive, motorsport-inspired aesthetic of the car.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513963828571013140/911.png?ex=6a29a430&is=6a2852b0&hm=9a8eab044ab03cfec7e7528fe49aebfde3fb84a98542f8b5e4fe4f842caaf1a7&=&format=webp&quality=lossless&width=568&height=800",
    liveLink: "https://media.discordapp.net/attachments/1225791669891371018/1513963828571013140/911.png?ex=6a29a430&is=6a2852b0&hm=9a8eab044ab03cfec7e7528fe49aebfde3fb84a98542f8b5e4fe4f842caaf1a7&=&format=webp&quality=lossless&width=568&height=800",
    isPublic: true,
    dateAdded: "Feb 05, 2024"
  },
  {
  id: "proj_7",
    title: "Hikari Banner",
    category: "Photo Shop",
    description: "A professional and wide-format banner design for Hikari International Language Hub Pvt. Ltd., showcasing their global education consultancy services. The design features a dynamic wave element in deep blue and vibrant orange that creates a sense of movement and connection across the composition. The background integrates a subtle world map overlaid with high-quality renders of iconic global landmarks—including the Colosseum, Big Ben, the Great Wall of China, the Eiffel Tower, Burj Khalifa, and the Leaning Tower of Pisa. To emphasize their international reach, the banner includes national flag icons for key study destinations such as Japan, the United Kingdom, Australia, Canada, and the United States.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513965604196057108/image.png?ex=6a29a5d8&is=6a285458&hm=1ad919cd969f9b6a803d449f37f3fafdc0d1713e64d88c90c6d30418aa1658ca&=&format=webp&quality=lossless&width=934&height=930",
    liveLink: "https://media.discordapp.net/attachments/1225791669891371018/1513963828969210137/hikari_banneer.png?ex=6a29a430&is=6a2852b0&hm=d9462796a7a3a5d87b1141d493113bcd82e47fdd15453860335a548d37790d85&=&format=webp&quality=lossless&width=1730&height=684",
    isPublic: true,
    dateAdded: "Feb 05, 2024"
  },
  {
  id: "proj_8",
    title: "Himawari Banner",
    category: "Photo Shop",
    description: "A vibrant and professional marketing poster designed for Himawari International Language School, focusing on educational opportunities in Japan. The layout uses a clean, modern aesthetic with a balanced mix of traditional and urban Japanese imagery—featuring iconic landmarks like Tokyo Tower, Mt. Fuji, and historic pagodas. The design effectively utilizes a bright orange and blue color palette to create visual hierarchy, highlighting core services such as student visa guidance, language school support, and university placement. Clear contact information and a location map at the bottom ensure a functional, conversion-oriented design suitable for consultancy branding.",
    imageUrl: "https://media.discordapp.net/attachments/1225791669891371018/1513964007952744548/mockup_235425.png?ex=6a29a45b&is=6a2852db&hm=5d78e2445c9ae833da676902a66c05f7522a4581a5073ded4d698b5469d86400&=&format=webp&quality=lossless&width=620&height=930",
    liveLink: "https://media.discordapp.net/attachments/1225791669891371018/1513966477789630675/image.png?ex=6a29a6a8&is=6a285528&hm=b0e3e214ac78fe2e46d72075d50bcb28f96918d3da9268291a694526a8125d1b&=&format=webp&quality=lossless&width=639&height=930",
    isPublic: true,
    dateAdded: "Feb 05, 2024"
  }

];

export const INITIAL_SKILLS: Skill[] = [
  { id: "sk_1", name: "React.js", category: "Frontend Engineering", proficiency: 94 },
  { id: "sk_2", name: "Three.js", category: "3D Graphics", proficiency: 82 },
  { id: "sk_3", name: "UI Design", category: "Visual Architecture", proficiency: 90 },
  { id: "sk_4", name: "Node.js", category: "Backend Systems", proficiency: 65 },
  { id: "sk_5", name: "Communication", category: "Communication", proficiency: 80 },
  { id: "sk_6", name: "Video Editing", category: "Video Editing", proficiency: 85 },
  { id: "sk_7", name: "Artificial Intelligence", category: "Artificial Intelligence", proficiency: 91 },
  { id: "sk_8", name: "Problem Solving", category: "General", proficiency: 90 }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "ser_1",
    title: "Web Design",
    description: "Creating visually stunning and user-centric website designs that convert visitors into customers.",
    icon: "web",
    tags: ["UI/UX", "Figma"],
    isActive: true
  },
  {
    id: "ser_2",
    title: "Front-End Dev",
    description: "Translating complex designs into pixel-perfect, responsive, and high-performance React code.",
    icon: "terminal",
    tags: ["React", "Next.js"],
    isActive: true
  },
  {
    id: "ser_3",
    title: "Graphic Design",
    description: "Crafting brand identities and marketing materials that resonate with your target audience.",
    icon: "draw",
    tags: ["Branding", "Identity"],
    isActive: true
  },
  {
    id: "ser_4",
    title: "Video Editing",
    description: "High-fidelity post-production, dynamic color grading, and seamless pacing to transform raw footage into production-ready, cinematic content.",
    icon: "devices",
    tags: ["Heuristic", "Analytics"],
    isActive: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    name: "CHAUDAGHAREY LIVE",
    title: "Content Creator",
    company: "Youtube",
    avatarUrl: "https://yt3.googleusercontent.com/td5Lmp9oUSjxnqbOhhcbFcANTQjEE4ZVGp0lLvqgYxbadawbwbjNJq_OWMggFvuSDnodr0Qb=s160-c-k-c0x00ffffff-no-rj",
    rating: 5,
    quote: "Working with Perrin on the official 'Ballas' music video completely elevated our community's digital identity. They took our in-game assets and transformed them into a high-fidelity, cinematic masterpiece. The pacing was razor-sharp, the custom purple color grading was stunning, and every frame was perfectly synchronized to the rhythm of the track. If you need high-end post-production that keeps viewers hooked from start to finish, this is the creator to hire.",
    status: "Approved"
  },
  {
    id: "test_2",
    name: "Sarah Jenkins",
    title: "Marketing Head",
    company: "Lumos",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuVmDwyMWSZqwHKcoGBqeXYzWPidDXrjJsNYQnDMckc78BZQyacE5axazD5qdP1OowfElBCw-Rcgk4hiWoUJpQZ9_zvXIVFQGglEwxnbOW8wttuRLn1yL3min9Q40QEC41v5qZEZ5Bbs-f6Weuj4lAU_FWeh3tv0HfNAyTn09UEn8lSkaQo2jBn7gm74ATeTegtpDYhflyiO01cQXaCMtAWRc6HgPyD965_vsE4KyNcKseQM4ksOPeHmhMkTGoER0Oype9wcqg52pT",
    rating: 4,
    quote: "Great work on the landing page! The animations are super smooth. Would love to collaborate again on our upcoming mobile launch.",
    status: "Pending"
  },
  {
    id: "test_3",
    name: "JHAPALISH",
    title: "Content Creator",
    company: "Youtube",
    avatarUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mNiOBWoGZL0yDYEdj1WADBypR2_2X6vfAK7DlP7hIw8N8=s160-c-k-c0x00ffffff-no-rj",
    rating: 5,
    quote: "Unmatched Energy and Visual Execution. Working on the 'Gaidey Club' and 'Raylas-Tile' project was an incredible experience in pushing digital visuals to the absolute limit. They took creative direction and amplified it with high-impact 3D graphics, flawless alignment to the track's rhythm, and a punchy, ultra-sharp finish. They have a rare ability to capture high-energy street culture and refine it into a premium, production-ready visual asset. An elite editor for anyone looking to stand out.",
    status: "Approved"
  },
  {
    id: "test_4",
    name: "Elena Vost",
    title: "Product Manager",
    company: "Flow",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0xiYZ3tNrXi5uTD6B9pgAfMkk84oOVMGhfplTFALOBpaWtjBDRIHBSY9PMOqchtcQ6i-Z5SUFIneuobkO37mrsL2u0xm1OKOlHRsUrynH0gHOrSWr4e03nJ6Hyx_L4N43uFLpsa84hPcN1Saf7mQXI27sEI_8yrqAqP7-qXkN0GfAnja3lQL4eu93VymXEEerFBbcoccc7jkSDZpqAG31gVWA3y4PuiXcGlwrxxmsUrYue-EGvUh4j8x6qixG3jdhGbWkOdEfvtO9",
    rating: 5,
    quote: "Incredible design eye. Prabesh understands user behavior better than anyone I've met. Our conversion rate increased by 40% after his redesign.",
    status: "Pending"
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg_1",
    name: "Alex Rivers",
    email: "alex.rivers@nebula.io",
    subject: "Project: Nebula Platform UI",
    message: "Hi Prabesh,\n\nI've been following your work for a while now, specifically your recent exploration of \"Cinematic Tech\" interfaces. The way you handle depth and illumination is exactly the aesthetic we're aiming for with the next version of the Nebula Platform.\n\nWe are building a data-visualization heavy dashboard for Video Editing monitoring. We want the users to feel like they are operating a premium instrument, not just looking at another flat SaaS page. Your background in glassmorphism and precision layout seems like a perfect match for our vision.\n\nAre you currently taking on new projects? We'd love to schedule a brief call this week to walk you through our requirements and see if there's a fit for a long-term collaboration.\n\nBest regards,\nAlex Rivers\nLEAD PRODUCT MANAGER @ NEBULA.IO",
    timestamp: "10:45 AM",
    isNew: true,
    replies: [],
    avatarSeed: "AR"
  },
  {
    id: "msg_2",
    name: "Sarah Jenkins",
    email: "sarah.j@lumoshq.com",
    subject: "Collaboration Opportunity",
    message: "Hi Prabesh, we are looking for a freelance lead designer for a 3-month contract focusing on mobile design and some lightweight Tailwind frontend coding. We loved your FitTrack Pro portfolio showcase!",
    timestamp: "Yesterday",
    isNew: true,
    replies: [],
    avatarSeed: "SJ"
  },
  {
    id: "msg_3",
    name: "Marcus Thorne",
    email: "m.thorne@cloudstream.co",
    subject: "Design Audit Inquiry",
    message: "Our current web application needs a visual overhaul to match modern premium standards. Would you be open to auditing our interface and proposing recommendations?",
    timestamp: "Oct 24, 2026",
    isNew: false,
    replies: ["Hi Marcus, absolutely! I offer a comprehensive UI/UX Audit layout service that deep-dives into usability friction, design systems consistency, and brand identity alignment. I'll send over my detailed checklist program soon."],
    avatarSeed: "MT"
  },
  {
    id: "msg_4",
    name: "Elena Wright",
    email: "elena.w@flowlabs.ca",
    subject: "Re: Portfolio Feedback",
    message: "Just wanted to say your glassmorphism implementation is flawless. Thanks for the quick tips earlier on how to setup backdrop-filters in complex layout components!",
    timestamp: "Oct 22, 2026",
    isNew: false,
    replies: [],
    avatarSeed: "EW"
  }
];
