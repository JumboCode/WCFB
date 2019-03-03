export function getWeeks()
{
        return fetch.mockResponse(() => callMyApi().then(res => ({body: res}))
}