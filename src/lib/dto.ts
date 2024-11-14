import "server-only";
import { getUser } from "@/lib/dal";
import { db } from "@/db";
import { User } from "@/db/schema";

function canSeeUsername(viewer: User) {
  if (!viewer) return false;
  return true;
}

function canSeePhoneNumber(viewer: User) {
  return viewer.role === "admin";
}

export async function getProfileDTO(slug: string) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
    // Return specific columns here
  });
  const user = data[0];

  const currentUser = await getUser(user.id);

  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser) ? user.phonenumber : null,
  };
}
