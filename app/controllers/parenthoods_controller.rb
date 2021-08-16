class ParenthoodsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        parenthoods = Parenthood.all
        render json: parenthoods
    end

    def show
        parenthood = Parenthood.find(params[:id])
        render json: parenthood
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

    def destroy
        p = Parenthood.find(params[:id])
        p.destroy
        render json: {}
    end

    private

    def parenthood_params
        params.permit(:date, :image, :plant_name, :plant_sci_name, :user_id, :watering_frequency)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Plant not found" }, status: :not_found
    end

end
