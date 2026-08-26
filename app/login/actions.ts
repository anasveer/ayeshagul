"use server";

import { getDb } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const db = await getDb();
  const user = await db.collection("admins").findOne({ email });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }

  await createSession(user._id.toString(), remember);
  redirect("/super-admin");
}
