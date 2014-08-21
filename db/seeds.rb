# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

pet_name = %w{fido lucky bob spot clifford molly ginger}
type = %w{cat dog}
size = %w{small medium large}
breeds = %w{persian siamese bengal ragdoll burmese tabby labrador shepherd bulldog terrier poodle retriever beagle boxer dobermann}
coat_color = %w{black brown white grey calico}
coat_length = %w{hairless short medium long}
tag = %w{none owner vet}
longs = [-122.411295, -122.408849, -122.409849, -122.397733, -122.4, -122.75, -122.738, -122.433396, -122.44, -122.45]

found = %w{true false}

20.times do
  User.create(email: Faker::Internet.free_email, password: "123456")
end

lostings_users = User.limit(15)
sightings_users = User.limit(5)

lostings_users.each do |user|
  user.lostings.create(pet_name: pet_name.sample, animal_type: type.sample, size: size.sample, coat_color: coat_color.sample, coat_length: coat_length.sample, tag: tag.sample, event_date: Time.now.strftime("%Y-%m-%d %H:%M:%S"), Lat: 37.785126, Lng: longs.sample, breed: breeds.sample)
end

sightings_users.each do |user|
  user.sightings.create(animal_type: type.sample, size: size.sample, coat_color: coat_color.sample, coat_length: coat_length.sample, tag: tag.sample, found: found.sample, event_date: Time.now.strftime("%Y-%m-%d %H:%M:%S"), Lat: 37.785126, Lng: longs.sample, breed: breeds.sample)
end

