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

    get "/" do
        redirect '/app'
    end


    get "/app" do
        erb :app
    end

    get "/api/hej" do
        content_type :json
        return {display: "hej"}.to_json
    end

    get "/api/employees" do 
        result = @db.execute("SELECT * FROM employees").to_json
        p result
        return result
    end

    # SHOW
    get "/api/employees/:id" do 
        result = @db.execute("SELECT * FROM employees WHERE id = ?", [params["id"]]).first.to_json
        p result
        return result
    end

    # UPDATE
    put "/api/employees/:id" do 
        body = JSON.parse(request.body.read)
        @db.execute("UPDATE employees SET name=?, phone=? WHERE id = ?", [body["name"], body["phone"], body["id"]])
        return "ok"
    end

    # CREATE
    post "/api/employees/:id" do 
        body = JSON.parse(request.body.read)
        @db.execute("INSERT INTO employees(name, phone) VALUES(?, ?)", [body["name"], body["phone"], body["id"]])
        return "ok"
    end

    # DESTROY
    delete "/api/employees/:id" do
        body = JSON.parse(request.body.read)
        result = @db.execute("DELETE FROM employees WHERE id = ?", [body["id"]])
        return "ok"
    end
1end