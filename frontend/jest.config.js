module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'], // Lädt zusätzliche Setup-Dateien nach dem Jest-Umfeld
    testEnvironment: 'jsdom', // Setzt die Testumgebung auf jsdom
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapped CSS-Dateien, damit sie nicht zu Fehlern führen
    },
};
