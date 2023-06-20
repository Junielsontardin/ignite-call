import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

interface Interval {
  weekDay: number
  startTimeInMinutes: number
  endTimeInMinutes: number
}

interface Intervals {
  intervals: Interval[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, buildAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { intervals }: Intervals = req.body

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
