class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    skip_before_action :authorize, only: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def my_plants
        user_plants = @current_user.parenthoods
        render json: user_plants
    end

    def my_waterings
        waterings = @current_user.my_waterings.sort_by {|w| w[:date]}
        render json: waterings
    end

    private

    def user_params
        params.permit(:name, :username, :password)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

end
