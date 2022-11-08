import { prisma } from "../config/prisma"

export const UpdatEemployeeService = {
    update: async (id:number,userName:string,hired_at:Date,deleted_at:Date) =>
    {
        const emplData = await prisma.employee.findUnique({
            where: {
                id
            }
        })
        if(!emplData) return {status:204, data:`No employees with id ${id}`}
        await prisma.employee.update({
            where: {
                id,
            },
            data: {
                name: userName,
                hired_at: new Date(hired_at),
                updated_at:new Date(),
            },
        });

        return {status:201,data:"Updated"}

    }
}