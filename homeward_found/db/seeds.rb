# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

name = %w{fido lucky bob spot clifford molly ginger}
type = %w{cat dog}
size = %w{small medium large}
cat_breed = %w{persian siamese bengal ragdoll burmese tabby}
dog_breed = %w{labrador shepherd bulldog terrier poodle retriever beagle boxer dobermann}
coat_color = %w{black brown white grey calico}
coat_length = %w{hairless short medium long}
location = ["2nd and Folsom St., San Francisco CA", "83 McAllister St., San Francisco CA", "633 Folsom St., San Francisco CA", "Market St. and New Montgomery St., San Francisco CA", "Golden Gate Park, San Francisco CA", "Dolores Park, San Francisco CA", "Alamo Park, San Francisco CA", "Mission and 16th, San Francisco CA", "Crissy Field, San Francisco CA", "Pier 39, San Francisco CA"]
tag = %w{none owner vet}

found = %w{true false}

20.times do
  User.create(email: Faker::Internet.free_email, password: "123456")
end

lostings_users = User.limit(15)
sightings_users = User.limit(5)

lostings_users.each do |user|
  user.lostings.create(name: name.sample, animal_type: type.sample, size: size.sample, coat_color: coat_color.sample, coat_length: coat_length.sample, location: location.sample, tag: tag.sample, date_lost: (rand*5).days.ago)
end

sightings_users.each do |user|
  user.sightings.create(animal_type: type.sample, size: size.sample, coat_color: coat_color.sample, coat_length: coat_length.sample, location: location.sample, tag: tag.sample, found: found.sample, date_seen: Time.now.strftime("%Y-%m-%d %H:%M:%S"))
end


lost_cats = Losting.where(animal_type: "cat")
seen_cats = Sighting.where(animal_type: "cat")
lost_dogs = Losting.where(animal_type: "dog")
seen_dogs =Sighting.where(animal_type: "dog")

cats = lost_cats + seen_cats
dogs = lost_dogs + seen_dogs

cats.each do |user|
  user.update_attributes(breed: cat_breed.sample)
end

dogs.each do |user|
  user.update_attributes(breed: dog_breed.sample)
end