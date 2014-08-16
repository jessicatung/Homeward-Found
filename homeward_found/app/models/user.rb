class User < ActiveRecord::Base
  has_many :lostings
  has_many :sightings
  attr_accessor :password, :password_confirmation, :password_digest
  validates_presence_of :password, :on => :create

has_secure_password validations: false
validates :password, presence: true
  # EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  # validates :email, :presence => true, :uniqueness => true, :length => { :in => 3..20 }
  # validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
  # validates :password, :confirmation => true #password_confirmation attr
  # validates_length_of :password, :in => 6..20, :on => :create


  # include BCrypt

  # def authenticate(email, password)
  #   authenticate_or_request_with_http_basic do |u, p|
  #     u == email &&
  #     Digest::SHA1.hexdigest(p) == password
  #   end
  # end

end
