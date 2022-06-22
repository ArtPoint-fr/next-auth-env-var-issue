const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants")

// https://dev.to/austinshelby/you-are-reading-environment-variables-the-wrong-way-in-nextjs-45da
const getEnvironmentVariable = (environmentVariable) => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable]
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    )
  } else {
    return unvalidatedEnvironmentVariable
  }
}

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1"
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1"

  console.log("###############################################################")
  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    NEXT_PUBLIC_APP_URL: getEnvironmentVariable("APP_URL"),

    // NEXTAUTH_URL: getEnvironmentVariable("NEXTAUTH_URL"), // This is what we do asworkaround
    NEXTAUTH_URL: getEnvironmentVariable("APP_URL"), // This is what we what to do to prevent duplicates env vars

    NEXTAUTH_SECRET: getEnvironmentVariable("NEXTAUTH_SECRET"),

    GOOGLE_ID: getEnvironmentVariable("GOOGLE_ID"),
    GOOGLE_SECRET: getEnvironmentVariable("GOOGLE_SECRET"),

    EMAIL_SERVER: getEnvironmentVariable("EMAIL_SERVER"),
    EMAIL_FROM: getEnvironmentVariable("EMAIL_FROM"),
  }
  console.log("###############################################################")

  // next.config.js object
  return {
    env,
  }
}
