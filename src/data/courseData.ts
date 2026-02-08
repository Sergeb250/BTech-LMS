export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  type: 'lesson' | 'lab';
}

export interface Day {
  dayNumber: number;
  title: string;
  part: string;
  videos: Video[];
  isLocked: boolean;
}

export interface CourseFile {
  id: string;
  title: string;
  type: 'labs' | 'book' | 'questions';
  url: string;
  description: string;
}

// Helper to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:v=|\/)([\w-]{11})(?:&|$)/);
  return match ? match[1] : '';
};

export const courseInfo = {
  title: "CCNA (200-301) Complete Training",
  provider: "B Technologies Africa",
  instructor: "Serge Benit",
  certificate: "CCNA Course Completion Certificate (Training – Not Official Cisco Certification)",
  description: "Master networking fundamentals with our comprehensive 65-day CCNA training program. From network devices to automation, gain the skills needed for your networking career.",
  totalDays: 65,
  paymentDeadline: new Date(), // Set to today for testing
  momoPayNumber: "*182*8*1*729421#", // Merchant Code: 729421 (Serge Benit)

  // -------------------------------------------------------------
  // [SECURE] UNLOCK CODES - GENERATED FOR ADMIN USE
  // Provide these codes to students after payment verification.
  // -------------------------------------------------------------
  unlockCodes: [
    "CCNA-MASTERY-2026",
    "NETWORK-PRO-X99",
    "CISCO-DEV-V3",
    "KIGALI-TECH-HUB",
    "AFRICA-NET-2026",
    "ROUTER-SWITCH-Z1",
    "IP-SECURITY-PLUS",
    "AUTO-PRO-ADMIN",
    "SERGE-BENIT-VIP",
    "BTECH-OFFICIAL-10"
  ],
  price: 100000, // Price in RWF
};

export const courseFiles: CourseFile[] = [
  {
    id: 'labs',
    title: 'Packet Tracer Labs & Anki Questions',
    type: 'labs',
    url: 'https://drive.google.com/file/d/1Cjh9Qeeubi82xz-pXseY0WbLrCB40WlF/view?usp=sharing',
    description: 'Hands-on practice labs and flashcard questions'
  },
  {
    id: 'questions',
    title: 'CCNA Practice Questions',
    type: 'questions',
    url: 'https://drive.google.com/file/d/1PgZF6i6t4EZvBro5dLiwpt3-rrdhzzu0/view?usp=sharing',
    description: 'Practice exam questions'
  }
];

export const courseDays: Day[] = [
  // Part 1: Networking Fundamentals
  {
    dayNumber: 1,
    title: "Network Devices",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d1-lesson", title: "Network Devices", youtubeId: "H8W9oMNSuwo", type: "lesson" },
      { id: "d1-lab", title: "Lab: Packet Tracer Introduction", youtubeId: "a1Im6GYaSno", type: "lab" }
    ]
  },
  {
    dayNumber: 2,
    title: "Interfaces and Cables",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d2-lesson", title: "Interfaces and Cables", youtubeId: "ieTH5lVhNaY", type: "lesson" },
      { id: "d2-lab", title: "Lab: Connecting Devices", youtubeId: "K6Qt23sY68Y", type: "lab" }
    ]
  },
  {
    dayNumber: 3,
    title: "OSI Model & TCP/IP Suite",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d3-lesson", title: "OSI Model & TCP/IP Suite", youtubeId: "yM-XNq9ADlI", type: "lesson" },
      { id: "d3-lab", title: "Lab: OSI Model", youtubeId: "7nmYoL0t2tU", type: "lab" }
    ]
  },
  {
    dayNumber: 4,
    title: "Intro to the CLI",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d4-lesson", title: "Intro to the CLI", youtubeId: "IYbtai7Nu2g", type: "lesson" },
      { id: "d4-lab", title: "Lab: Basic Device Security", youtubeId: "SDocmq1c05s", type: "lab" }
    ]
  },
  {
    dayNumber: 5,
    title: "Ethernet LAN Switching (Part 1)",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d5-lesson", title: "Ethernet LAN Switching (Part 1)", youtubeId: "u2n762WG0Vo", type: "lesson" }
    ]
  },
  {
    dayNumber: 6,
    title: "Ethernet LAN Switching (Part 2)",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d6-lesson", title: "Ethernet LAN Switching (Part 2)", youtubeId: "5q1pqdmdPjo", type: "lesson" },
      { id: "d6-lab", title: "Lab: Analyzing Ethernet Switching", youtubeId: "Ig0dSaOQDI8", type: "lab" }
    ]
  },
  {
    dayNumber: 7,
    title: "IPv4 Addressing (Part 1)",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d7-lesson", title: "IPv4 Addressing (Part 1)", youtubeId: "3ROdsfEUuhs", type: "lesson" }
    ]
  },
  {
    dayNumber: 8,
    title: "IPv4 Addressing (Part 2)",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d8-lesson", title: "IPv4 Addressing (Part 2)", youtubeId: "FiAatRd84XI", type: "lesson" },
      { id: "d8-lab", title: "Lab: Configuring IP Addresses", youtubeId: "e1jbvyMeS5I", type: "lab" }
    ]
  },
  {
    dayNumber: 9,
    title: "Switch Interfaces",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d9-lesson", title: "Switch Interfaces", youtubeId: "cCqluocfQe0", type: "lesson" },
      { id: "d9-lab", title: "Lab: Configuring Switch Interfaces", youtubeId: "rzDb5DoBKRk", type: "lab" }
    ]
  },
  {
    dayNumber: 10,
    title: "The IPv4 Header",
    part: "Networking Fundamentals",
    isLocked: false,
    videos: [
      { id: "d10-lesson", title: "The IPv4 Header", youtubeId: "aQB22y4liXA", type: "lesson" }
    ]
  },
  // Part 2: Routing & IP Connectivity
  {
    dayNumber: 11,
    title: "Routing Fundamentals & Static Routing",
    part: "Routing & IP Connectivity",
    isLocked: false,
    videos: [
      { id: "d11-lesson1", title: "Routing Fundamentals", youtubeId: "aHwAm8GYbn8", type: "lesson" },
      { id: "d11-lesson2", title: "Static Routing", youtubeId: "YCv4-_sMvYE", type: "lesson" },
      { id: "d11-lab", title: "Lab: Configuring Static Routes", youtubeId: "XHxOtIav2k8", type: "lab" },
      { id: "d11-troubleshoot", title: "Troubleshooting Static Routes", youtubeId: "3z8YGEVFTiA", type: "lesson" }
    ]
  },
  {
    dayNumber: 12,
    title: "Life of a Packet",
    part: "Routing & IP Connectivity",
    isLocked: false,
    videos: [
      { id: "d12-lesson", title: "Life of a Packet", youtubeId: "4YrYV2io3as", type: "lesson" },
      { id: "d12-lab", title: "Lab: Life of a Packet", youtubeId: "bfsEqDeHbpI", type: "lab" }
    ]
  },
  {
    dayNumber: 13,
    title: "Subnetting (Part 1)",
    part: "Routing & IP Connectivity",
    isLocked: false,
    videos: [
      { id: "d13-lesson", title: "Subnetting (Part 1)", youtubeId: "bQ8sdpGQu8c", type: "lesson" }
    ]
  },
  {
    dayNumber: 14,
    title: "Subnetting (Part 2)",
    part: "Routing & IP Connectivity",
    isLocked: false,
    videos: [
      { id: "d14-lesson", title: "Subnetting (Part 2)", youtubeId: "IGhd-0di0Qo", type: "lesson" }
    ]
  },
  {
    dayNumber: 15,
    title: "Subnetting (Part 3 - VLSM)",
    part: "Routing & IP Connectivity",
    isLocked: false,
    videos: [
      { id: "d15-lesson", title: "Subnetting (Part 3 - VLSM)", youtubeId: "z-JqCedc9EI", type: "lesson" },
      { id: "d15-lab", title: "Lab: VLSM", youtubeId: "Rn_E1Qv8--I", type: "lab" }
    ]
  },
  // Part 3: Switching & VLANs
  {
    dayNumber: 16,
    title: "VLANs (Part 1)",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d16-lesson", title: "VLANs (Part 1)", youtubeId: "cjFzOnm6u1g", type: "lesson" },
      { id: "d16-lab", title: "Lab: VLANs (Part 1)", youtubeId: "-tq7f3xtyLQ", type: "lab" }
    ]
  },
  {
    dayNumber: 17,
    title: "VLANs (Part 2)",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d17-lesson", title: "VLANs (Part 2)", youtubeId: "Jl9OOzNaBDU", type: "lesson" },
      { id: "d17-lab", title: "Lab: VLANs (Part 2)", youtubeId: "iRkFE_lpYgc", type: "lab" }
    ]
  },
  {
    dayNumber: 18,
    title: "VLANs (Part 3)",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d18-lesson", title: "VLANs (Part 3)", youtubeId: "OkPB028l2eE", type: "lesson" },
      { id: "d18-lab", title: "Lab: Multilayer Switching", youtubeId: "MQcCr3QW1vE", type: "lab" }
    ]
  },
  {
    dayNumber: 19,
    title: "DTP & VTP",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d19-lesson", title: "DTP & VTP", youtubeId: "JtQV_0Sjszg", type: "lesson" },
      { id: "d19-lab", title: "Lab: DTP & VTP", youtubeId: "ngTns2vF_44", type: "lab" }
    ]
  },
  {
    dayNumber: 20,
    title: "Spanning Tree Protocol (Part 1)",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d20-lesson", title: "Spanning Tree Protocol (Part 1)", youtubeId: "j-bK-EFt9cY", type: "lesson" },
      { id: "d20-lab", title: "Lab: Analyzing STP", youtubeId: "Ev9gy7B5hx0", type: "lab" }
    ]
  },
  {
    dayNumber: 21,
    title: "Spanning Tree Protocol (Part 2)",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d21-lesson", title: "Spanning Tree Protocol (Part 2)", youtubeId: "nWpldCc8msY", type: "lesson" },
      { id: "d21-lab1", title: "Lab: Configuring STP", youtubeId: "zqzppl4LOwk", type: "lab" },
      { id: "d21-lab2", title: "Lab: STP Configuration 2", youtubeId: "jfC_AeJnuhY", type: "lab" },
      { id: "d21-lab3", title: "Lab: STP Configuration 3", youtubeId: "2XE_PgkvSic", type: "lab" },
      { id: "d21-lab4", title: "Lab: STP Configuration 4", youtubeId: "uJ5_Klha0ig", type: "lab" },
      { id: "d21-lab5", title: "Lab: STP Configuration 5", youtubeId: "5rpaeJNig2o", type: "lab" }
    ]
  },
  {
    dayNumber: 22,
    title: "Rapid STP",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d22-lesson", title: "Rapid STP", youtubeId: "EpazNsLlPps", type: "lesson" },
      { id: "d22-lab", title: "Lab: Rapid STP", youtubeId: "YG7r4XHy2JU", type: "lab" }
    ]
  },
  {
    dayNumber: 23,
    title: "EtherChannel",
    part: "Switching & VLANs",
    isLocked: false,
    videos: [
      { id: "d23-lesson", title: "EtherChannel", youtubeId: "xuo69Joy_Nc", type: "lesson" },
      { id: "d23-lab", title: "Lab: EtherChannel", youtubeId: "8gKF2fMMjA8", type: "lab" }
    ]
  },
  // Part 4: Dynamic Routing
  {
    dayNumber: 24,
    title: "Dynamic Routing",
    part: "Dynamic Routing",
    isLocked: false,
    videos: [
      { id: "d24-lesson", title: "Dynamic Routing", youtubeId: "xSTgb8JLkvs", type: "lesson" },
      { id: "d24-lab", title: "Lab: Floating Static Routes", youtubeId: "KuKC0G3LZc8", type: "lab" }
    ]
  },
  {
    dayNumber: 25,
    title: "RIP & EIGRP",
    part: "Dynamic Routing",
    isLocked: false,
    videos: [
      { id: "d25-lesson", title: "RIP & EIGRP", youtubeId: "N8PiZDld6Zc", type: "lesson" },
      { id: "d25-lab", title: "Lab: Configuring EIGRP", youtubeId: "ffnJ5oBIObY", type: "lab" }
    ]
  },
  {
    dayNumber: 26,
    title: "OSPF (Part 1)",
    part: "Dynamic Routing",
    isLocked: false,
    videos: [
      { id: "d26-lesson", title: "OSPF (Part 1)", youtubeId: "pvuaoJ9YzoI", type: "lesson" },
      { id: "d26-lab", title: "Lab: Configuring OSPF (1)", youtubeId: "LeLRWjfylcs", type: "lab" }
    ]
  },
  {
    dayNumber: 27,
    title: "OSPF (Part 2)",
    part: "Dynamic Routing",
    isLocked: false,
    videos: [
      { id: "d27-lesson", title: "OSPF (Part 2)", youtubeId: "VtzfTA21ht0", type: "lesson" },
      { id: "d27-lab", title: "Lab: Configuring OSPF (2)", youtubeId: "UEyQW-EcnY8", type: "lab" }
    ]
  },
  {
    dayNumber: 28,
    title: "OSPF (Part 3)",
    part: "Dynamic Routing",
    isLocked: false,
    videos: [
      { id: "d28-lesson", title: "OSPF (Part 3)", youtubeId: "3ew26ujkiDI", type: "lesson" },
      { id: "d28-lab", title: "Lab: Configuring OSPF (3)", youtubeId: "Goekjm3bK5o", type: "lab" }
    ]
  },
  // Part 5: IP Services & Security
  {
    dayNumber: 29,
    title: "FHRP (HSRP)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d29-lesson", title: "FHRP (HSRP)", youtubeId: "43WnpwQMolo", type: "lesson" },
      { id: "d29-lab", title: "Lab: Configuring HSRP", youtubeId: "uho5Z2nFhb8", type: "lab" }
    ]
  },
  {
    dayNumber: 30,
    title: "TCP & UDP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d30-lesson", title: "TCP & UDP", youtubeId: "LIEACBqlntY", type: "lesson" },
      { id: "d30-lab", title: "Lab: Wireshark Demo (TCP/UDP)", youtubeId: "pJKFahkqMU8", type: "lab" }
    ]
  },
  {
    dayNumber: 31,
    title: "IPv6 (Part 1)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d31-lesson", title: "IPv6 (Part 1)", youtubeId: "ZNuXyOXae5U", type: "lesson" },
      { id: "d31-lab", title: "Lab: Configuring IPv6 (1)", youtubeId: "BdsIahtrWIA", type: "lab" }
    ]
  },
  {
    dayNumber: 32,
    title: "IPv6 (Part 2)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d32-lesson", title: "IPv6 (Part 2)", youtubeId: "BrTMMOXFhDU", type: "lesson" },
      { id: "d32-lab", title: "Lab: Configuring IPv6 (2)", youtubeId: "Zfhpd7dl6QI", type: "lab" }
    ]
  },
  {
    dayNumber: 33,
    title: "IPv6 (Part 3)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d33-lesson", title: "IPv6 (Part 3)", youtubeId: "rwkHfsWQwy8", type: "lesson" },
      { id: "d33-lab", title: "Lab: Configuring IPv6 (3)", youtubeId: "WSBEVFANMmc", type: "lab" }
    ]
  },
  {
    dayNumber: 34,
    title: "Standard ACLs",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d34-lesson", title: "Standard ACLs", youtubeId: "z023_eRUtSo", type: "lesson" },
      { id: "d34-lab", title: "Lab: Standard ACLs", youtubeId: "sJ8PXmiAkvs", type: "lab" }
    ]
  },
  {
    dayNumber: 35,
    title: "Extended ACLs",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d35-lesson", title: "Extended ACLs", youtubeId: "dUttKY_CNXE", type: "lesson" },
      { id: "d35-lab", title: "Lab: Extended ACLs", youtubeId: "1cuMzWBrEYs", type: "lab" }
    ]
  },
  {
    dayNumber: 36,
    title: "CDP & LLDP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d36-lesson", title: "CDP & LLDP", youtubeId: "_hnMZBzXRRk", type: "lesson" },
      { id: "d36-lab", title: "Lab: CDP & LLDP", youtubeId: "4s8qqL7R9W8", type: "lab" }
    ]
  },
  {
    dayNumber: 37,
    title: "NTP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d37-lesson", title: "NTP", youtubeId: "qGJaJx7OfUo", type: "lesson" },
      { id: "d37-lab", title: "Lab: NTP", youtubeId: "Miys7Ft9wWI", type: "lab" }
    ]
  },
  {
    dayNumber: 38,
    title: "DNS",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d38-lesson", title: "DNS", youtubeId: "4C6eeQes4cs", type: "lesson" },
      { id: "d38-lab", title: "Lab: DNS", youtubeId: "7D_FapNrRUM", type: "lab" }
    ]
  },
  {
    dayNumber: 39,
    title: "DHCP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d39-lesson", title: "DHCP", youtubeId: "hzkleGAC2_Y", type: "lesson" },
      { id: "d39-lab", title: "Lab: DHCP", youtubeId: "cgMsoIQB9Wk", type: "lab" }
    ]
  },
  {
    dayNumber: 40,
    title: "SNMP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d40-lesson", title: "SNMP", youtubeId: "HXu0Ifj0oWU", type: "lesson" },
      { id: "d40-lab", title: "Lab: SNMP", youtubeId: "v8WxIytUdS4", type: "lab" }
    ]
  },
  {
    dayNumber: 41,
    title: "Syslog",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d41-lesson", title: "Syslog", youtubeId: "RaQPSKQ4J5A", type: "lesson" },
      { id: "d41-lab", title: "Lab: Syslog", youtubeId: "-R_CYM6Wm-Y", type: "lab" }
    ]
  },
  {
    dayNumber: 42,
    title: "SSH",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d42-lesson", title: "SSH", youtubeId: "AvgYqI2qSD4", type: "lesson" },
      { id: "d42-lab", title: "Lab: SSH", youtubeId: "QnHq7iCOtTc", type: "lab" }
    ]
  },
  {
    dayNumber: 43,
    title: "FTP & TFTP",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d43-lesson", title: "FTP & TFTP", youtubeId: "50hcfsoBf4Q", type: "lesson" },
      { id: "d43-lab", title: "Lab: FTP & TFTP", youtubeId: "W9PLvA2wZ28", type: "lab" }
    ]
  },
  {
    dayNumber: 44,
    title: "NAT (Part 1 - Static)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d44-lesson", title: "NAT (Part 1 - Static)", youtubeId: "2TZCfTgopeg", type: "lesson" },
      { id: "d44-lab", title: "Lab: Static NAT", youtubeId: "vir6n_NVZFw", type: "lab" }
    ]
  },
  {
    dayNumber: 45,
    title: "NAT (Part 2 - Dynamic)",
    part: "IP Services & Security",
    isLocked: false,
    videos: [
      { id: "d45-lesson", title: "NAT (Part 2 - Dynamic)", youtubeId: "kILDNs4KjYE", type: "lesson" },
      { id: "d45-lab", title: "Lab: Dynamic NAT", youtubeId: "vNs1xxiwGJs", type: "lab" }
    ]
  },
  // Part 6: Advanced Services & Automation
  {
    dayNumber: 46,
    title: "QoS (Part 1)",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d46-lesson", title: "QoS (Part 1)", youtubeId: "H6FKJMiiL6E", type: "lesson" },
      { id: "d46-lab", title: "Lab: Voice VLANs", youtubeId: "kGX76QNIjsE", type: "lab" }
    ]
  },
  {
    dayNumber: 47,
    title: "QoS (Part 2)",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d47-lesson", title: "QoS (Part 2)", youtubeId: "4vurfhVjcMM", type: "lesson" },
      { id: "d47-lab", title: "Lab: QoS", youtubeId: "63tD4t8189k", type: "lab" }
    ]
  },
  {
    dayNumber: 48,
    title: "Security Fundamentals",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d48-lesson", title: "Security Fundamentals", youtubeId: "VvFuieyTTSw", type: "lesson" },
      { id: "d48-lab", title: "Lab: Kali Linux Demo", youtubeId: "EBs47-0ZD-A", type: "lab" }
    ]
  },
  {
    dayNumber: 49,
    title: "Port Security",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d49-lesson", title: "Port Security", youtubeId: "sHN3jOJIido", type: "lesson" },
      { id: "d49-lab", title: "Lab: Port Security", youtubeId: "zZwhrxKeGj8", type: "lab" }
    ]
  },
  {
    dayNumber: 50,
    title: "DHCP Snooping",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d50-lesson", title: "DHCP Snooping", youtubeId: "qYYeg2kz1yE", type: "lesson" },
      { id: "d50-lab", title: "Lab: DHCP Snooping", youtubeId: "YMom_e545H4", type: "lab" }
    ]
  },
  {
    dayNumber: 51,
    title: "Dynamic ARP Inspection",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d51-lesson", title: "Dynamic ARP Inspection", youtubeId: "HwbTKaIvL6s", type: "lesson" },
      { id: "d51-lab", title: "Lab: DAI", youtubeId: "oLF2mbmYMAk", type: "lab" }
    ]
  },
  {
    dayNumber: 52,
    title: "LAN Architectures",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d52-lesson", title: "LAN Architectures", youtubeId: "PvyEcLhmNBk", type: "lesson" },
      { id: "d52-lab", title: "Lab: STP & FHRP Sync", youtubeId: "BgIEhyoETgU", type: "lab" }
    ]
  },
  {
    dayNumber: 53,
    title: "WAN Architectures",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d53-lesson", title: "WAN Architectures", youtubeId: "BW3fQgdf4-w", type: "lesson" },
      { id: "d53-lab", title: "Lab: GRE Tunnels", youtubeId: "_MMuU5viinM", type: "lab" }
    ]
  },
  {
    dayNumber: 54,
    title: "Cloud & Virtualization",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d54-lesson", title: "Cloud & Virtualization", youtubeId: "_S3greGajJA", type: "lesson" },
      { id: "d54-lab1", title: "Lab: Containers", youtubeId: "K731pAS22Aw", type: "lab" },
      { id: "d54-lab2", title: "Lab: Virtualization", youtubeId: "swqADfQk2jM", type: "lab" }
    ]
  },
  {
    dayNumber: 55,
    title: "Wireless Fundamentals",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d55-lesson", title: "Wireless Fundamentals", youtubeId: "zuYiktLqNYQ", type: "lesson" }
    ]
  },
  {
    dayNumber: 56,
    title: "Wireless Architectures",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d56-lesson", title: "Wireless Architectures", youtubeId: "uX1h0F6wpBY", type: "lesson" }
    ]
  },
  {
    dayNumber: 57,
    title: "Wireless Security",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d57-lesson", title: "Wireless Security", youtubeId: "wHXKo9So5y8", type: "lesson" }
    ]
  },
  {
    dayNumber: 58,
    title: "Wireless Configuration",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d58-lesson", title: "Wireless Configuration", youtubeId: "r9o6GFI87go", type: "lesson" },
      { id: "d58-lab", title: "Lab: Wireless LANs", youtubeId: "Il8ev78fcqw", type: "lab" }
    ]
  },
  {
    dayNumber: 59,
    title: "Network Automation (Intro)",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d59-lesson", title: "Network Automation (Intro)", youtubeId: "4tsBgMCPVuc", type: "lesson" }
    ]
  },
  {
    dayNumber: 60,
    title: "JSON, XML, YAML",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d60-lesson", title: "JSON, XML, YAML", youtubeId: "nohde2-QNJ4", type: "lesson" }
    ]
  },
  {
    dayNumber: 61,
    title: "REST APIs",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d61-lesson", title: "REST APIs", youtubeId: "Luei0p-2h10", type: "lesson" }
    ]
  },
  {
    dayNumber: 62,
    title: "SDN (Software Defined Networking)",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d62-lesson", title: "SDN", youtubeId: "7HhWCeXDTpA", type: "lesson" }
    ]
  },
  {
    dayNumber: 63,
    title: "Ansible, Puppet, Chef",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d63-lesson", title: "Ansible, Puppet, Chef", youtubeId: "Kog9gHTjALI", type: "lesson" }
    ]
  },
  {
    dayNumber: 64,
    title: "Capstone Project",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: [
      { id: "d64-lesson", title: "Capstone Project", youtubeId: "2p7-MluKAgE", type: "lesson" }
    ]
  },
  {
    dayNumber: 65,
    title: "Ready for CCNA Exam",
    part: "Advanced Services & Automation",
    isLocked: false,
    videos: []
  }
];

// Quiz questions for each day (sample - in production, these would come from a database)
export const quizQuestions: Record<number, { question: string; options: string[]; correct: number }[]> = {
  1: [
    { question: "What is the primary function of a router?", options: ["Forward frames based on MAC addresses", "Connect devices in a LAN", "Route packets between networks", "Provide wireless connectivity"], correct: 2 },
    { question: "Which device operates at Layer 2 of the OSI model?", options: ["Router", "Switch", "Hub", "Firewall"], correct: 1 },
    { question: "What type of cable is used to connect a PC to a switch?", options: ["Crossover cable", "Straight-through cable", "Rollover cable", "Coaxial cable"], correct: 1 },
    { question: "Which protocol is used to manage network devices?", options: ["HTTP", "SNMP", "FTP", "SMTP"], correct: 1 },
    { question: "What is the purpose of a firewall?", options: ["Amplify signals", "Filter network traffic", "Connect wireless devices", "Assign IP addresses"], correct: 1 }
  ]
};

// Helper function to check if payment is required (Monthly Logic)
export const isPaymentRequired = (enrolledAt?: string): boolean => {
  const today = new Date();

  // If we have an enrollment date, check if 30 days have passed since then (or since last payment)
  // For simplicity MVP: If enrolled_at + 30 days < today, require payment again.
  if (enrolledAt) {
    const joinDate = new Date(enrolledAt);
    const nextPaymentDate = new Date(joinDate);
    nextPaymentDate.setDate(joinDate.getDate() + 30);
    return today >= nextPaymentDate;
  }

  // Fallback to static deadline if no enrollment date provided
  return today >= courseInfo.paymentDeadline;
};

// Helper function to calculate course progress
export const calculateProgress = (completedDays: number[]): number => {
  return Math.round((completedDays.length / courseInfo.totalDays) * 100);
};
