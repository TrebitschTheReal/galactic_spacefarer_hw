const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Spacefarers } = this.entities;

    // Validation: Before Update, ensure correct values
    this.before(['UPDATE', 'CREATE'], Spacefarers, (req) => {
        const { data } = req;
        if (data.stardustCollection < 0) req.reject(400, 'stardustCollection cannot be negative.');
        if (data.wormholeNavigation < 1) req.reject(400, 'wormholeNavigation must be at least 1.');
    });

    // After Create - Cosmic Notification & Custom Fiori Info Message
    this.after('CREATE', Spacefarers, (data, req) => {
        // Custom Fiori message (visible in the UI)
        req.info(`Welcome, asdads to the SAP galaxy! ${data.name}`);
        // Also log the cosmic notification to the server console
        console.log(`\n🚀 ** Cosmic Notification: Welcome, ${data.name} to the SAP galaxy! **\n`);
    });

    // Custom Actions: Allow Full CRUD with no role restrictions

    this.on('EnlistSpacefarer', async (req) => {
        const { spacefarerID } = req.data;
        return `Spacefarer with ID ${spacefarerID} enlisted successfully!`;
    });

    this.on('UpdateSpacefarer', async (req) => {
        const { spacefarerID, stardustCollection, spacesuitColor } = req.data;
        const tx = cds.transaction(req);
        await tx.update(Spacefarers)
            .set({ stardustCollection, spacesuitColor })
            .where({ ID: spacefarerID });
        return `✅ Spacefarer with ID ${spacefarerID} updated successfully!`;
    });

    this.on('RemoveSpacefarer', async (req) => {
        const { spacefarerID } = req.data;
        const tx = cds.transaction(req);
        await tx.delete.from(Spacefarers)
            .where({ ID: spacefarerID });
        return `🗑️ Spacefarer with ID ${spacefarerID} removed successfully!`;
    });
});
