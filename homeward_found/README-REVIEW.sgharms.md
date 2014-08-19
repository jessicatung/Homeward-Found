## Basics

1.  Clone it - OK
2.  Can start a console: `bundle && rake db:create:all db:migrate db:seed db:test:prepare && rails c` - OK
3.  Can run RSpec: `bundle exec rspec` - NO TESTS? Are we not doing TDD?

## Controllers:

Overall the controllers are really solid.  I'm pretty pleased with what I
saw.  The general pattern that needs to be applied here is that you move
complex logic into models.  There's too much going on inside of these methods
e.g. `#each` and whatnot.

SightingsController really needs some love
 * You could definitely DRY out your Enumerable method use
 * You're totally giving away your Ruby rookie status by misusing #each.
   Enumerable has many better methods for doing what you want: map,
   each_with_object, etc.
 * Don't hard code special parameters e.g. `key`
 * Fetching should be in a class like `DogBreedFetcher` or something like
   that
 * If there's an error you should return **something** this whole fail silently
   thing sucks hard.  Try returning an unprocessable_entity or something.  Use
   the Golden Rule: how pissed would you be if Ruby just silently returned
   _nothing_ when you made an error.  Not nice.

## Views

* Don't commit commented out code.
* **FIX YOUR FUCKING INDENTATION**:  100% giveaway of a developer who
  *JDGAF*, i.e. someone I won't hire.
* There's handlebars_assets which will compile handlebars for you
* Seems weird that you told me "welcome back" after my initial registration

## Layout

* Love your icons and the gradients.  Pretty!
* Sighting bleeds under *all*

## JavaScript

* Why does Home#index necessitate 2 calls to Lostings#recent?
* I don't seem to have any JavaScript working
* Very much like the use of handlebars. Why isn't it global through out your
  JS app?  Seems like you're halfway through something.

## Migrations

Your migrations are vulnerable to bad data.  No constraints, no default values.
I'm going to upload some total shit in there.

## Tests

None?  Really?
