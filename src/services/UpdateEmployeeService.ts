import { prisma } from "../config/prisma"

export const UpdatEemployeeService = {
    update: async (id:number,userName:string,hired_at:Date,deleted_at:Date,userId:number) =>
    {

        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        
        const emplData = await prisma.employee.findUnique({
            where: {
                id,
            }
        })
       
       if(!emplData) return {status:404, data:`No employees with id ${id}`}
        
        await prisma.employee.updateMany({
            where: {
                id, AND: [{
                    company_id:userData?.company_id as number,
                }]
            },
            data: {
                name: userName,
                hired_at: new Date(hired_at),
                deleted_at:new Date(deleted_at),
                updated_at: new Date(),
                },
            });
        
        return {status:201,data:"Updated"}

    }
}