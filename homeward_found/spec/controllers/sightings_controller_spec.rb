require 'spec_helper'

describe SightingsController do
  before :each do
    20.times do
      FactoryGirl.create(:sighting)
    end
  end
  context '#recent' do
    it 'returns the 10 most recent sightings' do
      get :recent
      expect(JSON.parse(response.body).length).to eq(10)
    end
    it 'does not return older sightings' do
      get :recent
      expect(JSON.parse(response.body).length).to eq(10)
    end
  end
  context '#index' do
    it 'should respond to an AJAX call that corresponds to the associated sightings' do
      get :index
      expect(response).to render_template(partial: "_index")
    end
  end
  context '#create' do
  let(:user) {FactoryGirl.create(:user)}
    it 'should only create a sighting associated to a user' do
      sighting = user.sightings.create(animal_type: 'dog')
      expect(sighting.user_id).to eq(user.id)
    end
  end
end

