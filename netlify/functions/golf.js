const GCAPI_KEY = 'WBDTXEE7RFRB6N3GDTE2T76D34';
const BASE = 'https://api.golfcourseapi.com/v1';

exports.handler = async (event) => {
  const { action, q, id } = event.queryStringParameters || {};

  let url;
  if (action === 'search' && q) {
    url = `${BASE}/search?search_query=${encodeURIComponent(q)}`;
  } else if (action === 'course' && id) {
    url = `${BASE}/courses/${id}`;
  } else {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing action or params' }) };
  }

  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Key ${GCAPI_KEY}` }
    });
    const data = await res.json();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
