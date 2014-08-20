FactoryGirl.define do

  factory :losting do
    pet_name { "fido" }
    animal_type { "dog" }
    size { "medium" }
    breed { "retriever" }
    coat_color { "golden" }
    coat_length { "medium" }
    Lat { 37.785126 }
    Lng { -122.397733 }
    event_date { Time.now }
  end

  factory :sighting do
    animal_type { "cat" }
    size { "small" }
    breed { "tabby" }
    coat_color { "calico" }
    coat_length { "short" }
    Lat { 37.785126 }
    Lng { -122.397733 }
    event_date { Time.now }
  end

  factory :user do
    email { Faker::Internet.free_email }
    password { "123456" }

    factory :user_with_losting do
      after(:create) do |user|
        create_list(:losting, 1, user: user)
      end
    end

    factory :user_with_sighting do
      after(:create) do |user|
        create_list(:sighting, 1, user: user)
      end
    end
  end
end