import { ElementStyle, Tags, Shape } from "structurizr-typescript";
import { api, emails, website, devWebsite, admin, judging, stats, lattice, assets, revvit, Services } from "./containers";
import { workspace } from "./workspace";

export const MyTags = {
  database: 'database',
  server: 'server',
  webapp: 'webapp',
  mobileapp: 'mobileapp',
  folder: 'folder',
  bot: 'bot',
  api: 'api',
};

const brand = {
  primary: '#FC7F3F',
  secondary: '#254441',
  tertiary: '#43AA8B'
};

const colors = {
  frontend: brand.primary,
  infrastructure: brand.secondary,
  service: brand.tertiary,
  external: `#000000`,
  person: `#888888`
};

const styles = workspace.views.configuration.styles;

const personStyle = new ElementStyle(Tags.Person);
personStyle.shape = Shape.Person;
personStyle.color = "#ffffff";
personStyle.background = colors.person;
styles.addElementStyle(personStyle);

const softwareSystemStyle = new ElementStyle(Tags.SoftwareSystem);
softwareSystemStyle.shape = Shape.Hexagon;
softwareSystemStyle.color = "#ffffff";
softwareSystemStyle.background = colors.external;
styles.addElementStyle(softwareSystemStyle);

const dbStyle = new ElementStyle(MyTags.database);
dbStyle.shape = Shape.Cylinder;
dbStyle.color = "#ffffff";
dbStyle.background = colors.infrastructure;
styles.addElementStyle(dbStyle);

const serverStyle = new ElementStyle(MyTags.server);
serverStyle.shape = Shape.Box;
serverStyle.color = "#ffffff";
serverStyle.background = colors.service;
styles.addElementStyle(serverStyle);

const webAppStyle = new ElementStyle(MyTags.webapp);
webAppStyle.shape = Shape.WebBrowser;
webAppStyle.color = "#ffffff";
webAppStyle.background = colors.frontend;
styles.addElementStyle(webAppStyle);

const mobileAppStyle = new ElementStyle(MyTags.mobileapp);
mobileAppStyle.shape = Shape.MobileDevicePortrait;
mobileAppStyle.color = "#ffffff";
mobileAppStyle.background = colors.frontend;
styles.addElementStyle(mobileAppStyle);

const folderStyle = new ElementStyle(MyTags.folder);
folderStyle.shape = Shape.Folder;
folderStyle.color = "#ffffff";
folderStyle.background = colors.infrastructure;
styles.addElementStyle(folderStyle);

const botStyle = new ElementStyle(MyTags.bot);
botStyle.shape = Shape.Robot;
botStyle.color = "#ffffff";
botStyle.background = colors.frontend;
styles.addElementStyle(botStyle);

const apiStyle = new ElementStyle(MyTags.api);
apiStyle.shape = Shape.Pipe;
apiStyle.color = "#ffffff";
apiStyle.background = colors.infrastructure;
styles.addElementStyle(apiStyle);

api.tags.add(MyTags.api);
emails.tags.add(MyTags.folder);
website.tags.add(MyTags.webapp);
devWebsite.tags.add(MyTags.webapp);
admin.tags.add(MyTags.webapp);
judging.tags.add(MyTags.webapp);
stats.tags.add(MyTags.webapp);
lattice.tags.add(MyTags.mobileapp);
assets.tags.add(MyTags.folder);
revvit.tags.add(MyTags.bot);

Object.values(Services).forEach(({ service, database}) => {
  service.tags.add(MyTags.server);
  database.tags.add(MyTags.database);
});
