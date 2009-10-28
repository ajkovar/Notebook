# 
# Trivial controller.  Still a work in progress.
#
class HomeController < ApplicationController
		
	def retrieveNotes
		user = session[:user] #= User.find_by_id(1)
		notes = Note.find_all_by_user_id(user.id, :include => [:tags])
		respond_to do |format|
		      format.html
		      format.json  { render :json => notes.to_json(:include=>[:tags]) }
		end
	end

	def retrieveTags
		tags = Tag.find(:all, :select => 'tags.id, tags.name')

		respond_to do |format|
		      format.html
		      format.json  { render :json => tags }
		end
	end

	# 
	# Saves a users note or creates a new one if it doesn't exist
	#
	def saveNote
		@note = Note.find_by_id(params[:note][:id])
		
		if @note == nil
			@note = Note.new(params[:note]) 
			@note.save
		else 
			@note.update_attributes(params[:note])
		end

		respond_to do |format|
		      format.html
		      format.json  { render :json => @note.errors }
		end
	end
end
