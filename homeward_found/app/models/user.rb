class User < ActiveRecord::Base
  has_many :lostings
  has_many :sightings
  has_secure_password
  validates_confirmation_of :password
end
