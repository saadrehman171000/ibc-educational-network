// Utility function to generate SEO-friendly slugs
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start of text
    .replace(/-+$/, '')             // Trim hyphens from end of text
    .substring(0, 60)               // Limit length to 60 characters
}

// Function to generate unique slug with counter if needed
export async function generateUniqueSlug(title: string, existingSlugs: string[]): Promise<string> {
  let baseSlug = slugify(title)
  let finalSlug = baseSlug
  let counter = 1

  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`
    counter++
  }

  return finalSlug
} 