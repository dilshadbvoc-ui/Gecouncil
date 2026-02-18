// API client utilities

export async function fetchPrograms(query?: string, country?: string) {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (country) params.append('country', country);

  const response = await fetch(`/api/programs?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch programs');
  }
  return response.json();
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  return response.json();
}
