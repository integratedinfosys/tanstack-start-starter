import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { prisma } from '@/db'
import { getUserIdFn } from "../auth/auth-server";
import { getErrorOptions } from "../app-utils";

export const getAppUserByIdFn = createServerFn({ method: "GET" })
    .inputValidator(z.object({ id: z.string() }))
    .handler(async ({ data }) => {
        try {
            const record = await prisma.appUser.findUnique({
                where: { id: data.id },
                include: {
                    user: true,
                },
            });
            if (!record) {
                throw new Error(`App User with ID ${data} not found`);
            }
            return record;
        } catch (error) {
            throw new Error("Something went wrong", getErrorOptions(error));
        }
    });

export const upsertAppUserFn = createServerFn({ method: "POST" })
    .handler(async () => {
        // Ensure the user is authenticated and has an author ID
        const id = await getUserIdFn();
        if (!id) {
            throw new Error("Unable to get UserId while creating AppUser");
        }

        try {
            const newAppUser = await prisma.appUser.create({
                data: {
                    id: id,
                    appUserId: id
                },
            });
            if (!newAppUser) {
                throw new Error("Failed to create App User");
            }
        } catch (error) {
            // console.error("Error creating App User:", error);
            // throw throwError("Error creating App User:", error);
            throw new Error("Something went wrong", getErrorOptions(error));
        }
    });
