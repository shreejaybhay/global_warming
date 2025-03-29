export async function GET() {
  try {
    const response = await fetch('https://global-warming.org/api/arctic-api', {
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch arctic data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}