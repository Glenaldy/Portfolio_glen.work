# <img alt="logo" src="https://www.glen.work/assets/Logo/Main-Logo.svg" width="50"  /> Welcome to **glen.work**

#### Video Demo: <https://youtu.be/YFQ9Bv8j40Y>

#### Description: This is my current portfolio website, it is now live at **[glen.work](https://www.glen.work/)**

It is a dynamic website created in ExpressJS, templated using handlebars, and hosted in heroku.

## Global object

With handlebars and expressJS, Header, Footer, and the Overlay menu is currently saved only one file and can be easily modified without bothering other pages.

## The homepage/index

It splits into 3 sections. Home, About, and Work. <br>
The Home serve as eye candy and at the bottom right the curving effect makes sure viewer scroll down.

The About section is quote from the [about](https://www.glen.work/about/) page. To make sure it doesn't fill up the page there's a button that increase the height of the section. At the end there's a button that brings the visitor the about page.

Work section is a preview of the work list in [work](https://www.glen.work/works/). The carousel use a JS slider library called [Flickity](https://github.com/metafizzy/flickity). At the bottom there's a button that brings the visitor the about page.

## About Page

This page is about me in 3 languages, English, Japanese, and Indonesian. You can choose the language with the flag buttons.

## Works Page

This page is dynamically generated with ExpressJS and handlebars. There's a genre selection button that automatically sort and display work that is according to the genre selected.

If you select one of the work, it will bring it into the details page of the particular work that is also dynamically generated. Currently the work data is saved in a json file that saves the folder location, genre, title, image name etc.

work.js takes the json file and output a javascript object that can be used in the website to dynamically generate content into html.

All the image in the folder is served into a handlebars template that automatically put it into a Flickity carousel.

## Contact Page

The contact form is using [Nodemailer](https://github.com/nodemailer/nodemailer/), nodeJS application that directly emails the contact into my email.
