// SCF Domain data with controls and framework mappings
export interface SCFDomain {
  id: string;
  name: string;
  identifier: string;
  principle: string;
  intent: string;
  controls: SCFControl[];
}

export interface SCFControl {
  id: string;
  domain: string;
  name: string;
  description: string;
  question: string;
  cadence: string;
  frameworks: FrameworkMapping[];
}

export interface FrameworkMapping {
  framework: string;
  reference: string;
}

export interface Framework {
  id: string;
  name: string;
  shortName: string;
  category: 'international' | 'us-federal' | 'us-state' | 'industry' | 'regional';
  region: string;
  description: string;
  controlCount: number;
}

// Key frameworks extracted from SCF
export const frameworks: Framework[] = [
  // International Standards
  { id: 'iso27001', name: 'ISO/IEC 27001:2022', shortName: 'ISO 27001', category: 'international', region: 'Global', description: 'Information security management systems requirements', controlCount: 93 },
  { id: 'iso27002', name: 'ISO/IEC 27002:2022', shortName: 'ISO 27002', category: 'international', region: 'Global', description: 'Information security controls guidance', controlCount: 93 },
  { id: 'iso27701', name: 'ISO/IEC 27701:2019', shortName: 'ISO 27701', category: 'international', region: 'Global', description: 'Privacy information management', controlCount: 49 },
  { id: 'iso42001', name: 'ISO/IEC 42001:2023', shortName: 'ISO 42001', category: 'international', region: 'Global', description: 'AI management systems', controlCount: 38 },
  { id: 'nistcsf', name: 'NIST Cybersecurity Framework v2.0', shortName: 'NIST CSF', category: 'international', region: 'Global', description: 'Cybersecurity risk management framework', controlCount: 108 },
  { id: 'cis', name: 'CIS Controls v8.1', shortName: 'CIS CSC', category: 'international', region: 'Global', description: 'Critical Security Controls', controlCount: 153 },
  { id: 'cobit', name: 'COBIT 2019', shortName: 'COBIT', category: 'international', region: 'Global', description: 'IT governance framework', controlCount: 40 },
  
  // US Federal
  { id: 'nist80053', name: 'NIST 800-53 Rev 5', shortName: 'NIST 800-53', category: 'us-federal', region: 'United States', description: 'Security and privacy controls for federal information systems', controlCount: 1189 },
  { id: 'nist800171', name: 'NIST 800-171 Rev 3', shortName: 'NIST 800-171', category: 'us-federal', region: 'United States', description: 'Protecting CUI in nonfederal systems', controlCount: 110 },
  { id: 'fedramp', name: 'FedRAMP Rev 5', shortName: 'FedRAMP', category: 'us-federal', region: 'United States', description: 'Federal cloud security authorization', controlCount: 325 },
  { id: 'cmmc', name: 'CMMC 2.0', shortName: 'CMMC', category: 'us-federal', region: 'United States', description: 'Cybersecurity Maturity Model Certification', controlCount: 110 },
  { id: 'hipaa', name: 'HIPAA Security Rule', shortName: 'HIPAA', category: 'us-federal', region: 'United States', description: 'Healthcare information security', controlCount: 54 },
  { id: 'sox', name: 'Sarbanes-Oxley Act', shortName: 'SOX', category: 'us-federal', region: 'United States', description: 'Financial reporting controls', controlCount: 66 },
  
  // Industry Standards
  { id: 'pcidss', name: 'PCI DSS v4.0.1', shortName: 'PCI DSS', category: 'industry', region: 'Global', description: 'Payment card industry data security', controlCount: 264 },
  { id: 'soc2', name: 'AICPA SOC 2 TSC', shortName: 'SOC 2', category: 'industry', region: 'Global', description: 'Service organization controls', controlCount: 64 },
  { id: 'csa', name: 'CSA CCM v4', shortName: 'CSA CCM', category: 'industry', region: 'Global', description: 'Cloud Controls Matrix', controlCount: 197 },
  { id: 'swift', name: 'SWIFT CSF 2023', shortName: 'SWIFT', category: 'industry', region: 'Global', description: 'Financial messaging network security', controlCount: 32 },
  
  // Regional - EMEA
  { id: 'gdpr', name: 'EU General Data Protection Regulation', shortName: 'GDPR', category: 'regional', region: 'European Union', description: 'Data protection and privacy regulation', controlCount: 99 },
  { id: 'nis2', name: 'EU NIS2 Directive', shortName: 'NIS2', category: 'regional', region: 'European Union', description: 'Network and information security', controlCount: 43 },
  { id: 'dora', name: 'EU DORA', shortName: 'DORA', category: 'regional', region: 'European Union', description: 'Digital Operational Resilience Act', controlCount: 64 },
  { id: 'euai', name: 'EU AI Act', shortName: 'EU AI Act', category: 'regional', region: 'European Union', description: 'Artificial Intelligence regulation', controlCount: 38 },
  { id: 'ukcaf', name: 'UK CAF v4.0', shortName: 'UK CAF', category: 'regional', region: 'United Kingdom', description: 'Cyber Assessment Framework', controlCount: 39 },
  
  // Regional - APAC
  { id: 'auism', name: 'Australia ISM 2024', shortName: 'AU ISM', category: 'regional', region: 'Australia', description: 'Information Security Manual', controlCount: 879 },
  { id: 'singapore', name: 'Singapore MAS TRM', shortName: 'SG MAS', category: 'regional', region: 'Singapore', description: 'Technology Risk Management', controlCount: 166 },
  { id: 'japan', name: 'Japan ISMAP', shortName: 'ISMAP', category: 'regional', region: 'Japan', description: 'Cloud security evaluation', controlCount: 127 },
  
  // US State
  { id: 'ccpa', name: 'California CCPA/CPRA', shortName: 'CCPA', category: 'us-state', region: 'California', description: 'Consumer privacy protection', controlCount: 23 },
  { id: 'nycrr', name: 'NY DFS 23 NYCRR 500', shortName: 'NYCRR 500', category: 'us-state', region: 'New York', description: 'Financial services cybersecurity', controlCount: 23 },
  { id: 'txramp', name: 'TX-RAMP', shortName: 'TX-RAMP', category: 'us-state', region: 'Texas', description: 'Texas Risk and Authorization Management', controlCount: 148 },
];

// SCF Domains
export const scfDomains: SCFDomain[] = [
  {
    id: 'gov',
    name: 'Cybersecurity & Data Privacy Governance',
    identifier: 'GOV',
    principle: 'Execute a documented, risk-based program that supports business objectives while encompassing appropriate cybersecurity & data protection principles.',
    intent: 'Organizations specify the development of an organization\'s cybersecurity & data protection program, including criteria to measure success.',
    controls: []
  },
  {
    id: 'aat',
    name: 'Artificial and Autonomous Technology',
    identifier: 'AAT',
    principle: 'Ensure trustworthy and resilient AI and autonomous technologies to achieve a beneficial impact.',
    intent: 'Organizations ensure AI technologies are designed to be reliable, safe, fair, secure, resilient, transparent, explainable and privacy-enhanced.',
    controls: []
  },
  {
    id: 'ast',
    name: 'Asset Management',
    identifier: 'AST',
    principle: 'Manage all technology assets from purchase through disposition to ensure secured use.',
    intent: 'Organizations ensure technology assets are properly managed throughout the lifecycle.',
    controls: []
  },
  {
    id: 'bcd',
    name: 'Business Continuity & Disaster Recovery',
    identifier: 'BCD',
    principle: 'Maintain a resilient capability to sustain business-critical functions while recovering from incidents.',
    intent: 'Organizations establish processes that will help recover from adverse situations with minimal impact.',
    controls: []
  },
  {
    id: 'cap',
    name: 'Capacity & Performance Planning',
    identifier: 'CAP',
    principle: 'Govern the current and future capacities and performance of technology assets.',
    intent: 'Organizations prevent avoidable business interruptions caused by capacity and performance limitations.',
    controls: []
  },
  {
    id: 'chg',
    name: 'Change Management',
    identifier: 'CHG',
    principle: 'Manage change in a sustainable manner involving technology and business stakeholders.',
    intent: 'Organizations ensure leadership proactively manages change including assessment and authorization.',
    controls: []
  },
  {
    id: 'cld',
    name: 'Cloud Security',
    identifier: 'CLD',
    principle: 'Govern cloud instances with equal or greater security protections than on-premise.',
    intent: 'Organizations govern private and public cloud environments to manage third-party risks.',
    controls: []
  },
  {
    id: 'cpl',
    name: 'Compliance',
    identifier: 'CPL',
    principle: 'Oversee execution of cybersecurity controls to ensure evidence of due care exists.',
    intent: 'Organizations ensure controls are in place for statutory, regulatory and contractual compliance.',
    controls: []
  },
  {
    id: 'cfg',
    name: 'Configuration Management',
    identifier: 'CFG',
    principle: 'Enforce secure configurations according to vendor-recommended and industry practices.',
    intent: 'Organizations establish and maintain the integrity of systems through configuration management.',
    controls: []
  },
  {
    id: 'mon',
    name: 'Continuous Monitoring',
    identifier: 'MON',
    principle: 'Maintain situational awareness through centralized collection and analysis of event logs.',
    intent: 'Organizations establish ongoing situational awareness through centralized log review.',
    controls: []
  },
  {
    id: 'cry',
    name: 'Cryptographic Protections',
    identifier: 'CRY',
    principle: 'Utilize appropriate cryptographic solutions to protect data confidentiality and integrity.',
    intent: 'Organizations ensure data protection through implementing appropriate cryptographic technologies.',
    controls: []
  },
  {
    id: 'dch',
    name: 'Data Classification & Handling',
    identifier: 'DCH',
    principle: 'Enforce standardized data classification to determine sensitivity and handling requirements.',
    intent: 'Organizations ensure assets are properly classified with measures to protect data.',
    controls: []
  },
  {
    id: 'emb',
    name: 'Embedded Technology',
    identifier: 'EMB',
    principle: 'Provide scrutiny to reduce risks associated with embedded technology.',
    intent: 'Organizations manage security of embedded technologies including IoT and OT devices.',
    controls: []
  },
  {
    id: 'end',
    name: 'Endpoint Security',
    identifier: 'END',
    principle: 'Harden endpoint devices to protect against threats to devices and data.',
    intent: 'Organizations ensure endpoint devices are appropriately protected from security threats.',
    controls: []
  },
  {
    id: 'hrs',
    name: 'Human Resources Security',
    identifier: 'HRS',
    principle: 'Execute sound hiring practices and personnel management for security-minded workforce.',
    intent: 'Organizations create a cybersecurity & data privacy-minded workforce.',
    controls: []
  },
  {
    id: 'iac',
    name: 'Identification & Authentication',
    identifier: 'IAC',
    principle: 'Enforce least privilege consistently across all systems through documented IAM capability.',
    intent: 'Organizations implement least privilege through limiting access to authorized users only.',
    controls: []
  },
  {
    id: 'iro',
    name: 'Incident Response',
    identifier: 'IRO',
    principle: 'Maintain viable incident response capability that trains personnel on recognition and reporting.',
    intent: 'Organizations establish capability to respond to incidents in a timely manner.',
    controls: []
  },
  {
    id: 'iao',
    name: 'Information Assurance',
    identifier: 'IAO',
    principle: 'Execute impartial assessment process to validate cybersecurity controls.',
    intent: 'Organizations ensure adequacy of controls in development, testing and production.',
    controls: []
  },
  {
    id: 'mnt',
    name: 'Maintenance',
    identifier: 'MNT',
    principle: 'Proactively maintain technology assets according to current vendor recommendations.',
    intent: 'Organizations ensure technology assets are properly maintained for continued performance.',
    controls: []
  },
  {
    id: 'mdm',
    name: 'Mobile Device Management',
    identifier: 'MDM',
    principle: 'Implement measures to restrict mobile device connectivity with critical infrastructure.',
    intent: 'Organizations govern risks associated with mobile devices regardless of ownership.',
    controls: []
  },
  {
    id: 'net',
    name: 'Network Security',
    identifier: 'NET',
    principle: 'Architect secure defense-in-depth methodology enforcing least functionality.',
    intent: 'Organizations ensure sufficient controls to protect network infrastructure.',
    controls: []
  },
  {
    id: 'pes',
    name: 'Physical & Environmental Security',
    identifier: 'PES',
    principle: 'Protect physical environments through layers of physical security and environmental controls.',
    intent: 'Organizations minimize physical access while ensuring environmental controls.',
    controls: []
  },
  {
    id: 'prm',
    name: 'Privacy',
    identifier: 'PRM',
    principle: 'Protect sensitive information throughout the data lifecycle.',
    intent: 'Organizations implement privacy controls based on applicable requirements.',
    controls: []
  },
  {
    id: 'pda',
    name: 'Project & Development Assurance',
    identifier: 'PDA',
    principle: 'Establish and govern secure development practices.',
    intent: 'Organizations ensure secure development lifecycle practices.',
    controls: []
  },
  {
    id: 'rsk',
    name: 'Risk Management',
    identifier: 'RSK',
    principle: 'Implement and maintain an enterprise risk management program.',
    intent: 'Organizations identify, assess and manage cybersecurity risks.',
    controls: []
  },
  {
    id: 'sam',
    name: 'Security Awareness & Training',
    identifier: 'SAT',
    principle: 'Conduct security awareness and training programs.',
    intent: 'Organizations ensure personnel are trained on security responsibilities.',
    controls: []
  },
  {
    id: 'sea',
    name: 'Security Engineering & Architecture',
    identifier: 'SEA',
    principle: 'Design and implement secure architecture.',
    intent: 'Organizations ensure security is built into system design.',
    controls: []
  },
  {
    id: 'tpm',
    name: 'Third-Party Management',
    identifier: 'TPM',
    principle: 'Manage risks from third-party relationships.',
    intent: 'Organizations assess and monitor third-party security.',
    controls: []
  },
  {
    id: 'thr',
    name: 'Threat Management',
    identifier: 'THR',
    principle: 'Identify and respond to threats.',
    intent: 'Organizations implement threat intelligence and response.',
    controls: []
  },
  {
    id: 'vpm',
    name: 'Vulnerability & Patch Management',
    identifier: 'VPM',
    principle: 'Identify and remediate vulnerabilities.',
    intent: 'Organizations manage vulnerabilities throughout asset lifecycle.',
    controls: []
  },
  {
    id: 'wbs',
    name: 'Web Security',
    identifier: 'WEB',
    principle: 'Protect web applications and services.',
    intent: 'Organizations implement web application security controls.',
    controls: []
  },
  {
    id: 'wrl',
    name: 'Wireless Security',
    identifier: 'WIR',
    principle: 'Secure wireless networks and devices.',
    intent: 'Organizations implement wireless security controls.',
    controls: []
  },
];

// Sample controls with framework mappings
export const sampleControls: SCFControl[] = [
  {
    id: 'GOV-01',
    domain: 'Cybersecurity & Data Privacy Governance',
    name: 'Cybersecurity & Data Privacy Governance Program',
    description: 'Mechanisms exist to facilitate the implementation of cybersecurity & data privacy controls.',
    question: 'Does the organization facilitate the implementation of cybersecurity & data privacy governance controls?',
    cadence: 'Annual',
    frameworks: [
      { framework: 'ISO 27001', reference: '5.1, 5.2, 5.3' },
      { framework: 'NIST 800-53', reference: 'PM-1, PM-2' },
      { framework: 'NIST CSF', reference: 'GV.OC-01, GV.RM-01' },
      { framework: 'SOC 2', reference: 'CC1.1' },
      { framework: 'PCI DSS', reference: '12.1' },
      { framework: 'GDPR', reference: 'Art 24, Art 25' },
      { framework: 'HIPAA', reference: '164.308(a)(1)' },
    ]
  },
  {
    id: 'GOV-02',
    domain: 'Cybersecurity & Data Privacy Governance',
    name: 'Publishing Cybersecurity & Data Privacy Policies',
    description: 'Mechanisms exist to establish, publish, maintain and disseminate cybersecurity & data privacy policies.',
    question: 'Does the organization establish, maintain and disseminate cybersecurity & data privacy policies?',
    cadence: 'Annual',
    frameworks: [
      { framework: 'ISO 27001', reference: '5.1, A.5.1' },
      { framework: 'NIST 800-53', reference: 'PM-1' },
      { framework: 'NIST CSF', reference: 'GV.PO-01' },
      { framework: 'SOC 2', reference: 'CC1.1' },
      { framework: 'CIS CSC', reference: '3.1' },
    ]
  },
  {
    id: 'IAC-01',
    domain: 'Identification & Authentication',
    name: 'Identity & Access Management (IAM)',
    description: 'Mechanisms exist to facilitate the identification and access management of users.',
    question: 'Does the organization implement identity and access management controls?',
    cadence: 'Quarterly',
    frameworks: [
      { framework: 'ISO 27001', reference: 'A.5.15, A.5.16, A.5.17' },
      { framework: 'NIST 800-53', reference: 'AC-1, AC-2' },
      { framework: 'NIST CSF', reference: 'PR.AA-01, PR.AA-02' },
      { framework: 'SOC 2', reference: 'CC6.1' },
      { framework: 'PCI DSS', reference: '7.1, 8.1' },
      { framework: 'CIS CSC', reference: '5.1, 6.1' },
    ]
  },
  {
    id: 'RSK-01',
    domain: 'Risk Management',
    name: 'Risk Management Program',
    description: 'Mechanisms exist to implement a risk management program.',
    question: 'Does the organization implement a comprehensive risk management program?',
    cadence: 'Annual',
    frameworks: [
      { framework: 'ISO 27001', reference: '6.1, 8.2' },
      { framework: 'NIST 800-53', reference: 'RA-1, RA-2, RA-3' },
      { framework: 'NIST CSF', reference: 'GV.RM-01, ID.RA-01' },
      { framework: 'SOC 2', reference: 'CC3.1, CC3.2' },
      { framework: 'COBIT', reference: 'APO12' },
    ]
  },
  {
    id: 'IRO-01',
    domain: 'Incident Response',
    name: 'Incident Response Operations',
    description: 'Mechanisms exist to implement an incident response capability.',
    question: 'Does the organization implement incident response operations?',
    cadence: 'Quarterly',
    frameworks: [
      { framework: 'ISO 27001', reference: 'A.5.24, A.5.25, A.5.26' },
      { framework: 'NIST 800-53', reference: 'IR-1, IR-4, IR-5' },
      { framework: 'NIST CSF', reference: 'RS.MA-01, RS.AN-01' },
      { framework: 'SOC 2', reference: 'CC7.3, CC7.4' },
      { framework: 'PCI DSS', reference: '12.10' },
      { framework: 'GDPR', reference: 'Art 33, Art 34' },
    ]
  },
  {
    id: 'TPM-01',
    domain: 'Third-Party Management',
    name: 'Third-Party Management Program',
    description: 'Mechanisms exist to manage third-party risks.',
    question: 'Does the organization manage third-party cybersecurity risks?',
    cadence: 'Annual',
    frameworks: [
      { framework: 'ISO 27001', reference: 'A.5.19, A.5.20, A.5.21' },
      { framework: 'NIST 800-53', reference: 'SA-9, SR-1' },
      { framework: 'NIST CSF', reference: 'GV.SC-01, GV.SC-02' },
      { framework: 'SOC 2', reference: 'CC9.2' },
      { framework: 'PCI DSS', reference: '12.8' },
    ]
  },
  {
    id: 'CRY-01',
    domain: 'Cryptographic Protections',
    name: 'Use of Cryptographic Controls',
    description: 'Mechanisms exist to implement cryptographic protections using industry standards.',
    question: 'Does the organization utilize cryptographic protections?',
    cadence: 'Annual',
    frameworks: [
      { framework: 'ISO 27001', reference: 'A.8.24' },
      { framework: 'NIST 800-53', reference: 'SC-12, SC-13' },
      { framework: 'NIST CSF', reference: 'PR.DS-01, PR.DS-02' },
      { framework: 'PCI DSS', reference: '3.5, 4.1' },
      { framework: 'HIPAA', reference: '164.312(a)(2)(iv)' },
    ]
  },
  {
    id: 'MON-01',
    domain: 'Continuous Monitoring',
    name: 'Continuous Monitoring',
    description: 'Mechanisms exist to implement continuous monitoring of cybersecurity events.',
    question: 'Does the organization implement continuous monitoring?',
    cadence: 'Continuous',
    frameworks: [
      { framework: 'ISO 27001', reference: 'A.8.15, A.8.16' },
      { framework: 'NIST 800-53', reference: 'CA-7, SI-4' },
      { framework: 'NIST CSF', reference: 'DE.CM-01, DE.CM-02' },
      { framework: 'SOC 2', reference: 'CC7.1, CC7.2' },
      { framework: 'PCI DSS', reference: '10.1, 10.2' },
      { framework: 'CIS CSC', reference: '8.1, 8.2' },
    ]
  },
];

// Framework interconnections (which frameworks commonly map together)
export const frameworkConnections: { source: string; target: string; strength: number }[] = [
  { source: 'iso27001', target: 'iso27002', strength: 0.95 },
  { source: 'iso27001', target: 'soc2', strength: 0.75 },
  { source: 'iso27001', target: 'nist80053', strength: 0.85 },
  { source: 'nist80053', target: 'nistcsf', strength: 0.9 },
  { source: 'nist80053', target: 'fedramp', strength: 0.95 },
  { source: 'nist80053', target: 'nist800171', strength: 0.85 },
  { source: 'nist800171', target: 'cmmc', strength: 0.95 },
  { source: 'nistcsf', target: 'cis', strength: 0.7 },
  { source: 'pcidss', target: 'soc2', strength: 0.6 },
  { source: 'gdpr', target: 'iso27701', strength: 0.85 },
  { source: 'gdpr', target: 'ccpa', strength: 0.65 },
  { source: 'hipaa', target: 'nist80053', strength: 0.7 },
  { source: 'nis2', target: 'iso27001', strength: 0.75 },
  { source: 'dora', target: 'nis2', strength: 0.7 },
  { source: 'euai', target: 'iso42001', strength: 0.8 },
  { source: 'soc2', target: 'cobit', strength: 0.55 },
  { source: 'csa', target: 'iso27001', strength: 0.7 },
  { source: 'swift', target: 'iso27001', strength: 0.6 },
  { source: 'auism', target: 'iso27001', strength: 0.75 },
  { source: 'singapore', target: 'iso27001', strength: 0.7 },
];
