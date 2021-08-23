class AddImageToLogs < ActiveRecord::Migration[6.1]
  def change
    add_column :logs, :image, :string
  end
end
