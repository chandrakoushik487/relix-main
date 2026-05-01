// Fix #6: removed unused Mongoose model import — RELIX uses Firestore, not MongoDB

// Task 206 - 213: SVI Formula
export const calculateBaseSVI = (urgency_level, people_affected) => {
  const urgencyMultiplier = {
    'high': 3,
    'medium': 2,
    'low': 1
  };
  
  const urgency = urgencyMultiplier[urgency_level] || 1;
  const normalizedPeople = Math.min((people_affected || 0) / 1000, 1.0);
  
  // (0.6 × urgency) + (0.4 × people_affected_normalized)
  let componentScore = (0.6 * urgency) + (0.4 * normalizedPeople);
  
  // Base scales between 0 to 2.2 logically based on components
  // Real SVI scales to 1-10 later adding dimensions
  return parseFloat((componentScore * 4).toFixed(2)); // Rough scaling to 10
};

// Task 224: Tier classes
export const getSVITier = (score) => {
  if (score >= 7.0) return { tier: 'Critical', color: '#FF3B30' };
  if (score >= 4.0) return { tier: 'High', color: '#FF9F0A' };
  if (score >= 2.0) return { tier: 'Medium', color: '#FFD60A' };
  return { tier: 'Low', color: '#34C759' };
};
