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