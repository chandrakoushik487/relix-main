/**
 * Mock chart data generator for Relix dashboard.
 * This will be replaced with live Supabase queries when the API layer is connected.
 */

// --- Issues by Problem Type ---
export function getIssuesByType() {
  return [
    { type: 'Water', count: 47 },
    { type: 'Health', count: 38 },
    { type: 'Housing', count: 24 },
    { type: 'Education', count: 15 },
    { type: 'Others', count: 9 },
  ];
}

// --- Issues Over Time (last 14 days) ---
export function getIssuesOverTime() {
  const data = [];
  const today = new Date();

  // Seed-like deterministic values for realistic shape
  const createdPattern = [8, 12, 10, 15, 22, 18, 14, 20, 25, 19, 16, 28, 21, 17];
  const resolvedPattern = [5, 8, 9, 11, 14, 16, 12, 15, 18, 17, 14, 20, 19, 15];

  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const idx = 13 - i;

    // 7-day moving average for created
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, idx - 6); j <= idx; j++) {
      sum += createdPattern[j];
      count++;
    }

    data.push({
      date: label,
      created: createdPattern[idx],
      resolved: resolvedPattern[idx],
      avg7d: Math.round(sum / count),
    });
  }

  return data;
}

// --- Status Distribution ---
export function getStatusDistribution() {
  return [
    { name: 'Pending', value: 42 },
    { name: 'Assigned', value: 67 },
    { name: 'Completed', value: 158 },
  ];
}

// --- SVI by Region ---
export function getSviByRegion() {
  return [
    { region: 'Secunderabad', svi: 8.4, issues: 12 },
    { region: 'Kukatpally', svi: 6.2, issues: 8 },
    { region: 'Medchal', svi: 4.7, issues: 6 },
    { region: 'LB Nagar', svi: 3.1, issues: 4 },
    { region: 'Miyapur', svi: 1.8, issues: 2 },
  ];
}

// --- Response Time Distribution ---
export function getResponseTimeTrend() {
  return [
    { bucket: '<15m', count: 34 },
    { bucket: '15-30m', count: 52 },
    { bucket: '30m-1h', count: 28 },
    { bucket: '1-2h', count: 15 },
    { bucket: '>2h', count: 8 },
  ];
}
