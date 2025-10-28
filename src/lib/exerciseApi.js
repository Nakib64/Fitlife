const BASE_URL = "https://www.exercisedb.dev/api/v1/exercises/search";

/**
 * Fetch a GIF URL for a single workout name
 * @param {string} name
 * @returns {Promise<string|null>} GIF URL or null
 */
async function fetchGifForWorkout(name) {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(name)}&limit=1&offset=0&threshold=0.3`
    );

    if (!res.ok) {
      console.error(`❌ Failed to fetch for: ${name} (status ${res.status})`);
      return null;
    }
    const data = await res.json();    

    const gifUrl = data.data[0]?.gifUrl || null;
    return gifUrl;
  } catch (err) {
    console.error(`🚨 Error fetching ${name}:`, err);
    return null;
  }
}

/**
 * Get GIF URLs for the given workout names (keeps same order)
 * @param {string[]} names - Array of workout names
 * @returns {Promise<string[]>} Array of GIF URLs (null if not found)
 */
export async function getGifUrlsByWorkouts(names = []) {
  const queries = names.map((n) => n.trim()).filter(Boolean);

  // Fetch all in parallel
  const results = await Promise.all(queries.map(fetchGifForWorkout));

  // Ensure stable order and replace missing URLs with null
  return results.map((url) => url || null);
}
