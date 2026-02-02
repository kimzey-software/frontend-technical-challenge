export async function getZipInfo(zip: string) {
  const res = await fetch(`https://api.zippopotam.us/us/${zip}`)

  if (!res.ok) {
    throw new Error('ZIP not found')
  }

  return res.json()
}
