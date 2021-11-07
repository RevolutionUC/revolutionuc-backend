import { Logger } from '@nestjs/common';
import { ProjectDto } from 'src/judging/application/dtos/project.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csvToJson = require('csvjson-csv2json');

interface DevpostExportConfig {
  titleColumn: string;
  urlColumn: string;
  categoryColumn: string;
}

export const devpostParser = (csv: string, config: DevpostExportConfig) => {
  const projects: { [key: string]: ProjectDto } = {};
  const json = csvToJson(csv);

  json.forEach((submission: { [key: string]: string }) => {
    const title = submission[config.titleColumn];
    const url = submission[config.urlColumn];
    const category = submission[config.categoryColumn];

    Logger.log(`Searching for project "${title}"`);
    const project = projects[title];

    if (project) {
      Logger.log(
        `project "${title}" already exists, adding category ${category}`,
      );
      project.categories.push(category);
    } else {
      Logger.log(
        `project "${title}" does not exist, creating now with category ${category}`,
      );

      let submitter = ``;
      const team: string[] = [];

      for (let i = 0; i < 4; i++) {
        let prefix = `Submitter`;

        if (i) {
          prefix = `Team Member ${i}`;
        }

        const email = submission[`${prefix} Email`];
        const member = `${submission[`${prefix} First Name`]} ${
          submission[`${prefix} Last Name`]
        } <${email}>`;

        if (i) {
          email && team.push(member);
        } else {
          submitter = member;
        }
      }

      Logger.log(`submitter: ${submitter}, team: ${team.join(`, `)}`);

      projects[title] = {
        title,
        submitter,
        team,
        url,
        categories: [`General`, category],
      };
    }
  });

  Logger.log(`Total projects: ${Object.keys(projects).length}`);

  return Object.values(projects);
};
