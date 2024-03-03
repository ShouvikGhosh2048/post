import 'dotenv/config';
import type { Config } from 'drizzle-kit';

function getEnvironmentVariable(variableName: string) {
    const value = process.env[variableName];
    if (value === undefined) {
        throw `Environment variable required: ${variableName}`;
    }

    return value;
}

export default {
    schema: './db/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        host: getEnvironmentVariable('POSTGRES_HOST'),
        user: getEnvironmentVariable('POSTGRES_USER'),
        password: getEnvironmentVariable('POSTGRES_PASSWORD'),
        database: getEnvironmentVariable('POSTGRES_DATABASE'),
    }
} satisfies Config;