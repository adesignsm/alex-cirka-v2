import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'bpugi0wz',
  dataset: 'production',
  useCdn: false, // Set to true for production
});

export default client;