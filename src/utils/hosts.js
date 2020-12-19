// get the hostname
const { hostname } = window.location

// export the server host
export const server = hostname.includes('localhost') ? 'http://localhost:4000/api' : '/api'
