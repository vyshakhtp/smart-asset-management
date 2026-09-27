export const dashboardData = {
    totalAssets: 120,
    availableAssets: 35,
    assignedAssets: 85,
    openTickets: 12
};

export const assets = [
    {
        id: 1,
        name: "Dell Laptop",
        type: "Laptop",
        serialNumber: "DL1001",
        status: "Available",
        purchaseDate: "2026-01-15"
    },
    {
        id: 2,
        name: "HP Laptop",
        type: "Laptop",
        serialNumber: "HP1002",
        status: "Assigned",
        purchaseDate: "2026-02-10"
    },
    {
        id: 3,
        name: "iPhone 15",
        type: "Mobile",
        serialNumber: "IP1003",
        status: "Assigned",
        purchaseDate: "2026-03-05"
    },
    {
        id: 4,
        name: "Dell Monitor",
        type: "Monitor",
        serialNumber: "DM1004",
        status: "Available",
        purchaseDate: "2026-03-20"
    },
    {
        id: 5,
        name: "HP Keyboard",
        type: "Keyboard",
        serialNumber: "HK1005",
        status: "Available",
        purchaseDate: "2026-04-12"
    }
];

export const inventory = [
    {
        id: 1,
        itemName: "Laptop",
        category: "Electronics",
        quantity: 25,
        available: 10,
        status: "Available"
    },
    {
        id: 2,
        itemName: "Keyboard",
        category: "Peripheral",
        quantity: 40,
        available: 25,
        status: "Available"
    },
    {
        id: 3,
        itemName: "Mouse",
        category: "Peripheral",
        quantity: 50,
        available: 32,
        status: "Available"
    },
    {
        id: 4,
        itemName: "Monitor",
        category: "Electronics",
        quantity: 20,
        available: 5,
        status: "Low Stock"
    },
    {
        id: 5,
        itemName: "Printer Ink",
        category: "Consumable",
        quantity: 30,
        available: 3,
        status: "Low Stock"
    }
];