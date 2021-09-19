export const access = {
    manager: {
        allowed: new Set([
            "/announcements",
            "/",
            "/docs",
            "/login",
            "/push-notifications",
            "/register",
            "/reservations",
            "/schedules",
            "/screens",
            "/shuttles-management"
        ]),
        redirectTo: "/"
    },
    employee: {
        allowed: new Set([
            "/",
            "/login"
        ]),
        redirectTo: "/"
    },
    publicsafety: {
        allowed: new Set([
            "/login",
            "/shuttles-management"
        ]),
        redirectTo: "/shuttles-management"
    },
    joseph: {
        allowed: new Set([
            "/login",
            "/shuttles-management"
        ]),
        redirectTo: "/shuttles-management"
    },
    organizationAdmin: {
        allowed: new Set([
            "/login",
            "/push-notifications"
        ]),
        redirectTo: "/push-notifications"
    }
}