# NgEmail

This is an Email Client based on Angular5 and nodejs.

## Demo
[Live Demo(Front End only)](https://ddvkid.github.io/ng-email/).

#### Configuration

To start this application, you need a ``.env`` which includes the email provider configurations.

Create a ``.env`` file in the root directory of the project. Add Sendgrid and Mailgun keys on new lines in the form of NAME=VALUE. For example:

````
SENDGRID_URL=https://api.sendgrid.com/v3/mail/send
SENDGRID_API_KEY=your_key
MAILGUN_URL=mailgun_url
MAILGUN_API_KEY=your_key
````

#### Installation

Clone the base code repository from Github, and install node modules.

````
git clone https://github.com/ddvkid/ng-email.git
cd ng-email
npm install
````

#### Running on dev

Run `npm run start` to start a dev server for Angular, and run `npm run server:dev` for Node Server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

Run `npm run build` to build the project. You can also run `npm run build:ng` and `npm run build:server` to build the Angular and node respectively. The build artifacts will be stored in the `dist/` directory.

#### Running on production

Run `npm run server` to serve the project on `http://localhost:4000/`.
Be noted that the port number is 4000 for production.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
