export const access = {
    manager: {
        allowed: new Set([
            "/announcements",
            "/",
            "/docs",
            "/login",
            "/places-management",
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
    }
}