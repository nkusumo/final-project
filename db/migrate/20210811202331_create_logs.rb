class CreateLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :logs do |t|
      t.string :description
      t.string :date
      t.belongs_to :parenthood, null: false, foreign_key: true

      t.timestamps
    end
  end
end
