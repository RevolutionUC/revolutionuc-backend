import { Format } from "structurizr-typescript";
import { readFile } from 'fs';
import { join } from 'path';
import { lattice } from "../containers";
import { workspace } from "../workspace";

export const latticeDocs = workspace.documentation.addSection(
  lattice,
  `Lattice`,
  Format.Markdown,
  `placeholder`
);

readFile(join(process.cwd(), 'docs', 'lattice.md'), (err, file) => {
  if(err) throw err;
  latticeDocs.content = file.toString();
});