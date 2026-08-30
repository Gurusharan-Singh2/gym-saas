import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'healthy';
  let latencyMs = 0;
  let dbDetails = {};

  try {
    const isConnected = await db.isConnected();
    if (isConnected) {
      const knex = db.rawKnex();
      // Lightweight heartbeat query to keep connection pool active and prevent database sleep
      const result = await knex.raw('SELECT 1 + 1 AS heartbeat, NOW() as server_time');
      latencyMs = Date.now() - startTime;

      dbDetails = {
        connected: true,
        type: 'Aiven Cloud MySQL 8.4',
        latency: `${latencyMs}ms`,
        server_time: result[0]?.[0]?.server_time || new Date().toISOString(),
      };
    } else {
      latencyMs = Date.now() - startTime;
      dbDetails = {
        connected: false,
        type: 'Resilient Memory Layer',
        latency: `${latencyMs}ms`,
      };
    }
  } catch (error) {
    dbStatus = 'degraded';
    latencyMs = Date.now() - startTime;
    dbDetails = {
      connected: false,
      latency: `${latencyMs}ms`,
      error: error.message,
    };
  }

  const responsePayload = {
    status: dbStatus === 'healthy' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: typeof process.uptime === 'function' ? `${Math.floor(process.uptime())}s` : 'active',
    environment: process.env.NODE_ENV || 'development',
    database: dbDetails,
    message: 'AURA Athletics Database Heartbeat active — preventing cloud DB sleep',
  };

  return NextResponse.json(responsePayload, {
    status: dbStatus === 'healthy' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'X-Database-Latency': `${latencyMs}ms`,
    },
  });
}

export async function HEAD() {
  return GET();
}
