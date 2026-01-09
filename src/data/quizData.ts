export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
}

export interface DayQuiz {
  dayNumber: number;
  title: string;
  questions: QuizQuestion[];
}

export const quizData: DayQuiz[] = [
  {
    dayNumber: 1,
    title: "Network Devices",
    questions: [
      {
        question: "Which network device operates at Layer 2 of the OSI model and makes forwarding decisions based on MAC addresses?",
        options: ["Router", "Switch", "Hub", "Firewall"],
        correctAnswer: 1
      },
      {
        question: "What is the primary function of a router in a network?",
        options: ["Connect devices within the same network", "Route traffic between different networks", "Amplify signals", "Filter traffic based on MAC addresses"],
        correctAnswer: 1
      },
      {
        question: "Which device broadcasts all incoming traffic to all ports except the source port?",
        options: ["Switch", "Router", "Hub", "Bridge"],
        correctAnswer: 2
      },
      {
        question: "What type of device is used to connect multiple networks and make forwarding decisions based on IP addresses?",
        options: ["Hub", "Switch", "Router", "Repeater"],
        correctAnswer: 2
      },
      {
        question: "Which network device can operate at multiple layers of the OSI model and provide both switching and routing functions?",
        options: ["Hub", "Multilayer switch", "Bridge", "Repeater"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 2,
    title: "Interfaces and Cables",
    questions: [
      {
        question: "What is the maximum cable length for a standard Ethernet Cat5e/Cat6 cable?",
        options: ["50 meters", "100 meters", "150 meters", "200 meters"],
        correctAnswer: 1
      },
      {
        question: "Which cable type is used to connect two similar devices directly (e.g., switch to switch)?",
        options: ["Straight-through cable", "Crossover cable", "Rollover cable", "Fiber optic cable"],
        correctAnswer: 1
      },
      {
        question: "What type of cable is typically used to connect a computer to a router's console port?",
        options: ["Straight-through cable", "Crossover cable", "Rollover cable", "Coaxial cable"],
        correctAnswer: 2
      },
      {
        question: "Which Ethernet standard supports speeds up to 1 Gbps over copper cabling?",
        options: ["10BASE-T", "100BASE-TX", "1000BASE-T", "10GBASE-T"],
        correctAnswer: 2
      },
      {
        question: "What is the main advantage of fiber optic cables over copper cables?",
        options: ["Lower cost", "Easier installation", "Longer distance and immunity to EMI", "Better compatibility"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 3,
    title: "OSI Model & TCP/IP Suite",
    questions: [
      {
        question: "How many layers does the OSI model have?",
        options: ["5", "7", "4", "6"],
        correctAnswer: 1
      },
      {
        question: "Which OSI layer is responsible for end-to-end communication and error recovery?",
        options: ["Network Layer", "Data Link Layer", "Transport Layer", "Session Layer"],
        correctAnswer: 2
      },
      {
        question: "At which OSI layer does a router operate?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correctAnswer: 2
      },
      {
        question: "Which TCP/IP layer corresponds to the OSI Physical and Data Link layers?",
        options: ["Internet Layer", "Network Access Layer", "Transport Layer", "Application Layer"],
        correctAnswer: 1
      },
      {
        question: "What is the Protocol Data Unit (PDU) at the Transport Layer called?",
        options: ["Frame", "Packet", "Segment", "Data"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 4,
    title: "Intro to the CLI",
    questions: [
      {
        question: "Which command is used to enter privileged EXEC mode on a Cisco device?",
        options: ["enable", "configure terminal", "login", "exec"],
        correctAnswer: 0
      },
      {
        question: "What command is used to save the running configuration to the startup configuration?",
        options: ["save config", "write memory", "copy run start", "Both B and C"],
        correctAnswer: 3
      },
      {
        question: "Which command enters global configuration mode?",
        options: ["enable", "config t", "configure", "setup"],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of the 'no' command in Cisco IOS?",
        options: ["Deny access", "Remove or disable a configuration", "Exit configuration mode", "Display negative output"],
        correctAnswer: 1
      },
      {
        question: "Which command displays the current configuration that is running on the device?",
        options: ["show startup-config", "show running-config", "show config", "display config"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 5,
    title: "Ethernet LAN Switching (Part 1)",
    questions: [
      {
        question: "What is the format of a MAC address?",
        options: ["32-bit binary", "48-bit hexadecimal", "64-bit decimal", "128-bit hexadecimal"],
        correctAnswer: 1
      },
      {
        question: "How does a switch learn MAC addresses?",
        options: ["Manually configured", "By examining source MAC addresses of incoming frames", "By examining destination MAC addresses", "Through DHCP"],
        correctAnswer: 1
      },
      {
        question: "What does a switch do when it receives a frame with an unknown destination MAC address?",
        options: ["Drops the frame", "Forwards it to the default gateway", "Floods it out all ports except the source port", "Sends an error message"],
        correctAnswer: 2
      },
      {
        question: "What is the maximum number of MAC addresses a switch can typically store in its MAC address table?",
        options: ["256", "1,024", "Varies by switch model (typically thousands)", "Unlimited"],
        correctAnswer: 2
      },
      {
        question: "What happens to MAC address table entries if no traffic is received from that address for a period of time?",
        options: ["They are marked as inactive", "They are aged out and removed", "They are archived", "Nothing happens"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 6,
    title: "Ethernet LAN Switching (Part 2)",
    questions: [
      {
        question: "What is the default aging time for MAC address table entries on most Cisco switches?",
        options: ["30 seconds", "60 seconds", "300 seconds (5 minutes)", "600 seconds (10 minutes)"],
        correctAnswer: 2
      },
      {
        question: "Which switching method begins forwarding a frame before the entire frame is received?",
        options: ["Store-and-forward", "Cut-through", "Fragment-free", "Adaptive switching"],
        correctAnswer: 1
      },
      {
        question: "What is the main advantage of store-and-forward switching?",
        options: ["Lowest latency", "Error checking before forwarding", "Fastest processing", "Less memory required"],
        correctAnswer: 1
      },
      {
        question: "What type of frame does a switch receive when a broadcast is sent?",
        options: ["Unicast frame", "Multicast frame", "Broadcast frame with destination MAC FF:FF:FF:FF:FF:FF", "Anycast frame"],
        correctAnswer: 2
      },
      {
        question: "What command shows the MAC address table on a Cisco switch?",
        options: ["show mac table", "show mac-address-table", "display mac addresses", "show addresses"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 7,
    title: "IPv4 Addressing (Part 1)",
    questions: [
      {
        question: "How many bits are in an IPv4 address?",
        options: ["16", "32", "64", "128"],
        correctAnswer: 1
      },
      {
        question: "Which class of IPv4 address has a first octet range of 192-223?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctAnswer: 2
      },
      {
        question: "What is the default subnet mask for a Class B network?",
        options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is a private IP address range?",
        options: ["172.32.0.0/12", "10.0.0.0/8", "192.169.0.0/16", "11.0.0.0/8"],
        correctAnswer: 1
      },
      {
        question: "What is the binary equivalent of the decimal number 192?",
        options: ["11000000", "10101010", "11001100", "10110000"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 8,
    title: "IPv4 Addressing (Part 2)",
    questions: [
      {
        question: "What does CIDR stand for?",
        options: ["Class Interdomain Routing", "Classless Inter-Domain Routing", "Classful Internet Domain Routing", "Combined Internet Domain Resolution"],
        correctAnswer: 1
      },
      {
        question: "How many usable host addresses are in a /28 network?",
        options: ["14", "16", "30", "32"],
        correctAnswer: 0
      },
      {
        question: "What is the network address for the IP 192.168.10.75/26?",
        options: ["192.168.10.0", "192.168.10.64", "192.168.10.128", "192.168.10.32"],
        correctAnswer: 1
      },
      {
        question: "Which command is used to configure an IP address on a Cisco router interface?",
        options: ["set ip address", "ip address [address] [mask]", "address ip [address] [mask]", "configure ip [address]"],
        correctAnswer: 1
      },
      {
        question: "What is the broadcast address for the network 10.1.1.0/24?",
        options: ["10.1.1.0", "10.1.1.255", "10.1.1.254", "10.1.2.0"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 9,
    title: "Switch Interfaces",
    questions: [
      {
        question: "What is the default state of switch interfaces on most Cisco switches?",
        options: ["Administratively down", "Enabled and up", "Disabled", "Shutdown"],
        correctAnswer: 1
      },
      {
        question: "Which command shows the status of all interfaces on a switch?",
        options: ["show interfaces", "show ip interface brief", "show interface status", "All of the above"],
        correctAnswer: 3
      },
      {
        question: "What does the speed/duplex setting 'auto' mean on a switch interface?",
        options: ["Maximum speed only", "Negotiates speed and duplex with connected device", "Always uses full duplex", "Disables the interface"],
        correctAnswer: 1
      },
      {
        question: "Which command disables an interface on a Cisco switch?",
        options: ["disable", "no enable", "shutdown", "down"],
        correctAnswer: 2
      },
      {
        question: "What is a duplex mismatch and what problem does it cause?",
        options: ["Different cable types; causes no connection", "One side full-duplex, other half-duplex; causes performance issues", "Different IP addresses; causes routing errors", "Different VLANs; causes no communication"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 10,
    title: "The IPv4 Header",
    questions: [
      {
        question: "What is the minimum size of an IPv4 header without options?",
        options: ["20 bytes", "32 bytes", "40 bytes", "60 bytes"],
        correctAnswer: 0
      },
      {
        question: "Which field in the IPv4 header is used to prevent routing loops?",
        options: ["Header Checksum", "Time to Live (TTL)", "Fragment Offset", "Protocol"],
        correctAnswer: 1
      },
      {
        question: "What does the Protocol field in the IPv4 header indicate?",
        options: ["The version of IP", "The upper layer protocol (TCP, UDP, ICMP, etc.)", "The source port number", "The packet priority"],
        correctAnswer: 1
      },
      {
        question: "What is the maximum value of the TTL field?",
        options: ["64", "128", "255", "512"],
        correctAnswer: 2
      },
      {
        question: "Which field in the IPv4 header contains the source IP address?",
        options: ["Bytes 0-3", "Bytes 8-11", "Bytes 12-15", "Bytes 16-19"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 11,
    title: "Routing Fundamentals & Static Routing",
    questions: [
      {
        question: "What information does a routing table contain?",
        options: ["MAC addresses", "Network destinations and how to reach them", "Port numbers", "User credentials"],
        correctAnswer: 1
      },
      {
        question: "What command is used to configure a static route on a Cisco router?",
        options: ["route add", "ip route [destination] [mask] [next-hop]", "set route", "configure route"],
        correctAnswer: 1
      },
      {
        question: "What is the administrative distance of a directly connected network?",
        options: ["0", "1", "5", "10"],
        correctAnswer: 0
      },
      {
        question: "What is the administrative distance of a static route?",
        options: ["0", "1", "5", "10"],
        correctAnswer: 1
      },
      {
        question: "Which command displays the routing table on a Cisco router?",
        options: ["show routes", "show ip route", "display routing-table", "show routing"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 12,
    title: "Life of a Packet",
    questions: [
      {
        question: "What process does a device use to determine if a destination IP is on the same network?",
        options: ["MAC address lookup", "ANDing the IP address with the subnet mask", "DNS resolution", "ARP broadcast"],
        correctAnswer: 1
      },
      {
        question: "What protocol is used to resolve an IP address to a MAC address?",
        options: ["ICMP", "DNS", "ARP", "DHCP"],
        correctAnswer: 2
      },
      {
        question: "What happens to the TTL field in the IP header at each router hop?",
        options: ["Increases by 1", "Decreases by 1", "Stays the same", "Resets to 255"],
        correctAnswer: 1
      },
      {
        question: "When a packet travels through a router, which addresses change?",
        options: ["Source and destination IP addresses", "Source and destination MAC addresses", "Only source IP address", "Only destination IP address"],
        correctAnswer: 1
      },
      {
        question: "What message is sent back when TTL reaches 0?",
        options: ["Destination Unreachable", "Time Exceeded", "Echo Reply", "Redirect"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 13,
    title: "Subnetting (Part 1)",
    questions: [
      {
        question: "How many subnets can be created from a /24 network if you borrow 3 bits?",
        options: ["3", "6", "8", "16"],
        correctAnswer: 2
      },
      {
        question: "What is the subnet mask for a /27 network in decimal notation?",
        options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
        correctAnswer: 3
      },
      {
        question: "How many usable host addresses are in a /29 subnet?",
        options: ["4", "6", "8", "14"],
        correctAnswer: 1
      },
      {
        question: "What is the network address increment for a /26 subnet?",
        options: ["32", "64", "128", "256"],
        correctAnswer: 1
      },
      {
        question: "If you need at least 30 host addresses per subnet, what is the minimum subnet mask you can use?",
        options: ["/26", "/27", "/28", "/29"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 14,
    title: "Subnetting (Part 2)",
    questions: [
      {
        question: "What is the valid host range for the network 192.168.1.64/27?",
        options: ["192.168.1.65 - 192.168.1.94", "192.168.1.64 - 192.168.1.95", "192.168.1.65 - 192.168.1.95", "192.168.1.1 - 192.168.1.62"],
        correctAnswer: 0
      },
      {
        question: "How many /28 subnets can be created from a /24 network?",
        options: ["8", "12", "16", "32"],
        correctAnswer: 2
      },
      {
        question: "What is the broadcast address for 10.10.10.128/25?",
        options: ["10.10.10.127", "10.10.10.255", "10.10.10.254", "10.10.10.191"],
        correctAnswer: 1
      },
      {
        question: "If you subnet 172.16.0.0/16 into /24 networks, how many subnets do you get?",
        options: ["16", "64", "128", "256"],
        correctAnswer: 3
      },
      {
        question: "What subnet does the IP address 192.168.1.195/28 belong to?",
        options: ["192.168.1.176/28", "192.168.1.192/28", "192.168.1.208/28", "192.168.1.128/28"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 15,
    title: "Subnetting (Part 3 - VLSM)",
    questions: [
      {
        question: "What does VLSM stand for?",
        options: ["Very Large Subnet Mask", "Variable Length Subnet Mask", "Virtual LAN Subnet Mask", "Verified Length Subnet Masking"],
        correctAnswer: 1
      },
      {
        question: "What is the main advantage of VLSM?",
        options: ["Easier configuration", "More efficient use of IP address space", "Faster routing", "Better security"],
        correctAnswer: 1
      },
      {
        question: "When using VLSM, which subnets should you allocate first?",
        options: ["Smallest subnets first", "Largest subnets first", "Any order", "Medium-sized subnets first"],
        correctAnswer: 1
      },
      {
        question: "Can VLSM be used with classful routing protocols?",
        options: ["Yes, always", "No, only classless routing protocols support VLSM", "Only with RIPv1", "Only with IGRP"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is a classless routing protocol that supports VLSM?",
        options: ["RIPv1", "IGRP", "OSPF", "All of the above"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 16,
    title: "VLANs (Part 1)",
    questions: [
      {
        question: "What is the purpose of VLANs?",
        options: ["Increase bandwidth", "Segment broadcast domains logically", "Increase physical security", "Replace routers"],
        correctAnswer: 1
      },
      {
        question: "What is the default VLAN on Cisco switches?",
        options: ["VLAN 0", "VLAN 1", "VLAN 10", "VLAN 100"],
        correctAnswer: 1
      },
      {
        question: "What is the normal range of VLANs?",
        options: ["1-1005", "1-4094", "2-1001", "2-4094"],
        correctAnswer: 0
      },
      {
        question: "Which command creates a VLAN on a Cisco switch?",
        options: ["create vlan [number]", "vlan [number]", "add vlan [number]", "set vlan [number]"],
        correctAnswer: 1
      },
      {
        question: "What type of port carries traffic for only one VLAN?",
        options: ["Trunk port", "Access port", "Dynamic port", "Hybrid port"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 17,
    title: "VLANs (Part 2)",
    questions: [
      {
        question: "What is the purpose of a trunk port?",
        options: ["Connect end devices", "Carry traffic for multiple VLANs between switches", "Provide redundancy", "Block unauthorized VLANs"],
        correctAnswer: 1
      },
      {
        question: "Which protocol is used to tag VLAN traffic on trunk links?",
        options: ["VTP", "STP", "802.1Q", "ISL"],
        correctAnswer: 2
      },
      {
        question: "What is the native VLAN on a trunk port?",
        options: ["VLAN that is blocked", "VLAN that carries untagged traffic", "VLAN with highest priority", "VLAN 0"],
        correctAnswer: 1
      },
      {
        question: "What is the default native VLAN?",
        options: ["VLAN 0", "VLAN 1", "VLAN 100", "VLAN 999"],
        correctAnswer: 1
      },
      {
        question: "Which command configures a switch port as a trunk?",
        options: ["switchport mode access", "switchport mode trunk", "switchport trunk", "set trunk"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 18,
    title: "VLANs (Part 3)",
    questions: [
      {
        question: "What is inter-VLAN routing?",
        options: ["Routing between different switches", "Routing between different VLANs", "Routing within the same VLAN", "Routing between different routers"],
        correctAnswer: 1
      },
      {
        question: "What is Router-on-a-Stick (ROAS)?",
        options: ["Physical router placement", "Using a router with subinterfaces to route between VLANs", "Stacking multiple routers", "Redundant router configuration"],
        correctAnswer: 1
      },
      {
        question: "What command creates a subinterface on a router?",
        options: ["interface gigabitEthernet 0/0.10", "subinterface 0/0.10", "create subinterface 10", "vlan interface 10"],
        correctAnswer: 0
      },
      {
        question: "Which command associates a subinterface with a VLAN?",
        options: ["vlan [number]", "encapsulation dot1q [vlan-id]", "trunk vlan [number]", "set vlan [number]"],
        correctAnswer: 1
      },
      {
        question: "What is the advantage of using a Layer 3 switch for inter-VLAN routing?",
        options: ["Lower cost", "Easier configuration", "Better performance than ROAS", "More VLANs supported"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 19,
    title: "DTP & VTP",
    questions: [
      {
        question: "What does DTP stand for?",
        options: ["Dynamic Trunking Protocol", "Data Transfer Protocol", "Dynamic Transfer Protocol", "Distributed Trunking Protocol"],
        correctAnswer: 0
      },
      {
        question: "What is the default DTP mode on Cisco switches?",
        options: ["Trunk", "Access", "Dynamic Auto", "Dynamic Desirable"],
        correctAnswer: 2
      },
      {
        question: "What does VTP stand for?",
        options: ["VLAN Transfer Protocol", "VLAN Trunking Protocol", "Virtual Trunking Protocol", "Virtual Transfer Protocol"],
        correctAnswer: 1
      },
      {
        question: "In which VTP mode can you create, modify, and delete VLANs?",
        options: ["Server mode", "Client mode", "Transparent mode", "All modes"],
        correctAnswer: 0
      },
      {
        question: "Why is VTP version 3 preferred over version 2?",
        options: ["Faster synchronization", "Better security and protection against accidental changes", "Supports more VLANs", "Easier configuration"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 20,
    title: "Spanning Tree Protocol (Part 1)",
    questions: [
      {
        question: "What is the primary purpose of Spanning Tree Protocol (STP)?",
        options: ["Increase bandwidth", "Prevent Layer 2 loops", "Provide redundancy", "Load balancing"],
        correctAnswer: 1
      },
      {
        question: "What IEEE standard defines the original Spanning Tree Protocol?",
        options: ["802.1Q", "802.1D", "802.1W", "802.1X"],
        correctAnswer: 1
      },
      {
        question: "What is the root bridge in STP?",
        options: ["Switch with highest MAC address", "Switch with lowest priority and MAC address", "Switch with most connections", "Manually designated switch"],
        correctAnswer: 1
      },
      {
        question: "What is the default STP priority value?",
        options: ["0", "4096", "32768", "65535"],
        correctAnswer: 2
      },
      {
        question: "What are the STP port states in order?",
        options: ["Disabled, Blocking, Listening, Learning, Forwarding", "Blocking, Listening, Learning, Forwarding", "Listening, Learning, Blocking, Forwarding", "Learning, Listening, Forwarding"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 21,
    title: "Spanning Tree Protocol (Part 2)",
    questions: [
      {
        question: "How long does it take for a port to transition from Blocking to Forwarding in standard STP?",
        options: ["15 seconds", "20 seconds", "30 seconds", "50 seconds"],
        correctAnswer: 3
      },
      {
        question: "What is the purpose of BPDU Guard?",
        options: ["Prevent unauthorized switches from affecting STP topology", "Speed up convergence", "Block BPDUs on trunk ports", "Increase security"],
        correctAnswer: 0
      },
      {
        question: "What feature allows edge ports to immediately transition to Forwarding state?",
        options: ["UplinkFast", "BackboneFast", "PortFast", "RootGuard"],
        correctAnswer: 2
      },
      {
        question: "What is the STP cost of a 1 Gbps link?",
        options: ["4", "19", "100", "1000"],
        correctAnswer: 0
      },
      {
        question: "Which command sets the STP priority on a Cisco switch?",
        options: ["set priority [value]", "spanning-tree vlan [vlan-id] priority [value]", "stp priority [value]", "priority [value]"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 22,
    title: "Rapid STP",
    questions: [
      {
        question: "What IEEE standard defines Rapid Spanning Tree Protocol (RSTP)?",
        options: ["802.1D", "802.1W", "802.1S", "802.1Q"],
        correctAnswer: 1
      },
      {
        question: "What is the maximum convergence time for RSTP?",
        options: ["About 50 seconds", "About 30 seconds", "About 6 seconds (3x Hello time)", "Instantaneous"],
        correctAnswer: 2
      },
      {
        question: "Which RSTP port role replaces the STP Blocking state?",
        options: ["Designated", "Root", "Alternate", "Backup"],
        correctAnswer: 2
      },
      {
        question: "What RSTP port state is equivalent to STP Forwarding?",
        options: ["Learning", "Discarding", "Forwarding", "Listening"],
        correctAnswer: 2
      },
      {
        question: "What is the RSTP port type for connections to end devices?",
        options: ["Point-to-point", "Shared", "Edge", "Root"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 23,
    title: "EtherChannel",
    questions: [
      {
        question: "What is the purpose of EtherChannel?",
        options: ["Increase security", "Bundle multiple physical links into one logical link", "Separate VLANs", "Prevent loops"],
        correctAnswer: 1
      },
      {
        question: "What are the two protocols that can be used to negotiate EtherChannel?",
        options: ["STP and RSTP", "VTP and DTP", "LACP and PAgP", "OSPF and EIGRP"],
        correctAnswer: 2
      },
      {
        question: "Which EtherChannel protocol is an IEEE standard?",
        options: ["PAgP", "LACP", "Both", "Neither"],
        correctAnswer: 1
      },
      {
        question: "What is the maximum number of physical interfaces that can be in an EtherChannel?",
        options: ["4", "8", "16", "32"],
        correctAnswer: 1
      },
      {
        question: "What must be identical on all interfaces in an EtherChannel?",
        options: ["Speed, duplex, and VLAN configuration", "Only speed", "Only VLAN", "Nothing needs to match"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 24,
    title: "Dynamic Routing",
    questions: [
      {
        question: "What is the main advantage of dynamic routing over static routing?",
        options: ["More secure", "Automatically adapts to network topology changes", "Faster packet forwarding", "Lower bandwidth usage"],
        correctAnswer: 1
      },
      {
        question: "What are the two main categories of dynamic routing protocols?",
        options: ["Static and Dynamic", "Interior and Exterior", "Distance Vector and Link State", "Classful and Classless"],
        correctAnswer: 2
      },
      {
        question: "What metric does RIP use?",
        options: ["Bandwidth", "Hop count", "Cost", "Delay"],
        correctAnswer: 1
      },
      {
        question: "What is administrative distance used for?",
        options: ["Calculate metric", "Determine trustworthiness of routing sources", "Set router priority", "Configure access lists"],
        correctAnswer: 1
      },
      {
        question: "Which has the lowest administrative distance?",
        options: ["Static route", "OSPF", "EIGRP", "RIP"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 25,
    title: "RIP & EIGRP",
    questions: [
      {
        question: "Which of the following is a characteristic of RIPv2 that is NOT present in RIPv1?",
        options: ["Uses hop count as its metric", "Supports classful routing", "Sends updates via multicast (224.0.0.9)", "Includes subnet mask in routing updates"],
        correctAnswer: 3
      },
      {
        question: "What is the default administrative distance (AD) of EIGRP internal routes?",
        options: ["90", "100", "110", "120"],
        correctAnswer: 0
      },
      {
        question: "EIGRP uses a composite metric. By default, which two metrics does it use to calculate its best path?",
        options: ["Bandwidth and Load", "Bandwidth and Delay", "Load and Reliability", "Delay and MTU"],
        correctAnswer: 1
      },
      {
        question: "Which command correctly enables EIGRP for autonomous system 100 on a Cisco router?",
        options: ["router eigrp", "router eigrp 100", "enable eigrp 100", "routing-protocol eigrp 100"],
        correctAnswer: 1
      },
      {
        question: "What is the primary purpose of the EIGRP 'Feasible Condition'?",
        options: ["To determine the composite metric", "To establish neighbor adjacencies", "To select a feasible successor and prevent routing loops", "To redistribute routes from other protocols"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 26,
    title: "OSPF (Part 1)",
    questions: [
      {
        question: "Which OSPF packet type is used to initially discover OSPF neighbors and establish neighbor adjacencies?",
        options: ["LSU (Link-State Update)", "LSA (Link-State Advertisement)", "Hello", "LSR (Link-State Request)"],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of the OSPF Router ID?",
        options: ["To set the metric for all interfaces", "To uniquely identify each router in the OSPF domain", "To determine the DR/BDR election priority", "To define the subnet mask for advertised routes"],
        correctAnswer: 1
      },
      {
        question: "Which command correctly places an interface with IP address 10.1.1.1/24 into OSPF area 0?",
        options: ["network 10.1.1.0 0.0.0.255 area 0", "router ospf 1 followed by network 10.1.1.0 255.255.255.0 area 0", "ospf enable area 0", "network 10.0.0.0 0.255.255.255 area 0"],
        correctAnswer: 0
      },
      {
        question: "On a multi-access network (like Ethernet), which OSPF router types form adjacencies with all other routers?",
        options: ["All routers form full mesh adjacencies", "Only the DR and BDR", "Only routers with the highest priority", "Only ABRs"],
        correctAnswer: 1
      },
      {
        question: "What must match on two OSPF routers for them to become adjacent neighbors on a multi-access network?",
        options: ["IP Address only", "Area ID and Hello/Dead Timers", "Router ID only", "Subnet mask only"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 27,
    title: "OSPF (Part 2)",
    questions: [
      {
        question: "What is the primary function of an OSPF Designated Router (DR)?",
        options: ["To act as a default gateway for the area", "To summarize routes between areas", "To reduce routing update overhead by managing LSA exchanges", "To authenticate all OSPF packets"],
        correctAnswer: 2
      },
      {
        question: "In OSPF, what is the default reference bandwidth used to calculate interface cost?",
        options: ["1 Mbps", "10 Mbps", "100 Mbps", "1 Gbps"],
        correctAnswer: 2
      },
      {
        question: "Which OSPF router type connects an OSPF area to the backbone area (Area 0)?",
        options: ["Internal Router", "ASBR", "Designated Router (DR)", "Area Border Router (ABR)"],
        correctAnswer: 3
      },
      {
        question: "The OSPF metric (cost) for an interface is calculated using which formula?",
        options: ["Cost = Reference Bandwidth / Interface Bandwidth", "Cost = Hop Count", "Cost = Delay / 10", "Cost = 10^8 / Bandwidth in bps"],
        correctAnswer: 0
      },
      {
        question: "What OSPF LSA type is generated by an ABR to advertise networks from one area to the backbone?",
        options: ["Type 1 - Router LSA", "Type 2 - Network LSA", "Type 3 - Summary LSA", "Type 5 - AS External LSA"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 28,
    title: "OSPF (Part 3)",
    questions: [
      {
        question: "Which command will display the OSPF neighbor adjacency table on a Cisco router?",
        options: ["show ip ospf", "show ip route ospf", "show ip ospf neighbor", "show ospf database"],
        correctAnswer: 2
      },
      {
        question: "An OSPF router is in the 'FULL' state with a neighbor. What does this indicate?",
        options: ["The routers are exchanging Hello packets only", "The routers have successfully exchanged complete LSDBs", "The routers are in the process of exchanging LSRs and LSUs", "The neighbor relationship is down"],
        correctAnswer: 1
      },
      {
        question: "What is a key advantage of OSPF over RIP?",
        options: ["Simpler configuration", "Faster convergence", "Uses less bandwidth for updates", "Has a lower administrative distance"],
        correctAnswer: 1
      },
      {
        question: "When troubleshooting OSPF, you notice two routers are stuck in the '2-WAY' state. What is the most likely cause?",
        options: ["Mismatched Area IDs", "They are both DROTHERs and do not need full adjacency with each other", "Mismatched authentication passwords", "Duplicate Router IDs"],
        correctAnswer: 1
      },
      {
        question: "Which OSPF LSA type is flooded only within the area it originated?",
        options: ["Type 1 - Router LSA", "Type 3 - Summary LSA", "Type 4 - ASBR Summary LSA", "Type 5 - AS External LSA"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 29,
    title: "FHRP (HSRP)",
    questions: [
      {
        question: "What is the primary purpose of a First Hop Redundancy Protocol (FHRP) like HSRP?",
        options: ["To load balance traffic between multiple default gateways", "To provide a virtual default gateway IP for hosts", "To encrypt traffic between the host and the gateway", "To dynamically assign IP addresses to hosts"],
        correctAnswer: 1
      },
      {
        question: "In HSRP, which router is responsible for forwarding traffic sent to the virtual IP address?",
        options: ["The router with the highest IP address on the LAN", "The Standby router", "The Active router", "All routers in the HSRP group"],
        correctAnswer: 2
      },
      {
        question: "What is the default HSRP priority value?",
        options: ["0", "50", "100", "255"],
        correctAnswer: 2
      },
      {
        question: "Which HSRP group number is valid for configuration?",
        options: ["0", "256", "1000", "4096"],
        correctAnswer: 0
      },
      {
        question: "What command is used to configure a router's HSRP priority?",
        options: ["standby [group] priority [value]", "hsrp [group] priority [value]", "ip hsrp priority [value]", "redundancy priority [value]"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 30,
    title: "TCP & UDP",
    questions: [
      {
        question: "Which protocol is connection-oriented and provides reliable data delivery?",
        options: ["IP", "ICMP", "TCP", "UDP"],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of TCP's three-way handshake?",
        options: ["To encrypt the data", "To establish a connection between sender and receiver", "To compress the data", "To negotiate window size"],
        correctAnswer: 1
      },
      {
        question: "Which transport layer protocol would be most appropriate for VoIP traffic?",
        options: ["TCP", "FTP", "HTTP", "UDP"],
        correctAnswer: 3
      },
      {
        question: "What does the term 'windowing' refer to in TCP?",
        options: ["The process of dividing data into segments", "The number of unacknowledged bytes that can be sent", "The time between sending a segment and receiving acknowledgment", "The process of establishing a connection"],
        correctAnswer: 1
      },
      {
        question: "Which TCP header flag is used to initiate a connection?",
        options: ["ACK", "FIN", "SYN", "RST"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 31,
    title: "IPv6 (Part 1)",
    questions: [
      {
        question: "What is the primary motivation for transitioning from IPv4 to IPv6?",
        options: ["Improved security", "Faster routing", "Larger address space", "Simplified header format"],
        correctAnswer: 2
      },
      {
        question: "How many bits are in an IPv6 address?",
        options: ["32", "64", "128", "256"],
        correctAnswer: 2
      },
      {
        question: "Which of the following is a valid IPv6 address representation?",
        options: ["2001:0db8:0000:0000:0000:ff00:0042:8329", "2001:db8::ff00:42:8329", "Both A and B", "2001:db8:0:0:0:ff00:42:8329:1"],
        correctAnswer: 2
      },
      {
        question: "What is the IPv6 equivalent of IPv4's loopback address (127.0.0.1)?",
        options: ["::1", "fe80::1", "2001::1", "ff02::1"],
        correctAnswer: 0
      },
      {
        question: "Which IPv6 address type is used for communication with the nearest of multiple receivers?",
        options: ["Unicast", "Anycast", "Multicast", "Broadcast"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 32,
    title: "IPv6 (Part 2)",
    questions: [
      {
        question: "What is the first 64 bits of an IPv6 address typically called?",
        options: ["Interface ID", "Subnet prefix", "Network portion", "Global routing prefix"],
        correctAnswer: 1
      },
      {
        question: "Which IPv6 address prefix is used for link-local addresses?",
        options: ["2001::/16", "fe80::/10", "fc00::/7", "ff00::/8"],
        correctAnswer: 1
      },
      {
        question: "What IPv6 address type is used for communication with all devices on the local link?",
        options: ["Unique local address", "Global unicast address", "Link-local multicast", "Solicited-node multicast"],
        correctAnswer: 2
      },
      {
        question: "Which protocol replaces ARP in IPv6?",
        options: ["NDP (Neighbor Discovery Protocol)", "ICMPv6", "DHCPv6", "EIGRP for IPv6"],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of Duplicate Address Detection (DAD) in IPv6?",
        options: ["To discover default gateways", "To ensure no other node is using the same address on the link", "To find the MAC address of a neighbor", "To configure automatic addresses"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 33,
    title: "IPv6 (Part 3)",
    questions: [
      {
        question: "Which method of IPv6 address assignment uses router advertisements but no DHCP server?",
        options: ["SLAAC", "Stateful DHCPv6", "Static assignment", "EUI-64"],
        correctAnswer: 0
      },
      {
        question: "What command enables IPv6 routing on a Cisco router?",
        options: ["ipv6 enable", "ipv6 unicast-routing", "ipv6 routing", "enable ipv6"],
        correctAnswer: 1
      },
      {
        question: "Which IPv6 transition technique encapsulates IPv6 packets inside IPv4 packets?",
        options: ["Dual-stack", "NAT-PT", "6to4 tunneling", "Teredo"],
        correctAnswer: 2
      },
      {
        question: "How does SLAAC generate the Interface ID when using EUI-64?",
        options: ["Uses a random number", "Inserts FFFE in the middle of the MAC address and flips the 7th bit", "Uses DHCPv6", "Uses the last 64 bits of the IPv4 address"],
        correctAnswer: 1
      },
      {
        question: "Which command correctly assigns an IPv6 address to an interface?",
        options: ["ip address 2001:db8:1::1/64", "ipv6 address 2001:db8:1::1/64", "address ipv6 2001:db8:1::1 255.255.255.0", "ipv6 2001:db8:1::1/64"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 34,
    title: "Standard ACLs",
    questions: [
      {
        question: "What does ACL stand for?",
        options: ["Access Control List", "Application Control Layer", "Address Control List", "Access Control Layer"],
        correctAnswer: 0
      },
      {
        question: "What do standard ACLs filter traffic based on?",
        options: ["Destination IP address", "Source IP address only", "Port numbers", "Protocol type"],
        correctAnswer: 1
      },
      {
        question: "What is the recommended placement for a standard ACL?",
        options: ["As close to the source as possible", "As close to the destination as possible", "On the core router", "On the default gateway"],
        correctAnswer: 1
      },
      {
        question: "What is the valid range for standard numbered ACLs?",
        options: ["1-99 and 1300-1999", "100-199 and 2000-2699", "1-100", "1-199"],
        correctAnswer: 0
      },
      {
        question: "What happens if a packet doesn't match any ACL entry?",
        options: ["It is permitted", "It is denied (implicit deny)", "It is logged", "It causes an error"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 35,
    title: "Extended ACLs",
    questions: [
      {
        question: "What additional criteria can extended ACLs filter on compared to standard ACLs?",
        options: ["Source and destination IP, port numbers, protocols", "Only destination IP", "Only source IP", "Only port numbers"],
        correctAnswer: 0
      },
      {
        question: "What is the recommended placement for an extended ACL?",
        options: ["As close to the destination as possible", "As close to the source as possible", "On the core router only", "At the network edge only"],
        correctAnswer: 1
      },
      {
        question: "What is the valid range for extended numbered ACLs?",
        options: ["1-99", "100-199 and 2000-2699", "200-299", "1-199"],
        correctAnswer: 1
      },
      {
        question: "Which keyword permits established TCP connections?",
        options: ["permit", "established", "reflect", "connect"],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of using named ACLs?",
        options: ["Faster processing", "Easier identification and management", "Better security", "More entries allowed"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 36,
    title: "CDP & LLDP",
    questions: [
      {
        question: "What does CDP stand for?",
        options: ["Cisco Discovery Protocol", "Common Device Protocol", "Central Data Protocol", "Core Discovery Protocol"],
        correctAnswer: 0
      },
      {
        question: "What is the main difference between CDP and LLDP?",
        options: ["CDP is faster", "CDP is Cisco proprietary, LLDP is an IEEE standard", "LLDP uses more bandwidth", "CDP is more secure"],
        correctAnswer: 1
      },
      {
        question: "What information does CDP provide about neighbors?",
        options: ["Only IP addresses", "Device ID, IP address, platform, capabilities, interface info", "Only device names", "Only interface names"],
        correctAnswer: 1
      },
      {
        question: "Which command shows CDP neighbors?",
        options: ["show neighbors", "show cdp neighbors", "show lldp neighbors", "show cdp traffic"],
        correctAnswer: 1
      },
      {
        question: "On which OSI layer do CDP and LLDP operate?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 37,
    title: "NTP",
    questions: [
      {
        question: "What is the primary purpose of NTP?",
        options: ["To synchronize time across network devices", "To synchronize configurations", "To transfer files", "To manage IP addresses"],
        correctAnswer: 0
      },
      {
        question: "What NTP stratum level is considered the most accurate time source?",
        options: ["Stratum 0", "Stratum 1", "Stratum 15", "Stratum 16"],
        correctAnswer: 1
      },
      {
        question: "Which command configures a Cisco router to synchronize with an NTP server at 192.168.1.10?",
        options: ["ntp server 192.168.1.10", "clock set 192.168.1.10", "time server 192.168.1.10", "ntp master 192.168.1.10"],
        correctAnswer: 0
      },
      {
        question: "What happens if you configure a device as an NTP master without specifying a stratum?",
        options: ["It becomes stratum 0", "It becomes stratum 1", "It becomes stratum 8", "It doesn't synchronize"],
        correctAnswer: 2
      },
      {
        question: "Why is time synchronization important for network devices?",
        options: ["For accurate log timestamps", "For security certificate validation", "For faster routing convergence", "Both A and B"],
        correctAnswer: 3
      }
    ]
  },
  {
    dayNumber: 38,
    title: "DNS",
    questions: [
      {
        question: "What does DNS stand for?",
        options: ["Domain Name System", "Dynamic Name Service", "Distributed Name Service", "Domain Network System"],
        correctAnswer: 0
      },
      {
        question: "What type of DNS record maps a hostname to an IPv4 address?",
        options: ["AAAA record", "CNAME record", "A record", "MX record"],
        correctAnswer: 2
      },
      {
        question: "Which command configures a DNS server on a Cisco router?",
        options: ["dns server 8.8.8.8", "ip name-server 8.8.8.8", "name-server 8.8.8.8", "ip dns server 8.8.8.8"],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of DNS caching?",
        options: ["To store DNS records locally to reduce lookup time", "To encrypt DNS queries", "To distribute DNS load", "To prevent DNS attacks"],
        correctAnswer: 0
      },
      {
        question: "Which DNS record type is used for mail servers?",
        options: ["A record", "CNAME record", "TXT record", "MX record"],
        correctAnswer: 3
      }
    ]
  },
  {
    dayNumber: 39,
    title: "DHCP",
    questions: [
      {
        question: "What does DHCP stand for?",
        options: ["Dynamic Host Configuration Protocol", "Domain Host Control Protocol", "Dynamic Host Control Program", "Domain Host Configuration Protocol"],
        correctAnswer: 0
      },
      {
        question: "What is the first message sent by a DHCP client?",
        options: ["DHCP OFFER", "DHCP REQUEST", "DHCP DISCOVER", "DHCP ACK"],
        correctAnswer: 2
      },
      {
        question: "Which DHCP message is a broadcast sent by the server offering an IP address?",
        options: ["DHCP DISCOVER", "DHCP OFFER", "DHCP REQUEST", "DHCP ACK"],
        correctAnswer: 1
      },
      {
        question: "What is included in a DHCP lease besides the IP address?",
        options: ["Subnet mask only", "Default gateway only", "Subnet mask, default gateway, and DNS server", "Only routing table"],
        correctAnswer: 2
      },
      {
        question: "Which command enables DHCP services on a Cisco router?",
        options: ["ip dhcp server", "dhcp enable", "ip helper-address [dhcp-server-ip]", "service dhcp"],
        correctAnswer: 3
      }
    ]
  },
  {
    dayNumber: 40,
    title: "SNMP",
    questions: [
      {
        question: "What does SNMP stand for?",
        options: ["Simple Network Management Protocol", "System Network Management Program", "Simple Network Monitoring Protocol", "System Network Monitoring Protocol"],
        correctAnswer: 0
      },
      {
        question: "Which SNMP component runs on network devices and responds to requests?",
        options: ["Manager", "Agent", "MIB", "Community string"],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of the MIB?",
        options: ["To store configuration files", "To define a database of manageable objects", "To encrypt SNMP traffic", "To authenticate users"],
        correctAnswer: 1
      },
      {
        question: "Which SNMP version provides encryption and authentication?",
        options: ["SNMPv1", "SNMPv2c", "SNMPv3", "All versions"],
        correctAnswer: 2
      },
      {
        question: "What is a 'trap' in SNMP?",
        options: ["A request from manager to agent", "An unsolicited message from agent to manager", "A database query", "A configuration command"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 41,
    title: "Syslog",
    questions: [
      {
        question: "What is the default syslog facility level on Cisco devices?",
        options: ["local0", "local7", "user", "kern"],
        correctAnswer: 1
      },
      {
        question: "Which syslog severity level indicates the highest severity?",
        options: ["Debugging (7)", "Informational (6)", "Emergency (0)", "Warning (4)"],
        correctAnswer: 2
      },
      {
        question: "What command sends syslog messages to a server at 192.168.1.100?",
        options: ["logging host 192.168.1.100", "syslog server 192.168.1.100", "logging 192.168.1.100", "log host 192.168.1.100"],
        correctAnswer: 2
      },
      {
        question: "Which command displays syslog messages on the console?",
        options: ["show logging", "show log", "show syslog", "display logging"],
        correctAnswer: 0
      },
      {
        question: "What does severity level 6 (Informational) typically indicate?",
        options: ["System is unusable", "Normal but significant condition", "Informational messages only", "Debugging messages"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 42,
    title: "SSH",
    questions: [
      {
        question: "Why is SSH preferred over Telnet?",
        options: ["SSH is faster", "SSH provides encryption", "SSH uses less bandwidth", "SSH is easier to configure"],
        correctAnswer: 1
      },
      {
        question: "What is the first step in configuring SSH on a Cisco device?",
        options: ["Generate RSA keys", "Configure domain name", "Create local user accounts", "Enable SSH version 2"],
        correctAnswer: 1
      },
      {
        question: "Which command generates RSA keys for SSH?",
        options: ["crypto key generate rsa", "ssh generate keys", "generate rsa keys", "crypto generate rsa"],
        correctAnswer: 0
      },
      {
        question: "What minimum modulus size is recommended for RSA keys?",
        options: ["512 bits", "768 bits", "1024 bits", "2048 bits"],
        correctAnswer: 2
      },
      {
        question: "Which command enables SSH on VTY lines?",
        options: ["transport input ssh", "protocol ssh", "enable ssh", "ssh enable"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 43,
    title: "FTP & TFTP",
    questions: [
      {
        question: "What is a key difference between FTP and TFTP?",
        options: ["FTP uses TCP, TFTP uses UDP", "FTP is faster than TFTP", "TFTP provides authentication, FTP doesn't", "FTP uses port 69, TFTP uses port 21"],
        correctAnswer: 0
      },
      {
        question: "Which port does FTP use for control connections?",
        options: ["20", "21", "22", "23"],
        correctAnswer: 1
      },
      {
        question: "What is TFTP commonly used for in networking?",
        options: ["Transferring large files", "Backing up and restoring configurations", "Secure file transfers", "Email transfers"],
        correctAnswer: 1
      },
      {
        question: "Which command copies a configuration file from a TFTP server?",
        options: ["copy tftp running-config", "copy running-config tftp", "tftp get config", "copy tftp startup-config"],
        correctAnswer: 0
      },
      {
        question: "What advantage does FTP have over TFTP?",
        options: ["Simplicity", "Smaller overhead", "Reliability and authentication", "Speed"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 44,
    title: "NAT (Part 1 - Static)",
    questions: [
      {
        question: "What does NAT stand for?",
        options: ["Network Address Translation", "Network Access Translation", "Network Address Transformation", "Network Access Transformation"],
        correctAnswer: 0
      },
      {
        question: "What is the primary purpose of NAT?",
        options: ["To encrypt traffic", "To conserve public IP addresses", "To increase network speed", "To prevent viruses"],
        correctAnswer: 1
      },
      {
        question: "In static NAT, how are private and public addresses mapped?",
        options: ["One-to-many dynamically", "Many-to-one", "One-to-one permanently", "Based on port numbers"],
        correctAnswer: 2
      },
      {
        question: "Which command creates a static NAT mapping?",
        options: ["ip nat inside source static 192.168.1.10 203.0.113.5", "nat static 192.168.1.10 203.0.113.5", "ip nat static 192.168.1.10 203.0.113.5", "static nat 192.168.1.10 203.0.113.5"],
        correctAnswer: 0
      },
      {
        question: "Which interface is typically designated as 'NAT inside'?",
        options: ["The interface facing the Internet", "The interface connected to the local network", "Any interface", "The loopback interface"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 45,
    title: "NAT (Part 2 - Dynamic)",
    questions: [
      {
        question: "What is the main advantage of dynamic NAT over static NAT?",
        options: ["It's more secure", "It allows multiple internal hosts to share a pool of public addresses", "It's faster", "It doesn't require configuration"],
        correctAnswer: 1
      },
      {
        question: "What does PAT stand for?",
        options: ["Port Address Translation", "Protocol Address Translation", "Public Address Translation", "Private Address Translation"],
        correctAnswer: 0
      },
      {
        question: "How does PAT allow multiple devices to share one public IP?",
        options: ["By using different source ports", "By using different destination ports", "By using different protocols", "By using different MAC addresses"],
        correctAnswer: 0
      },
      {
        question: "Which command creates a NAT pool named MYPOOL with addresses 203.0.113.1 to 203.0.113.10?",
        options: ["ip nat pool MYPOOL 203.0.113.1 203.0.113.10 netmask 255.255.255.0", "nat pool MYPOOL 203.0.113.1-203.0.113.10", "ip nat pool MYPOOL 203.0.113.1 203.0.113.10 prefix-length 24", "create nat pool MYPOOL 203.0.113.1 203.0.113.10"],
        correctAnswer: 0
      },
      {
        question: "What is overload in NAT configuration?",
        options: ["Another term for PAT", "When NAT runs out of addresses", "When NAT is disabled", "When using static NAT"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 46,
    title: "QoS (Part 1)",
    questions: [
      {
        question: "What does QoS stand for?",
        options: ["Quality of Service", "Quantity of Service", "Queue of Service", "Quickness of Service"],
        correctAnswer: 0
      },
      {
        question: "What is the primary goal of QoS?",
        options: ["To increase bandwidth", "To prioritize certain types of traffic", "To encrypt all traffic", "To compress all traffic"],
        correctAnswer: 1
      },
      {
        question: "Which QoS model provides the strongest guarantees?",
        options: ["Best Effort", "Integrated Services (IntServ)", "Differentiated Services (DiffServ)", "FIFO"],
        correctAnswer: 1
      },
      {
        question: "What does FIFO stand for in queuing?",
        options: ["First In, First Out", "Fast In, Fast Out", "First Interface, First Out", "Frequent In, Frequent Out"],
        correctAnswer: 0
      },
      {
        question: "Which type of traffic is typically given the highest priority in QoS?",
        options: ["Email", "Web browsing", "VoIP", "File transfers"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 47,
    title: "QoS (Part 2)",
    questions: [
      {
        question: "What is traffic policing in QoS?",
        options: ["Discarding excess traffic", "Delaying excess traffic", "Prioritizing all traffic", "Encrypting traffic"],
        correctAnswer: 0
      },
      {
        question: "What is traffic shaping?",
        options: ["Discarding excess traffic", "Buffering and delaying excess traffic", "Blocking all traffic", "Speeding up traffic"],
        correctAnswer: 1
      },
      {
        question: "Which DiffServ code point provides Expedited Forwarding (EF)?",
        options: ["AF11", "CS1", "EF", "BE"],
        correctAnswer: 2
      },
      {
        question: "What command marks traffic with DSCP value EF?",
        options: ["set dscp ef", "mark dscp ef", "priority ef", "class-map ef"],
        correctAnswer: 0
      },
      {
        question: "Which queuing method allows configuration of multiple queues with different priorities?",
        options: ["FIFO", "PQ (Priority Queuing)", "CQ (Custom Queuing)", "WFQ (Weighted Fair Queuing)"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 48,
    title: "Security Fundamentals",
    questions: [
      {
        question: "What is the principle of least privilege?",
        options: ["Giving users all permissions they might need", "Giving users only the permissions they need to perform their job", "Giving administrators all permissions", "Removing all permissions by default"],
        correctAnswer: 1
      },
      {
        question: "Which security concept ensures data hasn't been altered?",
        options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
        correctAnswer: 1
      },
      {
        question: "What type of attack floods a network with traffic to make it unavailable?",
        options: ["Phishing", "DDoS", "Man-in-the-middle", "Virus"],
        correctAnswer: 1
      },
      {
        question: "What does AAA stand for in network security?",
        options: ["Authentication, Authorization, Accounting", "Access, Authentication, Accounting", "Authorization, Access, Administration", "Authentication, Access, Accounting"],
        correctAnswer: 0
      },
      {
        question: "Which protocol is commonly used for AAA?",
        options: ["SNMP", "TACACS+", "FTP", "DHCP"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 49,
    title: "Port Security",
    questions: [
      {
        question: "What is the purpose of port security?",
        options: ["To encrypt port traffic", "To restrict which MAC addresses can access a switch port", "To increase port speed", "To monitor port usage"],
        correctAnswer: 1
      },
      {
        question: "Which violation mode shuts down the port when an unauthorized MAC address is detected?",
        options: ["Protect", "Restrict", "Shutdown", "Disable"],
        correctAnswer: 2
      },
      {
        question: "What command enables port security on an interface?",
        options: ["switchport port-security", "port-security enable", "security port", "enable port-security"],
        correctAnswer: 0
      },
      {
        question: "How do you set the maximum number of MAC addresses on a secure port?",
        options: ["switchport port-security maximum 3", "port-security max 3", "maximum-mac 3", "mac-limit 3"],
        correctAnswer: 0
      },
      {
        question: "What command shows port security status?",
        options: ["show port-security", "show interface port-security", "show port-security interface [interface]", "display port-security"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 50,
    title: "DHCP Snooping",
    questions: [
      {
        question: "What is the primary purpose of DHCP snooping?",
        options: ["To speed up DHCP responses", "To prevent rogue DHCP servers", "To encrypt DHCP traffic", "To compress DHCP packets"],
        correctAnswer: 1
      },
      {
        question: "Which ports are considered trusted in DHCP snooping?",
        options: ["All ports", "Only ports connected to legitimate DHCP servers", "Only access ports", "Only trunk ports"],
        correctAnswer: 1
      },
      {
        question: "What does DHCP snooping create to track DHCP transactions?",
        options: ["DHCP binding table", "ARP table", "MAC address table", "Routing table"],
        correctAnswer: 0
      },
      {
        question: "Which command enables DHCP snooping globally?",
        options: ["ip dhcp snooping", "dhcp snooping enable", "enable dhcp snooping", "snooping dhcp"],
        correctAnswer: 0
      },
      {
        question: "How do you configure a port as trusted for DHCP snooping?",
        options: ["ip dhcp snooping trust", "dhcp snooping trust", "switchport dhcp trust", "trust dhcp"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 51,
    title: "Dynamic ARP Inspection",
    questions: [
      {
        question: "What attack does Dynamic ARP Inspection (DAI) prevent?",
        options: ["DDoS attacks", "ARP spoofing/poisoning", "DHCP starvation", "MAC flooding"],
        correctAnswer: 1
      },
      {
        question: "What must be enabled for DAI to work effectively?",
        options: ["Port security", "DHCP snooping", "STP", "VLANs"],
        correctAnswer: 1
      },
      {
        question: "Which ports are typically trusted for DAI?",
        options: ["All ports", "Ports connected to other switches or routers", "Only access ports", "Only ports with port security enabled"],
        correctAnswer: 1
      },
      {
        question: "What does DAI validate?",
        options: ["IP addresses", "ARP packets (matching IP-MAC bindings)", "DHCP packets", "TCP sequence numbers"],
        correctAnswer: 1
      },
      {
        question: "Which command enables DAI on a VLAN?",
        options: ["ip arp inspection vlan 10", "arp inspection vlan 10", "dynamic arp inspection vlan 10", "enable arp inspection vlan 10"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 52,
    title: "LAN Architectures",
    questions: [
      {
        question: "What are the three layers in the Cisco hierarchical network model?",
        options: ["Core, Distribution, Access", "Core, Aggregation, Edge", "Backbone, Distribution, User", "Central, Intermediate, Endpoint"],
        correctAnswer: 0
      },
      {
        question: "Which layer provides high-speed backbone connectivity?",
        options: ["Access layer", "Distribution layer", "Core layer", "Edge layer"],
        correctAnswer: 2
      },
      {
        question: "What is the main function of the access layer?",
        options: ["Route between VLANs", "Provide network policy enforcement", "Connect end devices", "Aggregate WAN connections"],
        correctAnswer: 2
      },
      {
        question: "What does collapsed core design combine?",
        options: ["Access and distribution layers", "Distribution and core layers", "All three layers", "Core and WAN layers"],
        correctAnswer: 1
      },
      {
        question: "Which design principle improves network availability?",
        options: ["Using single connections", "Implementing redundancy", "Using older equipment", "Disabling protocols"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 53,
    title: "WAN Architectures",
    questions: [
      {
        question: "What does GRE stand for?",
        options: ["Generic Routing Encapsulation", "General Routing Encryption", "Generic Route Encoding", "General Route Encapsulation"],
        correctAnswer: 0
      },
      {
        question: "What is the primary purpose of a GRE tunnel?",
        options: ["To encrypt data", "To encapsulate various protocol packets inside IP tunnels", "To compress data", "To authenticate users"],
        correctAnswer: 1
      },
      {
        question: "Which WAN technology uses virtual circuits identified by DLCI numbers?",
        options: ["PPP", "Frame Relay", "HDLC", "MPLS"],
        correctAnswer: 1
      },
      {
        question: "What is a key advantage of MPLS?",
        options: ["It's the cheapest WAN technology", "It uses labels for faster switching", "It provides built-in encryption", "It doesn't require routers"],
        correctAnswer: 1
      },
      {
        question: "Which command creates a GRE tunnel interface?",
        options: ["interface tunnel 0", "tunnel 0", "create tunnel 0", "interface gre 0"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 54,
    title: "Cloud & Virtualization",
    questions: [
      {
        question: "What is virtualization?",
        options: ["Running multiple logical devices on single physical hardware", "Connecting multiple physical devices", "Encrypting all data", "Compressing files"],
        correctAnswer: 0
      },
      {
        question: "What does VRF stand for?",
        options: ["Virtual Routing and Forwarding", "Virtual Router Function", "VLAN Routing Forwarding", "Virtual Redundancy Feature"],
        correctAnswer: 0
      },
      {
        question: "What is a key benefit of containers over traditional VMs?",
        options: ["Better isolation", "Lower overhead and faster startup", "More secure", "Easier to manage"],
        correctAnswer: 1
      },
      {
        question: "Which cloud model provides infrastructure (servers, storage, networking)?",
        options: ["SaaS", "PaaS", "IaaS", "DaaS"],
        correctAnswer: 2
      },
      {
        question: "What is the main advantage of cloud computing?",
        options: ["Higher upfront costs", "On-demand scalability", "Less security", "Complex management"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 55,
    title: "Wireless Fundamentals",
    questions: [
      {
        question: "What does SSID stand for?",
        options: ["Security Set Identifier", "Service Set Identifier", "System Set ID", "Signal Strength Identifier"],
        correctAnswer: 1
      },
      {
        question: "Which wireless standard operates at 5 GHz only?",
        options: ["802.11a", "802.11b", "802.11g", "802.11n"],
        correctAnswer: 0
      },
      {
        question: "What wireless mode allows devices to connect directly without an access point?",
        options: ["Infrastructure mode", "Ad-hoc mode", "Bridge mode", "Repeater mode"],
        correctAnswer: 1
      },
      {
        question: "Which factor most affects wireless signal strength?",
        options: ["Distance", "Time of day", "Color of walls", "Number of users"],
        correctAnswer: 0
      },
      {
        question: "What does RSSI measure?",
        options: ["Received signal strength", "Transmitted power", "Network speed", "Encryption strength"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 56,
    title: "Wireless Architectures",
    questions: [
      {
        question: "What is a wireless LAN controller (WLC)?",
        options: ["A device that manages multiple APs centrally", "A type of wireless router", "A signal booster", "A security device"],
        correctAnswer: 0
      },
      {
        question: "What does CAPWAP stand for?",
        options: ["Control and Provisioning of Wireless Access Points", "Cisco Access Point Wireless Protocol", "Controlled AP Wireless Access Protocol", "Centralized AP Wireless Administration Protocol"],
        correctAnswer: 0
      },
      {
        question: "Which wireless architecture uses autonomous APs?",
        options: ["Centralized", "Distributed", "Cloud-based", "Standalone"],
        correctAnswer: 3
      },
      {
        question: "What is the purpose of a wireless mesh network?",
        options: ["To extend coverage without wired connections to each AP", "To increase speed", "To improve security", "To reduce costs"],
        correctAnswer: 0
      },
      {
        question: "Which mode allows an AP to connect wirelessly to another AP?",
        options: ["Root mode", "Bridge mode", "Repeater mode", "Client mode"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 57,
    title: "Wireless Security",
    questions: [
      {
        question: "Which wireless security protocol is considered weakest?",
        options: ["WEP", "WPA", "WPA2", "WPA3"],
        correctAnswer: 0
      },
      {
        question: "What does WPA2 use for encryption?",
        options: ["AES", "TKIP", "RC4", "DES"],
        correctAnswer: 0
      },
      {
        question: "What is the main improvement in WPA3 over WPA2?",
        options: ["Stronger encryption", "Simpler configuration", "Better performance", "SAE for better password protection"],
        correctAnswer: 3
      },
      {
        question: "What does MAC filtering do?",
        options: ["Encrypts traffic", "Allows/denies devices based on MAC address", "Hides SSID", "Increases signal strength"],
        correctAnswer: 1
      },
      {
        question: "What is a rogue access point?",
        options: ["An authorized AP with weak security", "An unauthorized AP connected to the network", "An AP in bridge mode", "An old AP"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 58,
    title: "Wireless Configuration",
    questions: [
      {
        question: "Which command enters AP configuration mode on a Cisco switch?",
        options: ["ap-config", "config-ap", "ap", "interface dot11radio"],
        correctAnswer: 3
      },
      {
        question: "What does disabling SSID broadcast do?",
        options: ["Makes network invisible in scan lists (but still discoverable)", "Encrypts the network", "Increases speed", "Prevents all connections"],
        correctAnswer: 0
      },
      {
        question: "Which channel selection method is best for reducing interference?",
        options: ["Manual channel selection", "Automatic channel selection", "Random channel selection", "Fixed channel 6"],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of setting transmit power?",
        options: ["To control coverage area", "To increase security", "To change frequency", "To enable encryption"],
        correctAnswer: 0
      },
      {
        question: "How do you assign a VLAN to a wireless SSID?",
        options: ["vlan [vlan-id]", "ssid-vlan [vlan-id]", "In SSID configuration: vlan [vlan-id]", "wireless vlan [vlan-id]"],
        correctAnswer: 2
      }
    ]
  },
  {
    dayNumber: 59,
    title: "Network Automation (Intro)",
    questions: [
      {
        question: "What is the main benefit of network automation?",
        options: ["Increased manual configuration", "Consistency, speed, and reduced human error", "Higher costs", "More complex troubleshooting"],
        correctAnswer: 1
      },
      {
        question: "Which protocol is commonly used for network automation?",
        options: ["SNMP", "NETCONF", "FTP", "HTTP"],
        correctAnswer: 1
      },
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Automated Protocol Interface", "Application Protocol Integration", "Automated Programming Integration"],
        correctAnswer: 0
      },
      {
        question: "Which tool is used for configuration management and automation?",
        options: ["Wireshark", "Ansible", "Ping", "Traceroute"],
        correctAnswer: 1
      },
      {
        question: "What is Infrastructure as Code (IaC)?",
        options: ["Managing infrastructure through configuration files", "Writing code for applications", "Manual device configuration", "Network documentation"],
        correctAnswer: 0
      }
    ]
  },
  {
    dayNumber: 60,
    title: "JSON, XML, YAML",
    questions: [
      {
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Notation", "Java System Object Network"],
        correctAnswer: 0
      },
      {
        question: "Which data format uses tags like <tag>value</tag>?",
        options: ["JSON", "XML", "YAML", "CSV"],
        correctAnswer: 1
      },
      {
        question: "What is a key advantage of YAML?",
        options: ["Most verbose format", "Human-readable with minimal syntax", "Only works with JavaScript", "Requires end tags"],
        correctAnswer: 1
      },
      {
        question: "Which data format is natively supported by JavaScript?",
        options: ["XML", "YAML", "JSON", "HTML"],
        correctAnswer: 2
      },
      {
        question: "What does {\"device\": \"router1\", \"ip\": \"10.1.1.1\"} represent in JSON?",
        options: ["A list", "An object with key-value pairs", "An array", "A comment"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 61,
    title: "REST APIs",
    questions: [
      {
        question: "What does REST stand for?",
        options: ["Representational State Transfer", "Remote Execution State Transfer", "Representational System Transfer", "Remote State Transfer"],
        correctAnswer: 0
      },
      {
        question: "Which HTTP method retrieves data from a REST API?",
        options: ["POST", "GET", "PUT", "DELETE"],
        correctAnswer: 1
      },
      {
        question: "What does HTTP status code 200 indicate?",
        options: ["Error", "Success", "Not found", "Unauthorized"],
        correctAnswer: 1
      },
      {
        question: "Which HTTP method updates an existing resource?",
        options: ["POST", "GET", "PUT", "PATCH"],
        correctAnswer: 2
      },
      {
        question: "What is typically returned by a REST API?",
        options: ["Binary data", "JSON or XML", "HTML pages", "Plain text only"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 62,
    title: "SDN (Software Defined Networking)",
    questions: [
      {
        question: "What does SDN stand for?",
        options: ["Software Defined Networking", "System Defined Network", "Software Driven Network", "System Driven Networking"],
        correctAnswer: 0
      },
      {
        question: "What is the main principle of SDN?",
        options: ["Integrating control and data planes", "Separating control plane from data plane", "Making hardware more important", "Eliminating all software"],
        correctAnswer: 1
      },
      {
        question: "Which protocol is commonly used between SDN controller and switches?",
        options: ["OSPF", "BGP", "OpenFlow", "SNMP"],
        correctAnswer: 2
      },
      {
        question: "What component in SDN makes centralized decisions?",
        options: ["Data plane", "Control plane", "SDN controller", "Forwarding plane"],
        correctAnswer: 2
      },
      {
        question: "What is a key benefit of SDN?",
        options: ["More complex management", "Programmable, flexible networks", "Vendor lock-in", "Higher hardware costs"],
        correctAnswer: 1
      }
    ]
  },
  {
    dayNumber: 63,
    title: "Ansible, Puppet, Chef",
    questions: [
      {
        question: "What is Ansible primarily used for?",
        options: ["Network monitoring", "Configuration management and automation", "Packet capture", "Security scanning"],
        correctAnswer: 1
      },
      {
        question: "What format does Ansible use for its playbooks?",
        options: ["JSON", "XML", "YAML", "Python"],
        correctAnswer: 2
      },
      {
        question: "What is the main difference between Ansible and Puppet/Chef?",
        options: ["Ansible is faster", "Ansible is agentless", "Ansible uses more resources", "Ansible requires more configuration"],
        correctAnswer: 1
      },
      {
        question: "What is a playbook in Ansible?",
        options: ["A list of managed nodes", "A configuration file defining automation tasks", "A log file", "A security certificate"],
        correctAnswer: 1
      },
      {
        question: "Which language is Ansible written in?",
        options: ["Ruby", "Java", "Python", "Go"],
        correctAnswer: 2
      }
    ]
  },

];

export const getQuizForDay = (dayNumber: number): DayQuiz | undefined => {
  return quizData.find(q => q.dayNumber === dayNumber);
};
