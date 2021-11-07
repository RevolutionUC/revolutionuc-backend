import { system } from '../systems';

export const website = system.addContainer(
  'Website',
  'Primary frontend of the hackathon',
  'Jekyll and Netlify',
)!;

export const devWebsite = system.addContainer(
  'Development Website',
  'Development version of the frontend to stage new features',
  'Jekyll and Netlify',
)!;

export const admin = system.addContainer(
  'Admin Panel',
  'Administrative panel for organizers to manage registrants',
  'Angular and Netlify',
)!;

export const judging = system.addContainer(
  'Judging Panel',
  'Manage and score judging information and project submissions',
  'Angular and Netlify',
)!;

export const stats = system.addContainer(
  'Stats website',
  'Displays key statistics about hackathon registration and participation',
  'Nodejs, React, Chart.js and Heroku',
)!;

export const lattice = system.addContainer(
  'Lattice',
  'Hacker matching app for participants to find potential teammates',
  'React and Netlify',
)!;

export const revvit = system.addContainer(
  'Revvit',
  'Discord bot interface layer for convenience commands',
  'DiscordJS',
)!;
