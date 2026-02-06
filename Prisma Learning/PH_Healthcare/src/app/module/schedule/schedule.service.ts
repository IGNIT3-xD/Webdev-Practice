import { addDays, startOfDay, differenceInMinutes } from "date-fns"
import { prisma } from "../../lib/prisma"
import type { IUser } from "../appointment/appointment.interface"
import type { ISchedule } from "./schedule.interface"

const createScheduleService = async (payload: ISchedule, user: IUser) => {
    const isExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })

    if (!isExist) {
        throw new Error("Doctor not found.")
    }

    const startOfTheDay = startOfDay(payload.startDateTime)
    const startOfTheNextDay = addDays(startOfTheDay, 1)

    const existScheduleOnThisDate = await prisma.schedule.findFirst({
        where: {
            doctorId: isExist.id,
            isDeleted: false,
            startDateTime: {
                gt: startOfTheDay,
                lt: startOfTheNextDay
            }
        }
    })

    if (existScheduleOnThisDate) {
        throw new Error("You already have a schedule.")
    }

    const duration = differenceInMinutes(payload.startDateTime, payload.endDateTime)
    const MINUTES_PER_SLOTS = 20

    const totalSlots = Math.floor(duration / MINUTES_PER_SLOTS)

    const schedule = await prisma.schedule.create({
        data: {
            startDateTime: payload.startDateTime,
            endDateTime: payload.endDateTime,
            meetingLink: payload.meetingLink,
            totalSlots,
            availableSlots: totalSlots,
            doctorId: isExist.id
        },
        include: {
            doctor: {
                select: {
                    name: true,
                    email: true,
                    contactNumber: true,
                    address: true,
                }
            }
        }
    })

    return schedule
}

export const ScheduleService = {
    createScheduleService
}