export const BUTTONSTATUS = ['idle', 'success', 'error'] as const;

export type ButtonStatus = (typeof BUTTONSTATUS)[number];
