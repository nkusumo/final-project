class ParenthoodsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        parenthoods = Parenthood.all
        render json: parenthoods
    end

    def show
        parenthood = Parenthood.find(params[:id])
        plant_image = rails_blob_path(parenthood.plant_image)
        render json: {parenthood: parenthood, plant_image: plant_image}
    end

    def create
        parenthood = Parenthood.create!(parenthood_params)
        render json: parenthood, status: :created
    end

    def update
        p = Parenthood.find(params[:id])
        p.update!(parenthood_params)
        render json: p
    end

    def add_image
        parenthood = Parenthood.find(params[:id])
        parenthood.update(plant_image: params[:plant_image])
        image_url = rails_blob_path(parenthood.plant_image)
        parenthood.update(image: image_url)
        render json: parenthood
    end

    def destroy
        p = Parenthood.find(params[:id])
        p.destroy
        render json: {}
    end

    private

    def parenthood_params
        params.permit(:date, :plant_name, :plant_sci_name, :user_id, :watering_frequency)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Plant not found" }, status: :not_found
    end

end
