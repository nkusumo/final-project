class AddColumnsToParenthoods < ActiveRecord::Migration[6.1]
  def change
    remove_column :parenthoods, :plant_id
    add_column :parenthoods, :plant_name, :string
    add_column :parenthoods, :plant_sci_name, :string
  end
end
