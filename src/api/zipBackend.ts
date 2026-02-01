const BASE = 'https://glaziersonline.com:3210/api-dev'
const TOKEN = import.meta.env.VITE_API_TOKEN

export async function saveZip(payload: any) {
  console.log('Payload:',JSON.stringify(payload))
  const res = await fetch(`${BASE}/zip-codes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  console.log('SAVE ZIP STATUS:', res.status)
  console.log('SAVE ZIP BODY:', JSON.stringify(text))

  if (!res.ok) {
    throw new Error(text || 'Save ZIP failed')
  }

 
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
