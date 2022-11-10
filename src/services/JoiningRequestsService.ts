import { prisma } from '../config/prisma';

export const JoiningRequestsService = {
    getRequests: async () => {
        const userData = await prisma.user.findMany({
            where: {
                is_approved: false,
            },
            select: {
                name: true,
                email: true,
                company: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!userData) return { status: 204, data: 'No requests' };

        return { status: 200, data: userData };
    },
};
