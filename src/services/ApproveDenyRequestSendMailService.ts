import { MailHog } from '../utils/MailHog';
import { FROM_ADDRESS } from '../config/mail';
import { LoadFile } from '../utils/LoadFile';
import { prisma } from '../config/prisma';

export const ApproveDenyRequestSendMailService = {
    sendmail: async (comanyOwnerId: number) =>
    {
        
        const owner = await prisma.user.findUnique({
            where: {
                id: comanyOwnerId,
            },
        });

        const status=(owner?.is_approved)? 'approved':'denied'

        const data = {
            companyOwner: owner?.name,
            status,
        }
       
        MailHog.sendMail({
            from: FROM_ADDRESS,
            to: owner?.email,
            html: LoadFile('../views/approveDenyRequest.html', data),
        });
    },
};
