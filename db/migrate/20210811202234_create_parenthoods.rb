class CreateParenthoods < ActiveRecord::Migration[6.1]
  def change
    create_table :parenthoods do |t|
      t.belongs_to :plant, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :date
      t.integer :watering_frequency
      t.string :image

      t.timestamps
    end
  end
end
