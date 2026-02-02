const bearerToken = 'Bearer vGYgDEj5CNjLrUYp3ybkBc4d'; // From an environment variable in a real app
const getObjectValue = (data: any) => ({
    ...(data && { body: JSON.stringify(data) }),
    headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
    }
})

export async function fetchPost(url: string, data: any) {
    const response = await fetch(url, {
        method: 'POST',
        ...getObjectValue(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? json ?? null;
}

export async function fetchPatch(url: string, data: any) {
    const response = await fetch(url, {
        method: 'PATCH',
        ...getObjectValue(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? json ?? null;
}

export async function fetchDelete(url: string) {
    const response = await fetch(url, {
        method: 'DELETE',
        ...getObjectValue(null),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? json ?? null;
}

export async function fetchGetWithAuth(url: string) {
    const response = await fetch(url, {
        ...getObjectValue(null),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json ?? null;
}

export async function fetchGet(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? json ?? null;
}