import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const settingsRows = await db.getTable('site_settings');
    const settings = {};
    settingsRows.forEach((r) => {
      settings[r.setting_key] = r.setting_value;
    });

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    for (const [key, value] of Object.entries(body)) {
      const existing = await db.rawKnex()('site_settings').where({ setting_key: key }).first().catch(() => null);
      if (existing) {
        await db.rawKnex()('site_settings').where({ setting_key: key }).update({
          setting_value: String(value),
          updated_at: new Date(),
        }).catch(() => {});
      } else {
        await db.rawKnex()('site_settings').insert({
          setting_key: key,
          setting_value: String(value),
          created_at: new Date(),
          updated_at: new Date(),
        }).catch(() => {});
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Club configuration updated successfully',
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
