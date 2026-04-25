import React from 'react';
import IncidentDetailClient from './IncidentDetailClient';

export async function generateStaticParams() {
  return [{ id: 'REL-8821' }, { id: 'REL-8822' }];
}

export default function Page() {
  return <IncidentDetailClient />;
}
