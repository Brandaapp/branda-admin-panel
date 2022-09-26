# Changelog

## [0.1.0] - September 19, 2022

### Added

- Migrated legacy API routes
    - GET /api/branvan/get/shuttleRouteShedule/{name}
    - GET /api/branvan/get/shuttleRouteShedule
    - GET /api/branvan/get/stops/{route}
    - GET /api/branvan/get/stops
    - GET /api/getDiningHours
    - GET /api/getinfo/brandeisclubs/approved
    - GET /api/getinfo/branvan/available/{date}/{minHr}
    - GET /api/getinfo/branvan/josephs_running
    - GET /api/getinfo/branvan/notifications
    - DELETE /api/getinfo/deletePushTokenFromOrganization
    - GET /api/getinfo/getEvents
    - GET /api/getinfo/gymTimes
    - GET /api/getinfo/kb/getAppKb
    - GET /api/getinfo/libraryHours/today
    - GET /api/getinfo/libraryHours/week
    - GET /api/getinfo/news
    - POST /api/getinfo/pushtokens

### Changed

- Cron jobs
    - fixed internal structure and updated endpoints
        - PATCH /api/cron/replaceTags
        - PATCH /api/cron/updateDiningHours
        - PATCH /api/cron/updateNews
    - added actions to GitHub Actions workflow
        - replaceTags on cron schedule `"*/15 * * * *"`
        - updateDiningHours and updateNews on cron schedule `"30 */12 * * *"`
- Updated internal dependencies