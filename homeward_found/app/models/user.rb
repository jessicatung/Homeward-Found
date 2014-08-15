class User < ActiveRecord::Base
  has_many :lostings
  has_many :sightings
end
