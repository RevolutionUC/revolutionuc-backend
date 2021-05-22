import { system } from "./systems";

export const website = system.addContainer(
  'Website',
  'Primary frontend of the hackathon',
  'Jekyll and Netlify'
)!;

export const devWebsite = system.addContainer(
  'Development Website',
  'Development version of the frontend to stage new features',
  'Jekyll and Netlify'
)!;

export const admin = system.addContainer(
  'Admin',
  'Administrative panel for organizers to manage registrants',
  'Angular and Netlify'
)!;

export const api = system.addContainer(
  'API Server',
  'Monolithic server to manage the entire backend of the hackathon',
  'NestJS and Heroku'
)!;

export const database = system.addContainer(
  'Database',
  'Store for all the required data',
  'PostgreSQL'
)!;

export const emails = system.addContainer(
  'Email Server',
  'Manages and sends emails designed using templates',
  'Nunjucks, Gulp, Mailgun and Heroku'
)!;

export const judging = system.addContainer(
  'Judging Panel',
  'Manage and score judging information and project submissions',
  'Angular and Netlify'
)!;

export const stats = system.addContainer(
  'Stats website',
  'Displays key statistics about hackathon registration and participation',
  'Nodejs, React, Chart.js and Heroku'
)!;

export const lattice = system.addContainer(
  'Lattice',
  'Hacker matching app for participants to find potential teammates',
  'React and Netlify'
)!;

export const assets = system.addContainer(
  'Assets',
  'S3 bucket to store important files',
  'AWS S3'
)!;

export const revvit = system.addContainer(
  'Revvit',
  'Discord bot for convenience commands',
  'Nodejs and Heroku'
)!;