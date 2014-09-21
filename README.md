# React Sin

Testing a DOM-based sinewave w/jQuery & React

Check out [the result](http://reactsin.herokuapp.com/)

## Build

   Clone the repo.
   *npm install* 
   *gulp*

## Workflow

Do all your work in 'src'. Monitor & build by executing **gulp**. Distribute the 'dist' folder

## Deploy on Heroku

(First deploy) Add the following buildpack:

    heroku config:set BUILDPACK_URL=https://github.com/CHH/heroku-buildpack-php

Deploy the 'dist' folder:

    git subtree push --prefix dist heroku master

Or easier still:

    gulp heroku

----

Add database (if needed)

    heroku addons:add cleardb:ignite

Retrieve database URL

    heroku config | grep CLEARDB_DATABASE_URL
