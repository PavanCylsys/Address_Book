class Api::ContactsController < ApplicationController
  def index
    contacts = Contact.all
    render json: contacts
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: contact, status: :created
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy
    head :no_content
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :mobile_number, :address, :gender, :age)
  end
end
