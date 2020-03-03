import { synchronize } from "@nozbe/watermelondb/sync";

export const listsSync = async database => {
  await synchronize({
    database,
    pullChanges,
    pushChanges
  });
};

const pullChanges = async ({ lastPulledAt }) => {
  //   const response = await fetch(
  //     `https://my.backend/sync?last_pulled_at=${lastPulledAt}`
  //   );

  const response = {
    ok: true,
    changes: {
      items: {
        created: [],
        updated: [],
        deleted: []
      },
      lists: {
        created: [],
        updated: [],
        deleted: []
      }
    },
    timestamp: Date.now()
  };
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const { changes, timestamp } = response;
  return { changes, timestamp };
};

const pushChanges = async ({ changes, lastPulledAt }) => {
  console.warn("changes", changes);
  //   const response = await fetch(
  //     `https://my.backend/sync?last_pulled_at=${lastPulledAt}`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(changes)
  //     }
  //   );
  const response = { ok: true };
  if (!response.ok) {
    throw new Error(await response.text());
  }
};
