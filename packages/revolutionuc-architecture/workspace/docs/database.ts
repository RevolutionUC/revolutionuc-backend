import { DecisionStatus, Format } from "structurizr-typescript";
import { readFile } from 'fs';
import { join } from 'path';
import { system } from "../systems";
import { workspace } from "../workspace";

export const databaseDecision = workspace.documentation.addDecision(
  system,
  `database-decision`,
  new Date(),
  `Database choice`,
  DecisionStatus.Accepted,
  Format.Markdown,
  ``
);

readFile(join(process.cwd(), 'docs', 'database.md'), (err, file) => {
  if(err) throw err;
  databaseDecision.content = file.toString();
});