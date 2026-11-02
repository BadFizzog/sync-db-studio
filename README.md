# Sync DB Studio

A local, browser-based SQLite editor powered by Prisma Studio. Browse tables,
filter records, edit data, and run SQL against your Sync database without adopting
Prisma ORM.

## Requirements

- Node.js matching `^22.12.0 || ^24.0.0 || >=26.0.0`
- npm
- An existing SQLite database, such as `sync-server/server.db`

The startup scripts use a POSIX shell, as available on macOS and Linux.

## Setup

From this directory, install dependencies and create your local configuration:

```sh
npm ci
cp .env.local.example .env.local
```

Edit `.env.local` to point to your database:

```dotenv
DATABASE_URL="file:///absolute/path/to/sync-server/server.db"
PORT=5555
```

`DATABASE_URL` must use an absolute `file:///` URL pointing to an existing SQLite
file. `PORT` sets the local web server port. The `.env.local` file is ignored by
Git; `.env.local.example` provides the configuration template.

## Run

```sh
npm run dev
```

Open [http://localhost:5555](http://localhost:5555), or the port configured in
`.env.local`. The browser does not open automatically. Press Ctrl+C in the
terminal to stop Studio.

`npm start` runs the same command. Use either command to load `.env.local`;
`npm run studio` is the internal script that expects environment variables to
already be set.

To override the configured port for one run:

```sh
PORT=5556 npm run dev
```

## Working with data

Studio connects directly to the configured database file. Saved edits affect the
data used by Sync. No database copy, Prisma schema, or migration setup is required.

See the [Prisma Studio documentation](https://docs.prisma.io/docs/studio/getting-started)
for browsing, editing, and filtering data.
