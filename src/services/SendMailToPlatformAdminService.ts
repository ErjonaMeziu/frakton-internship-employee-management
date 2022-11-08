
import { MailHog } from '../utils/MailHog';
import { FROM_ADDRESS } from '../config/mail';
import { LoadFile } from '../utils/LoadFile';
import { prisma } from '../config/prisma';

export const SendMailToPlatformAdminService = {
    sendmail: async (data:Object) =>
    {
        const admin = await prisma.user.findFirst({
            where: {
                role: 'PlatformAdmin',
            },
        });
    

        MailHog.sendMail({
            from: FROM_ADDRESS,
            to: admin?.email,
            html: LoadFile('../views/requestEmail.html', data),
        });
    }
}
