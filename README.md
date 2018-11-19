# WCFB
JumboCode 2018-2019 project for Worcester County Food Bank, led by Patrick Wolfe.


# Getting Set up
1. Clone this repo. Copying the link from the 'Clone or Download' button above and pasting it after the command 'git clone' on Terminal should be all you need to do for this step. 

2. Set up the dev environment. The project itself is actually just 
HTML, JavaScript, and CSS, which you don't need to install 
dependencies for. However, we will be using a few tools that do 
require an install. To get them, you'll need npm. Follow this guide 
for getting that set up: https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/ Once you have npm, just run 
'npm install' and you should see a few packages install. 

3. You can open the index page by navigating to 
'src/html/index.html' and opening it with the browser of your choice. 

4. That's it! You should see a blank html page with 'Hello world!' 
colored blue in the top left. 

# Using Sass
If you have Sass installed properly, you should
be able to use it to make writing stylesheets a little
less cubersome. To use it, make a change in style.scss 
then run the command 'sass style.scss style.css'. This will edit
style.css and the changes should be reflect in index.html
or whatever file's elements' styling you changed. 

# Using ESLint
A linter is a tool used to check code's formatting for  
potential typos and errors. We will be using ESLint
with the popular AirBnB style guide. To run ESLint 
so it can check your code, run the command 
'./node_modules/.bin/eslint &lt;.js file>'

# Using Parcel
Getting Started: 
Installing Parcel
1. Before installing Parcel, we need to install npm, which the instructions should be already given in the WCFB Github repo.

To install parcel, run: 
npm install -g parcel-bundler
source: https://parceljs.org/getting_started.html
*Terminal may display some error messages after the installation. If this happens: the end of this post specifies how to fix it:

Create a package.json file in your project directory
npm init -y

Create your files
My test bundle included: 
index.html
index.js

Build
Since Parcel has a development server built in, it automatically rebuild your apps as you change files
parcel index.html
To bunde multiple entry files: 
parcel *.html creates a file structure with all the files in sub folders

View
Open http://localhost:1234/ in browser
Updating source code will also update contents in local server almost instantly!

Parcel on Github: https://github.com/parcel-bundler/parcel
Using Sass, React, and Vue in Parcel: https://medium.freecodecamp.org/all-you-need-to-know-about-parcel-dbe151b70082
General information: https://parceljs.org/

*If the errors are regarding permissions, try not to use sudo with npm install, do the following steps from npmjs official docs:
a. Make a directory for global installations:
mkdir ~/.npm-global
b. Configure npm to use the new directory path:
npm config set prefix '~/.npm-global'
c. Open or create a ~/.profile file and add this line:
export PATH=~/.npm-global/bin:$PATH
d. Back on the command line, update your system variables:
source ~/.profile
e. Test: Download a package globally without using sudo.
npm install -g parcel-bundler
source: https://docs.npmjs.com/getting-started/fixing-npm-permissions
