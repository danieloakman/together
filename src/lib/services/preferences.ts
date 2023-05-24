import { safeJsonParse } from '$utils';
import { Preferences } from '@capacitor/preferences';

export const preferences = {
  get: async <T = unknown>(key: string) => {
    const { value } = await Preferences.get({ key });
    return safeJsonParse<T>(value);
  },
  set: async (key: string, value: any) => {
    await Preferences.set({ key, value: typeof value !== 'string' ? JSON.stringify(value) : value });
  },
  remove: (key: string) => Preferences.remove({ key }),
  keys: () => Preferences.keys(),
  clear: () => Preferences.clear(),
};
