/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export default async (req: { method: string; body: { firstName: any; lastName: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { err?: any; error?: string; }): any; new(): any; }; }; }) => {
    if (req.method === "POST")
    {
        const {firstName, lastName, email, password} = req.body;

        try
        {
            const hash = await bcrypt.hash(password, 0);
            await prisma.users.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash
                }
            });

            return res.status(200).end();
        }
        catch (err)
        {
            return res.status(503).json({err: err.toString()});
        }
    }
    else
    {
        return res.status(405).json({error: "This request only supports POST requests"})
    }
}