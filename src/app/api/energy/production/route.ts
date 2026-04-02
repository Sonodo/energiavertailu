import { NextResponse } from 'next/server';
import {
  fetchProductionMix,
  generateSampleProductionMix,
} from '@/lib/api/fingrid';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  try {
    // Try real Fingrid API first
    const realData = await fetchProductionMix();

    if (realData) {
      return NextResponse.json({
        success: true,
        data: realData,
        source: 'fingrid',
        updatedAt: new Date().toISOString(),
      });
    }

    // Fall back to sample data
    const sampleData = generateSampleProductionMix();
    return NextResponse.json({
      success: true,
      data: sampleData,
      source: 'sample',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch production mix:', error);

    // Return sample data even on error
    const sampleData = generateSampleProductionMix();
    return NextResponse.json({
      success: true,
      data: sampleData,
      source: 'sample',
      updatedAt: new Date().toISOString(),
    });
  }
}
