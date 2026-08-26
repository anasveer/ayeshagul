import { MongoClient } from "mongodb";
import { randomBytes, scryptSync } from "crypto";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "ayeshagul";

const email = process.env.ADMIN_EMAIL || "bilal21@gmail.com";
const password = process.env.ADMIN_PASSWORD || "bilal-@/ansari";

if (!uri) {
  console.error(
    "MONGODB_URI is not set. Run with: node --env-file=.env.local scripts/seed-admin.mjs"
  );
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const admins = db.collection("admins");

  const result = await admins.updateOne(
    { email },
    {
      $set: {
        email,
        passwordHash: hashPassword(password),
        role: "superadmin",
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  console.log(
    `Admin ${result.upsertedCount ? "created" : "updated"}: ${email}`
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => client.close());
