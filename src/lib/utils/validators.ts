// ============================================================================
// FILE: src/lib/utils/validators.ts
// Input validation using Zod
// ============================================================================

import { z } from 'zod';

const statsParamsSchema = z.object({
  user: z.string().min(1).max(39).regex(/^[a-zA-Z0-9-]+$/),
  stats: z.string().regex(/^[a-z,]+$/),
  theme: z.enum(['dark', 'light', 'dracula', 'monokai', 'nord', 'gruvbox']).optional(),
  bg_color: z.string().regex(/^[0-9a-fA-F]{6}$/).nullable().optional(),
  text_color: z.string().regex(/^[0-9a-fA-F]{6}$/).nullable().optional(),
  icon_color: z.string().regex(/^[0-9a-fA-F]{6}$/).nullable().optional(),
  title_color: z.string().regex(/^[0-9a-fA-F]{6}$/).nullable().optional(),
  border_radius: z.number().min(0).max(20),
  hide_border: z.boolean(),
  layout: z.enum(['default', 'compact', 'grid']),
  langs_count: z.number().min(1).max(10),
  cache_seconds: z.number().min(0).max(86400)
});

export function validateStatsParams(params: any): {
  success: boolean;
  error?: string;
} {
  try {
    statsParamsSchema.parse(params);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.errors?.map((e: any) => e.message).join(', ')
    };
  }
}