class ParenthoodsController < ApplicationController

    def index
        parenthoods = Parenthood.all
        render json: parenthoods
    end

    def show
        parenthood = Parenthood.find(params[:id])
        render json: parenthood
    end

    def create

    end

end
