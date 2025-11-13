export const mockUsers = [
  {
    username: "hse_user",
    password: "hse123",
    role: "hse",
  },
  {
    username: "kepala_user",
    password: "kepala123",
    role: "kepala",
  },
  {
    username: "direktur_user",
    password: "direktur123",
    role: "direktur",
  },
];

export const mockReports = [
  {
    id: 1,
    title: "Slip and Fall to Chemical Pond",
    employeeName: "John Doe",
    employeeId: "EMP001",
    department: "Mechanical Assembly",
    severity: "Severe",
    status: "Ongoing",
    date: "2025-11-11",
    description:
      "Employee slipped on an unmarked wet floor near the chemical processing unit and fell, sustaining chemical burns to the lower leg. Requires immediate medical attention and investigation.",
  },
  {
    id: 2,
    title: "Fall from Height during Maintenance",
    employeeName: "Jane Smith",
    employeeId: "EMP002",
    department: "Warehouse",
    severity: "Moderate",
    status: "Completed",
    date: "2025-04-02",
    description:
      "Employee fell approximately 1.5 meters from a ladder while retrieving inventory. Sustained minor sprain to the wrist. Ladder safety procedures need reinforcement.",
  },
  {
    id: 3,
    title: "Misconfigured Software Update Causes Downtime",
    employeeName: "Alice Johnson",
    employeeId: "EMP003",
    department: "Software Installation",
    severity: "Minor",
    status: "Draft",
    date: "2025-10-05",
    description:
      "A non-critical system experienced downtime due to a misconfigured software update. No physical injury or major financial loss. Report is currently being finalized.",
  },
  {
    id: 4,
    title: "Electrical Short Circuit and Minor Fire",
    employeeName: "Bob Williams",
    employeeId: "EMP004",
    department: "Electrical Assembly",
    severity: "Severe",
    status: "Rejected",
    date: "2025-09-20",
    description:
      "An electrical panel short-circuited, causing a small, localized fire that was immediately extinguished. No injuries, but significant damage to equipment. Report was rejected due to missing initial evidence.",
    rejectedReason:
      "Report lacked supporting photo evidence and initial witness statements, preventing validation of the event.",
  },
  {
    id: 5,
    title: "Quality Control Tool Malfunction",
    employeeName: "Eve Brown",
    employeeId: "EMP005",
    department: "Quality Assurance",
    severity: "Minor",
    status: "Ongoing",
    date: "2025-08-15",
    description:
      "A quality control measurement tool provided incorrect readings for an entire batch. The issue is resolved, but the incident report remains open pending full process review.",
  },
  {
    id: 6,
    title: "Forklift Collision in Warehouse Aisle",
    employeeName: "Charlie Davis",
    employeeId: "EMP006",
    department: "Warehouse",
    severity: "Moderate",
    status: "Completed",
    date: "2025-07-01",
    description:
      "Two forklifts collided at a junction. Minor damage to both vehicles and no injuries to drivers. Operational procedure update completed.",
  },
  {
    id: 7,
    title: "Unauthorized Access to Server Room",
    employeeName: "David Green",
    employeeId: "EMP007",
    department: "IT Security",
    severity: "Moderate",
    status: "Ongoing",
    date: "2025-09-05",
    description:
      "An employee entered the restricted server room without proper authorization. Investigation ongoing to determine intent and ensure access control compliance.",
  },
  {
    id: 8,
    title: "Chemical Spill in Mixing Station",
    employeeName: "Fiona Clark",
    employeeId: "EMP008",
    department: "Chemical Processing",
    severity: "Severe",
    status: "Rejected",
    date: "2025-06-10",
    description:
      "Chemical spill occurred due to improper valve closure during a mixing process. Area was evacuated and cleaned by safety team.",
    rejectedReason:
      "Incident log failed to specify exact quantity of spilled chemicals and cleanup procedure documentation was incomplete.",
  },
  {
    id: 9,
    title: "Network Downtime During Routine Maintenance",
    employeeName: "George Lewis",
    employeeId: "EMP009",
    department: "Network Operations",
    severity: "Minor",
    status: "Completed",
    date: "2025-08-30",
    description:
      "Temporary loss of internal network connectivity occurred during scheduled maintenance window. All systems restored within 20 minutes.",
  },
  {
    id: 10,
    title: "Injury from Faulty Conveyor Belt",
    employeeName: "Hannah Wilson",
    employeeId: "EMP010",
    department: "Material Handling",
    severity: "Severe",
    status: "Ongoing",
    date: "2025-10-19",
    description:
      "A worker’s hand was caught between the rollers of a conveyor belt due to a faulty emergency stop button. Safety inspection pending.",
  },
  {
    id: 11,
    title: "Fire Alarm False Trigger",
    employeeName: "Ian Thomas",
    employeeId: "EMP011",
    department: "Building Maintenance",
    severity: "Minor",
    status: "Rejected",
    date: "2025-07-12",
    description:
      "The fire alarm system was triggered during routine maintenance. Evacuation was conducted unnecessarily, causing temporary disruption.",
    rejectedReason:
      "Report misidentified the root cause — maintenance logs showed that alarm sensors were intentionally tested during scheduled checks.",
  },
  {
    id: 12,
    title: "Data Breach from Phishing Email",
    employeeName: "Julia Roberts",
    employeeId: "EMP012",
    department: "IT Security",
    severity: "Severe",
    status: "Completed",
    date: "2025-11-01",
    description:
      "An employee unknowingly clicked a phishing link that exposed sensitive project data. Incident response was executed immediately and credentials were rotated.",
  },
  {
    id: 13,
    title: "Unauthorized Access to Server Room",
    employeeName: "David Green",
    employeeId: "EMP007",
    department: "IT Security",
    severity: "Moderate",
    status: "Ongoing",
    date: "2025-09-05",
    description:
      "An employee entered the restricted server room without proper authorization. Investigation ongoing to determine intent and ensure access control compliance.",
  },
  {
    id: 14,
    title: "Chemical Spill in Mixing Station",
    employeeName: "Fiona Clark",
    employeeId: "EMP008",
    department: "Chemical Processing",
    severity: "Severe",
    status: "Rejected",
    date: "2025-06-10",
    description:
      "Chemical spill occurred due to improper valve closure during a mixing process. Area was evacuated and cleaned by safety team.",
    rejectedReason:
      "Incident log failed to specify exact quantity of spilled chemicals and cleanup procedure documentation was incomplete.",
  },
  {
    id: 15,
    title: "Network Downtime During Routine Maintenance",
    employeeName: "George Lewis",
    employeeId: "EMP009",
    department: "Network Operations",
    severity: "Minor",
    status: "Completed",
    date: "2025-08-30",
    description:
      "Temporary loss of internal network connectivity occurred during scheduled maintenance window. All systems restored within 20 minutes.",
  },
  {
    id: 16,
    title: "Injury from Faulty Conveyor Belt",
    employeeName: "Hannah Wilson",
    employeeId: "EMP010",
    department: "Material Handling",
    severity: "Severe",
    status: "Ongoing",
    date: "2025-10-19",
    description:
      "A worker’s hand was caught between the rollers of a conveyor belt due to a faulty emergency stop button. Safety inspection pending.",
  },
  {
    id: 17,
    title: "Fire Alarm False Trigger",
    employeeName: "Ian Thomas",
    employeeId: "EMP011",
    department: "Building Maintenance",
    severity: "Minor",
    status: "Rejected",
    date: "2025-07-12",
    description:
      "The fire alarm system was triggered during routine maintenance. Evacuation was conducted unnecessarily, causing temporary disruption.",
    rejectedReason:
      "Report misidentified the root cause — maintenance logs showed that alarm sensors were intentionally tested during scheduled checks.",
  },
  {
    id: 18,
    title: "Data Breach from Phishing Email",
    employeeName: "Julia Roberts",
    employeeId: "EMP012",
    department: "IT Security",
    severity: "Severe",
    status: "Completed",
    date: "2025-11-01",
    description:
      "An employee unknowingly clicked a phishing link that exposed sensitive project data. Incident response was executed immediately and credentials were rotated.",
  },
];
