"use server";

import { OctavPortfolioResponse } from "@/src/types/octav";

export async function getPortfolioData(
  address: string
): Promise<OctavPortfolioResponse | OctavPortfolioResponse[]> {
  const apiKey = process.env.OCTAV_API_KEY;
  if (!apiKey) {
    throw new Error("OCTAV_API_KEY is not configured");
  }

  const response = await fetch(
    `https://api.octav.fi/v1/portfolio?addresses=${address}&includeImages=true`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
