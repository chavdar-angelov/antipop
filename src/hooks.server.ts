import { initDatabase } from '$lib/server/database/mongo';
import { ensureIndexes } from '$lib/server/database/indexes';
import { registerHandlers } from '$lib/server/core/register-handlers';

await initDatabase();
await ensureIndexes();
registerHandlers();
