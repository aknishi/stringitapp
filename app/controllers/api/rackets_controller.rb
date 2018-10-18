class Api::RacketsController < ApplicationController
  before_action :require_login

  def index
    sleep 0.75
    @rackets = Racket.all
  end

  def create
    @racket = Racket.new(racket_params)

    if @racket.save
      render "api/rackets/show"
    else
      render json: @racket.errors.full_messages, status: 422
    end
  end

  def show
    @racket = Racket.find(params[:id])
  end

  def update
    @racket = Racket.find(params[:id])
    if @racket.update(racket_params)
      render :show
    else
      render json: @racket.errors.full_messages, status: 422
    end
  end

  def destroy
    @racket = Racket.find(params[:id])
    @racket.destroy
  end

  private

  def racket_params
    params.require(:racket).permit(:order_line_id, :brand, :model, :color, :image)
  end
end
