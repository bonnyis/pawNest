export const ROUTES = {
    HOME: '/',
    MISSING: '/missing',
    COMMUNITY: 'community',
    VOLUNTEER: '/volunteer',
    ADOPTION: '/adoption'
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];