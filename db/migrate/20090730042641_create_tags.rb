class CreateTags < ActiveRecord::Migration
  def self.up
    create_table :tags do |t|
      t.string :name

      t.timestamps
    end

    create_table("notes_tags", :id=>false) do |t|
      t.column "note_id", :integer
      t.column "tag_id", :integer
    end
  end

  def self.down
    drop_table :tags
    drop_table :notes_tags
  end
end
