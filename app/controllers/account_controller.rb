class AccountController < ApplicationController
  #model   :user
  #layout  'scaffold'
#fix/finish this.. was created by the login_generator which is apparently outdated and broken

  def login
	@user = session[:user]=User.find_by_id(1);
	redirect_to :controller => 'home', :action => 'index'
	#puts @request.method
#    case @request.method
#      when :post
#	puts @params['user_login']
#        if @session['user'] = User.authenticate(@params['user_login'], @params['user_password'])
#
#          flash['notice']  = "Login successful"
#          redirect_back_or_default :action => "welcome"
#        else
#          @login    = @params['user_login']
#          @message  = "Login unsuccessful"
#      end
#      
#    end
    
  end
  


  def signup
    case @request.method
      when :post
        @user = User.new(@params['user'])
        
        if @user.save      
          @session['user'] = User.authenticate(@user.login, @params['user']['password'])
          flash['notice']  = "Signup successful"
          redirect_back_or_default :action => "welcome"          
        end
      when :get
        @user = User.new
    end      
  end  
  
  def delete
    if @params['id'] and @session['user']
      @user = User.find(@params['id'])
      @user.destroy
    end
    redirect_back_or_default :action => "welcome"
  end  
    
  def logout
    @session['user'] = nil
  end
    
  def welcome
  end
  
end
