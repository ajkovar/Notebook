class Note < ActiveRecord::Base
	validates_presence_of :user_id

	has_and_belongs_to_many :tags
	accepts_nested_attributes_for :tags
end
