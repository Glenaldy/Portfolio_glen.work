# <img alt="logo" src="https://www.glen.work/assets/Logo/Main-Logo.svg" width="50"  /> Welcome to **glen.work**

#### Video Demo: <https://youtu.be/YFQ9Bv8j40Y>

#### Description: This is my current portfolio website, it is now live at **[glen.work](https://www.glen.work/)**

It is a dynamic website created in ExpressJS, templated using handlebars, and hosted in heroku.

## How I designed it

I first designed all the objects such as sakura tree and the mountain in Adobe Illustrator as it is my strong point. After that I brought all the objects into Figma where I do most of the prototyping. It is a good way to see what should I keep and what should I throw away.

After all the planning is done I create a static website first with mostly HTML and CSS as a proof of concept. Then I moved everything into expressJS and changed it into handlebars. I also convert my CSS to SCSS to make my work easier.
For the first week I spend most of the time making the mobile version until I am satisfied then adding the desktop version as a minor tweak.

## Global object

With handlebars and expressJS, Header, Footer, and the Overlay menu is currently saved only one file and can be easily modified without bothering other pages.

## The homepage/index

It splits into 3 sections. Home, About, and Work. <br>
The Home serves as eye candy and at the bottom right the curving effect makes sure viewer scroll down.

The About section is quote from the [about](https://www.glen.work/about/) page. To make sure it doesn't fill up the page there's a button that increase the height of the section(the effect is mostly visible on mobile). At the end there's a button that brings the visitor the about page.

Work section is a preview of the work list in [work](https://www.glen.work/works/). The carousel use a JS slider library called [Flickity](https://github.com/metafizzy/flickity). At the bottom there's a button that brings the visitor to about page.

## About Page

This page is about me in 3 languages, English, Japanese, and Indonesian. You can choose the language with the flag buttons. At the bottom there's a Contact Me button that bring the visitor to [contact](https://www.glen.work/about/).

## Works Page

This page is dynamically generated with ExpressJS and handlebars. There's a genre selection button that automatically sort and display work that is according to the genre selected.

If you select one of the work, it will bring it into the details page of the particular work that is also dynamically generated. Currently the work data is saved in a json file that saves the folder location, genre, title, image name etc.

work.js takes the json file and output a javascript object that can be used in the website to dynamically generate content into html.

All the image in the folder is served into a handlebars template that automatically put it into a Flickity carousel.

## Contact Page

The contact form is using [Nodemailer](https://github.com/nodemailer/nodemailer/), nodeJS application that directly emails the contact into my email. After the user sends the form they will be notified that their form is sent succesfully.

Thank you for visiting my website.
