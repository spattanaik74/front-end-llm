import type { PageServerLoad } from './$types';
import { team } from '$lib/data';

export const load: PageServerLoad = async () => {
  return {
    team
  };
};
