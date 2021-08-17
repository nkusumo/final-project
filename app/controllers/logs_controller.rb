class LogsController < ApplicationController
    
    def index
        logs = Log.all
        render json: logs
    end

    def create
        log = Log.create!(log_params)
        render json: log, status: :created
    rescue ActiveRecord::RecordInvalid => exception
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def log_params
        params.permit(:date, :description, :parenthood_id)
    end

end
