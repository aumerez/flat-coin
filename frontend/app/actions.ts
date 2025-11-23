"use server";

import {
  OctavPortfolioResponse,
  OctavHistoricalResponse,
  OctavTransactionsResponse,
  OctavTokenOverviewResponse
} from "@/src/types/octav";

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

export async function getHistoricalData(
  address: string,
  date?: string,
): Promise<OctavHistoricalResponse> {
  const apiKey = process.env.OCTAV_API_KEY;
  if (!apiKey) {
    throw new Error("OCTAV_API_KEY is not configured");
  }

  // Build query parameters
  const params = new URLSearchParams({ addresses: address });
  if (date) params.append("date", date);
  // if (endDate) params.append("endDate", endDate);

  const response = await fetch(
    `https://api.octav.fi/v1/historical?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );
    console.log('::::::', { response });
  if (!response.ok) {
    console.log(`Failed to fetch historical data: ${response}`)
    throw new Error(`Failed to fetch historical data: ${response}`); // .statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getTransactions(
  address: string,
  limit: number = 10,
  offset: number = 0,
  sort: "ASC" | "DESC" = "DESC"
): Promise<OctavTransactionsResponse> {
  const apiKey = process.env.OCTAV_API_KEY;
  if (!apiKey) {
    throw new Error("OCTAV_API_KEY is not configured");
  }

  // Build query parameters
  const params = new URLSearchParams({
    addresses: address,
    limit: limit.toString(),
    offset: offset.toString(),
    sort: sort,
  });

  const response = await fetch(
    `https://api.octav.fi/v1/transactions?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getTokenOverview(
  address: string,
  date?: string
): Promise<OctavTokenOverviewResponse> {
  const apiKey = process.env.OCTAV_API_KEY;
  if (!apiKey) {
    throw new Error("OCTAV_API_KEY is not configured");
  }

  // Build query parameters
  const params = new URLSearchParams({ addresses: address });
  if (date) params.append("date", date);

  const response = await fetch(
    `https://api.octav.fi/v1/token-overview?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch token overview: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
