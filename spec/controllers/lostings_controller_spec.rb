require 'spec_helper'

# losting = FactoryGirl.create(:losting)

describe LostingsController do
  before :each do
    20.times do
      FactoryGirl.create(:losting)
    end
  end
  context '#recent' do
    it 'returns the 10 most recent lostings' do
      get :recent
      expect(JSON.parse(response.body).length).to eq(10)
    end
    it 'does not return older lostings' do
      get :recent
      expect(JSON.parse(response.body).length).to eq(10)
    end
  end
  context '#index' do
    it 'should respond to an AJAX call that corresponds to the associated lostings' do
      get :index
      expect(response).to render_template(partial: "_index")
    end
  end
  context '#create' do
  let(:user) {FactoryGirl.create(:user)}
    it 'should only create a losting associated to a user' do
      losting = user.lostings.create(pet_name: 'fido')
      expect(losting.user_id).to eq(user.id)
    end
  end
end

