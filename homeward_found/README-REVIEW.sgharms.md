## How I Do Evaluation

1.  Clone it - OK
2.  Can start a console: `bundle && rake db:create:all db:migrate db:seed db:test:prepare && rails c` - OK
3.  Can run RSpec: `bundle exec rspec` - NO TESTS
  * Are we not doing TDD?
4.  Evaluate the Controllers:
  1.  Flog `find app/controllers -name \*.rb -exec flog {} \; `

        20.3: LostingsController#new           app/controllers/lostings_controller.rb:10
        17.1: LostingsController#create        app/controllers/lostings_controller.rb:31
        24.7: flog total
        12.4: flog/method average

        21.4: SessionsController#create        app/controllers/sessions_controller.rb:3
        50.8: flog total
         8.5: flog/method average

        20.3: SightingsController#new          app/controllers/sightings_controller.rb:8
        16.8: SightingsController#create       app/controllers/sightings_controller.rb:28
        18.9: flog total
         4.7: flog/method average

        10.9: UsersController#create           app/controllers/users_controller.rb:8
         3.6: UsersController#user_params      app/controllers/users_controller.rb:24



  2.  Manual investigation of the controllers
    A. Long method smell
    B. Private methods?
    C. Proper use of AR association has_many methods `.build(), .create()`
    D. Use of helpers (gross)
5.  Investigate the Models
  1.  Appropriate concerns
  2.  Any non-DB Models? Are they tested?
6.  Evaluate the views
  1.  Logic in view?
  2.  Views over-large
  3.  Corect use of partials
7.  Evaluate the JavaScript
  1. Any sense of code organization (OO) or is it jQuery soup?
  2. Any file division?
  3. Did they use templates?
8. Examine the migrations
  1. Constraints used properly
9. Examine the tests
  1. Any tests beyond mere validations and trivial ActiveRecord testing?
  2. Are critical controller routes tested?
  3. Are they testing implementation over interface?

## MISC

1.  Misuse of Enumerables

