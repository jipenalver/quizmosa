const binCount = 5

// Groups scores into equal ranges for the score distribution chart.
export function scoreBins(scores: number[]) {
  if (scores.length === 0) return []

  const highest = Math.max(...scores)
  const width = Math.max(1, Math.ceil((highest + 1) / binCount))

  return Array.from({ length: binCount }, (_unused, index) => {
    const start = index * width
    const end = start + width - 1
    return {
      x: `${start}–${end}`,
      y: scores.filter((score) => score >= start && score <= end).length,
    }
  })
}

export function formatPercent(value: number | null | undefined) {
  return value === null || value === undefined ? '–' : `${Math.round(value * 100)}%`
}

// Whole-number ticks for count axes, so small rooms do not show 0.5 of a person.
export function countAxis(highest: number) {
  const tickAmount = Math.min(Math.max(highest, 1), 5)
  return {
    min: 0,
    max: Math.ceil(Math.max(highest, 1) / tickAmount) * tickAmount,
    tickAmount,
    labels: { formatter: (value: number) => String(Math.round(value)) },
  }
}
