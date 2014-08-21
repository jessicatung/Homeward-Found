require 'spec_helper'

# losting = FactoryGirl.create(:losting)

describe LostingsController do
  context '#recent' do
    # Arrange - creating objects that will exist at time of request
    before :each do
      20.times do
        FactoryGirl.create(:losting)
      end
      get :recent
      
    end
    it 'returns the 10 most recent lostings' do
      # making instance variable of what response SHOULD be
      recent_lostings = Losting.ordered_json
      # expect(JSON.parse(response.body).length).to eq(10)

      # compare what is returned from route 
      # to what we have in line 14
      expect(response.body).to eq(recent_lostings)
    end
    it 'does not return older lostings' do
      # limit 10 would not make sense if change factory from 20 
      older_lostings = JSON.parse(Losting.order("event_date ASC").limit(10).to_json(methods: [:long_date]))
      
      # expect(JSON.parse(response.body).length).to eq(10)
      older_lostings.each do |ol|
        expect(JSON.parse(response.body)).to_not include(ol)       
      end
    end
  end
  context '#index' do
    # lostings page does not render anything?
    it 'should respond to an AJAX call that corresponds to the associated lostings' do
      get :index
      expect(response).to render_template(partial: "_index")
    end
  end
  context '#create' do
    let(:user) {FactoryGirl.create(:user)}
    it 'should only create a losting associated to a user' do
      # dummy session
      session[:user_id] = user.id
      # added this, they didn't have an #Act
      post :create, losting: FactoryGirl.attributes_for(:losting)

      #losting = user.lostings.create(pet_name: 'fido')
      losting = Losting.first
      expect(losting.user_id).to eq(user.id)
    end
  end
end

