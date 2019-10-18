class Server < Sinatra::Base

    def initialize
        super
        @db = SQLite3::Database.new('db/company.db')
        @db.results_as_hash = true
    end
   
    before do
        #content_type :json    
        headers 'Access-Control-Allow-Origin' => '*', 
                'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']  
    end
    
    set :protection, false

    get '/' do 
        erb :index
    end

    get '/slow' do
        content_type :json
        sleep 2
        return {result: 'slow'}.to_json
    end

    get '/app' do
        erb :api
    end

    #CRUD-interface med JS

    get '/api/employees' do 
        content_type :json
        result = @db.execute('SELECT * FROM employees').to_json
        p result
        return result
    end

end