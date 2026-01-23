export async function fetchUsers(token, limit, lastUid = null) {
  let url = `http://localhost:8080/users/users`;
  if (limit) url += `?limit=${limit}`
  if (lastUid) url += `&lastUid=${lastUid}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return await res.json(); // { users, lastUid }
}
