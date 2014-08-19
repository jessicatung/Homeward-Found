module PetFinder

  class Client
    include HTTParty

    base_uri "http://api.petfinder.com/"
    QUERY_STRING = "/breed.list?key=8a031807c83ba378f85a9b9cb98420d8&animal="

    def get_breeds(animal_type)
      response = self.class.get("#{QUERY_STRING}#{animal_type}&format=json")
      parse_breeds(response)
    end

    def parse_breeds(response)
      breeds = []
      breed_hash = response["petfinder"]["breeds"]["breed"]
      breed_hash.each { |k, v| breeds << k.values}
      breeds
    end

  end
end
