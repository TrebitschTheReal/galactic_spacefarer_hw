const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const {Spacefarers} = this.entities;

    // Middleware: Dummy autentikáció (Alapértelmezett: guest)
    this.before('*', async (req) => {
        if (!req.user) {
            req.user = new cds.User({id: 'guest', roles: ['guest']});
        }

        if (req.headers['x-role'] === 'admin') {
            req.user = new cds.User({id: 'admin', roles: ['admin']});
        }
    });

    // @Before('CREATE','UPDATE') Validációk
    this.before('CREATE', Spacefarers, async (req) => {
        const data = req.data;
        if (!data.stardustCollection || data.stardustCollection < 0) {
            data.stardustCollection = 0;
        }
        if (!data.wormholeNavigation || data.wormholeNavigation < 1) {
            data.wormholeNavigation = 1;
        }
    });

    // After Create - Kozmikus üzenet
    this.after('CREATE', Spacefarers, async (data, req) => {
        const newSpacefarerName = data.name;
        console.log(`\n** Cosmic Notification: Welcome, ${newSpacefarerName} to the SAP galaxy! **\n`);
    });

    // Csak admin törölhet Spacefarers entitást
    this.before('DELETE', Spacefarers, async (req) => {
        if (!req.user.hasRole('admin')) {
            req.reject(403, 'Only admins can delete spacefarers.');
        }
    });

    // Admin-only enlist action
    this.on('EnlistSpacefarer', async (req) => {
        if (!req.user.hasRole('admin')) {
            req.reject(403, 'Only admins can enlist new spacefarers.');
        }
        return `Spacefarer enlisted successfully!`;
    });

    // Admin-only update action
    this.on('UpdateSpacefarer', async (req) => {
        if (!req.user.hasRole('admin')) {
            req.reject(403, 'Only admins can update spacefarers.');
        }
        const {spacefarerID, stardustCollection, spacesuitColor} = req.data;
        await UPDATE(Spacefarers).set({stardustCollection, spacesuitColor}).where({ID: spacefarerID});
        return `Spacefarer updated successfully!`;
    });

    // Admin-only delete action
    this.on('RemoveSpacefarer', async (req) => {
        if (!req.user.hasRole('admin')) {
            req.reject(403, 'Only admins can remove spacefarers.');
        }
        const {spacefarerID} = req.data;
        await DELETE.from(Spacefarers).where({ID: spacefarerID});
        return `Spacefarer removed successfully!`;
    });
});
