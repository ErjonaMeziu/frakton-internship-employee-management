import { Event } from './App.event';
import { MailHog } from '../utils/MailHog';
import { FROM_ADDRESS } from '../config/mail';
import { readFile } from '../utils/ReadFile';
import { prisma } from '../config/prisma';

Event.on('register::company', async (company: string) => {
    const admin = await prisma.user.findFirst({
        where: {
            role: 'PlatformAdmin',
        },
    });
    try {
        let ss = await MailHog.sendMail({
            from: FROM_ADDRESS,
            to: admin?.email,
            html: readFile(company),
        });
    } catch (err) {
        return { status: 406, data: 'Unacceptable request' };
    }
});
