const K_FORMAT_THRESHOLD = 1000

const getSeasonStart = (currentDate: Date): Date => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  if (month >= 3 && month < 6) return new Date(year, 2, 1)
  if (month >= 6 && month < 9) return new Date(year, 5, 1)
  if (month >= 9 && month < 12) return new Date(year, 8, 1)
  return new Date(year, 11, 1)
}

const toKFormat = (value: number): string => `${Math.round(value / 1000)}K`

export const calculateDailyPoints = (currentDate: Date): string => {
  const seasonStart = getSeasonStart(currentDate)
  const msPerDay = 1000 * 60 * 60 * 24
  const currentDay = new Date(currentDate)
  const seasonStartDay = new Date(seasonStart)
  const dayNumber =
    Math.floor(
      (currentDay.setHours(0, 0, 0, 0) - seasonStartDay.setHours(0, 0, 0, 0)) /
      msPerDay,
    ) + 1

  if (dayNumber <= 1) return '2'
  if (dayNumber === 2) return '3'

  let previousPrevious = 2
  let previous = 3
  let current = 3

  for (let day = 3; day <= dayNumber; day += 1) {
    current = Math.round(previousPrevious + previous * 0.6)
    previousPrevious = previous
    previous = current
  }

  if (current > K_FORMAT_THRESHOLD) {
    return toKFormat(current)
  }

  return `${current}`
}
