require 'spec_helper'

describe UsersController do
  context '#create' do
    it 'should create a new user' do
      user = FactoryGirl.create(:user)
      expect( User.count ).to eq(1)
    end
  end
end

