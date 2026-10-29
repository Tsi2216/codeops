// Replace this demo dataset with the existing project data source/API when integrating.
// Keeping data access on the server avoids sending the full order records to client code.
const demoOrders = [
  { id: "AE-1001", customer: "Hana Bekele", neighbourhood: "Bole", createdAt: "2026-10-20", total: 1850, status: "Delivered" },
  { id: "AE-1002", customer: "Dawit Alemu", neighbourhood: "Piassa", createdAt: "2026-10-20", total: 920, status: "Preparing" },
  { id: "AE-1003", customer: "Mimi Tesfaye", neighbourhood: "Kazanchis", createdAt: "2026-10-21", total: 1475, status: "Delivered" },
  { id: "AE-1004", customer: "Samuel Girma", neighbourhood: "Megenagna", createdAt: "2026-10-21", total: 760, status: "Pending" },
  { id: "AE-1005", customer: "Rahel Kebede", neighbourhood: "Bole", createdAt: "2026-10-22", total: 2350, status: "Delivered" },
  { id: "AE-1006", customer: "Abel Tadesse", neighbourhood: "Piassa", createdAt: "2026-10-22", total: 1150, status: "Preparing" },
  { id: "AE-1007", customer: "Selam Worku", neighbourhood: "Kazanchis", createdAt: "2026-10-23", total: 1920, status: "Delivered" },
  { id: "AE-1008", customer: "Yonas Mekonnen", neighbourhood: "Megenagna", createdAt: "2026-10-23", total: 640, status: "Pending" },
  { id: "AE-1009", customer: "Liya Abebe", neighbourhood: "Bole", createdAt: "2026-10-24", total: 1680, status: "Delivered" },
  { id: "AE-1010", customer: "Mulugeta Fikru", neighbourhood: "Piassa", createdAt: "2026-10-24", total: 880, status: "Delivered" },
];

export async function getOrders() {
  // Simulates an async server data read. Connect your real database/API here.
  return demoOrders;
}
