const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const { Spacefarers } = srv.entities;

    // ------------------------------------------
    // BEFORE: UPDATE / CREATE - Validate Inputs
    // ------------------------------------------
    srv.before(['UPDATE', 'CREATE'], Spacefarers, (req) => {
        const { data } = req;

        if (data.stardustCollection < 0) {
            req.reject(400, 'stardustCollection cannot be negative.');
        }

        if (data.wormholeNavigation < 1) {
            req.reject(400, 'wormholeNavigation must be at least 1.');
        }
    });

    // ------------------------------------------------
    // AFTER: CREATE - Send Fiori & Console Notification
    // ------------------------------------------------
    srv.after('CREATE', Spacefarers, (data, req) => {
        req.info(`Welcome, asdads to the SAP galaxy! ${data.name}`);
        console.log(`\n🚀 ** Cosmic Notification: Welcome, ${data.name} to the SAP galaxy! **\n`);
    });

    // ------------------------------------------------
    // ACTION: EnlistSpacefarer
    // ------------------------------------------------
    srv.on('EnlistSpacefarer', async (req) => {
        const { spacefarerID } = req.data;
        return `Spacefarer with ID ${spacefarerID} enlisted successfully!`;
    });

    // ------------------------------------------------
    // ACTION: UpdateSpacefarer
    // ------------------------------------------------
    srv.on('UpdateSpacefarer', async (req) => {
        const { spacefarerID, stardustCollection, spacesuitColor } = req.data;
        const tx = cds.transaction(req);

        await tx.update(Spacefarers)
            .set({ stardustCollection, spacesuitColor })
            .where({ ID: spacefarerID });

        return `✅ Spacefarer with ID ${spacefarerID} updated successfully!`;
    });

    // ------------------------------------------------
    // BEFORE: READ - Default Limit
    // ------------------------------------------------
    srv.before('READ', Spacefarers, (req) => {
        if (!req.query.limit) {
            req.query.limit = { rows: { val: 5 } };
        }
    });

    // ------------------------------------------------
    // ACTION: RemoveSpacefarer
    // ------------------------------------------------
    srv.on('RemoveSpacefarer', async (req) => {
        const { spacefarerID } = req.data;
        const tx = cds.transaction(req);

        await tx.delete.from(Spacefarers).where({ ID: spacefarerID });
        return `🗑️ Spacefarer with ID ${spacefarerID} removed successfully!`;
    });
});
