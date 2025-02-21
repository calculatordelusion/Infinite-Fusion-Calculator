export function decodeSlug(slug: string): string {
  const decodedSlug = decodeURIComponent(slug); // Decodes percent-encoded characters
  return decodedSlug.includes("-")
    ? decodedSlug.replace(/-/g, " ") // Replace hyphens with spaces
    : decodedSlug;
}

export function generateSlug(name: string, type: "artists" | "dex"): string {
  // Replace spaces with hyphens
  const slug = name.replace(/\s+/g, "-");
  // Return the slug with the appropriate prefix
  return `/${type}/${slug}`;
}
