const KEY = 'userId'
const BASE = 'https://glaziersonline.com:3210/api-dev'
const TOKEN = import.meta.env.VITE_API_TOKEN


export async function getOrCreateUserId() {
  const saved = localStorage.getItem(KEY)
  if (saved) 
    return saved

  const res = await fetch(`${BASE}/zip-codes/user`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Ana' }),
  })

  if (!res.ok) throw new Error('User creation failed')

  const json = await res.json()
  console.log('USER CREATE RESPONSE:', json)

  const userId =  String(json.id)
  
  if (!userId) {
    throw new Error('userId not found in response')
  }

  localStorage.setItem(KEY, userId)
  return userId
}
