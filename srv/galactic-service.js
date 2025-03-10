const cds = require('@sap/cds');
const nodemailer = require('nodemailer');

class GalacticService extends cds.ApplicationService {
    async init() {
        const {Spacefarers} = this.entities;
        const RESTRICTED_PLANETS = ['Mars', 'Jupiter'];

        // Users from restricted planets cannot access Spacefarers' data.
        this.before('*', (req) => {
            if (RESTRICTED_PLANETS.includes(req.user.planet)) {
                req.reject(403, 'Unauthorized access');
            }
        });

        // Validate inputs before CREATE and UPDATE
        this.before(['CREATE', 'UPDATE'], Spacefarers, this._validateSpacefarerData);

        // Send email notification after CREATE
        this.after('CREATE', Spacefarers, this._sendWelcomeEmail);

        await super.init();
    }

    _validateSpacefarerData(req) {
        const {data} = req;
        const LIMIT_VALUE = 100;
        const DEFAULT_VALUE = 0;

        data.stardustCollection = data.stardustCollection ?? DEFAULT_VALUE;
        data.wormholeNavigation = data.wormholeNavigation ?? DEFAULT_VALUE;

        if (!data.name?.trim().length) {
            req.reject(400, 'Name must be provided and cannot be empty or just spaces.');
        }

        if (data.stardustCollection < DEFAULT_VALUE || data.stardustCollection > LIMIT_VALUE) {
            req.reject(400, `stardustCollection must be between ${DEFAULT_VALUE} and ${LIMIT_VALUE}.`);
        }

        if (data.wormholeNavigation < DEFAULT_VALUE || data.wormholeNavigation > LIMIT_VALUE) {
            req.reject(400, `wormholeNavigation must be between ${DEFAULT_VALUE} and ${LIMIT_VALUE}.`);
        }
    }

    async _sendWelcomeEmail(data, req) {
        try {
            await this._sendTestMail(data);
            req.info(`Welcome to the SAP Galaxy, ${data.name}! An email will be sent to your email address with further instructions.`);
        } catch (error) {
            req.reject(error);
        }
    }

    async _sendTestMail(data) {
        try {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                },
                logger: true,
                transactionLog: true,
                allowInternalNetworkInterfaces: false
            });

            let message = {
                from: '"Nodemailer" <example@nodemailer.com>',
                to: `"${data?.name || 'User'}" <example@nodemailer.com>`,
                subject: 'Hello fellow Spacefarer!',
                text: `Welcome ${data?.name || 'User'}!`,
                html: `<p><b>Hello</b>, Welcome ${data?.name || 'User'}!</p>`
            };

            let info = await transporter.sendMail(message);
            console.log('✅ Message sent successfully!');
            console.log('📩 Preview URL:', nodemailer.getTestMessageUrl(info));
            return info;
        } catch (error) {
            console.error('❌ Email sending failed:', error.message);
            throw error;
        }
    }
}

module.exports = {GalacticService};
