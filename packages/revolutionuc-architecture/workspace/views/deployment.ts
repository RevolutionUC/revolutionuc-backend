import { admin, api, assets, devWebsite, emails, judging, lattice, revvit, stats, website } from "../containers";
import { logs } from "../logs";
import { system } from "../systems";
import { workspace } from "../workspace";

const heroku = workspace.model.addDeploymentNode('Heroku', 'Containerized application hosting', 'Heroku')!;
const herokuPg = heroku.addDeploymentNode('Postgres', 'PostgreSQL database managed by Heroku', 'Heroku Postgres')!;

const aws = workspace.model.addDeploymentNode('AWS', 'Amazon Web Services', 'AWS S3')!;
const ec2 = aws.addDeploymentNode('AWS EC2', 'Provisioned virtual server', 'AWS EC2')!;
const s3 = aws.addDeploymentNode('AWS S3', 'Object storage', 'AWS S3')!;
const lambda = aws.addDeploymentNode('AWS Lambda', 'Serverless functions', 'AWS Lambda')!;

const netlify = workspace.model.addDeploymentNode('Netlify', 'Web hosting', 'Netlify')!;

heroku.addDeploymentNode('Dyno 1', 'Heroku hosting container', 'Heroku Dyno', 1)?.add(api);
heroku.addDeploymentNode('Dyno 2', 'Heroku hosting container', 'Heroku Dyno', 1)?.add(stats);
heroku.addDeploymentNode('Dyno 3', 'Heroku hosting container', 'Heroku Dyno', 1)?.add(emails);

// herokuPg.add(database);

netlify.addDeploymentNode('website site', 'Netlify site', 'Netlify')!.add(website);
netlify.addDeploymentNode('devWebsite site', 'Netlify site', 'Netlify')!.add(devWebsite);
netlify.addDeploymentNode('lattice site', 'Netlify site', 'Netlify')!.add(lattice);
netlify.addDeploymentNode('admin site', 'Netlify site', 'Netlify')!.add(admin);
netlify.addDeploymentNode('judging site', 'Netlify site', 'Netlify')!.add(judging);

ec2.add(revvit);
s3.add(assets);
lambda.add(logs);

export const deploymentView = workspace.views.createDeploymentView('deployment', 'deployment of revuc applications', system)!;

deploymentView.addAllDeploymentNodes();
deploymentView.setAutomaticLayout(true);

if(deploymentView.automaticLayout) {
  deploymentView.automaticLayout.edgeSeparation = 50;
  deploymentView.automaticLayout.nodeSeparation = 50;
  deploymentView.automaticLayout.rankSeparation = 200;
}
