const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const {Spacefarers} = this.entities;

    // Validation: Before Create, Ensure Proper Default Values
    this.before('CREATE', Spacefarers, async (req) => {
        const data = req.data;
        data.stardustCollection = data.stardustCollection >= 0 ? data.stardustCollection : 0;
        data.wormholeNavigation = data.wormholeNavigation >= 1 ? data.wormholeNavigation : 1;
    });

    // Validation: Before Update, Ensure Correct Values
    this.before('UPDATE', Spacefarers, async (req) => {
        const data = req.data;
        if (data.stardustCollection < 0) req.reject(400, 'stardustCollection cannot be negative.');
        if (data.wormholeNavigation < 1) req.reject(400, 'wormholeNavigation must be at least 1.');
    });

    // After Create - Cosmic Notification
    this.after('CREATE', Spacefarers, async (data) => {
        console.log(`\n🚀 ** Cosmic Notification: Welcome, ${data.name} to the SAP galaxy! **\n`);
    });

    // Allow Full CRUD - No Role Restrictions
    this.on('EnlistSpacefarer', async (req) => {
        const {spacefarerID} = req.data;
        return `Spacefarer with ID ${spacefarerID} enlisted successfully!`;
    });

    this.on('UpdateSpacefarer', async (req) => {
        const {spacefarerID, stardustCollection, spacesuitColor} = req.data;
        const tx = cds.transaction(req);
        await tx.update(Spacefarers).set({stardustCollection, spacesuitColor}).where({ID: spacefarerID});
        return `✅ Spacefarer with ID ${spacefarerID} updated successfully!`;
    });

    this.on('RemoveSpacefarer', async (req) => {
        const {spacefarerID} = req.data;
        const tx = cds.transaction(req);
        await tx.delete.from(Spacefarers).where({ID: spacefarerID});
        return `🗑️ Spacefarer with ID ${spacefarerID} removed successfully!`;
    });
});
