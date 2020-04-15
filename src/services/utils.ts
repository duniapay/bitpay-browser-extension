export function removeProtocolAndWww(url: string): string {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(url: string, params: any, opts?: { headers?: { [name: string]: string } }): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    headers: (opts && opts.headers) || {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  if (!response.ok) {
    const err = await response.json();
    throw Error(err.message);
  }
  const data = await response.json();
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy(list: any[], props: any): {} {
  return list.reduce((a, b) => {
    (a[b[props]] = a[b[props]] || []).push(b);
    return a;
  }, {});
}

export const wait = (ms: number): Promise<void> => new Promise(_ => setTimeout(_, ms));
