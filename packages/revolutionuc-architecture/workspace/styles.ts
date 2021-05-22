import { ElementStyle, Tags, Shape } from "structurizr-typescript";
import { database, api, emails, website, devWebsite, admin, judging, stats, lattice, assets, revvit } from "./containers";
import { workspace } from "./workspace";

export const MyTags = {
  database: 'database',
  server: 'server',
  webapp: 'webapp',
  mobileapp: 'mobileapp',
  folder: 'folder',
  bot: 'bot',
};

const styles = workspace.views.configuration.styles;

const personStyle = new ElementStyle(Tags.Person);
personStyle.shape = Shape.Person;
personStyle.color = "#ffffff";
personStyle.background = "#073b6e";
styles.addElementStyle(personStyle);

const containerStyle = new ElementStyle(Tags.Container);
containerStyle.shape = Shape.Ellipse;
containerStyle.color = "#ffffff";
containerStyle.background = "#438dd5";
styles.addElementStyle(containerStyle);

const componentStyle = new ElementStyle(Tags.Component);
componentStyle.shape = Shape.Box;
componentStyle.color = "#ffffff";
componentStyle.background = "#438dd5";
styles.addElementStyle(componentStyle);

const softwaresystemStyle = new ElementStyle(Tags.SoftwareSystem);
softwaresystemStyle.shape = Shape.Hexagon;
softwaresystemStyle.color = "#ffffff";
softwaresystemStyle.background = "#073b6e";
styles.addElementStyle(softwaresystemStyle);

const dbStyle = new ElementStyle(MyTags.database);
dbStyle.shape = Shape.Cylinder;
dbStyle.color = "#ffffff";
dbStyle.background = "#438dd5";
styles.addElementStyle(dbStyle);

const serverStyle = new ElementStyle(MyTags.server);
serverStyle.shape = Shape.Box;
serverStyle.color = "#ffffff";
serverStyle.background = "#438dd5";
styles.addElementStyle(serverStyle);

const webAppStyle = new ElementStyle(MyTags.webapp);
webAppStyle.shape = Shape.WebBrowser;
webAppStyle.color = "#ffffff";
webAppStyle.background = "#438dd5";
styles.addElementStyle(webAppStyle);

const mobileAppStyle = new ElementStyle(MyTags.mobileapp);
mobileAppStyle.shape = Shape.MobileDevicePortrait;
mobileAppStyle.color = "#ffffff";
mobileAppStyle.background = "#438dd5";
styles.addElementStyle(mobileAppStyle);

const folderStyle = new ElementStyle(MyTags.folder);
folderStyle.shape = Shape.Folder;
folderStyle.color = "#ffffff";
folderStyle.background = "#438dd5";
styles.addElementStyle(folderStyle);

const botStyle = new ElementStyle(MyTags.bot);
botStyle.shape = Shape.Robot;
botStyle.color = "#ffffff";
botStyle.background = "#438dd5";
styles.addElementStyle(botStyle);

database.tags.add(MyTags.database);
api.tags.add(MyTags.server);
emails.tags.add(MyTags.server);
website.tags.add(MyTags.webapp);
devWebsite.tags.add(MyTags.webapp);
admin.tags.add(MyTags.webapp);
judging.tags.add(MyTags.webapp);
stats.tags.add(MyTags.webapp);
lattice.tags.add(MyTags.mobileapp);
assets.tags.add(MyTags.folder);
revvit.tags.add(MyTags.bot);