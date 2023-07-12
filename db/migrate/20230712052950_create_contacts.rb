class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :mobile_number
      t.string :address
      t.string :gender
      t.integer :age

      t.timestamps
    end
  end
end
