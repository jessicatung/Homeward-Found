require 'spec_helper'

user = FactoryGirl.create(:user)

user_with_losting = FactoryGirl.create(:user_with_losting)

user_with_sighting = FactoryGirl.create(:user_with_sighting)

puts "user: #{user.email}"
puts "user_with_losting: #{user_with_losting.lostings[0].pet_name}"
puts "user_with_sighting: #{user_with_sighting.sightings[0].breed}"