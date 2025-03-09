const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const {Spacefarers} = srv.entities;

    // ------------------------------------------
    // BEFORE: UPDATE / CREATE - Validate Inputs
    // ------------------------------------------
    srv.before(['UPDATE', 'CREATE'], Spacefarers, req => {
        const {data} = req;
        const LIMIT_VALUE = 100;
        const DEFAULT_VALUE = 0;

        data.stardustCollection = data.stardustCollection ?? DEFAULT_VALUE;
        data.wormholeNavigation = data.wormholeNavigation ?? DEFAULT_VALUE;

        // Validate name
        if (!data.name?.trim().length > 0) {
            req.reject(400, `Name must be provided and cannot be empty or just spaces.`);
        }

        // Validate stardustCollection: must be between 0 and 100
        if (data.stardustCollection < DEFAULT_VALUE) {
            req.reject(400, `stardustCollection cannot be negative.`);
        } else if (data.stardustCollection > LIMIT_VALUE) {
            req.reject(400, `stardustCollection cannot be more than ${LIMIT_VALUE}.`);
        }

        // Validate wormholeNavigation: must be between 0 and 100
        if (data.wormholeNavigation < DEFAULT_VALUE) {
            req.reject(400, 'wormholeNavigation cannot be negative.');
        } else if (data.wormholeNavigation > LIMIT_VALUE) {
            req.reject(400, `wormholeNavigation cannot be more than ${LIMIT_VALUE}.`);
        }
    });

    // ------------------------------------------------
    // AFTER: CREATE - Send Fiori & Console Notification
    // ------------------------------------------------
    srv.after('CREATE', Spacefarers, (data, req) => {
        req.info(`Welcome to the SAP Galaxy, ${data.name}! An email will be sent to your email address with further instructions.`);
    });

    // ------------------------------------------------
    // ACTION: EnlistSpacefarer
    // ------------------------------------------------
    srv.on('EnlistSpacefarer', async (req) => {
        const {spacefarerID} = req.data;
        return `Spacefarer with ID ${spacefarerID} enlisted successfully!`;
    });

    // ------------------------------------------------
    // ACTION: UpdateSpacefarer
    // ------------------------------------------------
    srv.on('UpdateSpacefarer', async (req) => {
        const {spacefarerID, stardustCollection, spacesuitColor} = req.data;
        const tx = cds.transaction(req);

        await tx.update(Spacefarers)
            .set({stardustCollection, spacesuitColor})
            .where({ID: spacefarerID});

        return `✅ Spacefarer with ID ${spacefarerID} updated successfully!`;
    });

    // ------------------------------------------------
    // BEFORE: READ - Default Limit
    // ------------------------------------------------
    srv.before('READ', Spacefarers, (req) => {
        if (!req.query.limit) {
            req.query.limit = {rows: {val: 5}};
        }
    });

    // ------------------------------------------------
    // ACTION: RemoveSpacefarer
    // ------------------------------------------------
    srv.on('RemoveSpacefarer', async (req) => {
        const {spacefarerID} = req.data;
        const tx = cds.transaction(req);

        await tx.delete.from(Spacefarers).where({ID: spacefarerID});
        return `🗑️ Spacefarer with ID ${spacefarerID} removed successfully!`;
    });
});
