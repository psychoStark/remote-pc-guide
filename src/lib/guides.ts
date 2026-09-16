import { getCollection } from 'astro:content';

export const sectionLabels = {
  network: 'Network',
  routing: 'Routing',
  stream: 'Streaming',
  hardmod: 'Hardware fallback',
} as const;

export async function getGuideEntries() {
  return (await getCollection('guides')).sort((a, b) => a.data.order - b.data.order);
}

export async function getGuideNavigation(currentId: string) {
  const guides = await getGuideEntries();
  const currentIndex = guides.findIndex((guide) => guide.id === currentId);

  return {
    all: guides,
    previous: currentIndex > 0 ? guides[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null,
  };
}
