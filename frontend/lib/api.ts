const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getDashboardStats() {
  const res = await fetch(`${API_BASE}/api/dashboard/stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed dashboard stats");
  }

  return res.json();
}

export async function getFindings() {
  try {
    const res = await fetch(`${API_BASE}/api/findings/`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export async function launchScan(repoUrl: string) {
  const res = await fetch(`${API_BASE}/api/scans/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repo_url: repoUrl,
    }),
  });

  if (!res.ok) {
    throw new Error("Scan failed");
  }

  return res.json();
}